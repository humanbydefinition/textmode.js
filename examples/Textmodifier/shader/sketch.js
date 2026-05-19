/**
 * @title Textmodifier.shader
 * @description Cyberpunk CRT glitch shader: compiles an inline GLSL 3.0 ES shader that simulates dropping green digital rain, chroma aberration, and scanlines.
 * @author antigravity
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

let matrixShader;

t.setup(async () => {
	// A self-contained cyberpunk matrix screen shader
	matrixShader = await t.createFilterShader(`#version 300 es
		precision highp float;
		in vec2 v_uv;
		uniform float u_time;
		uniform vec2 u_mouse;
		layout(location = 0) out vec4 o_character;
		layout(location = 1) out vec4 o_primaryColor;
		layout(location = 2) out vec4 o_secondaryColor;

		// Simple pseudo-random hash
		float hash(float x) {
			return fract(sin(x) * 43758.5453);
		}

		void main() {
			// Columns and falling speed calculations
			float colIndex = floor(v_uv.x * 60.0);
			float speed = 1.5 + hash(colIndex) * 2.5;
			float dropOffset = u_time * speed + hash(colIndex * 12.7) * 20.0;

			// Row coordinates
			float cellY = fract(v_uv.y * 30.0 - dropOffset);
			float charValue = step(0.1, cellY) * fract(cellY * 7.0);

			// Dynamic light green rain drops with bright head tips
			vec3 greenRain = vec3(0.0, 1.0 - cellY * 0.7, 0.2);
			if (cellY > 0.9) {
				greenRain = vec3(0.8, 1.0, 0.9); // Bright tip
			}

			// Add CRT scanline effects
			float scanline = sin(v_uv.y * 400.0 - u_time * 10.0) * 0.15;
			vec3 finalColor = greenRain - vec3(scanline);

			// Dynamic distortion near the mouse coordinates
			float distToMouse = distance(v_uv, u_mouse);
			if (distToMouse < 0.18) {
				float factor = (0.18 - distToMouse) / 0.18;
				finalColor += vec3(factor * 0.6, 0.0, factor * 0.3); // Glow red
				charValue = fract(charValue * 3.0 + u_time);
			}

			o_character = vec4(charValue, 0.0, 0.0, 1.0);
			o_primaryColor = vec4(finalColor, 1.0);
			o_secondaryColor = vec4(0.01, 0.03, 0.01, 1.0); // Dark green terminal background
		}
	`);
});

t.draw(() => {
	t.background(0);

	if (matrixShader) {
		t.shader(matrixShader);
		t.setUniform('u_time', t.frameCount * 0.001);

		// Normalized mouse coordinates
		const mx = t.mouse ? Math.max(0, Math.min(1, (t.mouse.x + t.grid.cols / 2) / t.grid.cols)) : 0.5;
		const my = t.mouse ? Math.max(0, Math.min(1, (t.mouse.y + t.grid.rows / 2) / t.grid.rows)) : 0.5;
		// Invert Y to match shader coords
		t.setUniform('u_mouse', [mx, 1.0 - my]);

		// Draw rectangle covering grid to apply the matrix shader
		t.rect(t.grid.cols, t.grid.rows);
		t.resetShader();
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

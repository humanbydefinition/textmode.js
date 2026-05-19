/**
 * @title Textmodifier.createFilterShader
 * @description Warp ripple filter: compiles an inline GLSL 3.0 ES shader that creates an interactive fluid-like wave distortion across the character grid.
 * @author antigravity
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

let warpShader;

t.setup(async () => {
	warpShader = await t.createFilterShader(`#version 300 es
		precision highp float;
		in vec2 v_uv;
		uniform float u_time;
		uniform vec2 u_mouse;
		layout(location = 0) out vec4 o_character;
		layout(location = 1) out vec4 o_primaryColor;
		layout(location = 2) out vec4 o_secondaryColor;

		void main() {
			// Center coordinates
			vec2 p = v_uv - vec2(0.5);
			float d = length(p);

			// Interactive wave effect based on mouse distance
			vec2 m = u_mouse - vec2(0.5);
			float mouseDist = length(v_uv - u_mouse);
			float wave = sin(d * 40.0 - u_time * 5.0) * 0.03;
			float mouseWave = sin(mouseDist * 20.0 - u_time * 8.0) * 0.05 * exp(-mouseDist * 3.0);

			// Apply wave offsets to UV
			vec2 uvWarped = v_uv + p * (wave + mouseWave);

			// Procedural text character selection based on warp intensity
			float val = abs(sin(uvWarped.x * 20.0) * cos(uvWarped.y * 20.0));
			float charValue = step(0.15, val) * fract(val * 9.0);

			// Color palettes with smooth gradient interpolation
			vec3 primary = vec3(0.1, 0.4 + sin(u_time + d * 4.0) * 0.4, 0.8 + cos(d * 5.0) * 0.2);
			vec3 secondary = vec3(0.05, 0.08, 0.15 + sin(u_time * 0.5) * 0.05);

			// Enhance mouse interaction area
			if (mouseDist < 0.25) {
				float glow = (0.25 - mouseDist) / 0.25;
				primary += vec3(glow * 0.6, glow * 0.2, 0.0);
				secondary += vec3(0.05 * glow, 0.0, 0.05 * glow);
				charValue = fract(charValue + u_time * 0.2);
			}

			o_character = vec4(charValue, 0.0, 0.0, 1.0);
			o_primaryColor = vec4(primary, 1.0);
			o_secondaryColor = vec4(secondary, 1.0);
		}
	`);
});

t.draw(() => {
	t.background(8, 12, 24);

	if (warpShader) {
		t.shader(warpShader);
		t.setUniform('u_time', t.frameCount * 0.002);

		// Normalize mouse coordinates [0, 1]
		const mx = t.mouse ? Math.max(0, Math.min(1, (t.mouse.x + t.grid.cols / 2) / t.grid.cols)) : 0.5;
		const my = t.mouse ? Math.max(0, Math.min(1, (t.mouse.y + t.grid.rows / 2) / t.grid.rows)) : 0.5;
		t.setUniform('u_mouse', [mx, 1.0 - my]);

		t.rect(t.grid.cols, t.grid.rows);
		t.resetShader();
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

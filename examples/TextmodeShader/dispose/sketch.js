/**
 * @title TextmodeShader.dispose
 * @author codex
 * @description Releases WebGL shader GPU program resources and seamlessly restores standard pipeline rendering.
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });

const labelLayer = t.layers.add({ fontSize: 16 });
const RAMP = ' ./\\|X#',
	CYCLE_FRAMES = 180;
let customShader = null,
	isDisposed = false,
	cycleCount = -1,
	timer = 0;

const FRAG = `#version 300 es
precision highp float;
in vec2 v_uv; uniform float u_time; uniform vec2 u_center;
layout(location = 0) out vec4 o_character; layout(location = 1) out vec4 o_primaryColor; layout(location = 2) out vec4 o_secondaryColor;
void main() {
	vec2 p = v_uv - u_center;
	float v = clamp((sin(length(p) * 22.0 - u_time * 4.0) + sin(atan(p.y, p.x) * 6.0 + u_time * 2.0) + 1.2) * 0.35, 0.0, 1.0);
	o_character = vec4(v > 0.75 ? (35.0 / 255.0) : v > 0.5 ? (88.0 / 255.0) : v > 0.3 ? (47.0 / 255.0) : 0.0, 0.0, 0.0, 1.0);
	o_primaryColor = vec4(v > 0.72 ? vec3(1.0, 0.96, 0.84) : mix(vec3(1.0, 0.33, 0.27), vec3(1.0, 0.76, 0.22), v), 1.0);
	o_secondaryColor = vec4(0.063, 0.024, 0.039, 1.0);
}`;

async function toggleShader() {
	if (customShader && !isDisposed) {
		customShader.dispose();
		isDisposed = true;
	} else {
		customShader = await t.createMaterialShader(FRAG);
		isDisposed = false;
	}
	cycleCount++;
}
t.setup(toggleShader);
t.mouseClicked(() => {
	timer = 0;
	toggleShader();
});
t.draw(() => {
	t.background(16, 6, 10);
	if (++timer >= CYCLE_FRAMES) {
		timer = 0;
		toggleShader();
	}
	const time = t.frameCount * 0.035;
	const cx = Number.isFinite(t.mouse.x) ? t.mouse.x / t.grid.cols + 0.5 : 0.5 + Math.sin(time * 0.7) * 0.2;
	const cy = Number.isFinite(t.mouse.y) ? t.mouse.y / t.grid.rows + 0.5 : 0.5 + Math.cos(time * 0.5) * 0.2;

	if (!isDisposed && customShader) {
		t.shader(customShader);
		t.setUniforms({ u_time: time, u_center: [cx, cy] });
		t.rect(t.grid.cols, t.grid.rows);
		t.resetShader();
	} else {
		const hx = Math.floor(t.grid.cols / 2),
			hy = Math.floor(t.grid.rows / 2);
		const ox = (cx - 0.5) * t.grid.cols,
			oy = (cy - 0.5) * t.grid.rows;
		for (let y = -hy; y <= hy; y += 2) {
			for (let x = -hx; x <= hx; x += 2) {
				const v = Math.max(
					0,
					Math.min(
						1,
						(Math.sin(Math.hypot(x - ox, y - oy) * 0.35 - time * 4) +
							Math.sin(Math.atan2(y - oy, x - ox) * 6 + time * 2) +
							1.2) *
							0.35
					)
				);
				if (v > 0.25) {
					t.charColor(...(v > 0.72 ? [255, 245, 215] : v > 0.5 ? [255, 195, 55] : [255, 85, 70]));
					t.print(RAMP[Math.min(RAMP.length - 1, Math.floor(v * RAMP.length))], x, y);
				}
			}
		}
	}
});

labelLayer.draw(() => {
	t.clear();
	const pct = Math.floor((timer / CYCLE_FRAMES) * 10);
	const left = -Math.floor(t.grid.cols / 2) + 2;
	const top = -Math.floor(t.grid.rows / 2) + 2;
	t.push();
	t.printAlign('left', 'top');
	t.cellColor(16, 6, 10, 220);
	const panel = `[fg=#fff5d7]TEXTMODESHADER.DISPOSE[/fg]
[fg=#ff5546]--------------------------------[/fg]
[fg=#ffc337]${isDisposed ? 'PIPELINE : CPU FALLBACK' : 'PIPELINE : GPU SHADER'}[/fg]
[fg=#fff5d7]${isDisposed ? 'PROGRAM  : FREED (DISPOSED)' : 'PROGRAM  : ACTIVE (WEBGL)'}[/fg]
[fg=#ff5546]CYCLES   : ${cycleCount} (CLICK TO TOGGLE)[/fg]
[fg=#ffc337]CYCLE    : [${'#'.repeat(pct)}${'.'.repeat(10 - pct)}] ${pct * 10}%[/fg]`;
	t.print(panel, left, top);
	t.pop();
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));

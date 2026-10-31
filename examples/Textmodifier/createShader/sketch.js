/**
 * @title Textmodifier.createShader
 * @author codex
 * @description Compiles and executes a custom WebGL2 fragment shader modulating character, primary, and secondary buffers.
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add({ fontSize: 16 });
const PATTERNS = ['VORTEX EMITTER', 'DIPOLE STREAM', 'CRYSTAL FIELD'];
let flowShader = null,
	rampGlyphs = [],
	preset = 0;

t.setup(async () => {
	rampGlyphs = [' ', '.', ':', '+', '*', '#'].map(
		(c) => t.font.characterMap.get(c)?.color ?? t.font.characters[0].color
	);
	const vert = `#version 300 es
in vec4 a_position; in vec2 a_texCoord; out vec2 v_uv;
void main() { gl_Position = vec4(a_position.xy * 2.0, 0.0, 1.0); v_uv = a_texCoord; }`;

	const frag = `#version 300 es
precision highp float;
in vec2 v_uv;
uniform float u_time, u_preset;
uniform vec2 u_mouse, u_res;
uniform vec3 u_ramp[6];
layout(location=0) out vec4 o_char;
layout(location=1) out vec4 o_primary;
layout(location=2) out vec4 o_secondary;
void main() {
	vec2 p = (v_uv - 0.5) * vec2(u_res.x / u_res.y, 1.0);
	vec2 m = (u_mouse - 0.5) * vec2(u_res.x / u_res.y, 1.0);
	float d = length(p - m), a = atan(p.y - m.y, p.x - m.x), f = 0.0;
	if (u_preset < 0.5) f = sin(d * 18.0 - u_time * 3.0 + a * 4.0) * exp(-d * 1.5) + sin(p.x * 10.0 + u_time) * 0.25;
	else if (u_preset < 1.5) f = sin((d - length(p + m * 0.8)) * 14.0 - u_time * 2.5) * 0.5 + 0.3 / (d + 0.2) * sin(d * 20.0 - u_time * 4.0);
	else f = sin(p.x * 8.0 + sin(p.y * 8.0 + u_time * 1.5)) * cos(p.y * 8.0 - u_time) + max(0.0, 1.0 - d * 2.5);
	float val = clamp(f * 0.5 + 0.5, 0.0, 0.999);
	vec3 glyph = u_ramp[int(val * 6.0)];
	vec3 fg = mix(mix(vec3(0.824, 0.843, 0.882), vec3(0.941, 0.255, 0.333), smoothstep(0.3, 0.75, val)), vec3(1.0), smoothstep(0.8, 1.0, val));
	vec3 bg = mix(vec3(0.039, 0.039, 0.055), vec3(0.18, 0.03, 0.05), val * 0.45);
	o_char = vec4(glyph.xy, 0.0, 0.0);
	o_primary = vec4(fg, 1.0);
	o_secondary = vec4(bg, 1.0);
}`;
	flowShader = await t.createShader(vert, frag);
});

const cycle = () => {
	preset = (preset + 1) % PATTERNS.length;
};
t.mousePressed(cycle);
t.keyPressed(cycle);

t.draw(() => {
	t.background(10, 10, 14);
	if (!flowShader) return;
	const time = t.frameCount * 0.02;
	const hasMouse = Number.isFinite(t.mouse.x) && Number.isFinite(t.mouse.y);
	const mx = hasMouse ? t.mouse.x / t.grid.cols + 0.5 : Math.sin(time * 0.7) * 0.35 + 0.5;
	const my = hasMouse ? 0.5 - t.mouse.y / t.grid.rows : Math.cos(time * 0.9) * 0.35 + 0.5;
	t.shader(flowShader);
	t.setUniforms({
		u_time: time,
		u_mouse: [mx, my],
		u_res: [t.grid.cols, t.grid.rows],
		u_preset: preset,
		u_ramp: rampGlyphs,
	});
	t.rect(t.grid.cols, t.grid.rows);
	t.resetShader();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2) + 2;
	const top = -Math.floor(t.grid.rows / 2) + 2;
	let y = top;
	t.push();
	t.printAlign('left', 'top');
	t.charColor(255, 255, 255);
	t.cellColor(10, 10, 14, 220);
	t.print('TEXTMODIFIER.CREATESHADER', left, y++);
	t.charColor(210, 215, 225);
	t.print(`PATTERN: ${PATTERNS[preset]}`, left, y++);
	t.charColor(240, 65, 85);
	t.print('CLICK OR PRESS KEY TO CYCLE', left, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

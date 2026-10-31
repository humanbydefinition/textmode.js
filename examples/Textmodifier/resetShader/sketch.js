/**
 * @title Textmodifier.resetShader
 * @author codex
 * @description Unbinds active custom shaders and restores the default textmode rendering pipeline with split-view comparison.
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add({ fontSize: 16 });
let customShader = null;
const ramp = ' _.-~^';

t.setup(async () => {
	customShader = await t.createMaterialShader(`#version 300 es
precision highp float;
in vec2 v_uv;
uniform float u_time, u_splitRatio;
layout(location = 0) out vec4 o_character;
layout(location = 1) out vec4 o_primaryColor;
layout(location = 2) out vec4 o_secondaryColor;
void main() {
	float sx = v_uv.x * u_splitRatio;
	float sig = sin(sx * 16.0 - u_time * 4.0) * 0.28 + 0.5;
	float beam = smoothstep(0.06, 0.0, abs(v_uv.y - sig));
	float scan = sin(v_uv.y * 64.0 + u_time * 12.0) * 0.15;
	float val = clamp(beam + scan, 0.0, 1.0);
	float ch = val > 0.6 ? (42.0 / 255.0) : val > 0.4 ? (61.0 / 255.0) : (45.0 / 255.0);
	o_character = vec4(step(0.2, val) * ch, 0.0, 0.0, 1.0);
	o_primaryColor = vec4(0.90, 0.53, 0.33, 1.0);
	o_secondaryColor = vec4(0.047, 0.039, 0.039, 1.0);
}`);
});

t.draw(() => {
	t.background(12, 10, 10);
	const halfW = Math.floor(t.grid.cols / 2);
	const halfH = Math.floor(t.grid.rows / 2);
	const splitX = Number.isFinite(t.mouse.x)
		? Math.max(-halfW + 4, Math.min(halfW - 4, Math.floor(t.mouse.x)))
		: Math.floor(Math.sin(t.secs * 1.5) * (halfW * 0.55));
	const leftW = splitX + halfW;

	if (customShader && leftW > 0) {
		t.shader(customShader);
		t.setUniform('u_time', t.secs);
		t.setUniform('u_splitRatio', leftW / t.grid.cols);
		t.push();
		t.translate(-halfW + leftW / 2, 0);
		t.rect(leftW, t.grid.rows);
		t.pop();
	}
	t.resetShader();

	t.push();
	t.charColor(255, 235, 210);
	for (let y = -halfH; y <= halfH; y++) {
		t.print(y % 3 === 0 ? '+' : '|', splitX, y);
	}
	t.charColor(75, 195, 165);
	for (let x = splitX + 1; x < halfW; x++) {
		if (x % 6 === 0) t.print(':', x, 0);
		const nx = (x + halfW) / t.grid.cols;
		const wave = Math.sin(nx * 16.0 - t.secs * 4.0) * 0.28;
		const rIdx = Math.max(1, Math.min(5, Math.round(((wave + 0.28) / 0.56) * 4 + 1)));
		t.print(ramp[rIdx], x, -Math.round(wave * t.grid.rows));
	}
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2) + 2;
	const top = -Math.floor(t.grid.rows / 2) + 2;
	let y = top;
	t.push();
	t.printAlign('left', 'top');
	t.cellColor(12, 10, 10, 220);
	t.charColor(255, 235, 210);
	t.print('TEXTMODIFIER.RESETSHADER', left, y++);
	t.charColor(230, 135, 85);
	t.print('<-- SHADER | DEFAULT PIPELINE -->', left, y++);
	t.charColor(75, 195, 165);
	t.print('resetShader() restores core render', left, y++);
	t.charColor(255, 235, 210);
	t.print('SWEEP: MOUSE X / AUTO CURTAIN', left, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

/**
 * @title filters.TextmodeFilterManager.unregister
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

let filterActive = false;

function drawLabel(text, y, color = [220, 220, 220]) {
	t.push();
	t.translate(-Math.floor(text.length / 2), y);
	t.charColor(color[0], color[1], color[2]);

	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}

	t.pop();
}

t.setup(async () => {
	const fragment = `#version 300 es
		precision highp float;
		in vec2 v_uv;
		uniform sampler2D u_src;
		uniform float u_amount;
		out vec4 outColor;

		void main() {
			vec4 color = texture(u_src, v_uv);
			float glow = 0.5 + 0.5 * sin((v_uv.x + v_uv.y) * 16.0 + u_amount * 6.2831853);
			outColor = vec4(mix(color.rgb, vec3(color.b, color.r, glow), 0.6), color.a);
		}
	`;

	await t.filters.register('pulse-filter', fragment, {
		u_amount: ['amount', 0.0],
	});

	filterActive = true;
});

t.draw(() => {
	t.background(6, 9, 20);

	t.push();
	t.rotateZ(t.frameCount * 1.2);
	t.charColor(255, 220, 120);
	t.cellColor(24, 38, 92);
	t.rect(t.grid.cols - 12, t.grid.rows - 12);
	t.pop();

	if (filterActive) {
		t.filter('pulse-filter', (Math.sin(t.frameCount * 0.04) + 1) * 0.5);
	}

	drawLabel('custom filter registry', -Math.floor(t.grid.rows * 0.34), [255, 225, 140]);
	drawLabel(`has pulse-filter ${t.filters.has('pulse-filter') ? 'yes' : 'no'}`, Math.floor(t.grid.rows * 0.28));
	drawLabel(filterActive ? 'click to unregister' : 'refresh to re-register', Math.floor(t.grid.rows * 0.36), [120, 205, 255]);
});

t.mouseClicked(() => {
	if (!filterActive) {
		return;
	}

	t.filters.unregister('pulse-filter');
	filterActive = false;
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

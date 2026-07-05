/**
 * @title filters.TextmodeFilterManager.has
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

const labelLayer = t.layers.add();
let hasCustom = false;

t.setup(async () => {
	const fragment = `#version 300 es
		precision highp float;
		in vec2 v_uv;
		uniform sampler2D u_src;
		out vec4 outColor;
		void main() {
			outColor = texture(u_src, v_uv);
		}
	`;

	await t.filters.register('custom-noop', fragment, {});
});

t.draw(() => {
	t.background(6, 9, 20);

	hasCustom = t.filters.has('custom-noop');

	t.push();
	t.char('#');
	t.rotateZ(t.frameCount * 1.5);
	t.charColor(255, 220, 120);
	t.rect(12, 12);
	t.pop();
});

t.mouseClicked(async () => {
	if (hasCustom) {
		t.filters.unregister('custom-noop');
	} else {
		const fragment = `#version 300 es
			precision highp float;
			in vec2 v_uv;
			uniform sampler2D u_src;
			out vec4 outColor;
			void main() {
				outColor = texture(u_src, v_uv);
			}
		`;
		await t.filters.register('custom-noop', fragment, {});
	}
});

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	const isInvert = t.filters.has('invert');

	drawText('FILTERS.HAS', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: CHECK REGISTERED FILTER', x, y++, 100, 220, 255);
	drawText('Performs lookup in filter registry.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`has('invert')     : ${isInvert}`, x, y++, 180, 255, 180);
	drawText(
		`has('custom-noop'): ${hasCustom}`,
		x,
		y++,
		hasCustom ? 180 : 255,
		hasCustom ? 255 : 120,
		hasCustom ? 180 : 120
	);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(hasCustom ? 'Click to unregister.' : 'Click to register custom-noop.', x, y++, 120, 205, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

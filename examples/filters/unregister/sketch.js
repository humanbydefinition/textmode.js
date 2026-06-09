/**
 * @title filters.TextmodeFilterManager.unregister
 */
const t = textmode.create({ pixelDensity: 1, width: window.innerWidth, height: window.innerHeight });

const labelLayer = t.layers.add();
let filterActive = false;

t.setup(async () => {
	const fragment = `#version 300 es
		precision highp float;
		in vec2 v_uv;
		uniform sampler2D u_src;
		out vec4 outColor;
		void main() {
			vec4 col = texture(u_src, v_uv);
			outColor = vec4(col.r * 0.1, col.g * 1.5, col.b * 0.2, col.a);
		}
	`;

	await t.filters.register('green-wash', fragment, {});
	filterActive = true;
});

t.draw(() => {
	t.background(6, 9, 20);

	t.push();
	t.char('#');
	t.rotateZ(t.frameCount * 1.2);
	t.charColor(255, 220, 120);
	t.rect(14, 14);
	t.pop();

	if (filterActive && t.filters.has('green-wash')) {
		t.filter('green-wash');
	}
});

t.mouseClicked(() => {
	if (!filterActive) return;
	t.filters.unregister('green-wash');
	filterActive = false;
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

	const stateStr = filterActive ? 'ACTIVE' : 'INACTIVE';

	drawText('FILTERS.UNREGISTER', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: DISPOSE CUSTOM FILTER', x, y++, 100, 220, 255);
	drawText('Removes registered custom shader.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`FILTER STATE: ${stateStr}`, x, y++, 140, 190, 255);
	drawText(
		filterActive ? 'Click to unregister green-wash.' : 'Filter unregistered successfully.',
		x,
		y++,
		180,
		255,
		180
	);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

/**
 * @title Textmodifier.lightFalloff
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let value = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(6, 8, 18);
	const time = t.frameCount * 0.025;
	value = 0.5 + 0.5 * Math.sin(time);
	t.perspective(58, 0.1, 4096);
	t.camera(16, -10, 42, 0, 0, 0);
	t.lightFalloff(1, value * 0.08, value * 0.01);
	t.pointLight([255, 210, 120], { x: 18, y: -18, z: 28 });
	t.rotateY(time * 40);
	t.char('#');
	t.charColor(140, 220, 255);
	t.sphere(7);
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.LIGHTFALLOFF', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: LIGHT FALLOFF', x, y++, 100, 220, 255);
	drawText('Lighting changes surface shade.', x, y++, 140, 160, 190);
	drawText('Scene keeps focus on one sphere.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`FALLOFF: ${value.toFixed(2)}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

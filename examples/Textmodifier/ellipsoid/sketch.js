/**
 * @title Textmodifier.ellipsoid
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let spin = 0;

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
	spin = (time * 40) % 360;
	t.perspective(58, 0.1, 4096);
	t.camera(18, -10, 42, 0, 0, 0);
	t.ambientLight(24, 28, 38);
	t.pointLight([255, 210, 140], { x: 18, y: -18, z: 28 });
	t.push();
	t.translate(5, 1, 0);
	t.rotateY(spin);
	t.rotateX(18);
	t.char('#');
	t.charColor(140, 220, 255);
	t.cellColor(16, 24, 42);
	t.ellipsoid(8, 5, 6);
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.ELLIPSOID', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: 3D ELLIPSOID', x, y++, 100, 220, 255);
	drawText('Independent X, Y, Z radii.', x, y++, 140, 160, 190);
	drawText('Camera and light reveal depth.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`SPIN: ${spin.toFixed(1)}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

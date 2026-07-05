/**
 * @title Textmodifier.camera
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let eyeX = 0;

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
	eyeX = Math.sin(time) * 24;
	t.perspective(58, 0.1, 4096);
	t.camera(eyeX, 8, 42, 0, 0, 0);
	t.ambientLight(25, 28, 36);
	t.pointLight([255, 210, 140], { x: 20, y: -18, z: 28 });
	t.push();
	t.rotateY(time * 30);
	t.char('#');
	t.charColor(140, 220, 255);
	t.box(8, 8, 8);
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.CAMERA', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: SET VIEW CAMERA', x, y++, 100, 220, 255);
	drawText('Eye position moves left/right.', x, y++, 140, 160, 190);
	drawText('Target remains at origin.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`EYE X: ${eyeX.toFixed(1)}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

/**
 * @title Textmodifier.lookAt
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let targetX = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(6, 8, 18);
	const time = t.frameCount * 0.03;
	targetX = Math.sin(time) * 10;
	t.perspective(58, 0.1, 4096);
	t.camera(0, 0, 44);
	t.lookAt(targetX, 0, 0);
	t.ambientLight(20, 24, 34);
	t.pointLight([255, 210, 140], { x: 16, y: -16, z: 28 });
	t.push();
	t.translate(targetX, 0, 0);
	t.char('*');
	t.charColor(255, 220, 120);
	t.box(4, 4, 4);
	t.pop();
	t.char('#');
	t.charColor(120, 220, 255);
	t.box(8, 8, 8);
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.LOOKAT', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: AIM CAMERA', x, y++, 100, 220, 255);
	drawText('Camera eye remains fixed.', x, y++, 140, 160, 190);
	drawText('Target slides across X.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`TARGET X: ${targetX.toFixed(1)}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

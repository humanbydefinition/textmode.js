/**
 * @title Textmodifier.ellipse
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let rx = 0;
let ry = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(6, 10, 22);
	const time = t.frameCount * 0.03;
	rx = 10 + Math.sin(time) * 4;
	ry = 5 + Math.cos(time * 0.8) * 2;
	t.push();
	t.translate(8, 1);
	t.char('o');
	t.charColor(140, 220, 255);
	t.cellColor(15, 25, 50);
	t.ellipse(rx, ry);
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.ELLIPSE', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: OVAL PRIMITIVE', x, y++, 100, 220, 255);
	drawText('Radius X and Y animate.', x, y++, 140, 160, 190);
	drawText('The shape stays centered locally.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`RX: ${rx.toFixed(1)}`, x, y++, 140, 255, 180);
	drawText(`RY: ${ry.toFixed(1)}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

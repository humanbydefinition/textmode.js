/**
 * @title Textmodifier.arc
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let startDeg = 0;
let endDeg = 0;

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
	startDeg = (time * 60) % 360;
	endDeg = startDeg + 110 + Math.sin(time) * 35;
	t.push();
	t.translate(8, 1);
	t.char('#');
	t.charColor(140, 180, 255);
	t.arc(22, 12, startDeg, endDeg);
	t.charColor(60, 70, 100);
	t.line(0, 0, Math.cos((startDeg * Math.PI) / 180) * 11, Math.sin((startDeg * Math.PI) / 180) * 6);
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.ARC', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: PARTIAL ELLIPSE', x, y++, 100, 220, 255);
	drawText('Animated start and end angles.', x, y++, 140, 160, 190);
	drawText('Guide line marks the start.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`START: ${startDeg.toFixed(1)}`, x, y++, 255, 210, 120);
	drawText(`END: ${endDeg.toFixed(1)}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

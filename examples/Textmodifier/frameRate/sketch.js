/**
 * @title Textmodifier.frameRate
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let measured = 0;
let target = 60;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(6, 10, 22);
	target = Math.floor(t.frameCount / 180) % 2 === 0 ? 60 : 30;
	t.frameRate(target);
	measured = t.frameRate();
	const bars = Math.round(measured / 5);
	for (let i = 0; i < bars; i++) {
		t.push();
		t.translate(-18 + i, 3);
		t.char('|');
		t.charColor(120, 220, 255);
		t.point();
		t.pop();
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.FRAMERATE', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: FPS CONTROL', x, y++, 100, 220, 255);
	drawText('Target alternates 60 and 30.', x, y++, 140, 160, 190);
	drawText('Bars show measured rate.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`TARGET: ${target}`, x, y++, 140, 255, 180);
	drawText(`FPS: ${measured.toFixed(1)}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

/**
 * @title Textmodifier.resetCamera
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let custom = true;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(6, 8, 18);
	custom = Math.floor(t.frameCount / 120) % 2 === 0;
	if (custom) {
		t.camera(Math.sin(t.frameCount * 0.03) * 20, 10, 38, 0, 0, 0);
	} else {
		t.resetCamera();
	}
	t.char('#');
	t.charColor(140, 220, 255);
	t.rotateY(t.frameCount);
	t.box(8, 8, 8);
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.RESETCAMERA', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: RESTORE CAMERA', x, y++, 100, 220, 255);
	drawText('Alternates custom and reset.', x, y++, 140, 160, 190);
	drawText('resetCamera returns auto view.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(custom ? 'MODE: CUSTOM' : 'MODE: RESET', x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

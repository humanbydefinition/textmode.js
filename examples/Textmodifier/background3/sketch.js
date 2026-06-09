/**
 * @title Textmodifier.background3
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let useBlue = false;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	useBlue = Math.floor(t.frameCount / 90) % 2 === 0;
	t.background(useBlue ? '#10183a' : '#301820');
	t.char(useBlue ? 'B' : 'R');
	t.charColor(255, 230, 140);
	t.rect(10, 5);
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.BACKGROUND3', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: HEX BACKGROUND', x, y++, 100, 220, 255);
	drawText('Hex strings set the color.', x, y++, 140, 160, 190);
	drawText('Mode alternates blue and red.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(useBlue ? 'HEX: BLUE' : 'HEX: RED', x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

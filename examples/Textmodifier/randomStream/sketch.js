/**
 * @title Textmodifier.randomStream
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
	seed: 'stream-demo',
});

const labelLayer = t.layers.add();
const leftStream = t.randomStream('left');
const rightStream = t.randomStream('right');
let leftY = 0;
let rightY = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(6, 10, 18);
	if (t.frameCount % 16 === 1) {
		leftY = Math.floor(leftStream.random(-9, 9));
		rightY = Math.floor(rightStream.random(-9, 9));
	}

	t.push();
	t.translate(-8, leftY);
	t.char('L');
	t.charColor(130, 255, 190);
	t.point();
	t.translate(16, rightY - leftY);
	t.char('R');
	t.charColor(255, 190, 130);
	t.point();
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.RANDOMSTREAM', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: NAMED STREAMS', x, y++, 100, 220, 255);
	drawText('Left and right are separate.', x, y++, 140, 160, 190);
	drawText('One stream cannot move another.', x, y++, 140, 160, 190);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

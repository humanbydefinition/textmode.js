/**
 * @title Textmodifier.constrain
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let freeX = 0;
let boundedX = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

function drawPoint(x, y) {
	t.push();
	t.translate(x, y);
	t.point();
	t.pop();
}

function drawBand(x, y, width, height, r, g, b) {
	t.push();
	t.translate(x, y);
	t.char('█');
	t.charColor(r, g, b);
	t.rect(width, height);
	t.pop();
}

t.draw(() => {
	t.background(7, 11, 18);
	const leftRail = -14;
	const rightRail = 14;
	const railWidth = rightRail - leftRail + 1;
	freeX = Math.cos(t.frameCount * 0.035) * 20 + t.mouse.x * 0.18;
	boundedX = t.constrain(freeX, leftRail, rightRail);

	drawBand((leftRail + rightRail) / 2, -7, railWidth, 1, 54, 70, 100);
	drawBand((leftRail + rightRail) / 2, 7, railWidth, 1, 54, 70, 100);
	drawBand(leftRail, 0, 1, 15, 90, 165, 215);
	drawBand(rightRail, 0, 1, 15, 90, 165, 215);

	for (let i = 0; i < 9; i++) {
		const y = -6 + i * 1.5;
		const offset = Math.sin(t.frameCount * 0.04 + i) * 2;
		const x = t.constrain(boundedX + offset, leftRail, rightRail);
		const heat = Math.round(t.constrain(Math.abs(freeX - boundedX) * 20, 0, 255));
		t.char(i % 2 === 0 ? '*' : '+');
		t.charColor(255 - heat * 0.4, 170 + heat * 0.2, 120 + heat * 0.5);
		drawPoint(x, y);
	}

	t.push();
	t.translate(freeX, -9);
	t.char('x');
	t.charColor(255, 95, 95);
	t.point();
	t.pop();

	t.char('.');
	t.charColor(255, 220, 120);
	t.line(freeX, -9, boundedX, -7);
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.CONSTRAIN', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: RANGE SAFETY', x, y++, 100, 220, 255);
	drawText('constrain() keeps motion in bounds.', x, y++, 140, 160, 190);
	drawText('The red target may drift outside.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`FREE X: ${freeX.toFixed(1)}`, x, y++, 255, 150, 120);
	drawText(`SAFE X: ${boundedX.toFixed(1)}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

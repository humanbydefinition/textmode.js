/**
 * @title Textmodifier.beginShape
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let points = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(6, 10, 22);
	const time = t.frameCount * 0.025;
	const spikes = 7;
	const outer = 16 + Math.sin(time) * 2;
	const inner = 6 + Math.cos(time * 1.4) * 1.5;
	points = spikes * 2;

	t.push();
	t.rotateZ(time * 18);
	t.char('*');
	t.charColor(255, 220, 96);
	t.cellColor(24, 16, 4);
	t.lineWeight(1.4);
	t.beginShape();
	for (let i = 0; i < points; i++) {
		const angle = t.radians(i * (360 / points) - 90);
		const radius = i % 2 === 0 ? outer : inner;
		t.vertex(Math.cos(angle) * radius, Math.sin(angle) * radius);
	}
	t.endShape('close');
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.BEGINSHAPE', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: CUSTOM 2D POLYGON', x, y++, 100, 220, 255);
	drawText('Recorded vertices form one loop.', x, y++, 140, 160, 190);
	drawText('Line state is captured per vertex.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`VERTICES: ${points}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

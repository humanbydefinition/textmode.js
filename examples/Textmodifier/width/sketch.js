/**
 * @title Textmodifier.width
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
	t.background(0);

	const width = t.width;
	const info = `WIDTH: ${width}px`;
	const arrowLength = Math.floor(t.grid.cols / 2) - 4;

	for (let i = 0; i < arrowLength; i++) {
		t.push();
		t.translate(-arrowLength + i, 0);
		t.char(i === 0 ? '<' : '-');
		t.charColor(255, 100, 100);
		t.point();
		t.pop();
	}

	for (let i = 0; i < arrowLength; i++) {
		t.push();
		t.translate(arrowLength - i, 0);
		t.char(i === 0 ? '>' : '-');
		t.charColor(255, 100, 100);
		t.point();
		t.pop();
	}

	for (let i = 0; i < info.length; i++) {
		t.push();
		t.translate(i - info.length / 2, 0);
		t.char(info[i]);
		t.charColor(255);
		t.point();
		t.pop();
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

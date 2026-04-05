/**
 * @title Textmodifier.height
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
	t.background(0);

	const height = t.height;
	const info = `HEIGHT: ${height}px`;
	const arrowLength = Math.floor(t.grid.rows / 2) - 3;

	for (let i = 0; i < arrowLength; i++) {
		t.push();
		t.translate(0, -arrowLength + i);
		t.char(i === 0 ? '╩' : '|');
		t.charColor(100, 255, 100);
		t.point();
		t.pop();
	}

	for (let i = 0; i < arrowLength; i++) {
		t.push();
		t.translate(0, arrowLength - i);
		t.char(i === 0 ? '╚' : '|');
		t.charColor(100, 255, 100);
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

/**
 * @title Textmodifier.layers
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

const topLayer = t.layers.add();

t.draw(() => {
	t.background(0);

	t.push();
	t.rotateZ(t.frameCount);
	t.char('▼');
	t.charColor(50, 100, 150);
	t.rect(40, 40);
	t.pop();
});

topLayer.draw(() => {
	t.clear();

	const time = t.frameCount * 0.05;
	const x = Math.sin(time) * 10;

	t.push();
	t.char('æ');
	t.charColor(255, 200, 0);
	t.cellColor(0, 0, 0, 0);
	t.translate(x, 0);
	t.point();
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

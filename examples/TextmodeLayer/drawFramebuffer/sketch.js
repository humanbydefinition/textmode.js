/**
 * @title TextmodeLayer.drawFramebuffer
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });
const stamp = t.layers.add();

stamp.draw(() => {
	t.clear();
	t.rotateZ(t.frameCount * 2);
	t.char('#');
	t.charColor(255, 180, 120);
	t.rect(14, 8);
});

t.draw(() => {
	const raw = stamp.drawFramebuffer;
	t.background(8, 10, 18);
	if (raw) t.image(raw, 20, 12);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

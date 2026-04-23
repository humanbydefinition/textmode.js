/**
 * @title TextmodeLayer.asciiFramebuffer
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });
const stamp = t.layers.add({ blendMode: 'screen' });

stamp.draw(() => {
	t.clear();
	t.rotateZ(t.frameCount * 2);
	t.char('*');
	t.charColor(120, 220, 255);
	t.rect(14, 8);
});

t.draw(() => {
	t.background(8, 10, 18);
	if (stamp.asciiFramebuffer) t.image(stamp.asciiFramebuffer, 20, 12);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

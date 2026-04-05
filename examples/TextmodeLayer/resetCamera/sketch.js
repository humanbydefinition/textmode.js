/**
 * @title TextmodeLayer.resetCamera
 * @author codex
 */
const t = textmode.create({ width: 640, height: 480, fontSize: 16 });
const scene = t.layers.add();
let custom = true;

t.mousePressed(() => {
	custom = !custom;
});

t.draw(() => {
	t.background(8, 10, 18);
	if (custom) {
		scene.camera(Math.sin(t.frameCount * 0.03) * 18, 8, 42);
	} else {
		scene.resetCamera();
	}
});

scene.draw(() => {
	t.clear();
	t.rotateY(t.frameCount * 2);
	t.char('*');
	t.charColor(custom ? 255 : 120, 220, 255);
	t.box(16, 16, 16);
});

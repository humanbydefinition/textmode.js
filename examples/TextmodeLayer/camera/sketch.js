/**
 * @title TextmodeLayer.camera
 * @author codex
 */
const t = textmode.create({ width: 640, height: 480, fontSize: 16 });
const scene = t.layers.add();

t.draw(() => {
	t.background(8, 10, 18);
	scene.camera(Math.sin(t.frameCount * 0.03) * 18, 10, 42, 0, 0, 0);
});

scene.draw(() => {
	t.clear();
	t.rotateY(t.frameCount * 2);
	t.rotateX(25);
	t.char('#');
	t.charColor(120, 220, 255);
	t.box(16, 16, 16);
});

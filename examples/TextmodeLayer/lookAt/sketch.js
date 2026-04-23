/**
 * @title TextmodeLayer.lookAt
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });
const scene = t.layers.add();

t.draw(() => {
	const x = Math.sin(t.frameCount * 0.04) * 8;
	const y = Math.cos(t.frameCount * 0.03) * 5;
	t.background(8, 10, 18);
	scene.camera(0, 0, 46);
	scene.lookAt(x, y, 0);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

scene.draw(() => {
	t.clear();
	t.push();
	t.translate(Math.sin(t.frameCount * 0.04) * 8, Math.cos(t.frameCount * 0.03) * 5, 0);
	t.char('*');
	t.charColor(255, 220, 120);
	t.box(4, 4, 4);
	t.pop();

	t.rotateY(t.frameCount * 2);
	t.char('#');
	t.charColor(120, 220, 255);
	t.box(12, 12, 12);
});

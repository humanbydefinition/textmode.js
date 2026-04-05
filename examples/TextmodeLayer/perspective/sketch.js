/**
 * @title TextmodeLayer.perspective
 * @author codex
 */
const t = textmode.create({ width: 640, height: 480, fontSize: 16 });
const scene = t.layers.add();

t.draw(() => {
	const fov = 30 + ((Math.sin(t.frameCount * 0.03) + 1) * 0.5) * 70;
	t.background(8, 10, 18);
	scene.perspective(fov, 0.1, 256);
	scene.camera(0, 0, 44);
});

scene.draw(() => {
	for (let i = 0; i < 3; i++) {
		t.push();
		t.translate((i - 1) * 10, 0, i * -12);
		t.rotateY(t.frameCount * 2 + i * 20);
		t.char('#');
		t.charColor(120 + i * 40, 220, 255);
		t.box(8, 8, 8);
		t.pop();
	}
});

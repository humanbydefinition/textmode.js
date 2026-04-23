/**
 * @title TextmodeLayer.createCamera
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });
const scene = t.layers.add();
let camera;

t.setup(() => {
	camera = scene.createCamera();
	scene.setCamera(camera);
});

t.draw(() => {
	t.background(8, 10, 18);
	camera.setPosition(Math.sin(t.frameCount * 0.03) * 18, 8, 46);
	camera.lookAt(0, 0, 0);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

scene.draw(() => {
	t.clear();
	t.rotateY(t.frameCount * 2);
	t.rotateX(20);
	t.char('#');
	t.charColor(120, 220, 255);
	t.box(16, 16, 16);
});

/**
 * @title TextmodeLayer.setCamera
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });
const scene = t.layers.add();
let useLeft = true;
let left;
let right;

t.setup(() => {
	left = scene.createCamera();
	right = scene.createCamera();
	left.setPosition(-18, 10, 38);
	right.setPosition(18, 10, 38);
	left.lookAt(0, 0, 0);
	right.lookAt(0, 0, 0);
	scene.setCamera(left);
});

t.mousePressed(() => {
	useLeft = !useLeft;
	scene.setCamera(useLeft ? left : right);
});

t.draw(() => {
	t.background(8, 10, 18);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

scene.draw(() => {
	t.clear();
	t.rotateY(t.frameCount * 2);
	t.char('@');
	t.charColor(useLeft ? 255 : 120, 220, useLeft ? 120 : 255);
	t.box(16, 16, 16);
});

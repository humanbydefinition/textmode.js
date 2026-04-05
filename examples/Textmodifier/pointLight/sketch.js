/**
 * @title Textmodifier.pointLight
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 8,
	frameRate: 60,
});

const orbitLights = [
	{ color: [255, 120, 90], radius: 22, lift: 10, speed: 0.8, phase: 0 },
	{ color: [255, 220, 90], radius: 18, lift: 8, speed: -1.05, phase: Math.PI * 0.4 },
	{ color: [100, 220, 255], radius: 24, lift: 12, speed: 0.62, phase: Math.PI * 0.8 },
	{ color: [120, 255, 170], radius: 16, lift: 9, speed: -0.9, phase: Math.PI * 1.2 },
	{ color: [190, 120, 255], radius: 20, lift: 7, speed: 1.2, phase: Math.PI * 1.6 },
];

t.draw(() => {
	const time = t.frameCount * 0.02;

	t.background(2, 4, 10);
	t.ambientLight(20, 20, 28);
	t.lightFalloff(1, 0.018, 0.0009);
	t.camera(Math.sin(time * 0.28) * 22, -6 + Math.sin(time * 0.21) * 8, 118, 0, 0, 0);

	for (let i = 0; i < orbitLights.length; i++) {
		const light = orbitLights[i];
		const angle = time * light.speed * 0.1 * Math.PI * 2 + light.phase;

		t.pointLight(light.color, {
			x: Math.cos(angle) * light.radius,
			y: Math.sin(angle * 1.7) * light.lift,
			z: Math.sin(angle) * light.radius,
		});
	}

	t.push();
	t.rotateX(18);
	t.rotateY(time * 28);

	for (let i = 0; i < 6; i++) {
		t.push();
		t.rotateY(i * 60 + time * 12);
		t.translate(14, Math.sin(time * 2 + i) * 2, 0);
		t.rotateX(time * 40 + i * 25);
		t.char(i % 2 === 0 ? 'X' : 'H');
		t.charColor(120 + i * 18, 130 + (i % 3) * 30, 255 - i * 16);
		t.cellColor(16 + i * 6, 18 + i * 4, 28 + i * 3);
		t.box(4, 12, 4);
		t.pop();
	}

	t.push();
	t.rotateY(-time * 55);
	t.char('@');
	t.charColor(245, 245, 255);
	t.cellColor(20, 22, 32);
	t.sphere(5.5);
	t.pop();

	t.push();
	t.translate(0, 0, 0);
	t.rotateX(90);
	t.rotateY(time * 48);
	t.char('*');
	t.charColor(220, 230, 255);
	t.cellColor(18, 20, 32);
	t.torus(12, 2.2);
	t.pop();

	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

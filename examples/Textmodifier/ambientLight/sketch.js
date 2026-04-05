/**
 * @title Textmodifier.ambientLight
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 8,
	frameRate: 60,
});

const spires = [];

for (let x = -3; x <= 3; x++) {
	for (let z = -3; z <= 3; z++) {
		if (Math.abs(x) + Math.abs(z) > 5) {
			continue;
		}

		spires.push({
			x,
			z,
			phase: (x + 3) * 0.7 + (z + 3) * 1.1,
		});
	}
}

t.draw(() => {
	const time = t.frameCount * 0.02;
	const ember = 78 + 42 * Math.sin(time * 0.9);
	const tide = 56 + 38 * Math.cos(time * 0.7);
	const bloom = 44 + 30 * Math.sin(time * 1.4 + 0.6);

	t.background(3, 6, 14);

	t.ambientLight(24, 24, 30);
	t.ambientLight(ember, 42, 18);
	t.ambientLight(14, bloom, tide);

	t.camera(Math.sin(time * 0.45) * 28, -10 + Math.cos(time * 0.3) * 6, 120, 0, -6, 0);

	t.push();
	t.rotateX(18);
	t.rotateY(time * 16);

	for (let i = 0; i < spires.length; i++) {
		const spire = spires[i];
		const pulse = 0.5 + 0.5 * Math.sin(time * 1.6 + spire.phase);
		const height = 6 + pulse * 10;
		const drift = Math.sin(time * 2.1 + spire.phase * 1.3) * 1.5;

		t.push();
		t.translate(spire.x * 8, drift - height * 0.5, spire.z * 8);
		t.rotateY(time * 30 + spire.phase * 50);
		t.char(i % 2 === 0 ? '#' : 'H');
		t.charColor(120 + pulse * 100, 80 + pulse * 60, 170 + pulse * 70);
		t.cellColor(12 + pulse * 20, 10 + pulse * 14, 20 + pulse * 24);
		t.box(4, height, 4);
		t.pop();
	}

	t.push();
	t.translate(0, -3 + Math.sin(time * 2) * 1.2, 0);
	t.rotateX(90 + Math.sin(time * 1.3) * 12);
	t.rotateY(time * 42);
	t.char('*');
	t.charColor(255, 220, 180);
	t.cellColor(30, 18, 22);
	t.torus(11, 2.6);
	t.pop();

	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

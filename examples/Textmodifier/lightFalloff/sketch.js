/**
 * @title Textmodifier.lightFalloff
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 10,
	frameRate: 60,
});

function drawBeacon(x, y, z, size, glyph, colors, spin) {
	t.push();
	t.translate(x, y, z);
	t.rotateX(20 + spin * 0.4);
	t.rotateY(spin);
	t.char(glyph);
	t.charColor(colors[0], colors[1], colors[2]);
	t.cellColor(colors[0] * 0.15, colors[1] * 0.12, colors[2] * 0.16);
	t.box(size, size * 1.8, size);
	t.pop();
}

t.draw(() => {
	const time = t.frameCount * 0.02;
	const focus = 0.5 + 0.5 * Math.sin(time * 0.9);
	const linear = 0.01 + (1 - focus) * 0.09;
	const quadratic = 0.0006 + (1 - focus) * 0.0065;
	const lightPosition = {
		x: Math.sin(time * 1.3) * 18,
		y: -8 + Math.cos(time * 1.7) * 5,
		z: 28 * Math.cos(time * 0.55),
	};

	t.background(3, 4, 10);
	t.ambientLight(12, 14, 18);
	t.lightFalloff(1, linear, quadratic);
	t.pointLight('#7ae7ff', lightPosition);
	t.pointLight([255, 170, 80], {
		x: -lightPosition.x * 0.55,
		y: lightPosition.y * 0.6,
		z: -lightPosition.z * 0.35,
	});

	t.camera(0, -10, 132, 0, -4, -34);

	t.push();
	t.rotateX(12);

	for (let i = 0; i < 11; i++) {
		const z = 24 - i * 14;
		const breath = Math.sin(time * 1.4 + i * 0.45);
		const pillarHeight = 9 + i * 0.45 + (breath * 0.5 + 0.5) * 3;
		const roofY = -pillarHeight * 0.5 - 3;
		const floorY = 12;

		t.push();
		t.translate(0, floorY, z);
		t.char('=');
		t.charColor(50, 80, 120);
		t.cellColor(8, 12, 18);
		t.box(28, 1, 8);
		t.pop();

		drawBeacon(-11, 12 - pillarHeight * 0.5, z, 2.6, 'H', [70, 190, 255], time * 40 + i * 18);
		drawBeacon(11, 12 - pillarHeight * 0.5, z, 2.6, 'H', [255, 150, 90], -time * 36 - i * 20);

		t.push();
		t.translate(0, roofY, z);
		t.rotateZ(Math.sin(time * 1.1 + i * 0.3) * 4);
		t.char('-');
		t.charColor(180, 210, 255);
		t.cellColor(20, 28, 38);
		t.box(22, 2, 2);
		t.pop();

		t.push();
		t.translate(Math.sin(time * 1.2 + i) * 4, roofY - 2.6, z);
		t.rotateY(time * 60 + i * 24);
		t.char('o');
		t.charColor(230, 240, 255);
		t.cellColor(16, 20, 30);
		t.sphere(1.4 + (focus * 0.5 + 0.5) * 0.4);
		t.pop();
	}

	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

/**
 * @title Textmodifier.noLights
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 8,
	frameRate: 60,
});

function drawReactorCluster(centerX, time, mode) {
	const armColors =
		mode === 'lit'
			? [
					[255, 170, 110],
					[110, 190, 255],
					[180, 120, 255],
				]
			: [
					[255, 120, 120],
					[120, 220, 160],
					[120, 190, 255],
				];

	t.push();
	t.translate(centerX, 0, 0);
	t.rotateX(18);
	t.rotateY(time * 24);

	t.push();
	t.rotateY(time * 55);
	t.char(mode === 'lit' ? '@' : '#');
	t.charColor(255, 235, 180);
	t.cellColor(28, 20, 24);
	t.sphere(4.8);
	t.pop();

	for (let i = 0; i < 3; i++) {
		const orbit = i * 120 + time * 40;

		t.push();
		t.rotateY(orbit);
		t.translate(15, Math.sin(time * 2 + i) * 3, 0);
		t.rotateX(time * 70 + i * 40);
		t.rotateZ(time * 45 + i * 25);
		t.char(mode === 'lit' ? 'X' : '+');
		t.charColor(armColors[i][0], armColors[i][1], armColors[i][2]);
		t.cellColor(armColors[i][0] * 0.12, armColors[i][1] * 0.12, armColors[i][2] * 0.14);
		t.box(4, 12, 4);
		t.pop();
	}

	t.push();
	t.translate(0, -9 + Math.sin(time * 1.6) * 2, 0);
	t.rotateX(90);
	t.rotateY(-time * 50);
	t.char(mode === 'lit' ? '*' : '=');
	t.charColor(220, 240, 255);
	t.cellColor(16, 18, 28);
	t.torus(12, 2.2);
	t.pop();

	t.pop();
}

t.draw(() => {
	const time = t.frameCount * 0.02;
	const leftX = -24;

	t.background(4, 5, 12);
	t.camera(0, -6, 118, 0, -2, 0);

	t.ambientLight(28, 30, 40);
	t.lightFalloff(1, 0.025, 0.001);
	t.pointLight([255, 170, 100], {
		x: leftX + Math.cos(time * 1.1) * 18,
		y: -10 + Math.sin(time * 1.7) * 6,
		z: Math.sin(time * 1.1) * 18,
	});
	t.pointLight([90, 180, 255], {
		x: leftX + Math.cos(time * 1.4 + Math.PI) * 16,
		y: 8 + Math.cos(time * 1.3) * 4,
		z: Math.sin(time * 1.4 + Math.PI) * 16,
	});
	drawReactorCluster(leftX, time, 'lit');

	t.noLights();
	drawReactorCluster(24, time, 'flat');
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

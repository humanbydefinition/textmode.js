/**
 * @title TextmodeLayer.lookAt
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const scene = t.layers.add();
const labelLayer = t.layers.add();
const target = { x: 0, y: 0, z: 0 };

t.draw(() => {
	t.background(8, 22, 46);
	const time = t.frameCount * 0.03;
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);

	target.x = isFinite(t.mouse.x) ? t.mouse.x * 0.7 : Math.sin(time * 1.4) * 15;
	target.y = isFinite(t.mouse.y) ? t.mouse.y * 0.6 : Math.cos(time * 1.1) * 9;
	target.z = Math.sin(time * 0.9) * 6;

	scene.camera(0, 0, 46);
	scene.lookAt(target.x, target.y, target.z);

	t.push();
	t.charColor(30, 65, 120);
	for (let y = -hh + (hh % 4); y <= hh; y += 4) {
		for (let x = -hw + (hw % 8); x <= hw; x += 8) {
			if (x < -hw + 38 && y < -hh + 10) continue;
			t.print('+', x, y);
		}
	}
	t.pop();
});

scene.draw(() => {
	t.clear();
	t.pointLight([140, 200, 255], { x: 0, y: -20, z: 30 });

	const pillars = [
		[-16, 0, -12, 100, 160, 240],
		[16, 0, -12, 100, 160, 240],
		[0, -10, -14, 60, 120, 200],
		[0, 10, -14, 60, 120, 200],
	];
	for (const [px, py, pz, r, g, b] of pillars) {
		t.push();
		t.translate(px, py, pz);
		t.char('#');
		t.charColor(r, g, b);
		t.box(5, 12, 5);
		t.pop();
	}

	const time = t.frameCount * 0.04;
	t.push();
	t.rotateY(time * 30);
	t.rotateX(time * 20);
	t.charColor(120, 195, 255);
	t.char(':');
	t.box(16, 16, 1);
	t.pop();

	t.push();
	t.translate(target.x, target.y, target.z);
	t.char('*');
	t.charColor(240, 248, 255);
	t.box(4, 4, 4);
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2) + 2;
	const top = -Math.floor(t.grid.rows / 2) + 2;

	t.push();
	t.printAlign('left', 'top');
	t.cellColor(8, 22, 46, 240);
	t.charColor(120, 195, 255);
	t.print('TEXTMODELAYER.LOOKAT', left, top);
	t.charColor(45, 95, 165);
	t.print('------------------------------------', left, top + 1);
	t.charColor(240, 248, 255);
	t.print('CONCEPT: CAMERA TRACKING GAZE', left, top + 2);
	t.charColor(150, 195, 235);
	t.print('lookAt updates view target vector.', left, top + 3);
	t.charColor(120, 195, 255);
	t.print('EYE:    [0.0, 0.0, 46.0]', left, top + 4);
	t.print(`TARGET: [${target.x.toFixed(1)}, ${target.y.toFixed(1)}, ${target.z.toFixed(1)}]`, left, top + 5);
	t.charColor(240, 248, 255);
	t.print('MOVE MOUSE TO AIM TRACKING TARGET', left, top + 6);
	t.pop();
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));

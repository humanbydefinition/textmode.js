/**
 * @title TextmodeLayer.perspective
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const scene = t.layers.add();
const labelLayer = t.layers.add();

let fov = 60;

t.draw(() => {
	t.background(18, 12, 6);
	const time = t.frameCount * 0.03;
	const idleFov = 60 + Math.sin(time) * 35;
	fov = isFinite(t.mouse.y) ? Math.min(100, Math.max(25, 60 + t.mouse.y * 1.8)) : idleFov;

	scene.perspective(fov, 0.1, 256);
	scene.camera(0, -2, 40);
	scene.lookAt(0, 4, -20);
});

scene.draw(() => {
	t.clear();
	t.pointLight([255, 200, 110], { x: 0, y: -25, z: 20 });
	const time = t.frameCount * 0.02;

	// Tunnel archways receding into the distance
	for (const z of [10, 0, -10, -20, -30, -40, -50]) {
		const pulse = Math.sin(time + z * 0.08) * 0.5 + 0.5;
		t.push();
		t.translate(0, 6, z);
		t.char('#');
		t.charColor(Math.floor(160 + pulse * 75), Math.floor(90 + pulse * 60), Math.floor(20 + pulse * 20));
		t.translate(-14, 0, 0);
		t.box(2, 14, 2);
		t.translate(28, 0, 0);
		t.box(2, 14, 2);
		t.translate(-14, -7, 0);
		t.box(30, 2, 2);
		t.pop();
	}

	// Depth markers at near, mid, and far depths
	const markers = [
		[0, 7, 6, 5, '█', [255, 220, 130]],
		[0, 5, -18, 7, '▓', [230, 150, 40]],
		[0, 3, -44, 9, '▒', [170, 95, 25]],
	];
	for (const [mx, my, mz, sz, ch, col] of markers) {
		t.push();
		t.translate(mx, my, mz);
		t.rotateY(time * 40 + mz);
		t.rotateX(time * 25);
		t.char(ch);
		t.charColor(col[0], col[1], col[2]);
		t.box(sz, sz, sz);
		t.pop();
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2) + 2;
	const top = -Math.floor(t.grid.rows / 2) + 2;
	const lens = fov < 40 ? 'TELEPHOTO' : fov > 75 ? 'WIDE' : 'NORMAL';

	t.push();
	t.printAlign('left', 'top');
	t.cellColor(18, 12, 6, 240);
	t.charColor(255, 180, 50);
	t.print('TEXTMODELAYER.PERSPECTIVE', left, top);
	t.charColor(160, 90, 20);
	t.print('------------------------------------', left, top + 1);
	t.charColor(255, 230, 150);
	t.print('CONCEPT: FIELD OF VIEW & DEPTH', left, top + 2);
	t.charColor(220, 160, 80);
	t.print('perspective sets projection FOV.', left, top + 3);
	t.print('Wide: deep depth. Tele: flat.', left, top + 4);
	t.charColor(255, 180, 50);
	t.print(`FOV:  ${fov.toFixed(1)} deg [${lens}]`, left, top + 5);
	t.print('CLIP: NEAR 0.1 | FAR 256.0', left, top + 6);
	t.charColor(255, 230, 150);
	t.print('MOVE MOUSE Y TO SCRUB FOV', left, top + 7);
	t.pop();
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));

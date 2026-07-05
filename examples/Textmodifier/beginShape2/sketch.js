/**
 * @title Textmodifier.beginShape2
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let spin = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

function pyramid(size, height) {
	const half = size * 0.5;
	const top = [0, -height * 0.55, 0];
	const baseY = height * 0.35;
	const corners = [
		[-half, baseY, -half],
		[half, baseY, -half],
		[half, baseY, half],
		[-half, baseY, half],
	];

	t.beginShape(t.TRIANGLES);
	for (let i = 0; i < corners.length; i++) {
		const next = corners[(i + 1) % corners.length];
		const shade = 120 + i * 32;
		t.charColor(shade, 220, 255);
		t.vertex(top[0], top[1], top[2]);
		t.vertex(corners[i][0], corners[i][1], corners[i][2]);
		t.vertex(next[0], next[1], next[2]);
	}

	t.charColor(255, 210, 120);
	t.vertex(corners[0][0], corners[0][1], corners[0][2]);
	t.vertex(corners[1][0], corners[1][1], corners[1][2]);
	t.vertex(corners[2][0], corners[2][1], corners[2][2]);
	t.vertex(corners[0][0], corners[0][1], corners[0][2]);
	t.vertex(corners[2][0], corners[2][1], corners[2][2]);
	t.vertex(corners[3][0], corners[3][1], corners[3][2]);
	t.endShape();
}

t.draw(() => {
	t.background(5, 8, 18);
	const time = t.frameCount * 0.025;
	spin = (time * 42) % 360;

	t.perspective(58, 0.1, 4096);
	t.camera(18, -12, 44, 0, 0, 0);
	t.ambientLight(18, 24, 34);
	t.pointLight([255, 240, 180], { x: 18, y: -20, z: 30 });

	t.push();
	t.translate(5, 1, 0);
	t.rotateY(spin);
	t.rotateX(18);
	t.char('#');
	t.cellColor(10, 20, 38);
	pyramid(14, 12);
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.BEGINSHAPE2', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: CUSTOM 3D MESH', x, y++, 100, 220, 255);
	drawText('vertex(x, y, z) builds faces.', x, y++, 140, 160, 190);
	drawText('Camera rotation reveals depth.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`SPIN: ${spin.toFixed(1)}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

/**
 * @title Textmodifier.ellipsoid
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 8, // Higher resolution for 3D geometry
});

function drawCenteredText(text, row, rgb = [240, 245, 255]) {
	t.push();
	t.translate(-Math.floor(text.length / 2), row);
	t.charColor(rgb[0], rgb[1], rgb[2]);
	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}
	t.pop();
}

t.draw(() => {
	t.background(6, 10, 22);
	t.ambientLight(30, 35, 50);
	t.pointLight([255, 200, 150], { x: 30, y: -20, z: 40 });

	const time = t.secs;

	const rx = 15 + Math.sin(time * 1.2) * 5;
	const ry = 10 + Math.cos(time * 1.5) * 4;
	const rz = 20 + Math.sin(time * 0.8) * 8;

	t.push();
	t.rotateY(time * 20);
	t.rotateX(time * 10);

	t.charColor(150, 160, 200);
	t.char('0');
	t.ellipsoid(rx, ry, rz);
	t.pop();

	drawCenteredText('Textmodifier.ellipsoid', -35, [255, 255, 255]);
	drawCenteredText('Draws a 3D ellipsoid with independent radii for X, Y, and Z axes.', -32, [150, 170, 200]);
	drawCenteredText(`t.ellipsoid(${rx.toFixed(1)}, ${ry.toFixed(1)}, ${rz.toFixed(1)})`, 32, [140, 180, 255]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

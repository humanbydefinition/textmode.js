/**
 * @title Textmodifier.ellipsoid
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 8 });

function label(text, y) {
	t.push();
	t.translate(-Math.floor(text.length / 2), y, 0);
	t.charColor(220);
	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}
	t.pop();
}

t.draw(() => {
	const time = t.frameCount * 0.02;
	t.background(5, 6, 16);
	t.ambientLight(18, 22, 28);
	t.pointLight([255, 190, 120], { x: -20, y: -10, z: 24 });
	t.camera(Math.cos(time * 0.35) * 16, -6, 86, 0, 0, 0);

	for (let i = 0; i < 4; i++) {
		t.push();
		t.translate((i - 1.5) * 12, Math.sin(time * 1.6 + i) * 3, -i * 8);
		t.rotateX(time * 34 + i * 15);
		t.rotateY(time * 42 + i * 20);
		t.char(['o', 'O', '0', '@'][i]);
		t.charColor(255 - i * 20, 150 + i * 20, 140 + i * 28);
		t.cellColor(18 + i * 2, 12 + i * 2, 20 + i * 4);
		t.ellipsoid(4 + i * 1.4, 2.5 + i * 0.8, 6 + i * 1.8);
		t.pop();
	}

	label('ellipsoid(radiusX, radiusY, radiusZ)', Math.floor(t.grid.rows / 2) - 3);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

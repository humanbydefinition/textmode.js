/**
 * @title Textmodifier.torus
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
	t.background(5, 5, 15);
	t.ambientLight(22, 20, 28);
	t.pointLight([255, 220, 140], { x: Math.sin(time) * 24, y: -10, z: 18 });
	t.camera(0, -4, 76, 0, 0, 0);

	for (let i = 0; i < 3; i++) {
		t.push();
		t.translate((i - 1) * 14, 0, -i * 8);
		t.rotateX(90 + Math.sin(time * 1.5 + i) * 22);
		t.rotateY(time * (50 + i * 18));
		t.char(['*', '0', '+'][i]);
		t.charColor(255 - i * 30, 180 + i * 20, 140 + i * 35);
		t.cellColor(20 + i * 2, 12 + i * 2, 24 + i * 4);
		t.torus(6 + i * 2.5, 1.5 + i * 0.8);
		t.pop();
	}

	label('torus(radius, tubeRadius)', Math.floor(t.grid.rows / 2) - 3);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

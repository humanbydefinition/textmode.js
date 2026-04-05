/**
 * @title Textmodifier.cone
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
	t.background(5, 7, 16);
	t.ambientLight(20, 22, 26);
	t.pointLight([255, 170, 100], { x: -22, y: -10, z: 18 });
	t.camera(Math.sin(time * 0.3) * 12, -6, 82, 0, 2, 0);

	for (let i = 0; i < 5; i++) {
		t.push();
		t.translate((i - 2) * 10, 4 - Math.sin(time * 1.8 + i) * 3, -i * 4);
		t.rotateZ(Math.sin(time * 1.4 + i) * 10);
		t.rotateY(time * 30 + i * 25);
		t.char(['A', 'V', 'M', 'W', 'Y'][i]);
		t.charColor(255, 140 + i * 18, 110 + i * 20);
		t.cellColor(22 + i * 2, 12 + i * 2, 16 + i * 2);
		t.cone(3 + i * 0.7, 8 + i * 2);
		t.pop();
	}

	label('cone(radius, height)', Math.floor(t.grid.rows / 2) - 3);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

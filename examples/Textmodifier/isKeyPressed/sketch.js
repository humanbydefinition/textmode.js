/**
 * @title Textmodifier.isKeyPressed
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

let x = 0;
let y = 0;
const history = [];

function drawKey(label, key, dx, dy) {
	const active = t.isKeyPressed(key);
	t.push();
	t.translate(dx, dy);

	t.cellColor(active ? [60, 100, 255] : [40, 45, 60]);
	t.rect(3, 3);

	t.charColor(active ? [255, 255, 255] : [150, 160, 180]);
	t.translate(1, 1);
	t.char(label);
	t.point();

	t.pop();
}

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

	const speed = 0.5;
	let moving = false;

	if (t.isKeyPressed('w')) {
		y -= speed;
		moving = true;
	}
	if (t.isKeyPressed('s')) {
		y += speed;
		moving = true;
	}
	if (t.isKeyPressed('a')) {
		x -= speed;
		moving = true;
	}
	if (t.isKeyPressed('d')) {
		x += speed;
		moving = true;
	}

	history.push({ x, y });
	if (history.length > 20) history.shift();

	history.forEach((pos, i) => {
		const alpha = (i / history.length) * 0.5;
		t.push();
		t.translate(pos.x, pos.y);
		t.charColor(100, 150, 255, alpha * 255);
		t.char('·');
		t.point();
		t.pop();
	});

	t.push();
	t.translate(x, y);
	t.char(moving ? '☼' : '○');
	t.charColor(100, 200, 255);
	t.point();
	t.pop();

	drawCenteredText('Textmodifier.isKeyPressed', -12, [255, 255, 255]);
	drawCenteredText('Returns true if the specified key is currently held down.', -10, [150, 170, 200]);
	drawCenteredText('Use for continuous movement or real-time state checks.', -9, [150, 170, 200]);

	t.push();
	t.translate(0, 8);
	drawKey('W', 'w', -1, -4);
	drawKey('A', 'a', -5, 0);
	drawKey('S', 's', -1, 0);
	drawKey('D', 'd', 3, 0);
	t.pop();

	drawCenteredText('Press WASD to move the player', 14, [100, 255, 150]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

/**
 * @title Textmodifier.rotateGesture
 * @description Rotation gesture compass: twist with two fingers, or drag/scroll on desktop, to steer a kinetic ASCII instrument.
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

let rotation = 0;
let targetRotation = 0;
let dragStartX = 0;
let dragStartRotation = 0;
let dragging = false;

t.rotateGesture((data) => {
	addRotation(data.deltaRotation);
});

t.mousePressed(() => {
	if (!t.mouse) return;
	dragging = true;
	dragStartX = t.mouse.x;
	dragStartRotation = targetRotation;
});

t.mouseReleased(() => {
	dragging = false;
});

t.mouseDragged(() => {
	if (!dragging || !t.mouse) return;
	const nextRotation = dragStartRotation + (t.mouse.x - dragStartX) * 3;
	if (Number.isFinite(nextRotation)) {
		targetRotation = nextRotation;
	}
});

t.mouseScrolled((data) => {
	addRotation((data.delta?.y ?? 0) * 0.08);
});

t.draw(() => {
	t.background(5, 8, 14);
	if (!Number.isFinite(rotation) || !Number.isFinite(targetRotation)) {
		rotation = 0;
		targetRotation = 0;
	}
	rotation += (targetRotation - rotation) * 0.12;

	const rows = t.grid.rows;
	const top = -Math.floor(rows / 2) + 4;

	drawText('rotate gesture compass', 0, top, [235, 240, 250]);
	drawText('twist on touch, or drag/scroll horizontally on desktop', 0, top + 2, [130, 150, 180]);
	drawText(`rotation ${Math.round(rotation)} deg`, 0, Math.floor(rows / 2) - 4, [255, 210, 110]);

	for (let ring = 0; ring < 5; ring++) {
		const points = 20 + ring * 8;
		const radius = 5 + ring * 4;

		for (let i = 0; i < points; i++) {
			const angle = (i / points) * Math.PI * 2 + rotation * 0.017 + ring * 0.35;
			t.push();
			t.translate(Math.cos(angle) * radius * 1.65, Math.sin(angle) * radius);
			t.char(['.', ':', '+', '*', '#'][ring]);
			t.charColor(70 + ring * 35, 120 + ring * 18, 220 - ring * 16, 115 + ring * 22);
			t.point();
			t.pop();
		}
	}

	t.push();
	t.rotateZ(rotation);
	t.char('*');
	t.charColor(100, 255, 200);
	t.rect(18, 18);

	for (let i = 0; i < 8; i++) {
		const angle = (i / 8) * Math.PI * 2;
		t.push();
		t.translate(Math.cos(angle) * 18 * 1.6, Math.sin(angle) * 18);
		t.rotateZ(-rotation * 1.5);
		t.char(i % 2 === 0 ? '>' : '|');
		t.charColor(255, 150 + i * 8, 90);
		t.rect(3, 3);
		t.pop();
	}

	t.pop();
});

function addRotation(delta) {
	if (Number.isFinite(delta)) {
		targetRotation += delta;
	}
}

function drawText(text, x, y, color) {
	t.push();
	t.translate(x - Math.floor(text.length / 2), y);
	t.charColor(color[0], color[1], color[2]);

	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}

	t.pop();
}

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

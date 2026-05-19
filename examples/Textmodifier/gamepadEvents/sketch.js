/**
 * @title Textmodifier.gamepadEvents
 * @description Event-driven gamepad monitor: connect a controller to see button, axis, and connection events become a live textmode signal board.
 * @author humanbydefinition
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const MAX_LOG = 28;
const log = [];
let pulse = 0;

function pushLog(tag, text, r, g, b) {
	log.unshift({ tag, text, r, g, b, age: 0 });
	if (log.length > MAX_LOG) log.length = MAX_LOG;
}

function drawText(text, x, y, r = 220, g = r, b = r, a = 255) {
	t.push();
	t.translate(x, y);
	t.charColor(r, g, b, a);

	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}

	t.pop();
}

t.on('gamepadConnected', (data) => {
	pushLog('CONN', `slot ${data.gamepad.index} connected - ${data.gamepad.id.slice(0, 36)}`, 80, 220, 120);
});

t.on('gamepadDisconnected', (data) => {
	pushLog('DISC', `slot ${data.gamepad.index} disconnected`, 220, 80, 80);
});

t.on('gamepadButtonPressed', (data) => {
	const name = data.standardButtonName || `btn[${data.buttonIndex}]`;
	const val = data.button.value.toFixed(2);
	pushLog('PRESS', `slot ${data.gamepad.index}  ${name}  val:${val}`, 255, 200, 60);
});

t.on('gamepadButtonReleased', (data) => {
	const name = data.standardButtonName || `btn[${data.buttonIndex}]`;
	pushLog('REL', `slot ${data.gamepad.index}  ${name}`, 120, 160, 255);
});

t.on('gamepadAxisChanged', (data) => {
	const name = data.standardAxisName || `axis[${data.axisIndex}]`;
	const val = (data.value >= 0 ? '+' : '') + data.value.toFixed(2);
	const delta = (data.delta >= 0 ? '+' : '') + data.delta.toFixed(3);
	pushLog('AXIS', `slot ${data.gamepad.index}  ${name}  ${val}  d:${delta}`, 180, 220, 255);
});

t.draw(() => {
	t.background(4, 6, 12);

	const cols = t.grid.cols;
	const rows = t.grid.rows;
	const left = -Math.floor(cols / 2) + 4;
	const top = -Math.floor(rows / 2) + 3;
	const bottom = Math.floor(rows / 2) - 3;
	pulse += 0.04 + t.gamepads.length * 0.02;

	for (let ring = 0; ring < 6; ring++) {
		const points = 24 + ring * 8;
		const radius = 4 + ring * 3 + Math.sin(pulse + ring) * 0.8;

		for (let i = 0; i < points; i++) {
			const angle = (i / points) * Math.PI * 2 + pulse * (0.18 + ring * 0.025);
			const flicker = 0.5 + 0.5 * Math.sin(pulse * 3 + i * 0.7 + ring);

			t.push();
			t.translate(Math.cos(angle) * radius * 1.65, Math.sin(angle) * radius);
			t.char(['.', ':', '+', '*', 'o', '@'][ring]);
			t.charColor(50 + ring * 28, 110 + flicker * 100, 190 + ring * 8, 70 + flicker * 100);
			t.point();
			t.pop();
		}
	}

	drawText('gamepad events', left, top, 255, 255, 255);
	drawText('connect a controller, press buttons, tilt sticks', left, top + 2, 140, 170, 190);
	drawText(`connected: ${t.gamepads.length}`, left, top + 4, 160, 220, 160);

	drawText('event log', left, top + 7, 220, 220, 220);
	drawText('-----------------------------------------------------', left, top + 8, 60, 70, 90);

	for (let i = 0; i < log.length; i++) {
		const entry = log[i];
		entry.age++;
		const fade = Math.max(0.25, 1 - entry.age / 300);
		const a = Math.round(255 * fade);
		const tag = (entry.tag + '     ').slice(0, 5);

		drawText(`${tag} ${entry.text}`, left, top + 9 + i, entry.r, entry.g, entry.b, a);
	}

	if (log.length === 0) {
		drawText('waiting for events...', left, top + 9, 100, 120, 150);
	}

	drawText('buttons and axes emit named events when standard mappings are available', left, bottom, 110, 130, 155);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

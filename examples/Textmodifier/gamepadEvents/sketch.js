/**
 * @title Textmodifier.gamepadEvents
 * @description Event-driven gamepad: visualize press, release, and axis change events with a scrolling log.
 * @author humanbydefinition
 */
const t = textmode.create({ width: 960, height: 640, fontSize: 16 });

const MAX_LOG = 28;
const log = [];

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

// Connection events
t.on('gamepadConnected', (data) => {
	pushLog('CONN', `slot ${data.gamepad.index} connected — ${data.gamepad.id.slice(0, 36)}`, 80, 220, 120);
});

t.on('gamepadDisconnected', (data) => {
	pushLog('DISC', `slot ${data.gamepad.index} disconnected`, 220, 80, 80);
});

// Button events
t.on('gamepadButtonPressed', (data) => {
	const name = data.standardButtonName || `btn[${data.buttonIndex}]`;
	const val = data.button.value.toFixed(2);
	pushLog('PRESS', `slot ${data.gamepad.index}  ${name}  val:${val}`, 255, 200, 60);
});

t.on('gamepadButtonReleased', (data) => {
	const name = data.standardButtonName || `btn[${data.buttonIndex}]`;
	pushLog('REL', `slot ${data.gamepad.index}  ${name}`, 120, 160, 255);
});

// Axis events
t.on('gamepadAxisChanged', (data) => {
	const name = data.standardAxisName || `axis[${data.axisIndex}]`;
	const val = (data.value >= 0 ? '+' : '') + data.value.toFixed(2);
	const delta = (data.delta >= 0 ? '+' : '') + data.delta.toFixed(3);
	pushLog('AXIS', `slot ${data.gamepad.index}  ${name}  ${val}  d:${delta}`, 180, 220, 255);
});

t.draw(() => {
	t.background(0);

	drawText('gamepad events', -28, -18, 255, 255, 255);
	drawText('connect a controller and interact with it', -28, -16, 140, 140, 140);
	drawText(`connected: ${t.gamepads.length}`, -28, -14, 160, 160, 160);

	// Event log
	drawText('event log', -28, -11, 200, 200, 200);
	drawText('-----------------------------------------------------', -28, -10, 60, 60, 60);

	for (let i = 0; i < log.length; i++) {
		const entry = log[i];
		entry.age++;
		const fade = Math.max(0.25, 1 - (entry.age / 300));
		const a = Math.round(255 * fade);
		const tag = (entry.tag + '     ').slice(0, 5);

		drawText(`${tag} ${entry.text}`, -28, -9 + i, entry.r, entry.g, entry.b, a);
	}

	if (log.length === 0) {
		drawText('waiting for events...', -28, -8, 100, 100, 100);
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

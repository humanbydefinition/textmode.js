/**
 * @title Textmodifier.gamepadEvents
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

const events = [];

function pushEvent(text) {
	events.unshift(text);
	if (events.length > 4) events.length = 4;
}

t.on('gamepadConnected', (data) => pushEvent('connect ' + data.gamepad.index));
t.on('gamepadDisconnected', (data) => pushEvent('disconnect ' + data.gamepad.index));
t.on('gamepadButtonPressed', (data) => pushEvent('press ' + data.buttonIndex));
t.on('gamepadAxisChanged', (data) => pushEvent('axis ' + data.axisIndex));

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(4, 6, 12);
	const count = Math.max(1, t.gamepads.length);
	for (let i = 0; i < 16; i++) {
		t.push();
		const angle = (i / 16) * Math.PI * 2 + t.frameCount * 0.03;
		t.translate(Math.cos(angle) * (6 + count), Math.sin(angle) * 4);
		t.char(t.gamepads.length ? '@' : '.');
		t.charColor(80 + i * 8, 180, 255);
		t.point();
		t.pop();
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('TEXTMODIFIER.GAMEPADEVENTS', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: GAMEPAD INPUT', x, y++, 100, 220, 255);
	drawText('Works with browser pads.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	const latest = events[0] || 'waiting';
	drawText(`EVENT: ${latest}`, x, y++, 140, 255, 180);
	drawText(`COUNT: ${events.length}`, x, y++, 180, 200, 220);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

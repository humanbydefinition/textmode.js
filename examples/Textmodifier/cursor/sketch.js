/**
 * @title Textmodifier.cursor
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

// Configuration for the interactive "Hot Zone"
const ZONE_W = 20;
const ZONE_H = 10;

function drawCenteredText(text, y, rgb = [255, 255, 255]) {
	t.push();
	t.translate(-Math.floor(text.length / 2), y);
	t.charColor(rgb[0], rgb[1], rgb[2]);
	t.cellColor(0, 0, 0, 0);

	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}

	t.pop();
}

labelLayer.draw(() => {
	t.clear();

	drawCenteredText('Textmodifier.cursor', -12, [240, 245, 255]);
	drawCenteredText('Updating the system cursor based on grid interaction.', -10, [150, 170, 200]);

	const mx = t.mouse.x === Number.NEGATIVE_INFINITY ? 'OFF' : Math.round(t.mouse.x);
	const my = t.mouse.y === Number.NEGATIVE_INFINITY ? 'OFF' : Math.round(t.mouse.y);

	const halfW = ZONE_W / 2;
	const halfH = ZONE_H / 2;
	const isHovering = t.mouse.x >= -halfW && t.mouse.x < halfW && t.mouse.y >= -halfH && t.mouse.y < halfH;

	drawCenteredText('INTERACTION MONITOR', 8, [140, 255, 180]);
	drawCenteredText(`MOUSE: [${mx}, ${my}]  HOVER: ${isHovering}`, 10, [140, 180, 255]);
	drawCenteredText(`CURSOR: ${isHovering ? 'pointer' : 'default'}`, 12, [255, 225, 140]);

	drawCenteredText('t.cursor(typeString)', 15, [100, 120, 150]);
});

t.draw(() => {
	t.background(6, 10, 22);

	const halfW = ZONE_W / 2;
	const halfH = ZONE_H / 2;

	const isHovering = t.mouse.x >= -halfW && t.mouse.x < halfW && t.mouse.y >= -halfH && t.mouse.y < halfH;

	t.cursor(isHovering ? 'pointer' : 'default');

	t.push();
	t.char(isHovering ? '#' : '.');
	t.charColor(isHovering ? [140, 255, 180] : [60, 70, 100]);
	t.rect(ZONE_W, ZONE_H);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

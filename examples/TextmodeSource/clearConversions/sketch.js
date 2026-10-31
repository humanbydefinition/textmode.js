/**
 * @title TextmodeSource.clearConversions
 * @author codex
 * @description Resets multi-pass conversion stacks and restores single-mode conversion with split-screen comparison.
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });

const labelLayer = t.layers.add({ fontSize: 16 });
let sourceStacked = null,
	sourceCleared = null;

function createImageUrl() {
	const c = Object.assign(document.createElement('canvas'), { width: 120, height: 80 });
	const ctx = c.getContext('2d'),
		g = ctx.createLinearGradient(0, 0, 120, 80);
	g.addColorStop(0, '#0c0a0a');
	g.addColorStop(0.5, '#4bc3a5');
	g.addColorStop(1, '#ffebd2');
	ctx.fillStyle = g;
	ctx.fillRect(0, 0, 120, 80);
	ctx.fillStyle = '#e68755';
	ctx.fillRect(20, 16, 36, 48);
	ctx.fillStyle = '#ffebd2';
	ctx.fillRect(68, 20, 36, 40);
	return c.toDataURL();
}

t.setup(async () => {
	const url = createImageUrl();
	const pass = (s, e, ch, col) => ({
		mode: 'brightness',
		brightnessStart: s,
		brightnessEnd: e,
		characters: ch,
		charColor: col,
	});
	const passes = [pass(0, 85, ' .:-', '#e68755'), pass(86, 170, '=+#', '#4bc3a5'), pass(171, 255, '#%@', '#ffebd2')];

	sourceStacked = await t.loadImage(url);
	sourceStacked.conversions(passes).cellColor(12, 10, 10);

	sourceCleared = await t.loadImage(url);
	sourceCleared.conversions(passes).clearConversions();
	sourceCleared.characters(' .:-=+*#%@').charColor('#4bc3a5').cellColor(12, 10, 10);
});

t.draw(() => {
	t.background(12, 10, 10);
	if (!sourceStacked || !sourceCleared) return;

	const boxW = Math.max(24, Math.min(60, Math.floor(t.grid.cols * 0.72)));
	const boxH = Math.max(12, Math.min(26, Math.floor(t.grid.rows * 0.52)));
	const left = -Math.floor(boxW / 2),
		top = -Math.floor(boxH / 2) + 2,
		midY = top + Math.floor(boxH / 2);
	const hasM = Number.isFinite(t.mouse.x);
	const splitX = hasM
		? Math.max(left + 2, Math.min(left + boxW - 2, Math.floor(t.mouse.x)))
		: Math.floor(left + boxW / 2 + Math.sin(t.secs * 1.8) * (boxW * 0.38));
	const leftW = splitX - left,
		rightW = left + boxW - splitX;

	if (leftW > 1) {
		t.push();
		t.translate(left + Math.floor(leftW / 2), midY);
		t.image(sourceStacked, leftW, boxH);
		t.pop();
	}
	if (rightW > 1) {
		t.push();
		t.translate(splitX + Math.floor(rightW / 2), midY);
		t.image(sourceCleared, rightW, boxH);
		t.pop();
	}

	t.push();
	t.charColor(230, 135, 85);
	if (leftW > 10) t.print('STACK (3-PASS)', left + 1, top - 1);
	t.charColor(75, 195, 165);
	if (rightW > 10) t.print('CLEARED (1-PASS)', splitX + 2, top - 1);
	t.charColor(255, 235, 210);
	for (let y = top; y < top + boxH; y++) t.print(y % 2 === 0 ? '+' : '|', splitX, y);
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2) + 2;
	const top = -Math.floor(t.grid.rows / 2) + 2;
	t.push();
	t.printAlign('left', 'top');
	t.cellColor(12, 10, 10, 220);
	const panel = `[fg=#ffebd2]TEXTMODESOURCE.CLEARCONVERSIONS[/fg]
[fg=#e68755]<-- 3-PASS STACK | CLEARED (1-PASS) -->[/fg]
[fg=#4bc3a5]clearConversions() restores single mode[/fg]
[fg=#ffebd2]SWEEP: MOUSE X / AUTO CURTAIN[/fg]`;
	t.print(panel, left, top);
	t.pop();
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));

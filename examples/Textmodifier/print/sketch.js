/**
 * @title Textmodifier.print
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

t.draw(() => {
	t.background(6, 10, 22);

	// Subtle dynamic background particles
	for (let i = 0; i < 15; i++) {
		const angle = t.frameCount * 0.02 + i;
		const radius = 8 + (i % 3) * 2.5;
		t.push();
		t.translate(Math.cos(angle) * radius * 1.6, Math.sin(angle) * radius);
		t.charColor(30, 45, 80);
		t.char(i % 2 === 0 ? '.' : '+');
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

	t.push();
	t.charColor(100, 255, 140);
	t.print('TEXTMODIFIER.PRINT', x, y++);
	t.pop();

	t.push();
	t.charColor(80, 100, 150);
	t.print('------------------------------------', x, y++);
	t.pop();

	t.push();
	t.charColor(100, 220, 255);
	t.print('CONCEPT: NATIVE RICH TYPOGRAPHY', x, y++);
	t.pop();

	t.push();
	t.charColor(140, 160, 190);
	t.print('Prints strings with inline BBCode-style tags:', x, y++);
	t.print('  - [fg=green]Foreground Color[/fg]', x, y++);
	t.print('  - [bg=blue]Background Color[/bg]', x, y++);
	t.print('  - [inv]Inverted colors[/inv]', x, y++);
	t.print('  - [rot=90]Rotated[/rot] [fx]Flip X[/fx] [fy]Flip Y[/fy]', x, y++);
	t.pop();

	t.push();
	t.charColor(80, 100, 150);
	t.print('------------------------------------', x, y++);
	t.pop();

	t.print('NESTED: [fg=yellow][inv][rot=180] LEVEL 05 [/rot][/inv][/fg] | STATUS: [fg=red]CRITICAL[/fg]', x, y++);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

/**
 * @title plugins.TextmodePlugin.uninstall
 */
let uninstalled = false;

const myPlugin = {
	name: 'uninstall-plugin',
	install(textmodifier, context) {},
	uninstall(textmodifier, context) {
		uninstalled = true;
	},
};

const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
	plugins: [myPlugin],
});

const labelLayer = t.layers.add();

t.draw(() => {
	t.background(6, 8, 20);
});

t.mouseClicked(() => {
	if (uninstalled) return;
	t.destroy();
	document.body.innerHTML =
		'<div style="padding: 24px; color: #e4e4e7; background: #09090b; min-height: 100vh;">plugin.uninstall() executed successfully.</div>';
});

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('PLUGINS.UNINSTALL', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: PLUGIN CLEANUP HOOK', x, y++, 100, 220, 255);
	drawText('Executes when the sketch is destroyed.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(uninstalled ? 'Status: Cleaned Up' : 'Status: Active (Click to uninstall)', x, y++, 140, 190, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

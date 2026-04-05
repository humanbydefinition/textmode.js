/**
 * @title Textmodifier.inputGrid
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 8 });

let uiLayer;

function label(text, y, color = [220, 220, 220]) {
	t.push();
	t.translate(-Math.floor(text.length / 2), y);
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

t.setup(() => {
	uiLayer = t.layers.add({ fontSize: 16 });
	uiLayer.draw(() => {
		t.clear();
		t.char('+');
		t.charColor(70, 100, 140);
		t.rect(t.grid.cols - 2, t.grid.rows - 2);
		label('top layer uses a larger grid', 0, [140, 170, 220]);
	});
});

t.draw(() => {
	const lockBaseGrid = Math.floor(t.frameCount / 180) % 2 === 1;
	t.inputGrid(lockBaseGrid ? t.layers.base.grid : 'topmost');
	t.background(10, 12, 24);

	if (t.mouse.x !== Number.NEGATIVE_INFINITY) {
		t.push();
		t.translate(t.mouse.x, t.mouse.y);
		t.char('*');
		t.charColor(255, 210, 90);
		t.point();
		t.pop();
	}

	label('inputGrid()', -4, [255, 210, 90]);
	label(lockBaseGrid ? 'locked to base grid' : 'responsive topmost grid', -1);
	label('watch mouse precision change every 3 seconds', 2, [150, 160, 190]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

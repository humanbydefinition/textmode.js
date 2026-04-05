/**
 * @title TextmodeFont.dispose
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 8 });

let tempFont;
let disposed = false;

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

t.setup(async () => {
	tempFont = await t.loadFont('../../primitives/CHUNKY.ttf', false);
});

t.draw(() => {
	t.background(8, 10, 22);
	label('dispose()', -4, [255, 210, 90]);
	label(disposed ? 'temporary font disposed' : 'disposing temp font after 3 seconds', -1);
	label('active layer font keeps rendering normally', 2, [150, 160, 190]);

	if (tempFont && !disposed && t.frameCount > 180) {
		tempFont.dispose();
		disposed = true;
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

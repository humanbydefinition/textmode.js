/**
 * @title Textmodifier.isRenderingFrame
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 8 });

let outsideFrame = false;
setInterval(() => {
	outsideFrame = t.isRenderingFrame;
}, 120);

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

t.draw(() => {
	t.background(10, 12, 24);
	label('isRenderingFrame', -3, [255, 210, 90]);
	label(`inside draw(): ${t.isRenderingFrame}`, 0);
	label(`outside draw(): ${outsideFrame}`, 3, [150, 160, 190]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

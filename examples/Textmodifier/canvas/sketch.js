/**
 * @title Textmodifier.canvas
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 8 });

t.canvas.title = 'Textmodifier.canvas example';
t.canvas.style.outline = '2px solid rgba(250, 204, 21, 0.5)';
t.canvas.style.outlineOffset = '-2px';
t.canvas.style.background = '#09090b';

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
	t.background(9, 11, 21);
	label('canvas getter exposes the DOM canvas', -2, [255, 210, 90]);
	label(`${t.canvas.width} x ${t.canvas.height} pixels`, 1);
	label('this example adds an outline via t.canvas.style', 4, [150, 160, 190]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

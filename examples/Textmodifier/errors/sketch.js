/**
 * @title Textmodifier.errors
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 8 });

let triggerError = false;
window.addEventListener(
	'click',
	() => {
		triggerError = true;
	},
	{ once: true }
);

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
	label('errors', -3, [255, 210, 90]);
	label(`controller available: ${Boolean(t.errors)}`, 0);
	label('click once to trigger a draw error overlay', 3, [150, 160, 190]);

	if (triggerError) {
		throw new Error('This example intentionally triggers the error layer.');
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

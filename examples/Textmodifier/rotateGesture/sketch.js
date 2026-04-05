/**
 * @title Textmodifier.rotateGesture
 * @author codex
 */
const t = textmode.create({ width: 800, height: 600 });

let rotation = 0;

t.rotateGesture((data) => {
	rotation += data.deltaRotation;
});

t.draw(() => {
	t.background(0);
	t.rotateZ(rotation);
	t.char('☼');
	t.charColor(100, 255, 200);
	t.rect(20, 20);

	t.push();
	t.translate(15, 0);
	t.char('•');
	t.charColor(255, 100, 100);
	t.rect(5, 5);
	t.pop();
});

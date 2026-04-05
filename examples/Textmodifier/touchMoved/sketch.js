/**
 * @title Textmodifier.touchMoved
 * @author codex
 */
const t = textmode.create({ width: 800, height: 600 });

let posX = 0;
let posY = 0;

t.touchMoved((data) => {
	const { touch, previousTouch } = data;

	if (previousTouch) {
		posX += touch.x - previousTouch.x;
		posY += touch.y - previousTouch.y;
	}
});

t.draw(() => {
	t.background(0);
	t.push();
	t.translate(posX, posY);

	const r = Math.abs(Math.sin(posX * 0.05)) * 255;
	const b = Math.abs(Math.cos(posY * 0.05)) * 255;
	t.charColor(r, 200, b);
	t.char('◈');
	t.rect(8, 8);
	t.pop();
});

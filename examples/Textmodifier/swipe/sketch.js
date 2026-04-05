/**
 * @title Textmodifier.swipe
 * @author codex
 */
const t = textmode.create({ width: 800, height: 600 });

let arrow = '•';
let r = 128;
let g = 128;
let b = 128;

t.swipe((data) => {
	const horizontal = Math.abs(data.direction.x) >= Math.abs(data.direction.y);

	if (horizontal) {
		if (data.direction.x < 0) {
			arrow = '◀';
			r = 100;
			g = 100;
			b = 255;
		} else {
			arrow = '▶';
			r = 255;
			g = 255;
			b = 100;
		}
		return;
	}

	if (data.direction.y < 0) {
		arrow = '▲';
		r = 255;
		g = 100;
		b = 100;
	} else {
		arrow = '▼';
		r = 100;
		g = 255;
		b = 100;
	}
});

t.draw(() => {
	t.background(0);
	const size = 8 + Math.sin(t.frameCount * 0.1) * 2;
	t.char(arrow);
	t.charColor(r, g, b);
	t.rect(size, size);
});

/**
 * @title Textmodifier.image
 * @author codex
 */
const t = textmode.create({
	width: 800,
	height: 600,
});

const fb = t.createFramebuffer({ width: 30, height: 20 });

t.draw(() => {
	fb.begin();
	t.clear();
	t.charColor(255, 0, 0);
	t.char('A');
	t.rect(20, 10);
	fb.end();

	t.background(0);

	t.image(fb);
});

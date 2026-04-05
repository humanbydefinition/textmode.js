/**
 * @title Textmodifier.pinch
 * @author codex
 */
const t = textmode.create({ width: 800, height: 600 });

let currentScale = 1;

t.pinch((data) => {
	currentScale = Math.max(0.5, Math.min(5, data.scale));
});

t.draw(() => {
	t.background(0);
	const size = 20 * currentScale;
	t.char('▒');
	t.charColor(255, 100 + currentScale * 20, 150);
	t.rect(size, size);
});

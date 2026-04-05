/**
 * @title Textmodifier.filters
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 8 });

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
	const time = t.frameCount * 0.03;
	const hasInvert = t.filters.has('invert');
	const invertActive = hasInvert && Math.floor(t.frameCount / 90) % 2 === 1;

	t.background(8, 10, 20);
	t.char('@');
	t.charColor(120 + Math.sin(time) * 90, 160, 255);
	t.rotateZ(time * 45);
	t.rect(14, 14);

	if (invertActive) {
		t.filter('invert');
	}

	label('filters', -4, [255, 210, 90]);
	label(`filters.has('invert'): ${hasInvert}`, -1);
	label(invertActive ? 'invert filter active' : 'built-in filter available', 2, [150, 160, 190]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

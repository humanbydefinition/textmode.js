/**
 * @title Textmodifier.loading
 * @author codex
 */
const t = textmode.create({
	width: 800,
	height: 600,
	loadingScreen: { transitionDuration: 400 },
});

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

t.setup(async () => {
	t.loading.draw((ctx) => {
		const tm = ctx.textmodifier;

		tm.background(6, 10, 18);
		tm.push();
		tm.translate(-8, -6, 0);
		tm.charColor(255, 255, 255);
		tm.char('*');
		tm.point();
		tm.pop();

		const label = 'CUSTOM LOADING';
		for (let i = 0; i < label.length; i++) {
			tm.push();
			tm.translate(i - label.length / 2 + 0.5, 0, 0);
			tm.char(label[i]);
			tm.charColor(255, 220, 120);
			tm.point();
			tm.pop();
		}
	});

	await wait(1200);
});

t.draw(() => {
	t.background(8, 12, 24);

	const label = 'LOADING COMPLETE';
	for (let i = 0; i < label.length; i++) {
		t.push();
		t.translate(i - label.length / 2 + 0.5, 0);
		t.char(label[i]);
		t.charColor(120, 220, 255);
		t.point();
		t.pop();
	}
});

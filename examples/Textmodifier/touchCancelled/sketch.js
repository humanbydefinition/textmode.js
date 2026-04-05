/**
 * @title Textmodifier.touchCancelled
 * @author codex
 */
const t = textmode.create({ width: 800, height: 600 });

let message = 'OK';
let colorIntensity = 100;

t.touchStarted(() => {
	message = 'TOUCH';
	colorIntensity = 200;
});

t.touchEnded(() => {
	message = 'OK';
	colorIntensity = 100;
});

t.touchCancelled(() => {
	message = 'CANCEL';
	colorIntensity = 0;
});

t.draw(() => {
	t.background(0);
	t.char(message.charAt(0));
	t.charColor(255, colorIntensity, colorIntensity);
	t.rotateZ(t.frameCount * 0.1);
	t.rect(15, 15);

	if (message === 'CANCEL' && t.frameCount % 60 === 0) {
		message = 'OK';
		colorIntensity = 100;
	}
});

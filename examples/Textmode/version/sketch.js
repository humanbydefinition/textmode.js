/**
 * @title Textmode.setErrorLevel
 * @author humanbydefinition
 * @instagram https://www.instagram.com/humanbydefinition/
 * @mastodon https://mastodon.social/@humanbydefinition
 * @bluesky https://bsky.app/profile/humanbydefinition
 * @website https://code.textmode.art
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

const versionLabel = `VERSION: ${textmode.version}`;

t.draw(() => {
	t.background(0, 20, 0);

	t.push();
	t.translate(-versionLabel.length / 2, 0);
	t.charColor(0, 255, 0);

	for (let i = 0; i < versionLabel.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(versionLabel[i]);
		t.point();
		t.pop();
	}

	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

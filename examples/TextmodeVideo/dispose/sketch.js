/**
 * @title TextmodeVideo.dispose
 * @author codex
 */
const VIDEO_URL = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });

let video = null;
let disposed = false;

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

t.setup(async () => {
	video = await t.loadVideo(VIDEO_URL);
	video.characters(' .:-=+*#%@');
	await video.play();
});

t.draw(() => {
	t.background(5, 7, 18);

	if (video && !disposed) {
		t.image(video, t.grid.cols - 8, t.grid.rows - 10);
	}

	label('click to dispose video', -Math.floor(t.grid.rows * 0.34), [255, 225, 140]);
	label(disposed ? 'video disposed' : 'video active', Math.floor(t.grid.rows * 0.30), [120, 205, 255]);
});

t.mouseClicked(() => {
	if (!video || disposed) {
		return;
	}

	video.dispose();
	disposed = true;
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

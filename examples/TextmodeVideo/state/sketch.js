/**
 * @title TextmodeVideo.currentTime
 * @author codex
 */
const VIDEO_URL = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });

let video = null;

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

	if (video) {
		t.image(video, t.grid.cols - 8, t.grid.rows - 10);
		label(`videoElement ${video.videoElement ? 'ready' : 'pending'}`, Math.floor(t.grid.rows * 0.20));
		label(`current ${video.currentTime.toFixed(1)}s / ${video.duration.toFixed(1)}s`, Math.floor(t.grid.rows * 0.30));
		label(`isPlaying ${video.isPlaying ? 'true' : 'false'}`, Math.floor(t.grid.rows * 0.40), [120, 205, 255]);
	}

	label('click to toggle play / pause', -Math.floor(t.grid.rows * 0.34), [255, 225, 140]);
});

t.mouseClicked(async () => {
	if (!video) {
		return;
	}

	if (video.isPlaying) {
		video.pause();
		return;
	}

	await video.play();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

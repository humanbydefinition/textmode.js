/**
 * @title TextmodeFont.fontFramebuffer
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
	const atlas = t.font.fontFramebuffer;
	t.background(8, 10, 22);
	label('fontFramebuffer', -5, [255, 210, 90]);
	label(`atlas size: ${atlas.width} x ${atlas.height}px`, -1);
	label(`grid: ${t.font.textureColumns} cols x ${t.font.textureRows} rows`, 3, [150, 160, 190]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

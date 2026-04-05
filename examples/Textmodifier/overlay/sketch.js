/**
 * @title Textmodifier.overlay
 * @author codex
 */
const sourceCanvas = document.createElement('canvas');
sourceCanvas.width = 360;
sourceCanvas.height = 240;
sourceCanvas.style.cssText = 'display:block;margin:0 auto;background:#050816;';
document.body.appendChild(sourceCanvas);

const source = sourceCanvas.getContext('2d');
const t = textmode.create({ canvas: sourceCanvas, overlay: true, fontSize: 8 });

function paint(time) {
	source.fillStyle = '#050816';
	source.fillRect(0, 0, sourceCanvas.width, sourceCanvas.height);
	source.fillStyle = '#38bdf8';
	source.fillRect(40 + Math.sin(time * 0.0012) * 60, 30, 80, 80);
	source.fillStyle = '#f59e0b';
	source.beginPath();
	source.arc(220, 120 + Math.sin(time * 0.0018) * 50, 38, 0, Math.PI * 2);
	source.fill();
	source.fillStyle = '#e4e4e7';
	source.font = '24px monospace';
	source.fillText('overlay', 118, 210);
	requestAnimationFrame(paint);
}

t.setup(() => {
	t.overlay.characters(' .:-=+*#%@').charColorMode('sampled').cellColorMode('fixed').cellColor(0, 0, 0);
	requestAnimationFrame(paint);
});

t.draw(() => {
	t.clear();
	if (t.overlay) {
		t.image(t.overlay, t.grid.cols, t.grid.rows);
	}
});

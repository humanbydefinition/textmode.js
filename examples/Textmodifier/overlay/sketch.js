/**
 * @title Textmodifier.overlay
 * @description Overlay mode: paint into a regular 2D canvas, then let textmode.js sample it as a live ASCII layer.
 * @author codex
 */
const sourceCanvas = document.createElement('canvas');
sourceCanvas.width = window.innerWidth;
sourceCanvas.height = window.innerHeight;
sourceCanvas.style.cssText = 'display:block;width:100vw;height:100vh;background:#050816;';
document.body.style.margin = '0';
document.body.style.overflow = 'hidden';
document.body.appendChild(sourceCanvas);

const source = sourceCanvas.getContext('2d');
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	canvas: sourceCanvas,
	overlay: true,
	fontSize: 8,
});

function resizeSource() {
	sourceCanvas.width = window.innerWidth;
	sourceCanvas.height = window.innerHeight;
	sourceCanvas.style.width = window.innerWidth + 'px';
	sourceCanvas.style.height = window.innerHeight + 'px';
}

function paint(time) {
	const w = sourceCanvas.width;
	const h = sourceCanvas.height;
	const cx = w / 2;
	const cy = h / 2;
	const sweep = time * 0.001;
	const gradient = source.createLinearGradient(0, 0, w, h);

	gradient.addColorStop(0, '#050816');
	gradient.addColorStop(0.45, '#0f172a');
	gradient.addColorStop(1, '#111827');
	source.fillStyle = gradient;
	source.fillRect(0, 0, w, h);

	for (let i = 0; i < 11; i++) {
		const angle = sweep * (0.45 + i * 0.04) + i * 0.72;
		const radius = Math.min(w, h) * (0.12 + i * 0.025);
		const x = cx + Math.cos(angle) * radius * 1.8;
		const y = cy + Math.sin(angle) * radius;
		const size = Math.max(22, Math.min(w, h) * (0.035 + i * 0.002));

		source.fillStyle = i % 2 === 0 ? '#38bdf8' : '#f59e0b';
		source.globalAlpha = 0.28 + (i % 4) * 0.08;
		source.beginPath();
		source.arc(x, y, size, 0, Math.PI * 2);
		source.fill();
	}

	source.globalAlpha = 1;
	source.fillStyle = '#38bdf8';
	source.fillRect(cx - 190 + Math.sin(time * 0.0012) * 70, cy - 74, 150, 112);
	source.fillStyle = '#f59e0b';
	source.beginPath();
	source.arc(cx + 128, cy + Math.sin(time * 0.0018) * 72, 58, 0, Math.PI * 2);
	source.fill();
	source.fillStyle = '#e4e4e7';
	source.font = '28px monospace';

	requestAnimationFrame(paint);
}

t.setup(() => {
	t.overlay.characters(' .:-=+*#%@').charColorMode('sampled').cellColorMode('fixed').cellColor(3, 6, 12);
	requestAnimationFrame(paint);
});

t.draw(() => {
	t.clear();
	if (t.overlay) {
		t.image(t.overlay, t.grid.cols, t.grid.rows);
	}
});

t.windowResized(() => {
	resizeSource();
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

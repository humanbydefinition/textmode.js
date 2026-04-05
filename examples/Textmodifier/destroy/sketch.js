/**
 * @title Textmodifier.destroy
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 8 });

let destroyed = false;
const status = document.createElement('div');
status.style.cssText =
	'position:fixed;left:12px;top:12px;padding:8px 10px;background:#09090bcc;color:#e4e4e7;font:12px JetBrains Mono,monospace;border:1px solid #27272a;';
status.textContent = 'destroy() will run after 3 seconds';
document.body.appendChild(status);

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
	const remaining = Math.max(0, 180 - t.frameCount);
	t.background(10, 12, 24);
	label('destroy()', -2, [255, 210, 90]);
	label(`frames until cleanup: ${remaining}`, 1);

	if (!destroyed && remaining === 0) {
		destroyed = true;
		status.textContent = 'destroy() called...';
		t.destroy();
		setTimeout(() => {
			status.textContent = `destroyed, isDisposed = ${t.isDisposed}`;
		}, 0);
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

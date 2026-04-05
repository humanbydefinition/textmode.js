/**
 * @title Textmodifier.isDisposed
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 8 });

const button = document.createElement('button');
button.textContent = 'destroy';
button.style.cssText =
	'position:fixed;left:12px;top:12px;padding:8px 10px;background:#18181b;color:#e4e4e7;border:1px solid #27272a;font:12px JetBrains Mono,monospace;cursor:pointer;';
document.body.appendChild(button);

const status = document.createElement('div');
status.style.cssText =
	'position:fixed;left:12px;top:50px;padding:8px 10px;background:#09090bcc;color:#e4e4e7;font:12px JetBrains Mono,monospace;border:1px solid #27272a;';
status.textContent = `isDisposed = ${t.isDisposed}`;
document.body.appendChild(status);

button.addEventListener('click', () => {
	t.destroy();
	setTimeout(() => {
		status.textContent = `isDisposed = ${t.isDisposed}`;
	}, 0);
});

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
	t.background(10, 12, 24);
	label('isDisposed', -2, [255, 210, 90]);
	label('click the destroy button', 1);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

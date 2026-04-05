/**
 * @title LayerManager.clear
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 8 });

let mode = 0;

function rebuildLayers() {
	t.layers.clear();
	mode++;

	const layerCount = 4;

	for (let index = 0; index < layerCount; index++) {
		const layer = t.layers.add({
			blendMode: ['screen', 'additive', 'difference', 'overlay'][(mode + index) % 4],
			opacity: 0.5 + index * 0.12,
		});

		layer.draw(() => {
			t.clear();

			const time = t.frameCount * 0.02;
			const count = 8 + index * 4;
			const base = Math.min(t.grid.cols, t.grid.rows) * (0.12 + index * 0.06);

			for (let i = 0; i < count; i++) {
				const angle = (i / count) * Math.PI * 2 + time * (0.5 + index * 0.2) * (mode % 2 ? 1 : -1);
				const wobble = base + Math.sin(time * 3 + i + mode) * (1.5 + index);

				t.push();
				t.translate(Math.cos(angle) * wobble, Math.sin(angle * 1.3) * wobble * 0.65);
				t.rotateZ(angle * 90 + mode * 25);
				t.char(['·', '+', '*', '░', '▒'][(mode + index + i) % 5]);
				t.charColor(70 + index * 45, 120 + i * 8, 255 - index * 25);
				t.arc(5 + index * 2 + (i % 4), 3 + index, angle * 60, angle * 60 + 160);
				t.pop();
			}
		});
	}
}

t.setup(() => {
	rebuildLayers();
});

t.draw(() => {
	const time = t.frameCount * 0.02;
	const radius = Math.min(t.grid.cols, t.grid.rows) * 0.44;

	t.background(6, 10, 18);

	for (let i = 0; i < 18; i++) {
		const angle = (i / 18) * Math.PI * 2 - time * 0.7;
		t.charColor(25, 45 + i * 6, 70 + i * 8);
		t.char(i % 3 ? '.' : ':');
		t.line(0, 0, Math.cos(angle) * radius, Math.sin(angle) * radius * 0.58);
	}

	if (t.frameCount % 180 === 0) {
		rebuildLayers();
	}

	t.charColor(255, 240, 170);
	t.char(String((mode % 9) + 1));
	t.point();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

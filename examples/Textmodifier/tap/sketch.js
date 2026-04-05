/**
 * @title Textmodifier.tap
 * @author codex
 */
const t = textmode.create({ width: 800, height: 600 });

const markers = [];

t.tap((data) => {
	markers.push({ x: data.touch.x, y: data.touch.y, life: 60 });
});

t.draw(() => {
	t.background(0);

	for (let i = markers.length - 1; i >= 0; i--) {
		const marker = markers[i];

		t.push();
		t.translate(marker.x, marker.y);
		t.char('X');
		t.charColor(255, 100, 100, (marker.life / 60) * 255);
		t.rect(3, 3);
		t.pop();

		marker.life -= 1;
		if (marker.life <= 0) markers.splice(i, 1);
	}

	if (markers.length === 0) {
		t.charColor(100);
		t.char('?');
		t.rect(1, 1);
	}
});

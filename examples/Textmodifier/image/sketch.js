/**
 * @title Textmodifier.image
 * @description Offscreen Composition Matrix: creates an offscreen framebuffer, draws a highly dynamic rotating cosmic galaxy using custom character coordinates, and presents multiple copies across the screen using translation, scaling, and rotation.
 * @author antigravity
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

// Create offscreen framebuffer for rendering the nebula texture
const fb = t.createFramebuffer({ width: 40, height: 40 });

t.draw(() => {
	// ── Phase 1: Render Procedural Nebula to Offscreen Framebuffer ──
	fb.begin();
	t.clear();

	const time = t.frameCount * 0.03;
	const count = 48;

	for (let i = 0; i < count; i++) {
		const angle = (i / count) * Math.PI * 4 + time;
		const r = (i / count) * 16 + 2;

		const x = Math.cos(angle) * r;
		const y = Math.sin(angle) * r;

		t.push();
		t.translate(x, y);

		// Dynamic color transition based on node index
		const red = Math.floor(128 + 127 * Math.sin(i * 0.2 + time));
		const green = Math.floor(80 + 175 * Math.cos(i * 0.15 - time));
		const blue = Math.floor(200 + 55 * Math.sin(time));

		t.charColor(red, green, blue);

		// Multi-layered visual shapes
		if (i % 3 === 0) {
			t.char('✦');
		} else if (i % 3 === 1) {
			t.char('•');
		} else {
			t.char('﹡');
		}

		t.point();
		t.pop();
	}
	fb.end();

	// ── Phase 2: Composite FBO Instances onto Main Responsive Canvas ──
	t.background(8, 10, 16);

	const cols = t.grid.cols;
	const rows = t.grid.rows;

	// Draw beautiful grid of nested FBO viewports
	const gridX = Math.floor(cols / 4);
	const gridY = Math.floor(rows / 3);

	// Display labels
	t.push();
	t.translate(-Math.floor(cols / 2) + 4, -Math.floor(rows / 2) + 4);
	t.charColor(100, 200, 255);
	t.char('✦');
	t.point();
	// Inline draw title
	t.translate(2, 0);
	const title = 'OFFSCREEN FRAMEBUFFER MULTI-COMPOSITING GRID';
	for (let i = 0; i < title.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(title[i]);
		t.point();
		t.pop();
	}
	t.pop();

	// Draw 3 FBO instances with different transformation parameters
	for (let slot = 0; slot < 3; slot++) {
		const posX = (slot - 1) * gridX * 1.3;
		const posY = 2;

		t.push();
		t.translate(posX, posY);

		// Varying spin speeds and scales per slot
		const spin = t.frameCount * 0.015 * (slot + 1);
		t.rotateZ(spin);

		const scaleVal = 1.0 + Math.sin(t.frameCount * 0.05 + slot) * 0.15;
		t.image(fb, Math.floor(28 * scaleVal), Math.floor(28 * scaleVal));

		t.pop();
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

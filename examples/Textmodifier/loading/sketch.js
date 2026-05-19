/**
 * @title Textmodifier.loading
 * @description Retro system boot-up sequence: custom interactive loading screen displaying progress telemetry and diagnostic logs before fading into the main loop.
 * @author antigravity
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
	loadingScreen: { transitionDuration: 600 },
});

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const startTime = Date.now();

t.setup(async () => {
	// Register a beautiful retro system boot loader
	t.loading.draw((ctx) => {
		const tm = ctx.textmodifier;
		tm.background(8, 10, 18);

		const elapsed = Date.now() - startTime;
		const duration = 2000;
		const progress = Math.min(1.0, elapsed / duration);
		const percent = Math.floor(progress * 100);

		// Dynamic ASCII terminal spinner
		const spinners = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
		const spinner = spinners[Math.floor(elapsed / 80) % spinners.length];

		const rows = tm.grid.rows;

		// 1. Draw Title
		const title = 'TEXTMODE DIAGNOSTIC CONSOLE v0.13.0';
		tm.push();
		tm.translate(-Math.floor(title.length / 2), -Math.floor(rows / 2) + 4);
		tm.charColor(100, 200, 255);
		for (let i = 0; i < title.length; i++) {
			tm.push();
			tm.translate(i, 0);
			tm.char(title[i]);
			tm.point();
			tm.pop();
		}
		tm.pop();

		// 2. Draw Loading Progress Bar: [=========--------] 58%
		const barWidth = 30;
		const filledWidth = Math.floor(barWidth * progress);
		const barStr = `[${'='.repeat(filledWidth)}${'-'.repeat(barWidth - filledWidth)}] ${percent}%`;

		tm.push();
		tm.translate(-Math.floor(barStr.length / 2), 0);
		tm.charColor(255, 220, 100);
		for (let i = 0; i < barStr.length; i++) {
			tm.push();
			tm.translate(i, 0);
			tm.char(barStr[i]);
			tm.point();
			tm.pop();
		}
		tm.pop();

		// Spinner and active state next to bar
		tm.push();
		tm.translate(Math.floor(barStr.length / 2) + 3, 0);
		tm.char(spinner);
		tm.charColor(100, 255, 150);
		tm.point();
		tm.pop();

		// 3. Draw diagnostic console messages appearing sequentially
		const logs = [
			'ALLOCATING TEXTURE CELL GRID BUFFERS...',
			'COMPILING HIGH-PRECISION MRT SHADERS...',
			'LINKING RENDERING PIPELINES...',
			'MOUNTING RETRO GLYPH TEXTURE MAPS...',
			'BOOTING TEXTMODIFIER CORE GRAPHICS ENVIRONMENT...',
		];

		const visibleCount = Math.min(logs.length, Math.floor(progress * (logs.length + 1)));

		tm.push();
		tm.translate(-24, 4);
		for (let i = 0; i < visibleCount; i++) {
			const line = `> [OK] ${logs[i]}`;
			tm.push();
			tm.translate(0, i * 2);
			tm.charColor(80, 160 + i * 20, 100);
			for (let j = 0; j < line.length; j++) {
				tm.push();
				tm.translate(j, 0);
				tm.char(line[j]);
				tm.point();
				tm.pop();
			}
			tm.pop();
		}
		tm.pop();
	});

	// Give the user a proper aesthetic system-boot presentation duration
	await wait(2400);
});

t.draw(() => {
	t.background(6, 12, 24);

	const cols = t.grid.cols;
	const rows = t.grid.rows;

	// Render a retro grid design when system is loaded
	const borderChar = '▒';
	t.charColor(50, 80, 140);
	t.char(borderChar);
	t.rect(cols, 3);

	// Glowing operational state panel
	const label = 'SYSTEM READY : OK';
	t.push();
	t.translate(-Math.floor(label.length / 2), 0);
	t.charColor(100, 255, 180);
	for (let i = 0; i < label.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(label[i]);
		t.point();
		t.pop();
	}
	t.pop();

	const desc = 'Diagnostics complete. Grid pipeline initialized.';
	t.push();
	t.translate(-Math.floor(desc.length / 2), 3);
	t.charColor(130, 150, 180);
	for (let i = 0; i < desc.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(desc[i]);
		t.point();
		t.pop();
	}
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

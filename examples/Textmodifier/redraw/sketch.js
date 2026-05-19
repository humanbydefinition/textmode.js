/**
 * @title Textmodifier.redraw
 * @description Render-loop control: step-by-step physical particle simulation that automatically pauses and only advances on key presses or mouse clicks using t.redraw().
 * @author antigravity
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

let manualMode = false;
let bursts = 0;
let stepCount = 0;

// Particle system state
const particles = [];
const pegs = [];

// Populate a stable grid of pegs for particles to bounce off
function initSimulator() {
	pegs.length = 0;
	particles.length = 0;

	// Draw 3 rows of pegs in triangular fashion
	for (let row = 0; row < 4; row++) {
		const colsInRow = 5 + row;
		const startX = -colsInRow * 2.5;
		for (let c = 0; c < colsInRow; c++) {
			pegs.push({ x: startX + c * 5 + 2.5, y: -6 + row * 4 });
		}
	}
}

initSimulator();

function drawText(text, x, y, r = 180, g = r, b = r) {
	t.push();
	t.translate(x - Math.floor(text.length / 2), y);
	t.charColor(r, g, b);

	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}

	t.pop();
}

function advanceSimulator() {
	stepCount++;

	// Spawn new particles periodically
	if (stepCount % 3 === 0) {
		particles.push({
			x: Math.random() * 4 - 2,
			y: -14,
			vx: Math.random() * 0.4 - 0.2,
			vy: 0.5,
			color: [Math.floor(100 + Math.random() * 155), 200, 255],
		});
	}

	// Update active particles under simple physical gravity
	for (let i = particles.length - 1; i >= 0; i--) {
		const p = particles[i];
		p.vy += 0.08; // Gravity
		p.x += p.vx;
		p.y += p.vy;

		// Collide with pegs
		pegs.forEach((peg) => {
			const dx = p.x - peg.x;
			const dy = p.y - peg.y;
			const dist = Math.sqrt(dx * dx + dy * dy);
			if (dist < 1.6) {
				// Bounce off peg
				p.vy = -Math.abs(p.vy) * 0.4;
				p.vx = (dx / dist) * 0.6 + (Math.random() * 0.2 - 0.1);
				p.y = peg.y + (dy / dist) * 1.6;
			}
		});

		// Remove out of bounds particles
		if (p.y > 15) {
			particles.splice(i, 1);
		}
	}
}

function triggerRedraw(count) {
	if (!manualMode) return;

	bursts++;
	// Force textmode to execute the draw loop exactly 'count' times
	t.redraw(count);
}

t.keyPressed((data) => {
	if (data.key === ' ') {
		triggerRedraw(1);
	}
	if (data.key === 'Enter') {
		triggerRedraw(5);
	}
});

t.mousePressed(() => {
	triggerRedraw(1);
});

t.draw(() => {
	// Auto-pause at frame 60 to shift into step-by-step diagnostic mode
	if (!manualMode && t.frameCount >= 60) {
		manualMode = true;
		t.noLoop(); // Pauses the continuous animation loop
	}

	// Update physics
	advanceSimulator();

	t.background(6, 8, 14);

	const cols = t.grid.cols;
	const rows = t.grid.rows;

	// Draw Console telemetry instructions
	drawText('RENDER LOOP STEP TELEMETRY', 0, -Math.floor(rows / 2) + 4, 100, 200, 255);
	drawText(
		manualMode ? 'STATUS: PAUSED (MANUAL MODE)' : 'STATUS: CONTINUOUS REELING (AUTO PAUSING...)',
		0,
		-Math.floor(rows / 2) + 6,
		manualMode ? 255 : 100,
		manualMode ? 120 : 255,
		manualMode ? 100 : 150
	);

	// Controls instructions HUD
	drawText('CLICK / SPACEBAR = redraw(1) step', 0, Math.floor(rows / 2) - 6, 180, 200, 220);
	drawText('ENTER KEY = redraw(5) steps burst', 0, Math.floor(rows / 2) - 4, 255, 220, 100);
	drawText(`STEPS: ${stepCount} | BURSTS: ${bursts}`, 0, Math.floor(rows / 2) - 2, 140, 150, 160);

	// Draw peg structures
	t.charColor(100, 120, 150);
	t.char('*');
	pegs.forEach((peg) => {
		t.push();
		t.translate(peg.x, peg.y);
		t.point();
		t.pop();
	});

	// Draw active particles with physical trails
	particles.forEach((p) => {
		t.push();
		t.translate(p.x, p.y);
		t.char('o');
		t.charColor(...p.color);
		t.rect(1.5, 1.5);
		t.pop();
	});
});

t.windowResized(() => {
	initSimulator();
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

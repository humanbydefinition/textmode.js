/**
 * @title Textmodifier.swipe
 * @description Kinetic swipe launcher: swipe rapidly or drag the mouse to launch colored directional particles that bounce off boundaries with custom trail physics.
 * @author antigravity
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const particles = [];

// Native touch swipe gesture
t.swipe((data) => {
	launchParticles(data.direction.x, data.direction.y);
});

// Interactive mouse swipe simulator for desktop dev testing
let dragStartX = 0;
let dragStartY = 0;

window.addEventListener('mousedown', (e) => {
	dragStartX = e.clientX;
	dragStartY = e.clientY;
});

window.addEventListener('mouseup', (e) => {
	const dx = e.clientX - dragStartX;
	const dy = e.clientY - dragStartY;
	const len = Math.sqrt(dx * dx + dy * dy);
	if (len > 35) {
		launchParticles(dx / len, dy / len);
	}
});

function launchParticles(dirX, dirY) {
	// Determine dominant direction and character
	let charSym = '•';
	let color = [100, 200, 255]; // Cyan default

	if (Math.abs(dirX) >= Math.abs(dirY)) {
		if (dirX < 0) {
			charSym = 'W';
			color = [100, 150, 255]; // Blue
		} else {
			charSym = 'E';
			color = [255, 200, 100]; // Gold
		}
	} else {
		if (dirY < 0) {
			charSym = 'N';
			color = [255, 100, 100]; // Red
		} else {
			charSym = 'S';
			color = [100, 255, 150]; // Green
		}
	}

	// Spawn a stream of kinetic elements from the center of the canvas
	const count = 8;
	for (let i = 0; i < count; i++) {
		const spread = Math.random() * 0.4 - 0.2;
		particles.push({
			x: 0,
			y: 0,
			vx: (dirX + spread) * (1.5 + Math.random() * 1.5),
			vy: (dirY + spread) * (1.0 + Math.random() * 1.0),
			char: charSym,
			color: color,
			alpha: 255,
			size: 2 + Math.random() * 4,
		});
	}
}

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

t.draw(() => {
	t.background(6, 8, 14);

	const cols = t.grid.cols;
	const rows = t.grid.rows;

	// Telemetry instructions hud
	drawText('GESTURAL SWIPE LAUNCHER', 0, -Math.floor(rows / 2) + 4, 100, 200, 255);
	drawText('Swipe or drag-and-release mouse to shoot kinetic particles', 0, -Math.floor(rows / 2) + 6, 120, 140, 160);
	drawText(`ACTIVE STREAM: ${particles.length} PARTICLES`, 0, Math.floor(rows / 2) - 4, 255, 220, 100);

	// Update and render active kinetic particles
	for (let i = particles.length - 1; i >= 0; i--) {
		const p = particles[i];
		p.x += p.vx;
		p.y += p.vy;

		// Bouncing collision against grid walls with energy friction loss
		const limitX = cols / 2 - 2;
		const limitY = rows / 2 - 2;

		if (p.x < -limitX) {
			p.x = -limitX;
			p.vx *= -0.85;
		}
		if (p.x > limitX) {
			p.x = limitX;
			p.vx *= -0.85;
		}
		if (p.y < -limitY) {
			p.y = -limitY;
			p.vy *= -0.85;
		}
		if (p.y > limitY) {
			p.y = limitY;
			p.vy *= -0.85;
		}

		// Apply simple air friction resistance
		p.vx *= 0.98;
		p.vy *= 0.98;

		// Fade out over lifetime
		p.alpha -= 1.8;
		if (p.alpha <= 0) {
			particles.splice(i, 1);
			continue;
		}

		t.push();
		t.translate(p.x, p.y);
		t.char(p.char);
		t.charColor(p.color[0], p.color[1], p.color[2], p.alpha);
		t.rect(p.size, p.size);
		t.pop();
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

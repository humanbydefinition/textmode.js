/**
 * @title TextmodeSource.conversions
 * @author codex
 */
const IMAGE_URL = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80';
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 8,
});

const brightnessPasses = [
	{
		mode: 'brightness',
		brightnessStart: 0,
		brightnessEnd: 78,
		characters: ' .,:;',
		charColorMode: 'fixed',
		charColor: '#38bdf8',
		cellColorMode: 'fixed',
		cellColor: '#00000000',
	},
	{
		mode: 'brightness',
		brightnessStart: 79,
		brightnessEnd: 168,
		characters: '--==++**',
		charColorMode: 'fixed',
		charColor: '#facc15',
		cellColorMode: 'fixed',
		cellColor: '#00000000',
	},
	{
		mode: 'brightness',
		brightnessStart: 169,
		brightnessEnd: 255,
		characters: '##%%@@',
		charRotation: 90,
		charColorMode: 'fixed',
		charColor: '#f8fafc',
		cellColorMode: 'fixed',
		cellColor: '#00000000',
	},
];

let plainSource;
let stackedSource;

function drawText(text, x, y, color = [235, 240, 255]) {
	t.push();
	t.translate(x - Math.floor(text.length / 2), y);
	t.charColor(color[0], color[1], color[2]);
	t.cellColor(0, 0, 0);

	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}

	t.pop();
}

function drawPanel(source, x, y, width, height, label, accent) {
	t.push();
	t.translate(x, y);
	t.image(source, width, height);
	t.pop();

	drawText(label, x, y + Math.floor(height * 0.5) + 3, accent);
}

t.setup(async () => {
	plainSource = await t.loadImage(IMAGE_URL);
	plainSource.characters(' .:-=+*#%@');
	plainSource.charColorMode('sampled');
	plainSource.cellColorMode('fixed');

	stackedSource = await t.loadImage(IMAGE_URL);
	stackedSource.conversions(brightnessPasses);
});

t.draw(() => {
	t.background(4, 7, 18);
	if (!plainSource || !stackedSource) return;

	const gap = Math.max(5, Math.floor(t.grid.cols * 0.06));
	const panelWidth = Math.max(16, Math.floor((t.grid.cols - gap * 3) / 2));
	const panelHeight = Math.max(12, Math.min(t.grid.rows - 12, Math.floor(panelWidth * 0.67)));
	const leftX = -Math.floor(panelWidth * 0.5) - Math.floor(gap * 0.5);
	const rightX = Math.floor(panelWidth * 0.5) + Math.floor(gap * 0.5);
	const y = -1;

	drawText('TextmodeSource.conversions()', 0, -Math.floor(t.grid.rows * 0.5) + 2, [255, 225, 120]);
	drawPanel(plainSource, leftX, y, panelWidth, panelHeight, 'single brightness', [150, 180, 210]);
	drawPanel(stackedSource, rightX, y, panelWidth, panelHeight, 'stacked ranges', [255, 255, 255]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

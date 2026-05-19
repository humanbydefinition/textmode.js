/**
 * @title TextmodeSource.clearConversions
 * @author codex
 */
const IMAGE_URL = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80';
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 8,
});

const stackedBrightnessPasses = [
	{
		mode: 'brightness',
		brightnessStart: 0,
		brightnessEnd: 70,
		characters: ' .,:',
		charColorMode: 'fixed',
		charColor: '#0ea5e9',
		cellColorMode: 'fixed',
		cellColor: '#00000000',
	},
	{
		mode: 'brightness',
		brightnessStart: 71,
		brightnessEnd: 160,
		characters: '==++**',
		flipX: true,
		charColorMode: 'fixed',
		charColor: '#fb7185',
		cellColorMode: 'fixed',
		cellColor: '#00000000',
	},
	{
		mode: 'brightness',
		brightnessStart: 161,
		brightnessEnd: 255,
		characters: '##@@',
		charRotation: 90,
		charColorMode: 'fixed',
		charColor: '#fef3c7',
		cellColorMode: 'fixed',
		cellColor: '#00000000',
	},
];

let stackedSource;
let clearedSource;

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

function applyStack(source) {
	source.conversions(stackedBrightnessPasses);
}

function clearToSingleBrightness(source) {
	source.clearConversions();
	source.conversionMode('brightness');
	source.brightnessRange(0, 255);
	source.characters(' .:-=+*#%@');
	source.charColorMode('sampled');
	source.cellColorMode('fixed');
}

function drawPanel(source, x, y, width, height, label, accent) {
	t.push();
	t.translate(x, y);
	t.image(source, width, height);
	t.pop();

	drawText(label, x, y + Math.floor(height * 0.5) + 3, accent);
}

t.setup(async () => {
	stackedSource = await t.loadImage(IMAGE_URL);
	applyStack(stackedSource);

	clearedSource = await t.loadImage(IMAGE_URL);
	applyStack(clearedSource);
	clearToSingleBrightness(clearedSource);
});

t.draw(() => {
	t.background(4, 7, 18);
	if (!stackedSource || !clearedSource) return;

	const gap = Math.max(5, Math.floor(t.grid.cols * 0.06));
	const panelWidth = Math.max(16, Math.floor((t.grid.cols - gap * 3) / 2));
	const panelHeight = Math.max(12, Math.min(t.grid.rows - 12, Math.floor(panelWidth * 0.65)));
	const leftX = -Math.floor(panelWidth * 0.5) - Math.floor(gap * 0.5);
	const rightX = Math.floor(panelWidth * 0.5) + Math.floor(gap * 0.5);
	const y = -1;

	drawText('TextmodeSource.clearConversions()', 0, -Math.floor(t.grid.rows * 0.5) + 2, [255, 225, 120]);
	drawPanel(stackedSource, leftX, y, panelWidth, panelHeight, 'stack active', [255, 255, 255]);
	drawPanel(clearedSource, rightX, y, panelWidth, panelHeight, 'cleared to single', [150, 180, 210]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

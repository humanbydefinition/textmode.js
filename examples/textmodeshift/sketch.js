/**
 * @title textmode.js | shader-based pixel shifting using ping-pong framebuffers
 * @license CC BY-NC-SA 4.0
 *
 * Learn more about textmode.js:
 * @link https://github.com/humanbydefinition/textmode.js
 * @link https://code.textmode.art
 * @link https://editor.textmode.art
 */

import { textmode } from 'textmode.js';
import { RectangleManager } from './RectangleManager';

import NoiseFragShader from './noise.frag';
import ShiftFragShader from './shift.frag';
import PushFragShader from './push.frag';

const LAYER_COUNT = 16;
const CUSTOM_LAYER_BLEND_MODE = 'normal';
const NOISE_REFRESH_INTERVAL = 60;

const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
	frameRate: 60,
});

let CHAR_VALUES;
let CHAR_VALUES_FLAT;

const PALETTE = [
	t.color('#000000').normalized.slice(0, 3),
	t.color('#1D2B53').normalized.slice(0, 3),
	t.color('#7E2553').normalized.slice(0, 3),
	t.color('#008751').normalized.slice(0, 3),
	t.color('#AB5236').normalized.slice(0, 3),
	t.color('#5F574F').normalized.slice(0, 3),
	t.color('#C2C3C7').normalized.slice(0, 3),
	t.color('#FFF1E8').normalized.slice(0, 3),
	t.color('#FF004D').normalized.slice(0, 3),
	t.color('#FFA300').normalized.slice(0, 3),
	t.color('#FFEC27').normalized.slice(0, 3),
	t.color('#00E436').normalized.slice(0, 3),
	t.color('#29ADFF').normalized.slice(0, 3),
	t.color('#83769C').normalized.slice(0, 3),
	t.color('#FF77A8').normalized.slice(0, 3),
	t.color('#FFCCAA').normalized.slice(0, 3),
];

const paletteColor = (index) => PALETTE[index % PALETTE.length];
const framebufferSize = () => ({ cols: t.grid.cols + 2, rows: t.grid.rows + 2 });

let noiseShader;
let shiftShader;
let pushShader;

const createRectangleManager = () => {
	const size = framebufferSize();
	const manager = new RectangleManager(size.cols, size.rows, 3, 0, 16);
	manager.initializeRectangles();
	return manager;
};

const createLayerState = (frameOffset = 0, color = paletteColor(0)) => {
	const size = framebufferSize();
	return {
		shiftFramebuffer: t.createFramebuffer({
			width: size.cols,
			height: size.rows,
		}),
		prevPushFramebuffer: t.createFramebuffer({
			width: size.cols,
			height: size.rows,
		}),
		nextPushFramebuffer: t.createFramebuffer({
			width: size.cols,
			height: size.rows,
		}),
		noiseFramebuffer: t.createFramebuffer({
			width: size.cols,
			height: size.rows,
		}),
		rectangleManager: createRectangleManager(),
		color,
		frameOffset,
		size,
	};
};

const refreshNoise = (state, seed = state.frameOffset) => {
	const { cols, rows } = state.size;
	state.noiseFramebuffer.begin();
	t.background(0);
	t.shader(noiseShader);
	t.setUniform('u_primaryColor', state.color);
	t.setUniform('u_gridSize', [cols, rows]);
	t.setUniform('u_frameCount', seed);
	t.setUniform('u_charValues', CHAR_VALUES_FLAT);
	t.setUniform('u_charCount', CHAR_VALUES.length);
	t.rect(cols, rows);
	state.noiseFramebuffer.end();
};

const resizeLayerState = (state) => {
	const size = framebufferSize();
	state.size = size;
	state.shiftFramebuffer.resize(size.cols, size.rows);
	state.prevPushFramebuffer.resize(size.cols, size.rows);
	state.nextPushFramebuffer.resize(size.cols, size.rows);
	state.noiseFramebuffer.resize(size.cols, size.rows);
	state.rectangleManager = createRectangleManager();
	refreshNoise(state);
};

const runSimulation = (state) => {
	const { cols, rows } = state.size;

	if (t.frameCount % 300 === 0) {
		state.rectangleManager.initializeRectangles();
	}

	if (t.frameCount % NOISE_REFRESH_INTERVAL === 0) {
		refreshNoise(state, t.frameCount + state.frameOffset);
	}

	state.shiftFramebuffer.begin();
	t.background(0);
	t.shader(shiftShader);
	t.setUniform('u_frameCount', t.frameCount + state.frameOffset);
	t.setUniform('u_gridSize', [cols, rows]);
	state.rectangleManager.rectangles.forEach((rect, index) => {
		t.setUniform(`u_rect${index}`, [rect.x, rect.y, rect.width, rect.height]);
	});
	t.rect(cols, rows);
	state.shiftFramebuffer.end();

	[state.prevPushFramebuffer, state.nextPushFramebuffer] = [state.nextPushFramebuffer, state.prevPushFramebuffer];

	state.nextPushFramebuffer.begin();
	t.background(0);
	t.shader(pushShader);
	t.setUniform('u_gridSize', [cols, rows]);
	t.setUniform('u_shiftMap', state.shiftFramebuffer.textures[0]);
	t.setUniform('u_noiseCharacter', state.noiseFramebuffer.textures[0]);
	t.setUniform('u_noisePrimaryColor', state.noiseFramebuffer.textures[1]);
	t.setUniform('u_previousCharacter', state.prevPushFramebuffer.textures[0]);
	t.setUniform('u_previousPrimaryColor', state.prevPushFramebuffer.textures[1]);
	t.setUniform('u_previousSecondaryColor', state.prevPushFramebuffer.textures[2]);
	t.rect(cols, rows);
	state.nextPushFramebuffer.end();
};

let baseState;
const customLayers = [];

t.setup(async () => {
	noiseShader = await t.createMaterialShader(NoiseFragShader);
	shiftShader = await t.createMaterialShader(ShiftFragShader);
	pushShader = await t.createMaterialShader(PushFragShader);

	console.log(t.font.characterMap.get('#'));

	CHAR_VALUES = [
		t.font.characterMap.get('¬').color.slice(0, 2),
		t.font.characterMap.get('æ').color.slice(0, 2),
		t.font.characterMap.get('ε').color.slice(0, 2),
		t.font.characterMap.get('⌐').color.slice(0, 2),
		t.font.characterMap.get('▓').color.slice(0, 2),
		t.font.characterMap.get('▒').color.slice(0, 2),
		t.font.characterMap.get('■').color.slice(0, 2),
		t.font.characterMap.get('□').color.slice(0, 2),
		t.font.characterMap.get('☺').color.slice(0, 2),
	];
	CHAR_VALUES_FLAT = CHAR_VALUES.flat();

	baseState = createLayerState(0, paletteColor(0));
	refreshNoise(baseState);

	for (let i = 0; i < LAYER_COUNT; i++) {
		const state = createLayerState((i + 1) * 1000, paletteColor(i + 1));
		refreshNoise(state);
		const layer = t.layers.add({ blendMode: CUSTOM_LAYER_BLEND_MODE, opacity: 1 });
		layer.draw(() => {
			t.clear();
			runSimulation(state);
			t.image(state.nextPushFramebuffer, t.grid.cols, t.grid.rows);
		});
		customLayers.push({ layer, state });
	}
});

t.draw(() => {
	if (!baseState) return;
	t.background(0, 0, 0, 255);
	runSimulation(baseState);
	t.image(baseState.nextPushFramebuffer, t.grid.cols, t.grid.rows);
});

t.windowResized(() => {
	if (!baseState) return;
	t.resizeCanvas(window.innerWidth, window.innerHeight);
	resizeLayerState(baseState);
	customLayers.forEach(({ state }) => resizeLayerState(state));
});

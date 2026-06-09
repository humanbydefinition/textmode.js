/**
 * @title conversion.TextmodeConversionManager.has
 */
const t = textmode.create({ pixelDensity: 1, width: window.innerWidth, height: window.innerHeight });

const labelLayer = t.layers.add();
let hasCustom = false;
let pulseShader = null;

t.setup(async () => {
	const vert = `#version 300 es
		in vec4 a_position;
		in vec2 a_uv;
		out vec2 v_uv;
		void main() {
			gl_Position = a_position;
			v_uv = a_uv;
		}
	`;

	const frag = `#version 300 es
		precision highp float;
		in vec2 v_uv;
		uniform sampler2D u_image;
		layout(location = 0) out vec4 o_character;
		layout(location = 1) out vec4 o_primaryColor;
		layout(location = 2) out vec4 o_secondaryColor;
		void main() {
			vec4 col = texture(u_image, v_uv);
			o_character = vec4(col.r, 0.0, 0.0, 0.0);
			o_primaryColor = vec4(col.rgb, 1.0);
			o_secondaryColor = vec4(0.0, 0.0, 0.0, 1.0);
		}
	`;

	pulseShader = await t.createShader(vert, frag);
});

t.draw(() => {
	t.background(6, 8, 20);
	hasCustom = t.conversions.has('custom-mode');
});

t.mouseClicked(() => {
	if (hasCustom) {
		t.conversions.unregister('custom-mode');
	} else {
		t.conversions.register({
			id: 'custom-mode',
			createShader: () => pulseShader,
			createUniforms: (ctx) => ({ u_image: ctx.source.texture }),
		});
	}
});

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	const isDefault = t.conversions.has('brightness');

	drawText('CONVERSION.HAS', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: CHECK REGISTERED STRATEGY', x, y++, 100, 220, 255);
	drawText('Performs a key lookup in conversions.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`has('brightness') : ${isDefault}`, x, y++, 180, 255, 180);
	drawText(
		`has('custom-mode'): ${hasCustom}`,
		x,
		y++,
		hasCustom ? 180 : 255,
		hasCustom ? 255 : 120,
		hasCustom ? 180 : 120
	);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(hasCustom ? 'Click to unregister.' : 'Click to register custom-mode.', x, y++, 120, 205, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

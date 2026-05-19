/**
 * @title conversion.TextmodeConversionManager.unregister
 * @author codex
 */
const IMAGE_URL = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80';
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

let source = null;
let strategyActive = false;
let pulseShader = null;

function drawLabel(text, y, color = [220, 220, 220]) {
	t.push();
	t.translate(-Math.floor(text.length / 2), y);
	t.charColor(color[0], color[1], color[2]);

	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}

	t.pop();
}

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
		uniform float u_time;
		layout(location = 0) out vec4 o_character;
		layout(location = 1) out vec4 o_primaryColor;
		layout(location = 2) out vec4 o_secondaryColor;

		void main() {
			vec4 sampleColor = texture(u_image, v_uv);
			float luma = dot(sampleColor.rgb, vec3(0.299, 0.587, 0.114));
			float pulse = 0.5 + 0.5 * sin(u_time + v_uv.x * 8.0);
			o_character = vec4(luma * pulse, 0.0, 0.0, 0.0);
			o_primaryColor = vec4(sampleColor.rgb, 1.0);
			o_secondaryColor = vec4(vec3(0.03, 0.05, 0.1), 1.0);
		}
	`;

	pulseShader = await t.createShader(vert, frag);
	t.conversions.register({
		id: 'pulse',
		createShader: () => pulseShader,
		createUniforms: (context) => ({
			u_image: context.source.texture,
			u_time: t.frameCount * 0.05,
		}),
	});

	source = await t.loadImage(IMAGE_URL);
	source.characters(' .:-=+*#%@');
	source.conversionMode('pulse');
	strategyActive = true;
});

t.draw(() => {
	t.background(5, 8, 18);

	if (source) {
		t.image(source, t.grid.cols - 8, t.grid.rows - 10);
	}

	drawLabel('custom conversion strategy', -Math.floor(t.grid.rows * 0.34), [255, 225, 140]);
	drawLabel(`has pulse ${t.conversions.has('pulse') ? 'yes' : 'no'}`, Math.floor(t.grid.rows * 0.28));
	drawLabel(
		strategyActive ? 'click to unregister' : 'refresh to restore strategy',
		Math.floor(t.grid.rows * 0.36),
		[120, 205, 255]
	);
});

t.mouseClicked(() => {
	if (!strategyActive || !source) {
		return;
	}

	source.conversionMode('brightness');
	t.conversions.unregister('pulse');
	strategyActive = false;
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

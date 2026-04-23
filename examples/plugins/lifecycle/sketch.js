/**
 * @title plugins.TextmodePlugin.install
 * @author codex
 */
let counters = {
	preSetup: 0,
	postSetup: 0,
	preDraw: 0,
	postDraw: 0,
	preRender: 0,
	postRender: 0,
	disposed: 0,
	uninstalled: 0,
};

const hookPlugin = {
	name: 'hook-plugin',
	install(_textmodifier, context) {
		context.registerPreSetupHook(() => {
			counters.preSetup += 1;
		});
		context.registerPostSetupHook(() => {
			counters.postSetup += 1;
		});
		context.registerPreDrawHook(() => {
			counters.preDraw += 1;
		});
		context.registerPostDrawHook(() => {
			counters.postDraw += 1;
		});
		context.registerLayerDisposedHook(() => {
			counters.disposed += 1;
		});
		context.registerLayerPreRenderHook(() => {
			counters.preRender += 1;
		});
		context.registerLayerPostRenderHook(() => {
			counters.postRender += 1;
		});
	},
	uninstall() {
		counters.uninstalled += 1;
	},
};

const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
	plugins: [hookPlugin],
});

const layer = t.layers.add({ fontSize: 16, blendMode: 'screen' });

function label(text, y, color = [220, 220, 220]) {
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

t.draw(() => {
	t.background(5, 7, 18);
	label('plugin lifecycle + hooks', -8, [255, 225, 140]);
	label(`setup ${counters.preSetup}/${counters.postSetup}`, -4);
	label(`draw ${counters.preDraw}/${counters.postDraw}`, 0);
	label(`render ${counters.preRender}/${counters.postRender}`, 4);
	label(`disposed ${counters.disposed}  uninstall ${counters.uninstalled}`, 8, [120, 205, 255]);
	label('click to destroy textmode', 12, [255, 180, 120]);
});

layer.draw(() => {
	t.clear();
	t.push();
	t.rotateZ(t.frameCount * 1.2);
	t.charColor(120, 205, 255);
	t.rect(18, 8);
	t.pop();
});

t.mouseClicked(() => {
	if (counters.uninstalled > 0) {
		return;
	}

	t.destroy();
	document.body.innerHTML = '<div style="padding: 24px; color: #e4e4e7; background: #09090b; min-height: 100vh;">plugin.uninstall() ran after destroy()</div>';
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

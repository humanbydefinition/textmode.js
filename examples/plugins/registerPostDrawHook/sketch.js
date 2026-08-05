/**
 * @title plugins.TextmodePluginContext.registerPostDrawHook
 */
let postDrawFrame = 0;

const vignettePlugin = {
	name: 'vignette-post',
	install(textmodifier, context) {
		context.registerPostDrawHook(() => {
			postDrawFrame++;
		});
	},
};

const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
	plugins: [vignettePlugin],
});

const labelLayer = t.layers.add();

t.draw(() => {
	t.background(6, 10, 20);
	const cols = t.grid.cols;
	const rows = t.grid.rows;
	const left = -Math.floor((cols - 1) / 2);
	const right = left + cols - 1;
	const top = -Math.floor(rows / 2);
	const bottom = top + rows - 1;
	const tm = t.frameCount * 0.05;

	for (let y = top; y <= bottom; y++) {
		for (let x = left; x <= right; x++) {
			const dist = Math.hypot(x, y);
			const angle = Math.atan2(y, x);
			const pattern = Math.sin(dist * 0.3 - tm * 2) * Math.cos(angle * 6);
			const norm = (pattern + 1) * 0.5;

			const charKey = norm > 0.7 ? '@' : norm > 0.4 ? '*' : norm > 0.2 ? '+' : '.';

			t.push();
			t.translate(x, y);
			t.charColor(Math.floor(80 + norm * 175), Math.floor(180 + norm * 75), Math.floor(255 - norm * 100));
			t.cellColor(Math.floor(6 + norm * 12), Math.floor(12 + norm * 14), Math.floor(28 + norm * 18));
			t.char(charKey);
			t.point();
			t.pop();
		}
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('PLUGINS.REGISTERPOSTDRAWHOOK', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: FRAME-END VIGNETTE OVERLAY', x, y++);
	t.charColor(140, 160, 190);
	t.print('Executes at the very end of the', x, y++);
	t.print('global t.draw() frame render.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`POST-DRAW FRAMES: ${postDrawFrame}`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

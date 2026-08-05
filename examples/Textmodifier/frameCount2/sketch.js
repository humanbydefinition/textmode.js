/**
 * @title Textmodifier.frameCount2
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

t.keyPressed((data) => {
	if (data.key === ' ') t.frameCount = 0;
});

t.draw(() => {
	t.background(8, 14, 24);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const growth = Math.min(1, t.frameCount / 180);

	const treeTop = -Math.floor(hh * 0.3);
	const treeBottom = Math.floor(hh * 0.75);
	const currentTop = Math.floor(treeBottom - (treeBottom - treeTop) * growth);

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const inTreeHeight = y >= currentTop && y <= treeBottom;
			const isBranch = inTreeHeight && Math.abs(x) <= (y - treeTop) * 0.45;
			const isTrunk = inTreeHeight && y > treeBottom - 3 && Math.abs(x) <= 1;
			const isStar = inTreeHeight && y === treeTop && x === 0 && growth >= 0.95;

			t.push();
			t.translate(x, y);

			if (isStar) {
				t.charColor(255, 220, 60);
				t.cellColor(45, 35, 10);
				t.char('*');
			} else if (isTrunk) {
				t.charColor(180, 110, 50);
				t.cellColor(28, 16, 8);
				t.char('|');
			} else if (isBranch) {
				const isBauble = Math.abs(x * 7 + y * 13) % 7 === 0;
				t.charColor(
					isBauble ? 255 : 40,
					isBauble ? ((y * 20) % 150) + 80 : Math.floor(180 + growth * 60),
					isBauble ? 100 : 100
				);
				t.cellColor(isBauble ? 40 : 10, isBauble ? 15 : 35, isBauble ? 25 : 20);
				t.char(isBauble ? 'o' : '*');
			} else {
				const snowTime = Math.floor(t.frameCount * 0.2);
				const isSnow = Math.abs(x * 11 + y * 17 + snowTime) % 43 === 0;
				t.charColor(isSnow ? 180 : 25, isSnow ? 210 : 40, isSnow ? 255 : 60);
				t.cellColor(8, 14, 24);
				t.char(isSnow ? '*' : '.');
			}

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
	t.print('TEXTMODIFIER.FRAMECOUNT2', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: WRITABLE FRAME RESET', x, y++);
	t.charColor(140, 160, 190);
	t.print('Press SPACE to reset frameCount = 0.', x, y++);
	t.print('Christmas tree growth rewinds to seed.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`FRAME: ${t.frameCount}`, x, y++);
	t.charColor(255, 220, 100);
	t.print('PRESS SPACE TO REWIND TREE', x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

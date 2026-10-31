/**
 * @title TextmodeLayer.setCamera
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const scene = t.layers.add();
const labelLayer = t.layers.add();

const CAMS = [
	{ name: '1: ORBITAL OVERVIEW', eye: [-36, -26, 46], target: [0, 8, 0] },
	{ name: '2: CLOSE INSPECTION', eye: [24, -4, 28], target: [0, 6, 0] },
	{ name: '3: TOP-DOWN RECON', eye: [0, -52, 4], target: [0, 4, 0] },
];
let active = 0,
	lastSwitch = 0;
const cameras = [];

t.setup(() => {
	for (const { eye, target: tgt } of CAMS) {
		const cam = scene.createCamera();
		cam.setPosition(...eye).lookAt(...tgt);
		cameras.push(cam);
	}
	scene.setCamera(cameras[0]);
});

function switchCam(idx) {
	active = idx % cameras.length;
	scene.setCamera(cameras[active]);
	lastSwitch = t.frameCount;
}

t.mouseClicked(() => switchCam(active + 1));

t.draw(() => {
	t.background(4, 12, 8);
	if (t.frameCount - lastSwitch >= 150) switchCam(active + 1);
});

scene.draw(() => {
	t.clear();
	t.pointLight([160, 255, 200], { x: 0, y: -25, z: 25 });
	const time = t.frameCount * 0.025;

	t.push();
	t.translate(0, 8, 0);

	// Rotating orbital torus ring
	t.push();
	t.rotateY(time * 30);
	t.rotateX(25);
	t.char('O');
	t.charColor(60, 220, 160);
	t.torus(14, 1.8);
	t.pop();

	// Glowing central core sphere
	t.char('*');
	t.charColor(220, 255, 230);
	t.sphere(3.5);

	// Vertical communication spire
	t.char('|');
	t.charColor(40, 140, 80);
	t.cylinder(1.2, 14);
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2) + 2;
	const top = -Math.floor(t.grid.rows / 2) + 2;

	t.push();
	t.printAlign('left', 'top');
	t.cellColor(4, 12, 8, 255);
	t.charColor(80, 240, 120);
	t.print('TEXTMODELAYER.SETCAMERA', left, top);
	t.charColor(20, 70, 35);
	t.print('------------------------------------', left, top + 1);
	t.charColor(220, 255, 230);
	t.print('CONCEPT: MULTI-CAMERA SWITCHING', left, top + 2);
	t.charColor(45, 140, 70);
	t.print('setCamera activates camera feed.', left, top + 3);
	t.charColor(80, 240, 120);
	t.print(`FEED: ${CAMS[active].name}`, left, top + 4);
	t.charColor(255, 180, 60);
	t.print(`SWITCH IN: ${150 - (t.frameCount - lastSwitch)} FRAMES`, left, top + 5);
	t.charColor(220, 255, 230);
	t.print('CLICK CANVAS TO CYCLE CAMERA', left, top + 6);
	t.pop();
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));

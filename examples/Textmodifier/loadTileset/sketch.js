/**
 * @title Textmodifier.loadTileset
 * @author codex
 */
const TILE_COLUMNS = 16;
const TILE_ROWS = 16;
const TILE_COUNT = TILE_COLUMNS * TILE_ROWS;

const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
const tilesLayer = t.layers.add({ fontSize: 8 });
const previewLayer = t.layers.add({ fontSize: 32, blendMode: 'additive' });

let tileset = null;

function getActiveTile() {
  const index = Math.floor((t.frameCount * 0.35) % TILE_COUNT);
  return {
    index,
    col: index % TILE_COLUMNS,
    row: Math.floor(index / TILE_COLUMNS),
  };
}

function drawLabel(label, x, y, color) {
  t.charColor(...color);

  for (let i = 0; i < label.length; i++) {
    t.push();
    t.translate(x - label.length / 2 + i + 0.5, y);
    t.char(label[i]);
    t.point();
    t.pop();
  }
}

t.setup(async () => {
  tileset = await t.loadTileset(
    {
      source: 'https://littlebitspace.com/resources/fonts/T64.png',
      columns: TILE_COLUMNS,
      rows: TILE_ROWS,
      count: TILE_COUNT,
    },
    false
  );

  await tilesLayer.loadTileset(tileset);
  await previewLayer.loadTileset(tileset);

  tilesLayer.useTileColors(false);
  previewLayer.useTileColors(false);
});

t.draw(() => {
  t.background(5, 8, 18);

  drawLabel('LOAD TILESET', 0, -Math.floor(t.grid.rows * 0.42), [255, 236, 160]);
  drawLabel('T64   16 X 16   8 X 8 CELLS', 0, -Math.floor(t.grid.rows * 0.35), [120, 210, 255]);

  if (!tileset) {
    drawLabel('LOADING TILESET...', 0, 0, [180, 190, 220]);
    return;
  }

  const activeTile = getActiveTile();
  drawLabel(`INDEX ${String(activeTile.index).padStart(3, '0')}`, 0, Math.floor(t.grid.rows * 0.36), [255, 220, 120]);
  drawLabel(`COL ${activeTile.col}   ROW ${activeTile.row}`, 0, Math.floor(t.grid.rows * 0.42), [160, 190, 255]);
});

tilesLayer.draw(() => {
  if (!tileset) {
    return;
  }

  t.clear();

  const activeTile = getActiveTile();
  const startX = -18;
  const startY = -7.5;

  for (let index = 0; index < TILE_COUNT; index++) {
    const col = index % TILE_COLUMNS;
    const row = Math.floor(index / TILE_COLUMNS);
    const distance = Math.abs(index - activeTile.index);
    const glow = Math.max(0, 1 - distance / 32);

    t.push();
    t.translate(startX + col, startY + row);
    t.char(index);
    t.charColor(70 + glow * 185, 110 + glow * 120, 160 + glow * 90);
    t.point();
    t.pop();
  }
});

previewLayer.draw(() => {
  if (!tileset) {
    return;
  }

  t.clear();

  const activeTile = getActiveTile();
  const previewX = 13;
  const previewY = 0;

  t.push();
  t.translate(previewX, previewY);
  t.rotateZ(t.frameCount * 1.5);
  t.char(activeTile.index);
  t.charColor(255, 245, 180);
  t.point();
  t.pop();

  for (let orbit = 0; orbit < 6; orbit++) {
    const angle = t.frameCount * 2 + orbit * 60;
    const radius = 4.5;
    const orbitIndex = (activeTile.index + orbit + 1) % TILE_COUNT;
    const x = previewX + Math.cos((angle * Math.PI) / 180) * radius;
    const y = previewY + Math.sin((angle * Math.PI) / 180) * radius;

    t.push();
    t.translate(x, y);
    t.char(orbitIndex);
    t.charColor(90, 210, 255);
    t.point();
    t.pop();
  }
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});

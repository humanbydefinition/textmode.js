/**
 * @title Textmodifier.background4
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
  // Switch between hex string and color object
  if (Math.floor(t.frameCount / 60) % 2 === 0) {
    t.background('#220044');
  } else {
    const col = t.color(0, 100, 50);
    t.background(col);
  }

  t.char('#');
  t.charColor(255);
  t.rect(15, 15);
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});

[textmode.js](../index.md) / Textmodifier

# Class: Textmodifier

Manages textmode rendering on a [`HTMLCanvasElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement) and provides methods for drawing,
font management, event handling, and animation control.

If the `Textmodifier` instance is created without a canvas parameter,
it creates a new `HTMLCanvasElement` to draw on using the `textmode.js` drawing API.
If a canvas is provided, it will use that canvas instead.

## Extends

- `(Anonymous class)`\<`this`\>.`IRenderingMixin`.`IFontMixin`.`IAnimationMixin`.`IMouseMixin`.`ITouchMixin`.`IKeyboardMixin`

## Implements

- `ITextmodifier`

## Properties

| Property | Modifier | Type | Description |
| ------ | ------ | ------ | ------ |
| <a id="_filtermanager"></a> `_filterManager` | `public` | [`TextmodeFilterManager`](../namespaces/filters/classes/TextmodeFilterManager.md) | **`Internal`** |

## Accessors

### canvas

#### Get Signature

```ts
get canvas(): HTMLCanvasElement;
```

Get the textmodifier canvas containing the rendered output.

##### Returns

`HTMLCanvasElement`

#### Implementation of

```ts
ITextmodifier.canvas
```

***

### drawFramebuffer

#### Get Signature

```ts
get drawFramebuffer(): TextmodeFramebuffer;
```

Get the WebGL framebuffer used for drawing operations in [Textmodifier.draw](#draw).

##### Returns

[`TextmodeFramebuffer`](TextmodeFramebuffer.md)

#### Implementation of

```ts
ITextmodifier.drawFramebuffer
```

***

### filters

#### Get Signature

```ts
get filters(): TextmodeFilterManager;
```

Access the filter manager for this Textmodifier instance.

Use this to register custom filters that can be applied both globally
(via [filter](#filter)) and on individual layers (via TextmodeLayer.filter).
Filters only need to be registered once and are available everywhere.

##### Example

```typescript
// Register a custom filter once
await t.filters.register('vignette', vignetteShader, {
    u_intensity: ['intensity', 0.5]
});

t.draw(() => {
    t.background(0);
    t.char('A');
    t.rect(10, 10);
    
    // Apply filter globally to final output
    t.filter('vignette', { intensity: 0.8 });
    
    // Or apply to a specific layer
    t.layers.base.filter('vignette', 0.5);
});
```

##### Returns

[`TextmodeFilterManager`](../namespaces/filters/classes/TextmodeFilterManager.md)

***

### font

#### Get Signature

```ts
get font(): TextmodeFont;
```

Get the current font object used for rendering.

##### Returns

[`TextmodeFont`](../namespaces/loadables/classes/TextmodeFont.md)

#### Implementation of

```ts
ITextmodifier.font
```

***

### frameCount

#### Get Signature

```ts
get frameCount(): number;
```

Get the current frame count.

##### Returns

`number`

#### Set Signature

```ts
set frameCount(value): void;
```

Set the current frame count.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `number` |

##### Returns

`void`

#### Implementation of

```ts
ITextmodifier.frameCount
```

***

### grid

#### Get Signature

```ts
get grid(): TextmodeGrid;
```

Get the current grid object used for rendering.

##### Returns

[`TextmodeGrid`](TextmodeGrid.md)

#### Implementation of

```ts
ITextmodifier.grid
```

***

### height

#### Get Signature

```ts
get height(): number;
```

Get the height of the canvas in pixels.

##### Returns

`number`

#### Implementation of

```ts
ITextmodifier.height
```

***

### isDisposed

#### Get Signature

```ts
get isDisposed(): boolean;
```

Check if the instance has been disposed/destroyed.

##### Returns

`boolean`

#### Implementation of

```ts
ITextmodifier.isDisposed
```

***

### lastKeyPressed

#### Get Signature

```ts
get lastKeyPressed(): null | string;
```

Get the last key that was pressed.

Returns the key string of the last pressed key, or null if no key has been pressed.

##### Example

```javascript
const t = textmode.create({ width: 800, height: 600 });

t.draw(() => {
  t.background(0);

  const lastKey = t.lastKeyPressed;
  if (lastKey) {
    // Display the last pressed key
    t.char(lastKey);
    t.charColor(255, 255, 255);
    t.point();
  }
});
```

##### Returns

`null` \| `string`

#### Implementation of

```ts
ITextmodifier.lastKeyPressed
```

***

### lastKeyReleased

#### Get Signature

```ts
get lastKeyReleased(): null | string;
```

Get the last key that was released.

Returns the key string of the last released key, or null if no key has been released.

##### Example

```javascript
const t = textmode.create({ width: 800, height: 600 });

t.draw(() => {
  t.background(0);

  const lastKey = t.lastKeyReleased;
  if (lastKey) {
    // Display the last released key
    t.char(lastKey);
    t.charColor(128, 128, 128);
    t.point();
  }
});
```

##### Returns

`null` \| `string`

#### Implementation of

```ts
ITextmodifier.lastKeyReleased
```

***

### layers

#### Get Signature

```ts
get layers(): TextmodeLayerManager;
```

##### Returns

[`TextmodeLayerManager`](../namespaces/layering/classes/TextmodeLayerManager.md)

***

### loading

#### Get Signature

```ts
get loading(): LoadingScreenManager;
```

Provides access to the loading screen manager to control boot-time loading UX.

##### Example

```javascript
const t = textmode.create({ width: 800, height: 600, loadingScreen: { message: 'loading...' } });

t.setup(async () => {
  // Initialize two loading phases
  const phase1 = t.loading.addPhase('Loading assets');
  const phase2 = t.loading.addPhase('Initializing game');

  // Start the first phase and simulate asset loading
  await phase1.track(async () => {
    for (let i = 0; i <= 5; i++) {
      phase1.report(i / 5);
      // Small delay — increases visibility of the loading animation
      await new Promise((r) => setTimeout(r, 200));
    }
  });

  // Start the second phase and simulate initialization
  await phase2.track(async () => {
    for (let i = 0; i <= 5; i++) {
      phase2.report(i / 5);
      await new Promise((r) => setTimeout(r, 150));
    }
  });

  // Optionally set a final message before the screen transitions away
  t.loading.message('Ready - enjoy!');
});
```

##### Returns

[`LoadingScreenManager`](../namespaces/loading/classes/LoadingScreenManager.md)

#### Implementation of

```ts
ITextmodifier.loading
```

***

### modifierState

#### Get Signature

```ts
get modifierState(): object;
```

Get current modifier key states.

Returns an object with boolean properties for each modifier key.

##### Example

```javascript
const t = textmode.create({ width: 800, height: 600 });

t.draw(() => {
    t.background(0);
    const mods = t.modifierState;

    // Change behavior based on modifier keys
    if (mods.shift) {
        // Draw in caps or with different behavior
        t.char('S');
        t.charColor(255, 255, 0);
        t.point();
    }

    if (mods.ctrl) {
        // Control key is pressed
        t.translate(2, 0);
        t.char('C');
        t.charColor(0, 255, 255);
        t.point();
    }
});
```

##### Returns

| Name | Type | Description |
| ------ | ------ | ------ |
| `alt` | `boolean` | Whether the Alt key is currently pressed |
| `ctrl` | `boolean` | Whether the Ctrl key is currently pressed |
| `meta` | `boolean` | Whether the Meta key *(Command on Mac, Windows key on Windows)* is currently pressed |
| `shift` | `boolean` | Whether the Shift key is currently pressed |

#### Implementation of

```ts
ITextmodifier.modifierState
```

***

### mouse

#### Get Signature

```ts
get mouse(): MousePosition;
```

Get the current mouse position in grid coordinates.

Returns the mouse position as grid cell coordinates *(column, row)*.

If the mouse is outside the grid or the instance is not ready,
it returns `{ x: -1, y: -1 }`.

##### Example

```javascript
const t = textmode.create({ width: 800, height: 600 });

t.draw(() => {
    t.background(0);
    
    // Convert mouse position from top-left origin to center-based origin
    const centerX = Math.round(t.mouse.x - (t.grid.cols - 1) / 2);
    const centerY = Math.round(t.mouse.y - (t.grid.rows - 1) / 2);
    
    t.translate(centerX, centerY);
    t.char('*');
    t.charColor(255, 0, 0);
    t.cellColor(100);
    t.point();
});
```

##### Returns

[`MousePosition`](../namespaces/input/namespaces/mouse/interfaces/MousePosition.md)

#### Implementation of

```ts
ITextmodifier.mouse
```

***

### overlay

#### Get Signature

```ts
get overlay(): 
  | undefined
  | TextmodeImage;
```

If in overlay mode, returns the [TextmodeImage](../namespaces/loadables/classes/TextmodeImage.md) instance capturing the target canvas/video content,
allowing further configuration of the conversion parameters.

##### Example

```javascript
// Create the textmode instance using the p5 canvas as input overlay
const t = textmode.create({ fontSize: 16, canvas: p.canvas, overlay: true });

// Configure overlay conversion once fonts and grid are ready
t.setup(() => {
  t.overlay
    .characters(' .:-=+*#%@')        // Character set for brightness mapping
    .cellColorMode('fixed')          // Use fixed background cell color
    .cellColor(0, 0, 0)              // Black background for each cell
    .charColorMode('sampled')        // Sample the character color from the image
    .background(0, 0, 0, 255);       // Black fallback for transparent pixels
});

// In the draw loop, pass the overlay into the text grid
t.draw(() => {
  t.clear();
  t.image(t.overlay, t.grid.cols, t.grid.rows);
});
```

##### Returns

  \| `undefined`
  \| [`TextmodeImage`](../namespaces/loadables/classes/TextmodeImage.md)

#### Implementation of

```ts
ITextmodifier.overlay
```

***

### pressedKeys

#### Get Signature

```ts
get pressedKeys(): string[];
```

Get all currently pressed keys.

Returns an array of key strings that are currently being held down.

##### Example

```javascript
const t = textmode.create({ width: 800, height: 600 });

t.draw(() => {
    t.background(0);

    const pressed = t.pressedKeys;

    // Display all currently pressed keys
    pressed.forEach((key, index) => {
        t.push();
        t.char(key[0] || '?'); // Show first character of key name
        t.charColor(255, 200, 100);
        t.translate(index, 0);
        t.point();
        t.pop();
    });
});
```

##### Returns

`string`[]

#### Implementation of

```ts
ITextmodifier.pressedKeys
```

***

### touches

#### Get Signature

```ts
get touches(): TouchPosition[];
```

Get the currently active touches in grid coordinates.

Returns a copy of each touch, including grid position, client coordinates, and pressure when
available. Use this inside a draw loop to react to active multi-touch scenarios.

##### Example

```javascript
t.draw(() => {
  for (const touch of t.touches) {
    t.point();
  }
});
```

##### Returns

[`TouchPosition`](../namespaces/input/namespaces/touch/interfaces/TouchPosition.md)[]

#### Implementation of

```ts
ITextmodifier.touches
```

***

### width

#### Get Signature

```ts
get width(): number;
```

Get the width of the canvas in pixels.

##### Returns

`number`

#### Implementation of

```ts
ITextmodifier.width
```

## Methods

### arc()

```ts
arc(
   width, 
   height, 
   startAngle, 
   endAngle): void;
```

Draw an arc with the current settings.
Position is controlled via [translate](#translate), [push](#push), and [pop](#pop).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `width` | `number` | Width of the arc |
| `height` | `number` | Height of the arc |
| `startAngle` | `number` | Starting angle in degrees |
| `endAngle` | `number` | Ending angle in degrees |

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({
  width: 800,
  height: 600,
})

t.draw(() => {
  t.background(0);
  t.rotateZ(t.frameCount);
  t.char('A');
  t.arc(10, 10, 0, 90);
});
```

#### Implementation of

```ts
ITextmodifier.arc
```

***

### background()

```ts
background(
   value, 
   g?, 
   b?, 
   a?): void;
```

Set the background color for the canvas.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `string` \| `number` \| [`TextmodeColor`](TextmodeColor.md) | A [TextmodeColor](TextmodeColor.md), hex string, grayscale value, or single RGB channel |
| `g?` | `number` | Optional green component when providing RGB channels or alpha when used with grayscale |
| `b?` | `number` | Optional blue component when providing RGB channels |
| `a?` | `number` | Optional alpha component (0-255) |

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({
  width: 800,
  height: 600,
});

const midnight = t.color('#0b1d3a');

t.draw(() => {
  // Set the background using a reusable color
  t.background(midnight);

  // Or inline RGB(A) notation
  //t.background(32, 48, 64);

  // Or hex string
  //t.background('#203040');

  t.char('M');
  t.rotateZ(t.frameCount * 2);
  t.rect(12, 12);
});
```

#### Implementation of

```ts
ITextmodifier.background
```

***

### bezierCurve()

```ts
bezierCurve(
   x1, 
   y1, 
   cp1x, 
   cp1y, 
   cp2x, 
   cp2y, 
   x2, 
   y2): void;
```

Draw a smooth cubic bezier curve between two points with two control points.
The curve thickness is controlled by the current [lineWeight](#lineweight) setting.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `x1` | `number` | Start point X coordinate |
| `y1` | `number` | Start point Y coordinate |
| `cp1x` | `number` | First control point X coordinate |
| `cp1y` | `number` | First control point Y coordinate |
| `cp2x` | `number` | Second control point X coordinate |
| `cp2y` | `number` | Second control point Y coordinate |
| `x2` | `number` | End point X coordinate |
| `y2` | `number` | End point Y coordinate |

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({
  width: 800,
  height: 600,
})

t.draw(() => {
  t.background(0);
  t.translate(-t.grid.cols / 2, -t.grid.rows / 2);

  // Draw a smooth S-curve
  t.char('*');
  t.charColor(255, 100, 255); // Magenta
  t.lineWeight(2);

  // Rotate the curve around its geometric center
  // The bezier's control points: (5,20), (15,5), (25,35), (35,20)
  // Center = average of points; translate to center then draw with local coordinates
  const cx = (5 + 15 + 25 + 35) / 4;
  const cy = (20 + 5 + 35 + 20) / 4;

  t.translate(cx, cy);
  t.rotateZ(t.frameCount * 2);
  t.bezierCurve(5 - cx, 20 - cy, 15 - cx, 5 - cy, 25 - cx, 35 - cy, 35 - cx, 20 - cy);
});
```

#### Implementation of

```ts
ITextmodifier.bezierCurve
```

***

### cellColor()

```ts
cellColor(
   value, 
   g?, 
   b?, 
   a?): void;
```

Set the cell background color for subsequent rendering operations.
Accepts channel values, hex strings, or a [TextmodeColor](TextmodeColor.md) instance.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `string` \| `number` \| [`TextmodeColor`](TextmodeColor.md) | Color object, hex string, or grayscale value (0-255) |
| `g?` | `number` | Optional green component when providing RGB values or alpha when using grayscale form |
| `b?` | `number` | Optional blue component when providing RGB values |
| `a?` | `number` | Optional alpha component (0-255) |

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({
  width: 800,
  height: 600,
})

const dusk = t.color('#203040');

t.draw(() => {
  t.background(0);
  t.cellColor(dusk);
  t.char('A');
  t.rotateZ(t.frameCount * 2);
  t.rect(10, 10);
});
```

#### Implementation of

```ts
ITextmodifier.cellColor
```

***

### char()

```ts
char(character): void;
```

Set the character to be used for subsequent rendering operations.
Accepts a single character string or a
[TextmodeColor](TextmodeColor.md) produced via [color](#color). When a color is provided,
the encoded glyph information is applied if available.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `character` | `string` \| [`TextmodeColor`](TextmodeColor.md) |

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({
  width: 800,
  height: 600,
})

t.draw(() => {
  t.background(0);
  t.char('A');
  t.rect(10, 10);

  t.char(";");
  t.translate(15, 0);
  t.rect(10, 10);
});
```

#### Implementation of

```ts
ITextmodifier.char
```

***

### charColor()

```ts
charColor(
   value, 
   g?, 
   b?, 
   a?): void;
```

Set the character color for subsequent rendering operations.
Accepts channel values, hex strings, or a [TextmodeColor](TextmodeColor.md) instance.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `string` \| `number` \| [`TextmodeColor`](TextmodeColor.md) | Color object, hex string, or grayscale value (0-255) |
| `g?` | `number` | Optional green component when providing RGB values or alpha when using grayscale form |
| `b?` | `number` | Optional blue component when providing RGB values |
| `a?` | `number` | Optional alpha component (0-255) |

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({
  width: 800,
  height: 600,
})

const hotPink = t.color(255, 105, 180);

t.draw(() => {
  t.background(0);
  t.char('A');
  t.charColor(hotPink);
  t.rect(10, 10);
});
```

#### Implementation of

```ts
ITextmodifier.charColor
```

***

### charRotation()

```ts
charRotation(degrees): void;
```

Set the character rotation angle for subsequent character rendering.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `degrees` | `number` | The rotation angle in degrees |

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({
  width: 800,
  height: 600,
})

t.draw(() => {
  t.background(0);
  t.char('A');
  t.charRotation(90); // Rotate character 90 degrees
  t.rotateZ(t.frameCount * 2);
  t.rect(10, 10);
});
```

#### Implementation of

```ts
ITextmodifier.charRotation
```

***

### clear()

```ts
clear(): void;
```

Clear the canvas.

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({
 width: 800,
 height: 600,
})

t.draw(() => {
 // Clear the canvas
 t.clear();
});
```

#### Implementation of

```ts
ITextmodifier.clear
```

***

### color()

```ts
color(
   value, 
   g?, 
   b?, 
   a?): TextmodeColor;
```

Create a reusable color object compatible with textmode drawing APIs.

Accepts grayscale, RGB, RGBA, and hex string values as arguments. Returned
[TextmodeColor](TextmodeColor.md) instances can be passed to [background](#background),
[char](#char), [charColor](#charcolor), [cellColor](#cellcolor), and more.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `string` \| `number` \| [`TextmodeColor`](TextmodeColor.md) | Grayscale value, hex string, single character, or an existing color |
| `g?` | `number` | Optional green component, or `value` when using grayscale form |
| `b?` | `number` | Optional blue component, or `value` when using grayscale form |
| `a?` | `number` | Optional alpha component when using RGB form Example usage of the [color](#color) helper. |

#### Returns

[`TextmodeColor`](TextmodeColor.md)

#### Example

```javascript
const t = textmode.create({ width: 800, height: 600 });

// Grayscale (0 = black, 255 = white)
const gray = t.color(128);

// RGB
const hotPink = t.color(255, 105, 180);

// RGBA (alpha 0-255)
const semiTransparentRed = t.color(255, 0, 0, 128);

// Hex string
const dusk = t.color('#203040');

t.draw(() => {
    // Using colors with other drawing APIs
    t.background(gray);
    t.charColor(hotPink);
    t.char('A');
    t.rect(5, 5);

    t.translate(5, 0);
    t.cellColor(dusk);
    t.char('*');
    t.rect(5, 5);

    t.translate(5, 0);
    t.charColor("#FF00FF");
    t.char("B");
    t.rect(5, 5);
});
```

#### Implementation of

```ts
ITextmodifier.color
```

***

### createFilterShader()

```ts
createFilterShader(fragmentSource): Promise<GLShader>;
```

Create a custom filter shader from fragment shader source code or a file path.
The fragment shader automatically receives the standard vertex shader inputs
and must output to the 3 MRT attachments (character/transform, primary color, secondary color).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fragmentSource` | `string` | The fragment shader source code or a file path (e.g., './shader.frag') |

#### Returns

`Promise`\<`GLShader`\>

A Promise that resolves to a compiled shader ready for use with [shader](#shader)

#### Example

```javascript
const t = textmode.create({
  width: 800,
  height: 600,
})

let waveShader;

t.setup(async () => {
  // Load shader from file
  waveShader = await t.createFilterShader('./shader.frag');
  
  // Or create from inline source
  // waveShader = await t.createFilterShader(`#version 300 es
  //   precision highp float;
  //   
  //   in vec2 v_uv;
  //   in vec3 v_character;
  //   in vec4 v_primaryColor;
  //   in vec4 v_secondaryColor;
  //   
  //   uniform float u_time;
  //   
  //   layout(location = 0) out vec4 o_character;
  //   layout(location = 1) out vec4 o_primaryColor;
  //   layout(location = 2) out vec4 o_secondaryColor;
  //   
  //   void main() {
  //     // Shader code here
  //   }
  // `);
});

t.draw(() => {
  if (waveShader) {
    t.shader(waveShader);
    t.setUniform('u_time', t.frameCount * 0.003);
    t.rect(t.grid.cols, t.grid.rows);
  }
});
```

#### Implementation of

```ts
ITextmodifier.createFilterShader
```

***

### createFramebuffer()

```ts
createFramebuffer(options): TextmodeFramebuffer;
```

Create a new framebuffer for offscreen rendering.

The framebuffer uses the same MRT structure as the main rendering pipeline.
By default it allocates 4 attachments (character + color data).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`TextmodeFramebufferOptions`](../type-aliases/TextmodeFramebufferOptions.md) | Configuration options for the framebuffer. |

#### Returns

[`TextmodeFramebuffer`](TextmodeFramebuffer.md)

A new Framebuffer instance.

#### Example

```javascript
const t = textmode.create({
  width: 800,
  height: 600,
});

// Create a framebuffer with 50x30 grid cells
const fb = t.createFramebuffer({
  width: 50,
  height: 30
});

t.draw(() => {
  // Render to framebuffer
  fb.begin();
  t.background(255, 0, 0);
  t.charColor(255);
  t.char('A');
  t.rect(20, 10);
  fb.end();
  
  // Render framebuffer to main canvas
  t.background(0);
  t.rotateZ(t.frameCount * 2);
  t.image(fb);
});
```

#### Implementation of

```ts
ITextmodifier.createFramebuffer
```

***

### createShader()

```ts
createShader(vertexSource, fragmentSource): Promise<GLShader>;
```

Create a custom shader from vertex and fragment shader source code or file paths.
Both the vertex and fragment shaders can be provided as inline GLSL source code
or as file paths (e.g., './vertex.vert', './fragment.frag').

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `vertexSource` | `string` | The vertex shader source code or a file path (e.g., './shader.vert') |
| `fragmentSource` | `string` | The fragment shader source code or a file path (e.g., './shader.frag') |

#### Returns

`Promise`\<`GLShader`\>

A Promise that resolves to a compiled shader ready for use with [shader](#shader)

#### Example

```javascript
const t = textmode.create({
  width: 800,
  height: 600,
});

let customShader;

t.setup(async () => {
  // Load shaders from files
  customShader = await t.createShader('./vertex.vert', './fragment.frag');
  
  // Or create from inline source
  // customShader = await t.createShader(
  //   `#version 300 es
  //   in vec2 a_position;
  //   void main() {
  //     gl_Position = vec4(a_position, 0.0, 1.0);
  //   }`,
  //   `#version 300 es
  //   precision highp float;
  //   out vec4 fragColor;
  //   void main() {
  //     fragColor = vec4(1.0, 0.0, 0.0, 1.0);
  //   }`
  // );
});

t.draw(() => {
  if (customShader) {
    t.shader(customShader);
    t.rect(t.grid.cols, t.grid.rows);
  }
});
```

#### Implementation of

```ts
ITextmodifier.createShader
```

***

### cursor()

```ts
cursor(cursor?): void;
```

Set the mouse cursor for the textmode canvas.

Provide any valid CSS cursor value (e.g. 'default', 'pointer', 'crosshair', 'move', 'text', 'grab', 'grabbing',
'none', 'zoom-in', 'zoom-out', 'ns-resize', 'ew-resize', 'nwse-resize', 'nesw-resize', etc.),
or a CSS `url(...)` cursor. Call with no argument or an empty string to reset to default.

See MDN for all options: https://developer.mozilla.org/en-US/docs/Web/CSS/cursor

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `cursor?` | `string` |

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({ width: 800, height: 600 });
const target = { width: 30, height: 15 };

t.draw(() => {
  t.background(0);
  t.charColor(255); // keep char visible
  t.char('*');
  t.rect(target.width, target.height);

  // Rectangle is centered at (0, 0) which is grid center
  // Calculate bounds relative to grid center
  const centerX = t.grid.cols / 2;
  const centerY = t.grid.rows / 2;

  const halfRectWidth = target.width / 2;
  const halfRectHeight = target.height / 2;

  const rectLeft = centerX - halfRectWidth;
  const rectRight = centerX + halfRectWidth;
  const rectTop = centerY - halfRectHeight;
  const rectBottom = centerY + halfRectHeight;

  const hovering =
    t.mouse.x >= rectLeft && t.mouse.x < rectRight &&
    t.mouse.y >= rectTop && t.mouse.y < rectBottom;

  t.cursor(hovering ? 'pointer' : 'default');
});
```

#### Implementation of

```ts
ITextmodifier.cursor
```

***

### destroy()

```ts
destroy(): void;
```

Completely destroy this Textmodifier instance and free all associated resources.

After calling this method, the instance should not be used and will be eligible for garbage collection.

#### Returns

`void`

#### Example

```javascript
// Create a textmodifier instance
const textmodifier = textmode.create();

// ...

// When done, completely clean up
textmodifier.destroy();

// Instance is now safely disposed and ready for garbage collection
```

#### Implementation of

```ts
ITextmodifier.destroy
```

***

### doubleTap()

```ts
doubleTap(callback): void;
```

Register a callback for double tap gestures.

Double taps reuse the same TouchTapEventData as taps with `taps` set to `2`. This
helper lets you supply a dedicated handler when you want to treat double taps differently.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | [`TouchTapHandler`](../namespaces/input/namespaces/touch/type-aliases/TouchTapHandler.md) | The function to call when a double tap is detected. |

#### Returns

`void`

#### Example

```javascript
t.doubleTap((data) => {
  console.log('Double tap detected', data.touch);
});
```

#### Implementation of

```ts
ITextmodifier.doubleTap
```

***

### draw()

```ts
draw(callback): void;
```

Set a draw callback function for the base layer.

This callback function is where all drawing commands should be placed for textmode rendering on the main layer.

If multiple layers are added via [Textmodifier.layers](#layers), each layer can have its own draw callback set via [TextmodeLayer.draw](../namespaces/layering/classes/TextmodeLayer.md#draw).
This allows for complex multi-layered compositions with independent rendering logic per layer.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | () => `void` | The function to call before each render |

#### Returns

`void`

#### Example

```javascript
// Create a textmodifier instance
const t = textmode.create({
 width: 800,
 height: 600,
});

// Set up draw callback
t.draw(() => {
  // Set background color
  t.background(128);
  
  // Draw a textmode rectangle
  t.char('A');
  t.rotateZ(t.frameCount * 2);
  t.rect(16, 16);
});
```

#### Implementation of

```ts
ITextmodifier.draw
```

***

### ellipse()

```ts
ellipse(width, height): void;
```

Draw an ellipse with the current settings.
Position is controlled via [translate](#translate), [push](#push), and [pop](#pop).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `width` | `number` | Width of the ellipse |
| `height` | `number` | Height of the ellipse |

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({
  width: 800,
  height: 600,
})

t.draw(() => {
  t.background(0);
  t.char('O');
  t.rotateZ(t.frameCount * 2);
  t.ellipse(10, 8);
});
```

#### Implementation of

```ts
ITextmodifier.ellipse
```

***

### filter()

#### Call Signature

```ts
filter<T>(name, params?): void;
```

Apply a filter to the final composited output.

Filters are applied after all layers are composited but before
the result is presented to the canvas. Multiple filters can be
queued per frame and will be applied in order.

##### Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* [`BuiltInFilterName`](../namespaces/filters/type-aliases/BuiltInFilterName.md) |

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `T` | The name of the filter to apply (built-in or custom) |
| `params?` | [`BuiltInFilterParams`](../namespaces/filters/interfaces/BuiltInFilterParams.md)\[`T`\] | Optional parameters for the filter |

##### Returns

`void`

##### Example

```typescript
t.draw(() => {
    t.background(0);
    t.charColor(255);
    t.char('A');
    t.rect(10, 10);
    
    // Apply built-in filters
    t.filter('grayscale', 0.5);
    t.filter('invert');
    
    // Chain multiple filters
    t.filter('sepia', { amount: 0.3 });
    t.filter('threshold', 0.5);
});
```

#### Call Signature

```ts
filter(name, params?): void;
```

Apply a filter to the final composited output.

Filters are applied after all layers are composited but before
the result is presented to the canvas. Multiple filters can be
queued per frame and will be applied in order.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The name of the filter to apply (built-in or custom) |
| `params?` | `unknown` | Optional parameters for the filter |

##### Returns

`void`

##### Example

```typescript
t.draw(() => {
    t.background(0);
    t.charColor(255);
    t.char('A');
    t.rect(10, 10);
    
    // Apply built-in filters
    t.filter('grayscale', 0.5);
    t.filter('invert');
    
    // Chain multiple filters
    t.filter('sepia', { amount: 0.3 });
    t.filter('threshold', 0.5);
});
```

***

### flipX()

```ts
flipX(toggle): void;
```

Toggle horizontal flipping for subsequent character rendering.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `toggle` | `boolean` | Whether to flip horizontally |

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({
  width: 800,
  height: 600,
})

t.draw(() => {
  t.background(0);
  t.flipX(true);
  t.char('A');
  t.rect(5, 5);
});
```

#### Implementation of

```ts
ITextmodifier.flipX
```

***

### flipY()

```ts
flipY(toggle): void;
```

Toggle vertical flipping for subsequent character rendering.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `toggle` | `boolean` | Whether to flip vertically |

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({
  width: 800,
  height: 600,
})

t.draw(() => {
  t.background(0);
  t.flipY(true);
  t.char('A');
  t.rect(5, 5);
});
```

#### Implementation of

```ts
ITextmodifier.flipY
```

***

### fontSize()

```ts
fontSize(size): void;
```

Set the font size used for rendering.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `size` | `number` | The font size to set. |

#### Returns

`void`

#### Example

```javascript
// Create a Textmodifier instance
const t = textmode.create();

t.setup(() => {
 // Set the font size to 32
 t.fontSize(32);
});

t.draw(() => {
 t.background(0);
 t.char('A');
 t.rect(5, 5);
});
```

#### Implementation of

```ts
ITextmodifier.fontSize
```

***

### frameRate()

```ts
frameRate(fps?): number | void;
```

Set the maximum frame rate. If called without arguments, returns the current measured frame rate.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fps?` | `number` | The maximum frames per second for rendering. |

#### Returns

`number` \| `void`

#### Example

```javascript
// Create a Textmodifier instance
const textmodifier = textmode.create();

// Set the maximum frame rate to 30 FPS
textmodifier.frameRate(30);

// Draw something at the set frame rate
t.draw(() => {
  t.background(0);
  t.char('A');
  t.rect(5, 5);
});
```

#### Implementation of

```ts
ITextmodifier.frameRate
```

***

### image()

```ts
image(
   source, 
   width?, 
   height?): void;
```

Draw a TextmodeFramebuffer or TextmodeSource (TextmodeImage/TextmodeVideo) to the current render target.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `source` | [`TextmodeFramebuffer`](TextmodeFramebuffer.md) \| `TextmodeSource` | The TextmodeFramebuffer or TextmodeSource to render |
| `width?` | `number` | Width to potentially scale the content |
| `height?` | `number` | Height to potentially scale the content |

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({
  width: 800,
  height: 600,
});

const fb = t.createFramebuffer({width: 30, height: 20});

t.draw(() => {
  // Draw something to the framebuffer
  fb.begin();
  t.clear();
  t.charColor(255, 0, 0);
  t.char('A');
  t.rect(20, 10);
  fb.end();
  
  // Clear main canvas and render framebuffer content
  t.background(0);
  
  // Render at original size
  t.image(fb);
  
  // Render scaled version
  // t.image(fb, 60, 40);
});
```

#### Implementation of

```ts
ITextmodifier.image
```

***

### invert()

```ts
invert(toggle): void;
```

Toggle color inversion for subsequent character rendering.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `toggle` | `boolean` | Whether to invert colors |

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({
  width: 800,
  height: 600,
})

t.draw(() => {
  t.background(0);
  t.invert(true);
  t.char('A');
  t.rotateZ(t.frameCount * 2);
  t.rect(5, 5);
});
```

#### Implementation of

```ts
ITextmodifier.invert
```

***

### isKeyPressed()

```ts
isKeyPressed(key): boolean;
```

Check if a specific key is currently being pressed.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | The key to check (e.g., 'a', 'Enter', 'ArrowLeft') |

#### Returns

`boolean`

true if the key is currently pressed, false otherwise

#### Example

```javascript
const t = textmode.create({ width: 800, height: 600 });

let playerX = 0;
let playerY = 0;

t.draw(() => {
  t.background(0);
  
  // Check for arrow keys to move a character
  if (t.isKeyPressed('ArrowUp')) {
    playerY -= 1;
  }
  if (t.isKeyPressed('ArrowDown')) {
    playerY += 1;
  }
  if (t.isKeyPressed('ArrowLeft')) {
    playerX -= 1;
  }
  if (t.isKeyPressed('ArrowRight')) {
    playerX += 1;
  }
  
  // Draw player character
  t.char('@');
  t.charColor(255, 255, 0);
  t.translate(playerX, playerY);
  t.point();
});
```

#### Implementation of

```ts
ITextmodifier.isKeyPressed
```

***

### isLooping()

```ts
isLooping(): boolean;
```

Check whether the textmodifier is currently running the automatic render loop.

#### Returns

`boolean`

True if the render loop is currently active, false otherwise.

#### Example

```javascript
const textmodifier = textmode.create(canvas);

// Check loop status in different states
console.log(textmodifier.isLooping()); // true (looping)

textmodifier.noLoop();
console.log(textmodifier.isLooping()); // false (not looping)

textmodifier.loop();
console.log(textmodifier.isLooping()); // true (looping)
```

#### Implementation of

```ts
ITextmodifier.isLooping
```

***

### keyPressed()

```ts
keyPressed(callback): void;
```

Set a callback function that will be called when a key is pressed down.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | [`KeyboardEventHandler`](../namespaces/input/namespaces/keyboard/type-aliases/KeyboardEventHandler.md) | The function to call when a key is pressed |

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({ width: 800, height: 600 });

let lastKey = '?';
let pulse = 0;

// Update some visual state when a key is pressed
t.keyPressed((data) => {
  lastKey = data.key;
  pulse = 6; // make the next frames brighter
});

t.draw(() => {
  t.background(0);
  
  // Fade brightness back down each frame
  const glow = Math.max(0, pulse--);
  const brightness = 120 + glow * 20;
  t.charColor(brightness, brightness, 0);
  
  // Show the last pressed key at the center of the grid
  t.push();
  t.char(lastKey.length ? lastKey[0] : '?');
  t.point();
  t.pop();
});
```

#### Implementation of

```ts
ITextmodifier.keyPressed
```

***

### keyReleased()

```ts
keyReleased(callback): void;
```

Set a callback function that will be called when a key is released.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | [`KeyboardEventHandler`](../namespaces/input/namespaces/keyboard/type-aliases/KeyboardEventHandler.md) | The function to call when a key is released |

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({ width: 800, height: 600 });

let lastRelease = '?';
let fade = 0;

// Capture the most recent key release and trigger a pulse
t.keyReleased((data) => {
  lastRelease = data.key;
  fade = 10;
});

t.draw(() => {
  t.background(0);

  // Dim the glow over time
  const glow = Math.max(0, fade--);
  const color = 80 + glow * 17;
  t.charColor(color, color, 255);
  
  t.char(lastRelease.length ? lastRelease[0] : '?');
  t.point();
});
```

#### Implementation of

```ts
ITextmodifier.keyReleased
```

***

### line()

```ts
line(
   x1, 
   y1, 
   x2, 
   y2): void;
```

Draw a line from point (x1, y1) to point (x2, y2) with the settings.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `x1` | `number` | X-coordinate of the line start point |
| `y1` | `number` | Y-coordinate of the line start point |
| `x2` | `number` | X-coordinate of the line end point |
| `y2` | `number` | Y-coordinate of the line end point |

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({
  width: 800,
  height: 600,
})

t.draw(() => {
  t.background(0);

  t.char('*');
  t.charColor(255, 100, 255); // Magenta
  t.lineWeight(2);

  const halfWidth = 5;
  const halfHeight = 7.5;

  t.push();
  t.rotateZ(t.frameCount * 2);
  t.line(-halfWidth, halfHeight, halfWidth, -halfHeight);
  t.pop();
});
```

#### Implementation of

```ts
ITextmodifier.line
```

***

### lineWeight()

```ts
lineWeight(weight): void;
```

Update the line weight (thickness) for subsequent [line](#line) and [bezierCurve](#beziercurve) calls.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `weight` | `number` | The line weight (thickness) to set. |

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({
    width: 800,
    height: 600,
})

t.draw(() => {
    t.background('#050810');

    // Animate the weight so every line breathes differently
    const layers = 6;
    const halfCols = t.grid.cols / 2;
    const spacing = 4;

    for (let i = 0; i < layers; i++) {
        const phase = t.frameCount * 0.03 + i * 0.8;
        const pulse = 0.75 + 3.25 * (0.5 + 0.5 * Math.sin(phase));
        const wobble = Math.sin(phase * 1.6) * 4;
        const centeredRow = (i - (layers - 1) / 2) * spacing;

        t.lineWeight(Math.round(pulse));
        t.charColor(160 + i * 12, 200 - i * 8, 255);
        t.char('-');
        t.line(
            -halfCols + 2,
            centeredRow + wobble,
            halfCols - 2,
            centeredRow - wobble,
        );
    }
});
```

#### Implementation of

```ts
ITextmodifier.lineWeight
```

***

### loadFont()

```ts
loadFont(fontSource): Promise<void>;
```

Update the font used for rendering.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fontSource` | `string` | The URL of the font to load. |

#### Returns

`Promise`\<`void`\>

#### Example

```javascript
// Create a Textmodifier instance
const t = textmode.create();

t.setup(async () => {
 // Load a custom font from a URL
 await t.loadFont('https://example.com/fonts/myfont.ttf');

 // Local font example
 // await t.loadFont('./fonts/myfont.ttf'); 
});
```

#### Implementation of

```ts
ITextmodifier.loadFont
```

***

### loadImage()

```ts
loadImage(src): Promise<TextmodeImage>;
```

Load an image and return a TextmodeImage that can be drawn with image().

The loaded image can be rendered to the canvas using the [image](#image) method.
This function returns a Promise that resolves when the image has loaded.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `src` | `string` \| `HTMLImageElement` | URL or existing HTMLImageElement |

#### Returns

`Promise`\<[`TextmodeImage`](../namespaces/loadables/classes/TextmodeImage.md)\>

A Promise that resolves to a TextmodeImage object

#### Example

```javascript
const t = textmode.create({
    width: 800,
    height: 600,
});

let img;

t.setup(async () => {
    img = await t.loadImage('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80');
    img.characters(" .:-=+*#%@");
});

t.draw(() => {
    t.background(0);

    if (img) {
        // Draw the loaded image
        t.image(img);
    }
});
```

#### Implementation of

```ts
ITextmodifier.loadImage
```

***

### loadVideo()

```ts
loadVideo(src, options?): Promise<TextmodeVideo>;
```

Load a video and return a TextmodeVideo that can be drawn with image().

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `src` | `string` \| `HTMLVideoElement` | URL or existing HTMLVideoElement |
| `options?` | [`TextmodeVideoOptions`](../namespaces/loadables/interfaces/TextmodeVideoOptions.md) | Optional configuration for preloading behavior. Provide `frameRate` to preload frames, `onProgress` to observe preload progress, `onComplete` to know when preloading finished, and `onError` to catch preload failures. |

#### Returns

`Promise`\<[`TextmodeVideo`](../namespaces/loadables/classes/TextmodeVideo.md)\>

#### Example

```javascript
const t = textmode.create({
    width: 800,
    height: 600,
});

let video;

t.setup(async () => {
    video = await t.loadVideo('https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4');
    // Start playback and enable looping so the video keeps playing
    video.play();
    video.loop();

    video.characters(" .:-=+*#%@");
});

t.draw(() => {
    t.background(0);

    if (video) {
        // Draw the loaded video
        t.image(video);
    }
});
```

#### Implementation of

```ts
ITextmodifier.loadVideo
```

***

### longPress()

```ts
longPress(callback): void;
```

Register a callback for long press gestures.

A long press is emitted when the user keeps a finger on the canvas without moving beyond the
configured tolerance. The event includes the press duration in milliseconds.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | [`TouchLongPressHandler`](../namespaces/input/namespaces/touch/type-aliases/TouchLongPressHandler.md) | The function to call when a long press gesture is detected. |

#### Returns

`void`

#### Example

```javascript
t.longPress((data) => {
  console.log(`Long press for ${Math.round(data.duration)}ms`);
});
```

#### Implementation of

```ts
ITextmodifier.longPress
```

***

### loop()

```ts
loop(): void;
```

Resume the rendering loop if it was stopped by [noLoop](#noloop).

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({ width: 800, height: 600 });

// Toggle loop on SPACE
t.keyPressed((data) => {
  if (data.key === ' ') {
    if (t.isLooping()) {
      t.noLoop();
    } else {
      t.loop();
    }
  }
});

t.draw(() => {
  t.background(0);
  t.char('A');
  t.charColor(255, 255, 255);
  t.rotateZ(t.frameCount * 2);
  t.rect(16, 16);
});
```

#### Implementation of

```ts
ITextmodifier.loop
```

***

### mouseClicked()

```ts
mouseClicked(callback): void;
```

Set a callback function that will be called when the mouse is clicked.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | [`MouseEventHandler`](../namespaces/input/namespaces/mouse/type-aliases/MouseEventHandler.md) | The function to call when the mouse is clicked |

#### Returns

`void`

#### Example

```javascript
// Click to spawn ripples.

const t = textmode.create({ width: 800, height: 600 });

// Store ripples as { x, y } in center-based coordinates
const ripples = [];

// Create a ripple at the clicked grid cell
t.mouseClicked((data) => {
  // Convert top-left grid coords to center-based coords (matching draw-time origin)
  const centerX = Math.round(data.position.x - (t.grid.cols - 1) / 2);
  const centerY = Math.round(data.position.y - (t.grid.rows - 1) / 2);

  ripples.push({ x: centerX, y: centerY, age: 0, maxAge: 20 });
});

t.draw(() => {
  t.background(0);

  // Update and draw ripples (iterate backwards when removing)
  for (let i = ripples.length - 1; i >= 0; i--) {
    const r = ripples[i];
    r.age++;
    const life = r.age / r.maxAge;                    // 0..1
    const radius = 1 + life * 7;                      // expands from ~1 to ~8
    const intensity = Math.round(255 * (1 - life));   // fades out

    // Keep cells dark so characters stand out
    t.charColor(intensity, intensity, 255);
    t.cellColor(0);

    t.push();
    // position already in center-based coordinates
    t.translate(r.x, r.y);

    // Draw a ring by sampling points around the circle
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 8) {
      const ox = Math.round(Math.cos(a) * radius);
      const oy = Math.round(Math.sin(a) * radius);
      t.push();
      t.translate(ox, oy);
      t.char('*');
      t.point();
      t.pop();
    }

    t.pop();

    // Remove finished ripples
    if (r.age > r.maxAge) {
      ripples.splice(i, 1);
    }
  }

  // Show crosshair for the current mouse cell. Convert t.mouse (top-left origin)
  // to the center-based coordinates used for drawing just like above.
  if (t.mouse.x !== -1 && t.mouse.y !== -1) {
    const cx = Math.round(t.mouse.x - (t.grid.cols - 1) / 2);
    const cy = Math.round(t.mouse.y - (t.grid.rows - 1) / 2);
    t.push();
    t.charColor(180);
    t.translate(cx, cy);
    t.char('+');
    t.point();
    t.pop();
  }
});
```

#### Implementation of

```ts
ITextmodifier.mouseClicked
```

***

### mouseMoved()

```ts
mouseMoved(callback): void;
```

Set a callback function that will be called when the mouse moves.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | [`MouseEventHandler`](../namespaces/input/namespaces/mouse/type-aliases/MouseEventHandler.md) | The function to call when the mouse moves |

#### Returns

`void`

#### Example

```javascript
// Trail of particles following the mouse.

const t = textmode.create({ width: 800, height: 600 });

const trail = [];
const maxTrail = 120;
let lastMouse = null;

t.mouseMoved((data) => {
  if (data.position.x === -1 || data.position.y === -1) return;
  
  // Convert to center-based coords
  const cx = Math.round(data.position.x - (t.grid.cols - 1) / 2);
  const cy = Math.round(data.position.y - (t.grid.rows - 1) / 2);
  
  // Spawn multiple particles based on movement speed
  const dx = lastMouse ? cx - lastMouse.x : 0;
  const dy = lastMouse ? cy - lastMouse.y : 0;
  const speed = Math.sqrt(dx * dx + dy * dy);
  const count = Math.max(1, Math.ceil(speed * 1.5));
  
  for (let i = 0; i < count; i++) {
    trail.push({ 
      x: cx, 
      y: cy, 
      age: 0, 
      maxAge: 15 + Math.random() * 10 
    });
  }
  
  lastMouse = { x: cx, y: cy };
  if (trail.length > maxTrail) trail.splice(0, trail.length - maxTrail);
});

t.draw(() => {
  t.background(0);
  
  // Draw and age particles
  for (let i = trail.length - 1; i >= 0; i--) {
    const p = trail[i];
    p.age++;
    
    if (p.age >= p.maxAge) {
      trail.splice(i, 1);
      continue;
    }
    
    const life = 1 - (p.age / p.maxAge);
    const brightness = Math.round(255 * life);
    const chars = ['.', '*', 'o', '@'];
    const idx = Math.floor(life * chars.length);
    
    t.push();
    t.charColor(brightness, brightness * 0.6, 255);
    t.translate(p.x, p.y);
    t.char(chars[Math.min(idx, chars.length - 1)]);
    t.point();
    t.pop();
  }
});
```

#### Implementation of

```ts
ITextmodifier.mouseMoved
```

***

### mousePressed()

```ts
mousePressed(callback): void;
```

Set a callback function that will be called when the mouse is pressed down.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | [`MouseEventHandler`](../namespaces/input/namespaces/mouse/type-aliases/MouseEventHandler.md) | The function to call when the mouse is pressed |

#### Returns

`void`

#### Example

```javascript
// Hold mouse to spray particles that fall with gravity.

const t = textmode.create({ width: 800, height: 600 });

const particles = [];
let pressing = false;

t.mousePressed((data) => {
  if (data.position.x === -1 || data.position.y === -1) return;
  pressing = true;
});

t.mouseReleased(() => {
  pressing = false;
});

t.draw(() => {
  t.background(0);
  
  // Spawn particles while pressing
  if (pressing && t.mouse.x !== -1) {
    const cx = Math.round(t.mouse.x - (t.grid.cols - 1) / 2);
    const cy = Math.round(t.mouse.y - (t.grid.rows - 1) / 2);
    
    for (let i = 0; i < 3; i++) {
      particles.push({
        x: cx,
        y: cy,
        vx: (Math.random() - 0.5) * 0.8,
        vy: Math.random() * -0.5 - 0.2,
        age: 0,
        maxAge: 30 + Math.random() * 20
      });
    }
  }
  
  // Update and draw particles
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.age++;
    p.vy += 0.08; // gravity
    p.x += p.vx;
    p.y += p.vy;
    
    if (p.age >= p.maxAge) {
      particles.splice(i, 1);
      continue;
    }
    
    const life = 1 - (p.age / p.maxAge);
    const brightness = Math.round(255 * life);
    
    t.push();
    t.charColor(brightness, brightness * 0.7, 100);
    t.translate(Math.round(p.x), Math.round(p.y));
    t.char(life > 0.5 ? 'o' : '.');
    t.point();
    t.pop();
  }
});
```

#### Implementation of

```ts
ITextmodifier.mousePressed
```

***

### mouseReleased()

```ts
mouseReleased(callback): void;
```

Set a callback function that will be called when the mouse is released.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | [`MouseEventHandler`](../namespaces/input/namespaces/mouse/type-aliases/MouseEventHandler.md) | The function to call when the mouse is released |

#### Returns

`void`

#### Example

```javascript
// Drag to draw lines that fade over time.

const t = textmode.create({ width: 800, height: 600 });

const lines = [];
let dragStart = null;

t.mousePressed((data) => {
  if (data.position.x === -1 || data.position.y === -1) return;
  const cx = Math.round(data.position.x - (t.grid.cols - 1) / 2);
  const cy = Math.round(data.position.y - (t.grid.rows - 1) / 2);
  dragStart = { x: cx, y: cy };
});

t.mouseReleased((data) => {
  if (!dragStart || data.position.x === -1) return;
  const cx = Math.round(data.position.x - (t.grid.cols - 1) / 2);
  const cy = Math.round(data.position.y - (t.grid.rows - 1) / 2);
  
  // Calculate line center and local endpoints
  const centerX = (dragStart.x + cx) / 2;
  const centerY = (dragStart.y + cy) / 2;
  const dx = cx - dragStart.x;
  const dy = cy - dragStart.y;
  
  lines.push({
    cx: centerX, cy: centerY,
    dx: dx, dy: dy,
    age: 0, maxAge: 30
  });
  dragStart = null;
});

t.draw(() => {
  t.background(0);
  
  // Draw stored lines with fade
  for (let i = lines.length - 1; i >= 0; i--) {
    const ln = lines[i];
    ln.age++;
    
    if (ln.age >= ln.maxAge) {
      lines.splice(i, 1);
      continue;
    }
    
    const life = 1 - (ln.age / ln.maxAge);
    const brightness = Math.round(150 * life);
    
    t.push();
    t.charColor(brightness, brightness, 255);
    t.char('-');
    t.lineWeight(2);
    t.translate(ln.cx, ln.cy);
    t.line(-ln.dx / 2, -ln.dy / 2, ln.dx / 2, ln.dy / 2);
    t.pop();
  }
  
  // Draw current drag line
  if (dragStart && t.mouse.x !== -1) {
    const cx = Math.round(t.mouse.x - (t.grid.cols - 1) / 2);
    const cy = Math.round(t.mouse.y - (t.grid.rows - 1) / 2);
    const centerX = (dragStart.x + cx) / 2;
    const centerY = (dragStart.y + cy) / 2;
    const dx = cx - dragStart.x;
    const dy = cy - dragStart.y;
    
    t.push();
    t.charColor(255, 200, 0);
    t.char('o');
    t.lineWeight(2);
    t.translate(centerX, centerY);
    t.line(-dx / 2, -dy / 2, dx / 2, dy / 2);
    t.pop();
  }
});
```

#### Implementation of

```ts
ITextmodifier.mouseReleased
```

***

### mouseScrolled()

```ts
mouseScrolled(callback): void;
```

Set a callback function that will be called when the mouse wheel is scrolled.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | [`MouseEventHandler`](../namespaces/input/namespaces/mouse/type-aliases/MouseEventHandler.md) | The function to call when the mouse wheel is scrolled |

#### Returns

`void`

#### Example

```javascript
// Scroll to create expanding rings.

const t = textmode.create({ width: 800, height: 600 });

const rings = [];

t.mouseScrolled((data) => {
  if (data.position.x === -1 || data.position.y === -1) return;
  
  const cx = Math.round(data.position.x - (t.grid.cols - 1) / 2);
  const cy = Math.round(data.position.y - (t.grid.rows - 1) / 2);
  
  // Use scroll delta to determine ring intensity and direction
  const scrollSpeed = 2;
  const intensity = Math.min(scrollSpeed * 30, 255);
  const scrollDown = (data.delta?.y || 0) > 0;
  
  rings.push({
    x: cx,
    y: cy,
    radius: 1,
    maxRadius: 5 + scrollSpeed * 0.5,
    color: intensity,
    scrollDown: scrollDown,
    age: 0,
    maxAge: 20
  });
});

t.draw(() => {
  t.background(0);
  
  // Update and draw rings
  for (let i = rings.length - 1; i >= 0; i--) {
    const r = rings[i];
    r.age++;
    r.radius += (r.maxRadius - r.radius) * 0.15;
    
    if (r.age >= r.maxAge) {
      rings.splice(i, 1);
      continue;
    }
    
    const life = 1 - (r.age / r.maxAge);
    const brightness = Math.round(r.color * life);
    
    t.push();
    // Blue for scroll down, orange for scroll up
    if (r.scrollDown) {
      t.charColor(brightness * 0.5, brightness * 0.8, 255);
    } else {
      t.charColor(255, brightness * 0.6, brightness * 0.3);
    }
    t.translate(r.x, r.y);
    
    // Draw ring
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 6) {
      const ox = Math.round(Math.cos(a) * r.radius);
      const oy = Math.round(Math.sin(a) * r.radius);
      t.push();
      t.translate(ox, oy);
      t.char('o');
      t.point();
      t.pop();
    }
    t.pop();
  }
});
```

#### Implementation of

```ts
ITextmodifier.mouseScrolled
```

***

### noLoop()

```ts
noLoop(): void;
```

Stop the automatic rendering loop.

This method pauses the render loop without, allowing
it to be resumed later with [loop](#loop). This is useful for temporarily pausing
animation while maintaining the ability to continue it.

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({ width: 800, height: 600 });

// Toggle loop on SPACE
t.keyPressed((data) => {
  if (data.key === ' ') {
    if (t.isLooping()) {
      t.noLoop();
    } else {
      t.loop();
    }
  }
});

t.draw(() => {
  t.background(0);
  t.char('A');
  t.charColor(255, 255, 255);
  t.rotateZ(t.frameCount * 2);
  t.rect(16, 16);
});
```

#### Implementation of

```ts
ITextmodifier.noLoop
```

***

### ortho()

```ts
ortho(): void;
```

Enable orthographic projection for the current frame.

By default, textmode.js uses perspective projection. Calling this function
switches to orthographic projection for all geometries drawn in the current frame.
Orthographic projection renders objects without perspective distortion - parallel 
lines remain parallel regardless of depth, and objects don't appear smaller as 
they move away from the camera.

**Note**: The projection mode resets to perspective at the start of each frame,
so `ortho()` must be called in every frame where you want orthographic projection.

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({
  width: 800,
  height: 600,
});

let useOrtho = false;

// Toggle between ortho and perspective with spacebar
t.keyPressed((data) => {
  if (data.key === ' ') {
    useOrtho = !useOrtho;
  }
});

t.draw(() => {
  t.background(0);
  
  // Enable orthographic projection if toggled on
  if (useOrtho) {
    t.ortho();
  }
  
  // Animate the rectangle back and forth on the z-axis
  const zPos = Math.sin(t.frameCount * 0.01) * 50;
  
  t.push();
  t.translate(0, 0, zPos);
  t.rotateZ(t.frameCount * 2);
  t.rotateX(t.frameCount * 1.5);
  t.char('A');
  t.charColor(255, 100, 200);
  t.rect(16, 16);
  t.pop();
});
```

#### Implementation of

```ts
ITextmodifier.ortho
```

***

### pinch()

```ts
pinch(callback): void;
```

Register a callback for pinch gestures, receiving scale deltas.

Pinch gestures involve two touch points. The callback receives the current scale relative to
the initial distance and the change since the previous update, enabling zoom interactions.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | [`TouchPinchHandler`](../namespaces/input/namespaces/touch/type-aliases/TouchPinchHandler.md) | The function to call when a pinch gesture is detected. |

#### Returns

`void`

#### Example

```javascript
t.pinch((data) => {
  console.log(`Pinch scale: ${data.scale.toFixed(2)}`);
});
```

#### Implementation of

```ts
ITextmodifier.pinch
```

***

### point()

```ts
point(): void;
```

Draw a 1x1 rectangle with the current settings.

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({ width: 800, height: 600 });

t.draw(() => {
  t.background(0);

  const angle = t.frameCount * 0.06;
  const radius = Math.min(t.grid.cols, t.grid.rows) * 0.35;

  // Draw a short trail of points behind the leading point
  for (let i = 0; i < 10; i++) {
    const a = angle - i * 0.18;
    const r = radius * (1 - i * 0.08);
    const x = Math.round(Math.cos(a) * r);
    const y = Math.round(Math.sin(a) * r);

    // Color and brightness fade across the trail
    const brightness = Math.max(40, 255 - i * 20);
    const blue = Math.max(60, 255 - i * 25);
    const green = 120 + i * 8;

    t.push();
    t.translate(x, y);
    t.char('*');
    t.charColor(brightness, green, blue);
    t.point();

    t.pop();
  }

  // Leading point drawn with highest brightness
  t.char('@');
  t.charColor(255, 255, 160);
  t.translate(Math.round(Math.cos(angle) * radius), Math.round(Math.sin(angle) * radius));
  t.point();
});
```

#### Implementation of

```ts
ITextmodifier.point
```

***

### pop()

```ts
pop(): void;
```

Restore the most recently saved rendering state from the state stack.
Use with [push](#push) to isolate style changes within a block.

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({ width: 800, height: 600 });

t.draw(() => {
  t.background(0);

  // Draw three rotating shapes with isolated transformations and colors
  for (let i = 0; i < 3; i++) {
    t.push(); // Save state
    t.translate(i * 12 - 12, 0);
    t.rotateZ(t.frameCount * (1 + i * 0.5));
    t.charColor(100 + i * 70, 255 - i * 50, 150);
    t.char(['*', '@', '#'][i]);
    t.rect(8, 8);
    t.pop(); // Restore state - next iteration starts fresh
  }
});
```

#### Implementation of

```ts
ITextmodifier.pop
```

***

### push()

```ts
push(): void;
```

Save the current rendering state to the state stack.
Use with [pop](#pop) to isolate style changes within a block.

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({ width: 800, height: 600 });

t.draw(() => {
  t.background(0);

  // Draw three rotating shapes with isolated transformations and colors
  for (let i = 0; i < 3; i++) {
    t.push(); // Save state
    t.translate(i * 12 - 12, 0);
    t.rotateZ(t.frameCount * (1 + i * 0.5));
    t.charColor(100 + i * 70, 255 - i * 50, 150);
    t.char(['*', '@', '#'][i]);
    t.rect(8, 8);
    t.pop(); // Restore state - next iteration starts fresh
  }
});
```

#### Implementation of

```ts
ITextmodifier.push
```

***

### rect()

```ts
rect(width?, height?): void;
```

Draw a rectangle with the current settings.
Position is controlled via [translate](#translate), [push](#push), and [pop](#pop).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `width?` | `number` | Width of the rectangle |
| `height?` | `number` | Height of the rectangle |

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({
  width: 800,
  height: 600,
})

t.draw(() => {
  // Set the background color to black
  t.background(0);

  // Position and draw a filled rectangle
  t.char('A');
  t.charColor(255, 255, 255); // White
  t.rotateZ(t.frameCount * 2);
  t.rect(16, 16);
});
```

#### Implementation of

```ts
ITextmodifier.rect
```

***

### redraw()

```ts
redraw(n?): void;
```

Execute the render function a specified number of times.

This method is useful when the render loop has been stopped with [noLoop](#noloop), 
allowing you to trigger rendering on demand.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `n?` | `number` | The number of times to execute the render function. Defaults to 1. |

#### Returns

`void`

#### Example

```javascript
// Press SPACE to manually trigger single frames while loop is paused.

const t = textmode.create({ width: 800, height: 600 });

let rotation = 0;

t.keyPressed((data) => {
  if (data.key === ' ') {
    rotation += 15; // Increment rotation
    t.redraw(); // Manually trigger one frame
  }
});

t.draw(() => {
  if(t.frameCount === 1) {
    t.noLoop();
  }

  t.background(0);
  
  t.push();
  t.char('A');
  t.charColor(100, 200, 255);
  t.rotateZ(rotation);
  t.rect(13, 13);
  t.pop();
  
  // Show instruction text
  t.push();
  t.translate(-5, -10);
  t.charColor(150);
  const msg = 'PRESS SPACE';
  [...msg].forEach((char, i) => {
    t.push();
    t.translate(i, 0);
    t.char(char);
    t.point();
    t.pop();
  });
  t.pop();
});
```

#### Implementation of

```ts
ITextmodifier.redraw
```

***

### resizeCanvas()

```ts
resizeCanvas(width, height): void;
```

Resize the canvas and adjust all related components accordingly.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `width` | `number` | The new width of the canvas. |
| `height` | `number` | The new height of the canvas. |

#### Returns

`void`

#### Example

```javascript
// Create a standalone textmodifier instance
const t = textmode.create({
  width: window.innerWidth,
  height: window.innerHeight,
});

// Draw callback to update content
t.draw(() => {
 // Set background color
 t.background(128);
 t.char('A');
 t.rotateZ(t.frameCount * 2);
 t.rect(16, 16);
});

// Set up window resize callback
t.windowResized(() => {
  // Resize the canvas to match window size
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
```

#### Implementation of

```ts
ITextmodifier.resizeCanvas
```

***

### rotate()

```ts
rotate(
   degreesX?, 
   degreesY?, 
   degreesZ?): void;
```

Sets the rotation angles for subsequent shape rendering operations.

All geometries rotate around the center of the shape.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `degreesX?` | `number` | The rotation angle in degrees around the X-axis (optional, defaults to 0) |
| `degreesY?` | `number` | The rotation angle in degrees around the Y-axis (optional, defaults to 0) |
| `degreesZ?` | `number` | The rotation angle in degrees around the Z-axis (optional, defaults to 0) |

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({ width: 800, height: 600 });

t.draw(() => {
  t.background(0);
  
  // Draw three rectangles rotating in 3D space with different axes
  for (let i = 0; i < 3; i++) {
    t.push();
    t.translate(i * 15 - 15, 0, 0);
    
    const angle = t.frameCount * (1.5 + i * 0.5);
    // Each shape rotates around different combinations of axes
    t.rotate(angle * 0.7, angle * 0.5, angle);
    
    t.char(['T', 'X', 'T'][i]);
    t.charColor(100 + i * 60, 200 - i * 40, 255);
    t.rect(10, 10);
    t.pop();
  }
});
```

#### Implementation of

```ts
ITextmodifier.rotate
```

***

### rotateGesture()

```ts
rotateGesture(callback): void;
```

Register a callback for rotate gestures, receiving rotation deltas in degrees.

Rotation callbacks provide the cumulative rotation and delta rotation since the last update,
along with the gesture centre in grid coordinates. Ideal for dial-like interactions.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | [`TouchRotateHandler`](../namespaces/input/namespaces/touch/type-aliases/TouchRotateHandler.md) | The function to call when a rotation gesture is detected. |

#### Returns

`void`

#### Example

```javascript
t.rotateGesture((data) => {
  console.log(`Rotated ${data.deltaRotation.toFixed(1)}°`);
});
```

#### Implementation of

```ts
ITextmodifier.rotateGesture
```

***

### rotateX()

```ts
rotateX(degrees): void;
```

Sets the X-axis rotation angle for subsequent shape rendering operations.

All geometries rotate around the center of the shape.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `degrees` | `number` | The rotation angle in degrees around the X-axis |

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({ width: 800, height: 600 });

t.draw(() => {
  t.background(0);
  t.char('A');
  t.charColor(255, 150, 100);
  t.rotateX(t.frameCount * 2); // Flip forward/backward
  t.rect(12, 12);
});
```

#### Implementation of

```ts
ITextmodifier.rotateX
```

***

### rotateY()

```ts
rotateY(degrees): void;
```

Sets the Y-axis rotation angle for subsequent shape rendering operations.

All geometries rotate around the center of the shape.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `degrees` | `number` | The rotation angle in degrees around the Y-axis |

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({ width: 800, height: 600 });

t.draw(() => {
  t.background(0);
  t.char('B');
  t.charColor(100, 255, 200);
  t.rotateY(t.frameCount * 2); // Spin left/right
  t.rect(12, 12);
});
```

#### Implementation of

```ts
ITextmodifier.rotateY
```

***

### rotateZ()

```ts
rotateZ(degrees): void;
```

Sets the Z-axis rotation angle for subsequent shape rendering operations.

All geometries rotate around the center of the shape.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `degrees` | `number` | The rotation angle in degrees around the Z-axis |

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({ width: 800, height: 600 });

t.draw(() => {
  t.background(0);
  t.char('C');
  t.charColor(255, 220, 100);
  t.rotateZ(t.frameCount * 2); // Spin clockwise
  t.rect(12, 12);
});
```

#### Implementation of

```ts
ITextmodifier.rotateZ
```

***

### setUniform()

```ts
setUniform(name, value): void;
```

Set a uniform value for the current custom shader.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The name of the uniform variable |
| `value` | `UniformValue` | The value to set |

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({ width: 800, height: 600 });

let pulseShader;

t.setup(async () => {
    pulseShader = await t.createFilterShader(`#version 300 es
  precision highp float;
  in vec2 v_uv;
  uniform float u_time;
  layout(location = 0) out vec4 o_character;
  layout(location = 1) out vec4 o_primaryColor;
  layout(location = 2) out vec4 o_secondaryColor;
  
  void main() {
    float pulse = 0.5 + 0.5 * sin(u_time + length(v_uv - 0.5) * 8.0);
    vec3 color = vec3(pulse * 0.3, pulse * 0.8, pulse);
    o_character = vec4(pulse, 0.0, 0.0, 0.0);
    o_primaryColor = vec4(color, 1.0);
    o_secondaryColor = vec4(color * 0.3, 1.0);
  }
`);
});

t.draw(() => {
    t.shader(pulseShader);
    t.setUniform('u_time', t.frameCount * 0.005);
    t.rect(t.grid.cols, t.grid.rows);
});
```

#### Implementation of

```ts
ITextmodifier.setUniform
```

***

### setUniforms()

```ts
setUniforms(uniforms): void;
```

Set multiple uniform values for the current custom shader.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `uniforms` | `Record`\<`string`, `UniformValue`\> | Object containing uniform name-value pairs |

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({ width: 800, height: 600 });

let rippleShader;

t.setup(async() => {
    rippleShader = await t.createFilterShader(`#version 300 es
  precision highp float;
  in vec2 v_uv;
  uniform float u_time;
  uniform vec2 u_center;
  layout(location = 0) out vec4 o_character;
  layout(location = 1) out vec4 o_primaryColor;
  layout(location = 2) out vec4 o_secondaryColor;
  
  void main() {
    float dist = length(v_uv - u_center);
    float wave = sin(dist * 20.0 - u_time * 2.0) * 0.5 + 0.5;
    vec3 color = mix(vec3(0.2, 0.4, 0.8), vec3(0.9, 0.6, 0.3), wave);
    o_character = vec4(wave, 0.0, 0.0, 0.0);
    o_primaryColor = vec4(color, 1.0);
    o_secondaryColor = vec4(color * 0.4, 1.0);
  }
`);
});

t.draw(() => {
    t.shader(rippleShader);
    t.setUniforms({
        u_time: t.frameCount * 0.0005,
        u_center: [0.5, 0.5]
    });
    t.rect(t.grid.cols, t.grid.rows);
});
```

#### Implementation of

```ts
ITextmodifier.setUniforms
```

***

### setup()

```ts
setup(callback): void;
```

Set a setup callback function that will be executed once when initialization is complete.

This callback is called after font loading and grid initialization, allowing access to
properties like `textmodifier.grid.cols` for calculating layout or setup variables.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | () => `void` \| `Promise`\<`void`\> | The function to call when setup is complete |

#### Returns

`void`

#### Example

```javascript
const textmodifier = textmode.create({
  width: 800,
  height: 600,
  fontSize: 16
});

// Setup callback - called once when ready
textmodifier.setup(() => {
  // Now you can access grid properties
  const cols = textmodifier.grid.cols;
  const rows = textmodifier.grid.rows;
  
  // Initialize any variables that depend on grid size
  rectWidth = Math.floor(cols / 3);
  rectHeight = Math.floor(rows / 2);
});

// Draw callback - called every frame
textmodifier.draw(() => {
  textmodifier.background(128);
  textmodifier.char('A');
  textmodifier.rotateZ(textmodifier.frameCount * 2);
  textmodifier.rect(rectWidth, rectHeight);
});
```

#### Implementation of

```ts
ITextmodifier.setup
```

***

### shader()

```ts
shader(shader): void;
```

Set a custom shader for subsequent rendering operations.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `shader` | `GLShader` | The custom shader to use |

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({ width: 800, height: 600 });

let glitchShader;

t.setup(async() => {
    glitchShader = await t.createFilterShader(`#version 300 es
  precision highp float;
  in vec2 v_uv;
  uniform float u_intensity;
  layout(location = 0) out vec4 o_character;
  layout(location = 1) out vec4 o_primaryColor;
  layout(location = 2) out vec4 o_secondaryColor;
  
  void main() {
    vec2 offset = vec2(sin(v_uv.y * 50.0) * u_intensity, 0.0);
    float pattern = fract(v_uv.x * 20.0 + offset.x);
    vec3 color = vec3(pattern, 1.0 - pattern, 0.5);
    o_character = vec4(pattern, 0.0, 0.0, 0.0);
    o_primaryColor = vec4(color, 1.0);
    o_secondaryColor = vec4(color * 0.5, 1.0);
  }
`);

t.draw(() => {
    t.shader(glitchShader);
    t.setUniform('u_intensity', Math.sin(t.frameCount * 0.1) * 0.02);
    t.rect(t.grid.cols, t.grid.rows);
});
```

#### Implementation of

```ts
ITextmodifier.shader
```

***

### swipe()

```ts
swipe(callback): void;
```

Register a callback for swipe gestures.

Swipes provide the dominant direction (`up`, `down`, `left`, `right`), travelled distance, and
velocity in CSS pixels per millisecond. Useful for panning, flicks, or quick shortcuts.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | [`TouchSwipeHandler`](../namespaces/input/namespaces/touch/type-aliases/TouchSwipeHandler.md) | The function to call when a swipe gesture is detected. |

#### Returns

`void`

#### Example

```javascript
t.swipe((data) => {
  console.log(`Swipe ${data.direction} with distance ${data.distance}`);
});
```

#### Implementation of

```ts
ITextmodifier.swipe
```

***

### tap()

```ts
tap(callback): void;
```

Register a callback for tap gestures.

A tap is fired when the user quickly touches and releases the canvas without travelling far.
Use TouchTapEventData.taps to determine whether the gesture is a single or multi tap.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | [`TouchTapHandler`](../namespaces/input/namespaces/touch/type-aliases/TouchTapHandler.md) | The function to call when a tap gesture is detected. |

#### Returns

`void`

#### Example

```javascript
t.tap((data) => {
  console.log(`Tapped at ${data.touch.x}, ${data.touch.y}`);
});
```

#### Implementation of

```ts
ITextmodifier.tap
```

***

### touchCancelled()

```ts
touchCancelled(callback): void;
```

Set a callback function that will be called when a touch is cancelled by the browser.

Cancellation can occur when the browser takes ownership for scrolling or if the gesture
leaves the window. Treat this as an aborted touch and clean up any in-progress state.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | [`TouchEventHandler`](../namespaces/input/namespaces/touch/type-aliases/TouchEventHandler.md) | The function to call when a touch is cancelled. |

#### Returns

`void`

#### Example

```javascript
t.touchCancelled((data) => {
  console.warn(`Touch ${data.touch.id} cancelled by the browser`);
});
```

#### Implementation of

```ts
ITextmodifier.touchCancelled
```

***

### touchEnded()

```ts
touchEnded(callback): void;
```

Set a callback function that will be called when a touch ends normally.

This fires after the finger leaves the canvas surface and the browser raises a `touchend`
event. Use it to finalise state such as drawing strokes or completing gestures.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | [`TouchEventHandler`](../namespaces/input/namespaces/touch/type-aliases/TouchEventHandler.md) | The function to call when a touch ends. |

#### Returns

`void`

#### Example

```javascript
t.touchEnded((data) => {
  console.log(`Touch ${data.touch.id} finished at ${data.touch.x}, ${data.touch.y}`);
});
```

#### Implementation of

```ts
ITextmodifier.touchEnded
```

***

### touchMoved()

```ts
touchMoved(callback): void;
```

Set a callback function that will be called when a touch point moves across the canvas.

The provided callback is invoked continuously while the browser reports move events. Use the
`previousTouch` and `deltaTime` fields to derive velocity or gesture behaviour.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | [`TouchEventHandler`](../namespaces/input/namespaces/touch/type-aliases/TouchEventHandler.md) | The function to call when a touch moves. |

#### Returns

`void`

#### Example

```javascript
t.touchMoved((data) => {
  const { touch, previousTouch } = data;
  if (previousTouch) {
    console.log(`Touch moved by ${touch.x - previousTouch.x}, ${touch.y - previousTouch.y}`);
  }
});
```

#### Implementation of

```ts
ITextmodifier.touchMoved
```

***

### touchStarted()

```ts
touchStarted(callback): void;
```

Set a callback function that will be called when a touch point begins.

The callback receives TouchEventData containing the touch that triggered the event,
all active touches, and the original DOM event. Use this to react when the user places one or
more fingers on the canvas.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | [`TouchEventHandler`](../namespaces/input/namespaces/touch/type-aliases/TouchEventHandler.md) | The function to call when a touch starts. |

#### Returns

`void`

#### Example

```javascript
t.touchStarted((data) => {
  console.log(`Touch ${data.touch.id} began at ${data.touch.x}, ${data.touch.y}`);
});
```

#### Implementation of

```ts
ITextmodifier.touchStarted
```

***

### translate()

```ts
translate(
   x?, 
   y?, 
   z?): void;
```

Sets the translation offsets for subsequent shape rendering operations.

All geometries are displaced by the specified amounts. Similar to p5.js translate().

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `x?` | `number` | Translation along the X-axis in pixels (optional, defaults to 0) |
| `y?` | `number` | Translation along the Y-axis in pixels (optional, defaults to 0) |
| `z?` | `number` | Translation along the Z-axis in pixels (optional, defaults to 0) |

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({ width: 800, height: 600 });

t.draw(() => {
  t.background(0);
  
  // Draw a grid of shapes with different translations
  for (let i = 0; i < 3; i++) {
    t.push();
    t.translate(i * 12 - 12, Math.sin(t.frameCount * 0.05 + i) * 3);
    t.char('A');
    t.charColor(100 + i * 70, 150, 255 - i * 50);
    t.rect(8, 8);
    t.pop();
  }
});
```

#### Implementation of

```ts
ITextmodifier.translate
```

***

### translateX()

```ts
translateX(pixels): void;
```

Sets the X-axis translation offset for subsequent shape rendering operations.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `pixels` | `number` | The translation offset in pixels along the X-axis |

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({ width: 800, height: 600 });

t.draw(() => {
  t.background(0);
  t.char('→');
  t.charColor(255, 180, 100);
  t.translateX(Math.sin(t.frameCount * 0.05) * 15); // Slide left/right
  t.rect(10, 10);
});
```

#### Implementation of

```ts
ITextmodifier.translateX
```

***

### translateY()

```ts
translateY(pixels): void;
```

Sets the Y-axis translation offset for subsequent shape rendering operations.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `pixels` | `number` | The translation offset in pixels along the Y-axis |

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({ width: 800, height: 600 });

t.draw(() => {
  t.background(0);
  t.char('↓');
  t.charColor(100, 255, 180);
  t.translateY(Math.sin(t.frameCount * 0.05) * 10); // Bounce up/down
  t.rect(10, 10);
});
```

#### Implementation of

```ts
ITextmodifier.translateY
```

***

### translateZ()

```ts
translateZ(pixels): void;
```

Sets the Z-axis translation offset for subsequent shape rendering operations.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `pixels` | `number` | The translation offset in pixels along the Z-axis |

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({ width: 800, height: 600 });

t.draw(() => {
  t.background(0);
  t.char('O');
  t.charColor(180, 120, 255);
  t.translateZ(Math.sin(t.frameCount * 0.05) * 20); // Pulse in/out
  t.rect(12, 12);
});
```

#### Implementation of

```ts
ITextmodifier.translateZ
```

***

### triangle()

```ts
triangle(
   x1, 
   y1, 
   x2, 
   y2, 
   x3, 
   y3): void;
```

Draw a triangle with the current settings.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `x1` | `number` | X-coordinate of the first vertex |
| `y1` | `number` | Y-coordinate of the first vertex |
| `x2` | `number` | X-coordinate of the second vertex |
| `y2` | `number` | Y-coordinate of the second vertex |
| `x3` | `number` | X-coordinate of the third vertex |
| `y3` | `number` | Y-coordinate of the third vertex |

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({ width: 800, height: 600 });

t.draw(() => {
  t.background(0);
  t.char('*');
  t.charColor(255, 100, 150);
  
  const angle = t.frameCount * 0.02;
  const size = 15;
  t.triangle(
    Math.cos(angle) * size, Math.sin(angle) * size,
    Math.cos(angle + 2.09) * size, Math.sin(angle + 2.09) * size,
    Math.cos(angle + 4.19) * size, Math.sin(angle + 4.19) * size
  );
});
```

#### Implementation of

```ts
ITextmodifier.triangle
```

***

### windowResized()

```ts
windowResized(callback): void;
```

Set a callback function that will be called when the window is resized.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | () => `void` | The function to call when the window is resized. |

#### Returns

`void`

#### Example

```javascript
// Create a standalone textmodifier instance
const t = textmode.create({
  width: window.innerWidth,
  height: window.innerHeight,
});

// Draw callback to update content
t.draw(() => {
 // Set background color
 t.background(128);
 t.char('A');
 t.rotateZ(t.frameCount * 2);
 t.rect(16, 16);
});

// Set up window resize callback
t.windowResized(() => {
  // Resize the canvas to match window size
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
```

#### Implementation of

```ts
ITextmodifier.windowResized
```

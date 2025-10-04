[**textmode.js v0.4.0**](../README.md)

***

[textmode.js](../README.md) / Textmodifier

# Class: Textmodifier

Manages textmode rendering on a [`HTMLCanvasElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement) and provides methods for drawing,
exporting, font management, event handling, and animation control.

If the `Textmodifier` instance is created without a canvas parameter,
it creates a new `HTMLCanvasElement` to draw on using the `textmode.js` drawing API.
If a canvas is provided, it will use that canvas instead.

## Extends

- `TextmodifierCore`\<`this`\>.`RenderingCapabilities`.`FontCapabilities`.`AnimationCapabilities`.`MouseCapabilities`.`TouchCapabilities`.`KeyboardCapabilities`

## Accessors

### canvas

#### Get Signature

> **get** **canvas**(): `HTMLCanvasElement`

Get the textmodifier canvas containing the rendered output.

##### Returns

`HTMLCanvasElement`

***

### drawFramebuffer

#### Get Signature

> **get** **drawFramebuffer**(): [`TextmodeFramebuffer`](TextmodeFramebuffer.md)

Get the WebGL framebuffer used for drawing operations.

##### Returns

[`TextmodeFramebuffer`](TextmodeFramebuffer.md)

***

### font

#### Get Signature

> **get** **font**(): [`TextmodeFont`](TextmodeFont.md)

Get the current font object used for rendering.

##### Returns

[`TextmodeFont`](TextmodeFont.md)

***

### frameCount

#### Get Signature

> **get** **frameCount**(): `number`

Get the current frame count.

##### Returns

`number`

#### Set Signature

> **set** **frameCount**(`value`): `void`

Set the current frame count.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `number` |

##### Returns

`void`

***

### grid

#### Get Signature

> **get** **grid**(): [`TextmodeGrid`](TextmodeGrid.md)

Get the current grid object used for rendering.

##### Returns

[`TextmodeGrid`](TextmodeGrid.md)

***

### height

#### Get Signature

> **get** **height**(): `number`

Get the height of the canvas.

##### Returns

`number`

***

### isDisposed

#### Get Signature

> **get** **isDisposed**(): `boolean`

Check if the instance has been disposed/destroyed.

##### Returns

`boolean`

***

### mouse

#### Get Signature

> **get** **mouse**(): [`MousePosition`](../textmode.js/namespaces/input/namespaces/mouse/interfaces/MousePosition.md)

Get the current mouse position in grid coordinates.

Returns the mouse position as grid cell coordinates *(column, row)*.

If the mouse is outside the grid or the instance is not ready,
it returns `{ x: -1, y: -1 }`.

##### Example

```javascript
const t = textmode.create({ width: 800, height: 600 });

t.draw(() => {
  const mousePos = t.mouse;
  
  if (mousePos.x !== -1 && mousePos.y !== -1) {
    // Mouse is over the grid
    t.char('*');
    t.charColor(255, 0, 0);
    t.point(mousePos.x, mousePos.y);
  }
});
```

##### Returns

[`MousePosition`](../textmode.js/namespaces/input/namespaces/mouse/interfaces/MousePosition.md)

***

### overlay

#### Get Signature

> **get** **overlay**(): `undefined` \| [`TextmodeImage`](TextmodeImage.md)

If in overlay mode, returns the [TextmodeImage](TextmodeImage.md) instance capturing the target canvas/video content, 
allowing further configuration of the conversion parameters.

##### Returns

`undefined` \| [`TextmodeImage`](TextmodeImage.md)

***

### touches

#### Get Signature

> **get** **touches**(): [`TouchPosition`](../textmode.js/namespaces/input/namespaces/touch/interfaces/TouchPosition.md)[]

Get the currently active touches in grid coordinates.

Returns a copy of each touch, including grid position, client coordinates, and pressure when
available. Use this inside a draw loop to react to active multi-touch scenarios.

##### Example

```javascript
t.draw(() => {
  for (const touch of t.touches) {
    t.point(touch.x, touch.y);
  }
});
```

##### Returns

[`TouchPosition`](../textmode.js/namespaces/input/namespaces/touch/interfaces/TouchPosition.md)[]

***

### width

#### Get Signature

> **get** **width**(): `number`

Get the width of the canvas.

##### Returns

`number`

## Methods

### arc()

> **arc**(`x`, `y`, `width`, `height`, `startAngle`, `endAngle`): `void`

Draw an arc with the current settings.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `x` | `number` | X-coordinate of the arc center |
| `y` | `number` | Y-coordinate of the arc center |
| `width` | `number` | Width of the arc |
| `height` | `number` | Height of the arc |
| `startAngle` | `number` | Starting angle in radians |
| `endAngle` | `number` | Ending angle in radians |

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
  t.arc(20, 15, 10, 10, 0, Math.PI);
});
```

***

### background()

> **background**(`r`, `g?`, `b?`, `a?`): `void`

Set the background color for the canvas.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `r` | `number` | Red component (0-255) |
| `g?` | `number` | Green component (0-255) |
| `b?` | `number` | Blue component (0-255) |
| `a?` | `number` | Alpha component (0-255) |

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({
  width: 800,
  height: 600,
})

t.draw(() => {
  // Set the background color to white
  t.background(255);
});
```

***

### bezierCurve()

> **bezierCurve**(`x1`, `y1`, `cp1x`, `cp1y`, `cp2x`, `cp2y`, `x2`, `y2`): `void`

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

  // Draw a smooth S-curve
  t.char('*');
  t.charColor(255, 100, 255); // Magenta
  t.lineWeight(2);
  t.bezierCurve(5, 20, 15, 5, 25, 35, 35, 20);
});
```

***

### cellColor()

> **cellColor**(`r`, `g`, `b`, `a`): `void`

Set the cell background color for subsequent rendering operations.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `r` | `number` | Red component (0-255) |
| `g` | `number` | Green component (0-255) |
| `b` | `number` | Blue component (0-255) |
| `a` | `number` | Alpha component (0-255, optional, defaults to 255) |

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
  t.cellColor(0, 255, 0, 255); // Green cell background
  t.rect(10, 10, 5, 5);
});
```

***

### char()

> **char**(`character`): `void`

Set the character to be used for subsequent rendering operations.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `character` | `string` | The character to set |

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
  t.char('█');
  t.rect(10, 10, 5, 5);
});
```

***

### charColor()

> **charColor**(`r`, `g`, `b`, `a?`): `void`

Set the character color for subsequent rendering operations.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `r` | `number` | Red component (0-255) |
| `g` | `number` | Green component (0-255) |
| `b` | `number` | Blue component (0-255) |
| `a?` | `number` | Alpha component (0-255, optional, defaults to 255) |

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
  t.charColor(255, 0, 0, 255); // Red character
  t.rect(10, 10, 5, 5);
});
```

***

### charRotation()

> **charRotation**(`degrees`): `void`

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
  t.charRotation(90); // Rotate character 90 degrees
  t.rect(10, 10, 5, 5);
});
```

***

### clear()

> **clear**(): `void`

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

***

### createFilterShader()

> **createFilterShader**(`fragmentSource`): `GLShader`

Create a custom filter shader from fragment shader source code.
The fragment shader will automatically receive the standard vertex shader inputs
and must output to all 5 MRT attachments.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fragmentSource` | `string` | The fragment shader source code |

#### Returns

`GLShader`

A compiled shader ready for use with [shader](#shader)

#### Example

```javascript
const t = textmode.create({
  width: 800,
  height: 600,
})

const noiseShader = t.createFilterShader(`
  #version 300 es
  precision highp float;
  
  in vec2 v_uv;
  in vec3 v_character;
  in vec4 v_primaryColor;
  in vec4 v_secondaryColor;
  in vec2 v_rotation;
  in vec3 v_transform;
  
  uniform float u_frameCount;
  
  layout(location = 0) out vec4 o_character;
  layout(location = 1) out vec4 o_primaryColor;
  layout(location = 2) out vec4 o_secondaryColor;
  layout(location = 3) out vec4 o_rotation;
  layout(location = 4) out vec4 o_transform;
  
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }
  
  void main() {
    vec2 gridPos = floor(gl_FragCoord.xy);
    float noise = random(gridPos + u_frameCount * 0.1);
    
    o_character = vec4(noise, 0.0, 0.0, 1.0);
    o_primaryColor = vec4(vec3(noise), 1.0);
    o_secondaryColor = vec4(0.0, 0.0, 0.0, 1.0);
    o_rotation = vec4(0.0, 0.0, 0.0, 1.0);
    o_transform = vec4(0.0, 0.0, 0.0, 1.0);
  }
`);

t.draw(() => {
  t.shader(noiseShader);
  t.setUniform('u_frameCount', t.frameCount);
  t.rect(0, 0, t.grid.cols, t.grid.rows);
});
```

***

### createFramebuffer()

> **createFramebuffer**(`options`): [`TextmodeFramebuffer`](TextmodeFramebuffer.md)

Create a new framebuffer for offscreen rendering.

The framebuffer uses the same 5-attachment MRT structure as the main
rendering pipeline, allowing all standard drawing operations to work
seamlessly when rendering to the framebuffer.

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
  t.rect(10, 10, 20, 10);
  fb.end();
  
  // Render framebuffer to main canvas
  t.background(0);
  t.image(fb, 0, 0);
});
```

***

### cursor()

> **cursor**(`cursor?`): `void`

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
t.cursor('crosshair');
// ... later, reset:
t.cursor();
```

***

### destroy()

> **destroy**(): `void`

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

***

### doubleTap()

> **doubleTap**(`callback`): `void`

Register a callback for double tap gestures.

Double taps reuse the same TouchTapEventData as taps with `taps` set to `2`. This
helper lets you supply a dedicated handler when you want to treat double taps differently.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | [`TouchTapHandler`](../textmode.js/namespaces/input/namespaces/touch/type-aliases/TouchTapHandler.md) | The function to call when a double tap is detected. |

#### Returns

`void`

#### Example

```javascript
t.doubleTap((data) => {
  console.log('Double tap detected', data.touch);
});
```

***

### draw()

> **draw**(`callback`): `void`

Set a draw callback function that will be executed before each render.

This callback function is where all drawing commands should be placed for textmode rendering.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | () => `void` | The function to call before each render |

#### Returns

`void`

#### Example

```javascript
// Create a standalone textmodifier instance
const t = textmode.create({
 width: 800,
 height: 600,
});

// Set up draw callback
t.draw(() => {
  // Set background color
  t.background(128);
  
  // Draw a textmode rectangle with default settings
  t.rect(0, 0, 16, 16);
});
```

***

### ellipse()

> **ellipse**(`x`, `y`, `width`, `height`): `void`

Draw an ellipse with the current settings.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `x` | `number` | X-coordinate of the ellipse center |
| `y` | `number` | Y-coordinate of the ellipse center |
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
  t.ellipse(20, 15, 10, 8);
});
```

***

### flipX()

> **flipX**(`toggle`): `void`

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
  t.rect(10, 10, 5, 5);
});
```

***

### flipY()

> **flipY**(`toggle`): `void`

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
  t.rect(10, 10, 5, 5);
});
```

***

### fontSize()

> **fontSize**(`size`): `void`

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
const textmodifier = textmode.create();

// Set the font size to 32
textmodifier.fontSize(32);
```

***

### frameRate()

> **frameRate**(`fps?`): `number` \| `void`

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
```

***

### glyphColor()

> **glyphColor**(`char`): `null` \| \[`number`, `number`, `number`\]

Get the RGB shader color of a specific character in the current font.

Useful for custom shaders to control the character to render.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `char` | `string` | The character to get the color for. |

#### Returns

`null` \| \[`number`, `number`, `number`\]

An array representing the RGB color, or null if the character is not found.

#### Example

```javascript
// Create a Textmodifier instance
const textmodifier = textmode.create();

// Get the color of the character 'A'
textmodifier.setup(() => {
  const color = textmodifier.glyphColor('A');
  console.log(color); // e.g., [1, 0, 0] for red
});
```

***

### glyphColors()

> **glyphColors**(`str`): (`null` \| \[`number`, `number`, `number`\])[]

Get the RGB shader colors of all characters in a string for the current font.

Useful for custom shaders to control the characters to render.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `str` | `string` | The string to get the colors for. |

#### Returns

(`null` \| \[`number`, `number`, `number`\])[]

An array of RGB color arrays, or null if a character is not found.

#### Example

```javascript
// Create a Textmodifier instance
const textmodifier = textmode.create();

// Get the colors of the string 'Hello'
textmodifier.setup(() => {
  const colors = textmodifier.glyphColors('Hello');
  console.log(colors); // e.g., [[0.1, 0, 0], ...]
});
```

***

### image()

> **image**(`source`, `x`, `y`, `width?`, `height?`): `void`

Draw a TextmodeFramebuffer or TextmodeImage to the current render target.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `source` | [`TextmodeFramebuffer`](TextmodeFramebuffer.md) \| [`TextmodeImage`](TextmodeImage.md) | The TextmodeFramebuffer or TextmodeImage to render |
| `x` | `number` | X position on the grid where to place the content *(top-left corner)* |
| `y` | `number` | Y position on the grid where to place the content *(top-left corner)* |
| `width?` | `number` | Width to scale the content |
| `height?` | `number` | Height to scale the content |

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
  t.charColor(255, 0, 0);
  t.rect(5, 5, 20, 10);
  fb.end();
  
  // Clear main canvas and render framebuffer content
  t.background(0);
  
  // Render at original size
  t.image(fb, 10, 10);
  
  // Render scaled version
  t.image(fb, 50, 10, 60, 40);
});
```

***

### invert()

> **invert**(`toggle`): `void`

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
  t.rect(10, 10, 5, 5);
});
```

***

### isKeyPressed()

> **isKeyPressed**(`key`): `boolean`

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
  t.point(playerX, playerY);
});
```

***

### isLooping()

> **isLooping**(): `boolean`

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
console.log(textmodifier.isLooping()); // true (alooping)
```

***

### keyPressed()

> **keyPressed**(`callback`): `void`

Set a callback function that will be called when a key is pressed down.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | [`KeyboardEventHandler`](../textmode.js/namespaces/input/namespaces/keyboard/type-aliases/KeyboardEventHandler.md) | The function to call when a key is pressed |

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({ width: 800, height: 600 });

t.keyPressed((data) => {
  console.log(`Key pressed: ${data.key}`);
  if (data.key === 'Enter') {
    console.log('Enter key was pressed!');
  }
  if (data.ctrlKey && data.key === 's') {
    console.log('Ctrl+S was pressed!');
  }
});
```

***

### keyReleased()

> **keyReleased**(`callback`): `void`

Set a callback function that will be called when a key is released.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | [`KeyboardEventHandler`](../textmode.js/namespaces/input/namespaces/keyboard/type-aliases/KeyboardEventHandler.md) | The function to call when a key is released |

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({ width: 800, height: 600 });

t.keyReleased((data) => {
  console.log(`Key released: ${data.key}`);
  if (data.key === ' ') {
    console.log('Spacebar was released!');
  }
});
```

***

### line()

> **line**(`x1`, `y1`, `x2`, `y2`): `void`

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
  // Set the background color to black
  t.background(0);

  // Draw a diagonal line
  t.char('-');
  t.charColor(0, 255, 255); // Cyan
  t.lineWeight(1);
  t.line(5, 5, 25, 15);
});
```

***

### lineWeight()

> **lineWeight**(`weight`): `void`

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
 t.background(0);
 t.lineWeight(1); // Thin line
 t.line(0, 0, t.grid.cols, t.grid.rows);
});
```

***

### loadFont()

> **loadFont**(`fontSource`): `Promise`\<`void`\>

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
const textmodifier = textmode.create();

// Load a custom font from a URL
await textmodifier.loadFont('https://example.com/fonts/myfont.ttf');

// Local font example
// await textmodifier.loadFont('./fonts/myfont.ttf'); 
```

***

### loadImage()

> **loadImage**(`src`): `Promise`\<[`TextmodeImage`](TextmodeImage.md)\>

Load an image and return a TextmodeImage that can be drawn with image().

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `src` | `string` \| `HTMLImageElement` | URL or existing HTMLImageElement |

#### Returns

`Promise`\<[`TextmodeImage`](TextmodeImage.md)\>

***

### longPress()

> **longPress**(`callback`): `void`

Register a callback for long press gestures.

A long press is emitted when the user keeps a finger on the canvas without moving beyond the
configured tolerance. The event includes the press duration in milliseconds.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | [`TouchLongPressHandler`](../textmode.js/namespaces/input/namespaces/touch/type-aliases/TouchLongPressHandler.md) | The function to call when a long press gesture is detected. |

#### Returns

`void`

#### Example

```javascript
t.longPress((data) => {
  console.log(`Long press for ${Math.round(data.duration)}ms`);
});
```

***

### loop()

> **loop**(): `void`

Resume the rendering loop if it was stopped by [noLoop](#noloop).

#### Returns

`void`

#### Example

```javascript
// Create a textmodifier instance
const textmodifier = textmode.create();

// Stop the loop
textmodifier.noLoop();

// Resume the loop
textmodifier.loop();

// You can also use this pattern for conditional animation
if (someCondition) {
  textmodifier.loop();
} else {
  textmodifier.noLoop();
}
```

***

### mouseClicked()

> **mouseClicked**(`callback`): `void`

Set a callback function that will be called when the mouse is clicked.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | [`MouseEventHandler`](../textmode.js/namespaces/input/namespaces/mouse/type-aliases/MouseEventHandler.md) | The function to call when the mouse is clicked |

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({ width: 800, height: 600 });

t.mouseClicked((data) => {
  console.log(`Clicked at grid position: ${data.position.x}, ${data.position.y}`);
  console.log(`Button: ${data.button}`); // 0=left, 1=middle, 2=right
});
```

***

### mouseMoved()

> **mouseMoved**(`callback`): `void`

Set a callback function that will be called when the mouse moves.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | [`MouseEventHandler`](../textmode.js/namespaces/input/namespaces/mouse/type-aliases/MouseEventHandler.md) | The function to call when the mouse moves |

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({ width: 800, height: 600 });

t.mouseMoved((data) => {
  if (data.position.x !== -1 && data.position.y !== -1) {
    console.log(`Mouse moved to: ${data.position.x}, ${data.position.y}`);
    console.log(`Previous position: ${data.previousPosition.x}, ${data.previousPosition.y}`);
  }
});
```

***

### mousePressed()

> **mousePressed**(`callback`): `void`

Set a callback function that will be called when the mouse is pressed down.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | [`MouseEventHandler`](../textmode.js/namespaces/input/namespaces/mouse/type-aliases/MouseEventHandler.md) | The function to call when the mouse is pressed |

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({ width: 800, height: 600 });

t.mousePressed((data) => {
  console.log(`Mouse pressed at: ${data.position.x}, ${data.position.y}`);
});
```

***

### mouseReleased()

> **mouseReleased**(`callback`): `void`

Set a callback function that will be called when the mouse is released.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | [`MouseEventHandler`](../textmode.js/namespaces/input/namespaces/mouse/type-aliases/MouseEventHandler.md) | The function to call when the mouse is released |

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({ width: 800, height: 600 });

t.mouseReleased((data) => {
  console.log(`Mouse released at: ${data.position.x}, ${data.position.y}`);
});
```

***

### mouseScrolled()

> **mouseScrolled**(`callback`): `void`

Set a callback function that will be called when the mouse wheel is scrolled.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | [`MouseEventHandler`](../textmode.js/namespaces/input/namespaces/mouse/type-aliases/MouseEventHandler.md) | The function to call when the mouse wheel is scrolled |

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({ width: 800, height: 600 });

t.mouseScrolled((data) => {
  console.log(`Mouse scrolled at: ${data.position.x}, ${data.position.y}`);
  console.log(`Scroll delta: ${data.delta?.x}, ${data.delta?.y}`);
});
```

***

### noLoop()

> **noLoop**(): `void`

Stop the automatic rendering loop.

This method pauses the render loop without, allowing
it to be resumed later with [loop](#loop). This is useful for temporarily pausing
animation while maintaining the ability to continue it.

#### Returns

`void`

#### Example

```javascript
// Create a textmodifier instance in auto mode
const textmodifier = textmode.create();

// The render loop is running by default
console.log(textmodifier.isLooping()); // true

// Stop the automatic rendering loop
textmodifier.noLoop();
console.log(textmodifier.isLooping()); // false

// Resume the rendering loop
textmodifier.loop();
console.log(textmodifier.isLooping()); // true
```

***

### pinch()

> **pinch**(`callback`): `void`

Register a callback for pinch gestures, receiving scale deltas.

Pinch gestures involve two touch points. The callback receives the current scale relative to
the initial distance and the change since the previous update, enabling zoom interactions.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | [`TouchPinchHandler`](../textmode.js/namespaces/input/namespaces/touch/type-aliases/TouchPinchHandler.md) | The function to call when a pinch gesture is detected. |

#### Returns

`void`

#### Example

```javascript
t.pinch((data) => {
  console.log(`Pinch scale: ${data.scale.toFixed(2)}`);
});
```

***

### point()

> **point**(`x`, `y`): `void`

Draw a single point at (x, y) with the current settings.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `x` | `number` | X-coordinate of the point |
| `y` | `number` | Y-coordinate of the point |

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
  t.point(10, 10);
});
```

***

### pop()

> **pop**(): `void`

Restore the most recently saved rendering state from the state stack.
Use with [push](#push) to isolate style changes within a block.

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

  t.push(); // Save current state
  t.charColor(0, 255, 0); // Green characters
  t.char('█');
  t.rect(5, 5, 3, 3);
  t.pop(); // Restore previous state
});
```

***

### push()

> **push**(): `void`

Save the current rendering state to the state stack.
Use with [pop](#pop) to isolate style changes within a block.

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

  t.push(); // Save current state
  t.charColor(255, 0, 0); // Red characters
  t.rect(10, 10, 5, 5);
  t.pop(); // Restore previous state
});
```

***

### rect()

> **rect**(`x`, `y`, `width?`, `height?`): `void`

Draw a rectangle with the current settings.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `x` | `number` | X-coordinate of the rectangle *(top-left corner)* |
| `y` | `number` | Y-coordinate of the rectangle *(top-left corner)* |
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

  // Draw a filled rectangle with default character
  t.char('█');
  t.charColor(255, 255, 255); // White
  t.rect(10, 10, 15, 8);
});
```

***

### redraw()

> **redraw**(`n?`): `void`

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
// Create a textmodifier instance
const textmodifier = textmode.create();

// Set up drawing
textmodifier.draw(() => {
  textmodifier.background(0);

  textmodifier.char("A");
  textmodifier.charColor(255, 0, 0);
  textmodifier.rect(10, 10, 50, 50);
});

textmodifier.noLoop();
textmodifier.redraw(3); // Render 3 times despite loop being stopped
```

***

### resizeCanvas()

> **resizeCanvas**(`width`, `height`): `void`

Resize the canvas and adjust all related components accordingly.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `width` | `number` | The new width of the canvas. |
| `height` | `number` | The new height of the canvas. |

#### Returns

`void`

***

### rotate()

> **rotate**(`degreesX?`, `degreesY?`, `degreesZ?`): `void`

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
const t = textmode.create({
  width: 800,
  height: 600,
})

t.draw(() => {
  t.background(0);
  
  // Rotate only around Z-axis (backward compatible)
  t.rotate(0, 0, 45);
  
  // Rotate around all three axes
  t.rotate(30, 45, 60);
  
  t.rect(10, 10, 5, 5);
});
```

***

### rotateGesture()

> **rotateGesture**(`callback`): `void`

Register a callback for rotate gestures, receiving rotation deltas in degrees.

Rotation callbacks provide the cumulative rotation and delta rotation since the last update,
along with the gesture centre in grid coordinates. Ideal for dial-like interactions.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | [`TouchRotateHandler`](../textmode.js/namespaces/input/namespaces/touch/type-aliases/TouchRotateHandler.md) | The function to call when a rotation gesture is detected. |

#### Returns

`void`

#### Example

```javascript
t.rotateGesture((data) => {
  console.log(`Rotated ${data.deltaRotation.toFixed(1)}°`);
});
```

***

### rotateX()

> **rotateX**(`degrees`): `void`

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
const t = textmode.create({
  width: 800,
  height: 600,
})

t.draw(() => {
  t.background(0);
  t.rotateX(45); // Rotate around X-axis
  t.rect(10, 10, 5, 5);
});
```

***

### rotateY()

> **rotateY**(`degrees`): `void`

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
const t = textmode.create({
  width: 800,
  height: 600,
})

t.draw(() => {
  t.background(0);
  t.rotateY(45); // Rotate around Y-axis
  t.rect(10, 10, 5, 5);
});
```

***

### rotateZ()

> **rotateZ**(`degrees`): `void`

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
const t = textmode.create({
  width: 800,
  height: 600,
})

t.draw(() => {
  t.background(0);
  t.rotateZ(45); // Rotate around Z-axis
  t.rect(10, 10, 5, 5);
});
```

***

### setUniform()

> **setUniform**(`name`, `value`): `void`

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
const t = textmode.create({
  width: 800,
  height: 600,
})

const shader = t.createFilterShader(`
  uniform float u_time;
  // ... rest of shader ...
`);

t.draw(() => {
  t.shader(shader);
  t.setUniform('u_time', t.frameCount * 0.02);
  t.rect(0, 0, t.grid.cols, t.grid.rows);
});
```

***

### setUniforms()

> **setUniforms**(`uniforms`): `void`

Set multiple uniform values for the current custom shader.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `uniforms` | `Record`\<`string`, `UniformValue`\> | Object containing uniform name-value pairs |

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({
  width: 800,
  height: 600,
})

const shader = t.createFilterShader(`
  uniform float u_time;
  uniform vec2 u_resolution;
  // ... rest of shader ...
`);

t.draw(() => {
  t.shader(shader);
  t.setUniforms({
    u_time: t.frameCount * 0.02,
    u_resolution: [t.grid.cols, t.grid.rows]
  });
  t.rect(0, 0, t.grid.cols, t.grid.rows);
});
```

***

### setup()

> **setup**(`callback`): `void`

Set a setup callback function that will be executed once when initialization is complete.

This callback is called after font loading and grid initialization, allowing access to
properties like `textmodifier.grid.cols` for calculating layout or setup variables.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | () => `void` | The function to call when setup is complete |

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
  cellWidth = Math.floor(cols / 3);
  cellHeight = Math.floor(rows / 2);
});

// Draw callback - called every frame
textmodifier.draw(() => {
  textmodifier.background(128);
  textmodifier.rect(0, 0, cellWidth, cellHeight);
});
```

***

### shader()

> **shader**(`shader`): `void`

Set a custom shader for subsequent rendering operations.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `shader` | `GLShader` | The custom shader to use |

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({
  width: 800,
  height: 600,
})

// Create a custom filter shader
const customShader = t.createFilterShader(`
  // ... fragment shader code ...
`);

t.draw(() => {
  t.background(0);
  
  // Use custom shader
  t.shader(customShader);
  t.setUniform('u_frameCount', t.frameCount);
  t.rect(0, 0, t.grid.cols, t.grid.rows);
});
```

***

### swipe()

> **swipe**(`callback`): `void`

Register a callback for swipe gestures.

Swipes provide the dominant direction (`up`, `down`, `left`, `right`), travelled distance, and
velocity in CSS pixels per millisecond. Useful for panning, flicks, or quick shortcuts.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | [`TouchSwipeHandler`](../textmode.js/namespaces/input/namespaces/touch/type-aliases/TouchSwipeHandler.md) | The function to call when a swipe gesture is detected. |

#### Returns

`void`

#### Example

```javascript
t.swipe((data) => {
  console.log(`Swipe ${data.direction} with distance ${data.distance}`);
});
```

***

### tap()

> **tap**(`callback`): `void`

Register a callback for tap gestures.

A tap is fired when the user quickly touches and releases the canvas without travelling far.
Use TouchTapEventData.taps to determine whether the gesture is a single or multi tap.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | [`TouchTapHandler`](../textmode.js/namespaces/input/namespaces/touch/type-aliases/TouchTapHandler.md) | The function to call when a tap gesture is detected. |

#### Returns

`void`

#### Example

```javascript
t.tap((data) => {
  console.log(`Tapped at ${data.touch.x}, ${data.touch.y}`);
});
```

***

### touchCancelled()

> **touchCancelled**(`callback`): `void`

Set a callback function that will be called when a touch is cancelled by the browser.

Cancellation can occur when the browser takes ownership for scrolling or if the gesture
leaves the window. Treat this as an aborted touch and clean up any in-progress state.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | [`TouchEventHandler`](../textmode.js/namespaces/input/namespaces/touch/type-aliases/TouchEventHandler.md) | The function to call when a touch is cancelled. |

#### Returns

`void`

#### Example

```javascript
t.touchCancelled((data) => {
  console.warn(`Touch ${data.touch.id} cancelled by the browser`);
});
```

***

### touchEnded()

> **touchEnded**(`callback`): `void`

Set a callback function that will be called when a touch ends normally.

This fires after the finger leaves the canvas surface and the browser raises a `touchend`
event. Use it to finalise state such as drawing strokes or completing gestures.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | [`TouchEventHandler`](../textmode.js/namespaces/input/namespaces/touch/type-aliases/TouchEventHandler.md) | The function to call when a touch ends. |

#### Returns

`void`

#### Example

```javascript
t.touchEnded((data) => {
  console.log(`Touch ${data.touch.id} finished at ${data.touch.x}, ${data.touch.y}`);
});
```

***

### touchMoved()

> **touchMoved**(`callback`): `void`

Set a callback function that will be called when a touch point moves across the canvas.

The provided callback is invoked continuously while the browser reports move events. Use the
`previousTouch` and `deltaTime` fields to derive velocity or gesture behaviour.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | [`TouchEventHandler`](../textmode.js/namespaces/input/namespaces/touch/type-aliases/TouchEventHandler.md) | The function to call when a touch moves. |

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

***

### touchStarted()

> **touchStarted**(`callback`): `void`

Set a callback function that will be called when a touch point begins.

The callback receives TouchEventData containing the touch that triggered the event,
all active touches, and the original DOM event. Use this to react when the user places one or
more fingers on the canvas.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | [`TouchEventHandler`](../textmode.js/namespaces/input/namespaces/touch/type-aliases/TouchEventHandler.md) | The function to call when a touch starts. |

#### Returns

`void`

#### Example

```javascript
t.touchStarted((data) => {
  console.log(`Touch ${data.touch.id} began at ${data.touch.x}, ${data.touch.y}`);
});
```

***

### triangle()

> **triangle**(`x1`, `y1`, `x2`, `y2`, `x3`, `y3`): `void`

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
const t = textmode.create({
  width: 800,
  height: 600,
})

t.draw(() => {
  t.background(0);
  t.triangle(10, 10, 20, 10, 15, 20);
});
```

***

### windowResized()

> **windowResized**(`callback`): `void`

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

  t.rect(0, 0, t.grid.cols, t.grid.rows);
});

// Set up window resize callback
t.windowResized(() => {
  // Resize the canvas to match window size
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});

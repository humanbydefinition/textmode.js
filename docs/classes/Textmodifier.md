[**textmode.js v0.1.2**](../README.md)

***

[textmode.js](../README.md) / Textmodifier

# Class: Textmodifier

Defined in: [textmode/Textmodifier.ts:57](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/textmode/Textmodifier.ts#L57)

Manages textmode rendering on a canvas or video element.

Each `Textmodifier` instance can be applied to a specific HTML canvas or video element via [textmode.create](textmode.md#create),
or created as a standalone instance for independent rendering.

## Accessors

### font

#### Get Signature

> **get** **font**(): [`TextmodeFont`](TextmodeFont.md)

Defined in: [textmode/Textmodifier.ts:871](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/textmode/Textmodifier.ts#L871)

Get the current font object used for rendering.

##### Returns

[`TextmodeFont`](TextmodeFont.md)

***

### frameCount

#### Get Signature

> **get** **frameCount**(): `number`

Defined in: [textmode/Textmodifier.ts:880](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/textmode/Textmodifier.ts#L880)

Get the current frame count.

##### Returns

`number`

***

### grid

#### Get Signature

> **get** **grid**(): [`TextmodeGrid`](TextmodeGrid.md)

Defined in: [textmode/Textmodifier.ts:868](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/textmode/Textmodifier.ts#L868)

Get the current grid object used for rendering.

##### Returns

[`TextmodeGrid`](TextmodeGrid.md)

***

### height

#### Get Signature

> **get** **height**(): `number`

Defined in: [textmode/Textmodifier.ts:886](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/textmode/Textmodifier.ts#L886)

Get the height of the canvas.

##### Returns

`number`

***

### mode

#### Get Signature

> **get** **mode**(): `"manual"` \| `"auto"`

Defined in: [textmode/Textmodifier.ts:874](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/textmode/Textmodifier.ts#L874)

Get the current rendering mode.

##### Returns

`"manual"` \| `"auto"`

***

### pipeline

#### Get Signature

> **get** **pipeline**(): [`TextmodeConversionPipeline`](TextmodeConversionPipeline.md)

Defined in: [textmode/Textmodifier.ts:877](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/textmode/Textmodifier.ts#L877)

Get the current textmode conversion pipeline.

##### Returns

[`TextmodeConversionPipeline`](TextmodeConversionPipeline.md)

***

### width

#### Get Signature

> **get** **width**(): `number`

Defined in: [textmode/Textmodifier.ts:883](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/textmode/Textmodifier.ts#L883)

Get the width of the canvas.

##### Returns

`number`

## Methods

### background()

> **background**(`r`, `g`, `b`, `a`): `void`

Defined in: [textmode/Textmodifier.ts:836](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/textmode/Textmodifier.ts#L836)

Set the background color for the canvas.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `r` | `number` | `undefined` | Red component (0-255) |
| `g` | `number` | `r` | Green component (0-255, optional) |
| `b` | `number` | `r` | Blue component (0-255, optional) |
| `a` | `number` | `255` | Alpha component (0-255, optional) |

#### Returns

`void`

#### Example

```javascript
const t = await textmode.create({
  width: 800,
  height: 600,
})

t.draw(() => {
  // Set the background color to black
  t.background(0);

  const centerX = t.width / 2;
  const centerY = t.height / 2;
  const radius = Math.min(t.width, t .height) / 3;
  const speed = 0.02; // Adjust speed of rotation

  const angle = t.frameCount * speed;
  const x = centerX + Math.cos(angle) * radius - 100;
  const y = centerY + Math.sin(angle) * radius - 50;

  // Set the fill color to white
  t.fill(255);

  // Draw a rectangle with the fill color
  t.rect(x, y, 200, 150);
});
```

***

### converter()

> **converter**(`name`): `void` \| [`TextmodeConverter`](../textmode.js/namespaces/converters/classes/TextmodeConverter.md)

Defined in: [textmode/Textmodifier.ts:719](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/textmode/Textmodifier.ts#L719)

Get a specific converter by name.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The name of the converter to retrieve. |

#### Returns

`void` \| [`TextmodeConverter`](../textmode.js/namespaces/converters/classes/TextmodeConverter.md)

The requested `TextmodeConverter` instance.

#### Example

```javascript
// Fetch a canvas element to apply textmode rendering to
const canvas = document.querySelector('canvas#myCanvas');

// Create a Textmodifier instance
const textmodifier = await textmode.create(canvas);

// Get the pre-defined brightness converter from the pipeline
const brightnessConverter = textmodifier.converter('brightness');

// Update properties of the brightness converter
brightnessConverter.invert(true);
brightnessConverter.characters(" .,;:*");
```

***

### createShader()

> **createShader**(`vertexSource`, `fragmentSource`): `Shader`

Defined in: [textmode/Textmodifier.ts:846](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/textmode/Textmodifier.ts#L846)

Create a shader program from vertex and fragment source code.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `vertexSource` | `string` | The GLSL source code for the vertex shader. |
| `fragmentSource` | `string` | The GLSL source code for the fragment shader. |

#### Returns

`Shader`

The created shader program for use in `textmode.js`.

***

### draw()

> **draw**(`callback`): `void`

Defined in: [textmode/Textmodifier.ts:643](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/textmode/Textmodifier.ts#L643)

Set a draw callback function that will be executed before each render.
This method is primarily useful for standalone textmodifier instances.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | () => `void` | The function to call before each render |

#### Returns

`void`

#### Example

```javascript
// Create a standalone textmodifier instance
const t = await textmode.create({
 width: 800,
 height: 600,
});

// Set up draw callback
t.draw(() => {
  // Set background color
  t.background(128);
  
  // Draw some content
  t.fill(255, 0, 0); // Set fill color to red
  t.rect(50, 50, 100, 100);
});
```

***

### fill()

> **fill**(`r`, `g?`, `b?`, `a?`): `void`

Defined in: [textmode/Textmodifier.ts:758](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/textmode/Textmodifier.ts#L758)

Sets the fill color for subsequent rendering operations

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `r` | `number` | Red component (0-255) |
| `g?` | `number` | Green component (0-255, optional) |
| `b?` | `number` | Blue component (0-255, optional) |
| `a?` | `number` | Alpha component (0-255, optional) |

#### Returns

`void`

#### Example

```javascript
const t = await textmode.create({
  width: 800,
  height: 600,
})

t.draw(() => {
  // Set the background color to black
  t.background(0);

  const centerX = t.width / 2;
  const centerY = t.height / 2;
  const radius = Math.min(t.width, t .height) / 3;
  const speed = 0.02; // Adjust speed of rotation

  const angle = t.frameCount * speed;
  const x = centerX + Math.cos(angle) * radius - 100;
  const y = centerY + Math.sin(angle) * radius - 50;

  // Set the fill color to white
  t.fill(255);

  // Draw a rectangle with the fill color
  t.rect(x, y, 200, 150);
});
```

***

### fontSize()

> **fontSize**(`size`): `void`

Defined in: [textmode/Textmodifier.ts:602](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/textmode/Textmodifier.ts#L602)

Set the font size used for rendering.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `size` | `number` | The font size to set. |

#### Returns

`void`

#### Example

```javascript
// Fetch a canvas element to apply textmode rendering to
const canvas = document.querySelector('canvas#myCanvas');

// Create a Textmodifier instance
const textmodifier = await textmode.create(canvas);

// Set the font size to 24
textmodifier.fontSize(24);
```

***

### frameRate()

> **frameRate**(`fps?`): `number` \| `void`

Defined in: [textmode/Textmodifier.ts:571](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/textmode/Textmodifier.ts#L571)

Set the maximum frame rate for auto rendering. If called without arguments, returns the current measured frame rate.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fps?` | `number` | The maximum frames per second for auto rendering. |

#### Returns

`number` \| `void`

#### Example

```javascript
// Fetch a canvas element to apply textmode rendering to
const canvas = document.querySelector('canvas#myCanvas');

// Create a Textmodifier instance
const textmodifier = await textmode.create(canvas);

// Set the maximum frame rate to 30 FPS
textmodifier.frameRate(30);
```

***

### loadFont()

> **loadFont**(`fontSource`): `Promise`\<`void`\>

Defined in: [textmode/Textmodifier.ts:348](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/textmode/Textmodifier.ts#L348)

Update the font used for rendering.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fontSource` | `string` | The URL of the font to load. |

#### Returns

`Promise`\<`void`\>

#### Example

```javascript
// Fetch a canvas element to apply textmode rendering to
const canvas = document.querySelector('canvas#myCanvas');

// Create a Textmodifier instance
const textmodifier = await textmode.create(canvas);

// Load a custom font from a URL
await textmodifier.loadFont('https://example.com/fonts/myfont.ttf');

// Local font example
// await textmodifier.loadFont('./fonts/myfont.ttf'); 
```

***

### rect()

> **rect**(`x`, `y`, `width`, `height`): `void`

Defined in: [textmode/Textmodifier.ts:797](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/textmode/Textmodifier.ts#L797)

Draw a rectangle with the current shader or fill color.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `x` | `number` | `undefined` | X-coordinate of the rectangle |
| `y` | `number` | `undefined` | Y-coordinate of the rectangle |
| `width` | `number` | `1` | Width of the rectangle |
| `height` | `number` | `1` | Height of the rectangle |

#### Returns

`void`

#### Example

```javascript
const t = await textmode.create({
  width: 800,
  height: 600,
})

t.draw(() => {
  // Set the background color to black
  t.background(0);

  const centerX = t.width / 2;
  const centerY = t.height / 2;
  const radius = Math.min(t.width, t .height) / 3;
  const speed = 0.02; // Adjust speed of rotation

  const angle = t.frameCount * speed;
  const x = centerX + Math.cos(angle) * radius - 100;
  const y = centerY + Math.sin(angle) * radius - 50;

  // Set the fill color to white
  t.fill(255);

  // Draw a rectangle with the fill color
  t.rect(x, y, 200, 150);
});
```

***

### render()

> **render**(): `void`

Defined in: [textmode/Textmodifier.ts:394](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/textmode/Textmodifier.ts#L394)

Apply textmode rendering to the canvas.

**Note:** In `'auto'` mode, this is called automatically.
In `'manual'` mode, you need to call this method when you want to update the textmode rendering.

#### Returns

`void`

#### Example

```javascript
// p5.js example

let textmodifier;

// p5.js setup function
async function setup() {

  // Create a p5.js canvas
  const canvas = createCanvas(800, 600);

  // Create a Textmodifier instance
  textmodifier = await textmode.create(canvas.elt);

  // Update the rendering mode to 'manual'
  textmodifier.renderMode('manual');
}

// p5.js draw function
function draw() {

  // Draw something on the p5.js canvas
  background(220);
  fill(255, 0, 0);
  rect(50, 50, 100, 100);

  // Apply textmode rendering
  textmodifier.render();
}
```

***

### renderMode()

> **renderMode**(`mode?`): `void` \| `"manual"` \| `"auto"`

Defined in: [textmode/Textmodifier.ts:540](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/textmode/Textmodifier.ts#L540)

Update the rendering mode. 

If called without arguments, returns the current mode.

- `'manual'`: Requires manual [render](#render) calls
- `'auto'`: Automatically renders using [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `mode?` | `"manual"` \| `"auto"` | The new rendering mode to set. |

#### Returns

`void` \| `"manual"` \| `"auto"`

#### Example

```javascript
// Fetch a canvas element to apply textmode rendering to
const canvas = document.querySelector('canvas#myCanvas');

// Create a Textmodifier instance
const textmodifier = await textmode.create(canvas);

// Update the rendering mode to 'manual'
textmodifier.renderMode('manual');

// Now you need to call textmodifier.render() manually in your animation loop
```

***

### resizeCanvas()

> **resizeCanvas**(`width`, `height`): `void`

Defined in: [textmode/Textmodifier.ts:685](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/textmode/Textmodifier.ts#L685)

Resize the `textmode.js` canvas.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `width` | `number` | The new width of the canvas. |
| `height` | `number` | The new height of the canvas. |

#### Returns

`void`

***

### saveCanvas()

> **saveCanvas**(`filename`, `format`, `options`): `Promise`\<`void`\>

Defined in: [textmode/Textmodifier.ts:316](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/textmode/Textmodifier.ts#L316)

Export the current textmode rendering to an image file.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `filename` | `string` | The filename (without extension) to save the image as |
| `format` | `"png"` \| `"jpg"` \| `"webp"` | The image format ('png', 'jpg', or 'webp') |
| `options` | `Omit`\<[`ImageExportOptions`](../textmode.js/namespaces/export/type-aliases/ImageExportOptions.md), `"filename"` \| `"format"`\> | Additional options for image export |

#### Returns

`Promise`\<`void`\>

#### Example

```javascript
// Fetch a canvas element to apply textmode rendering to
const canvas = document.querySelector('canvas#myCanvas');

// Create a Textmodifier instance
const textmodifier = await textmode.create(canvas, {renderMode: 'manual'});

// Render a single frame
textmodifier.render();

// Export the current rendering to a PNG file
textmodifier.saveCanvas('my_textmode_rendering', 'png');

// Export with custom options
textmodifier.saveCanvas('my_textmode_rendering', 'jpg', {
  quality: 0.8,
  scale: 2.0,
  backgroundColor: 'white'
});
```

***

### saveStrings()

> **saveStrings**(`options`): `void`

Defined in: [textmode/Textmodifier.ts:226](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/textmode/Textmodifier.ts#L226)

Export the current textmode rendering to a TXT file.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`TXTExportOptions`](../textmode.js/namespaces/export/type-aliases/TXTExportOptions.md) | Options for TXT export |

#### Returns

`void`

#### Example

```javascript
// Fetch a canvas element to apply textmode rendering to
const canvas = document.querySelector('canvas#myCanvas');

// Create a Textmodifier instance
const textmodifier = await textmode.create(canvas, {renderMode: 'manual'});

// Render a single frame
textmodifier.render();

// Export the current rendering to a TXT file
textmodifier.saveStrings({
  filename: 'my_textmode_rendering',
  preserveTrailingSpaces: false
});
```

***

### saveSVG()

> **saveSVG**(`options`): `void`

Defined in: [textmode/Textmodifier.ts:283](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/textmode/Textmodifier.ts#L283)

Export the current textmode rendering to an SVG file.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`SVGExportOptions`](../textmode.js/namespaces/export/type-aliases/SVGExportOptions.md) | Options for SVG export |

#### Returns

`void`

#### Example

```javascript
// Fetch a canvas element to apply textmode rendering to
const canvas = document.querySelector('canvas#myCanvas');

// Create a Textmodifier instance
const textmodifier = await textmode.create(canvas, {renderMode: 'manual'});

// Render a single frame
textmodifier.render();

// Export the current rendering to an SVG file
textmodifier.saveSVG({
  filename: 'my_textmode_rendering',
});
```

***

### setUniform()

> **setUniform**(`name`, `value`): `void`

Defined in: [textmode/Textmodifier.ts:863](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/textmode/Textmodifier.ts#L863)

Set a uniform variable for the current shader.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The name of the uniform variable to set. |
| `value` | `any` | The value to set for the uniform variable. |

#### Returns

`void`

***

### shader()

> **shader**(`shader`): `void`

Defined in: [textmode/Textmodifier.ts:854](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/textmode/Textmodifier.ts#L854)

Set the current shader for rendering.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `shader` | `Shader` | The shader program to use for rendering. |

#### Returns

`void`

***

### toString()

> **toString**(`options`): `string`

Defined in: [textmode/Textmodifier.ts:199](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/textmode/Textmodifier.ts#L199)

Generate the current textmode rendering as a text string.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | `Omit`\<[`TXTExportOptions`](../textmode.js/namespaces/export/type-aliases/TXTExportOptions.md), `"filename"`\> | Options for text generation *(excluding filename)* |

#### Returns

`string`

Textmode grid content as a string.

#### Example

```javascript
// Fetch a canvas element to apply textmode rendering to
const canvas = document.querySelector('canvas#myCanvas');

// Create a Textmodifier instance
const textmodifier = await textmode.create(canvas, {renderMode: 'manual'});

// Render a single frame
textmodifier.render();

// Get the current rendering as a text string
const textString = textmodifier.toString({
  preserveTrailingSpaces: false,
  lineEnding: 'lf'
});

// Print to console or use otherwise
console.log(textString);

////////

// Example with video element
const video = document.querySelector('video#myVideo');
const videoTextmodifier = await textmode.create(video);

// The textmode overlay will automatically update as the video plays
video.play();

// Get current frame as ASCII
const videoFrame = videoTextmodifier.toString();
```

***

### toSVG()

> **toSVG**(`options`): `string`

Defined in: [textmode/Textmodifier.ts:257](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/textmode/Textmodifier.ts#L257)

Generate the current textmode rendering as an SVG string.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | `Omit`\<[`SVGExportOptions`](../textmode.js/namespaces/export/type-aliases/SVGExportOptions.md), `"filename"`\> | Options for SVG generation *(excluding filename)* |

#### Returns

`string`

SVG content as a string.

#### Example

```javascript
// Fetch a canvas element to apply textmode rendering to
const canvas = document.querySelector('canvas#myCanvas');

// Create a Textmodifier instance
const textmodifier = await textmode.create(canvas, {renderMode: 'manual'});

// Render a single frame
textmodifier.render();

// Get the current rendering as an SVG string
const svgString = textmodifier.toSVG({
  includeBackgroundRectangles: true,
  drawMode: 'fill'
});

// Print to console or use otherwise
console.log(svgString);
```

***

### windowResized()

> **windowResized**(`callback`): `void`

Defined in: [textmode/Textmodifier.ts:676](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/textmode/Textmodifier.ts#L676)

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
const t = await textmode.create({
 width: window.innerWidth,
 height: window.innerHeight,
});

// Draw callback to update content
t.draw(() => {
  // Set background color
  t.background(128);

  // Draw some content
  t.fill(255, 0, 0); // Set fill color to red
  t.rect(50, 50, 100, 100);
});

// Set up window resize callback
t.windowResized(() => {
  // Resize the canvas to match window size
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});

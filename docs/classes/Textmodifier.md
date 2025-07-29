[**textmode.js v0.1.1**](../README.md)

***

[textmode.js](../README.md) / Textmodifier

# Class: Textmodifier

Defined in: [textmode/Textmodifier.ts:36](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/textmode/Textmodifier.ts#L36)

Manages textmode rendering on a canvas.

Each `Textmodifier` instance is applied to a specific HTML canvas element via `textmode.create()`.

## Accessors

### font

#### Get Signature

> **get** **font**(): [`TextmodeFont`](TextmodeFont.md)

Defined in: [textmode/Textmodifier.ts:552](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/textmode/Textmodifier.ts#L552)

Get the current font object used for rendering.

##### Returns

[`TextmodeFont`](TextmodeFont.md)

***

### frameCount

#### Get Signature

> **get** **frameCount**(): `number`

Defined in: [textmode/Textmodifier.ts:561](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/textmode/Textmodifier.ts#L561)

Get the current frame count.

##### Returns

`number`

***

### grid

#### Get Signature

> **get** **grid**(): [`TextmodeGrid`](TextmodeGrid.md)

Defined in: [textmode/Textmodifier.ts:549](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/textmode/Textmodifier.ts#L549)

Get the current grid object used for rendering.

##### Returns

[`TextmodeGrid`](TextmodeGrid.md)

***

### mode

#### Get Signature

> **get** **mode**(): `"manual"` \| `"auto"`

Defined in: [textmode/Textmodifier.ts:555](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/textmode/Textmodifier.ts#L555)

Get the current rendering mode.

##### Returns

`"manual"` \| `"auto"`

***

### pipeline

#### Get Signature

> **get** **pipeline**(): [`TextmodeConversionPipeline`](TextmodeConversionPipeline.md)

Defined in: [textmode/Textmodifier.ts:558](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/textmode/Textmodifier.ts#L558)

Get the current textmode conversion pipeline

##### Returns

[`TextmodeConversionPipeline`](TextmodeConversionPipeline.md)

## Methods

### converter()

> **converter**(`name`): `void` \| [`TextmodeConverter`](../textmode.js/namespaces/TextmodeConverters/classes/TextmodeConverter.md)

Defined in: [textmode/Textmodifier.ts:544](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/textmode/Textmodifier.ts#L544)

Get a specific converter by name.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The name of the converter to retrieve. |

#### Returns

`void` \| [`TextmodeConverter`](../textmode.js/namespaces/TextmodeConverters/classes/TextmodeConverter.md)

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

### fontSize()

> **fontSize**(`size?`): `number` \| `void`

Defined in: [textmode/Textmodifier.ts:512](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/textmode/Textmodifier.ts#L512)

Get or set the font size used for rendering. 
If called without arguments, returns the current font size.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `size?` | `number` | The font size to set. If undefined, returns the current font size. |

#### Returns

`number` \| `void`

`void` if setting the size, or the current font size if called without arguments.

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

Defined in: [textmode/Textmodifier.ts:485](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/textmode/Textmodifier.ts#L485)

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

// Set the maximum frame rate to 60 FPS
textmodifier.frameRate(60);
```

***

### loadFont()

> **loadFont**(`fontUrl`): `Promise`\<`void`\>

Defined in: [textmode/Textmodifier.ts:291](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/textmode/Textmodifier.ts#L291)

Update the font used for rendering.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fontUrl` | `string` | The URL of the font to load. |

#### Returns

`Promise`\<`void`\>

#### Example

```javascript
// Fetch a canvas element to apply textmode rendering to
const canvas = document.querySelector('canvas#myCanvas');

// Create a Textmodifier instance
const textmodifier = await textmode.create(canvas);

// Load a custom font from a URL
textmodifier.loadFont('https://example.com/fonts/myfont.ttf');

// Local font example
// textmodifier.loadFont('./fonts/myfont.ttf'); 
```

***

### render()

> **render**(): `void`

Defined in: [textmode/Textmodifier.ts:337](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/textmode/Textmodifier.ts#L337)

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

Defined in: [textmode/Textmodifier.ts:454](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/textmode/Textmodifier.ts#L454)

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

### saveCanvas()

> **saveCanvas**(`filename`, `format`, `options`): `Promise`\<`void`\>

Defined in: [textmode/Textmodifier.ts:259](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/textmode/Textmodifier.ts#L259)

Export the current textmode rendering to an image file.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `filename` | `string` | The filename (without extension) to save the image as |
| `format` | `"png"` \| `"jpg"` \| `"webp"` | The image format ('png', 'jpg', or 'webp') |
| `options` | `Omit`\<[`ImageExportOptions`](../textmode.js/namespaces/ExportOptions/type-aliases/ImageExportOptions.md), `"filename"` \| `"format"`\> | Additional options for image export |

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

Defined in: [textmode/Textmodifier.ts:169](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/textmode/Textmodifier.ts#L169)

Export the current textmode rendering to a TXT file.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`TXTExportOptions`](../textmode.js/namespaces/ExportOptions/type-aliases/TXTExportOptions.md) | Options for TXT export |

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

Defined in: [textmode/Textmodifier.ts:226](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/textmode/Textmodifier.ts#L226)

Export the current textmode rendering to an SVG file.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`SVGExportOptions`](../textmode.js/namespaces/ExportOptions/type-aliases/SVGExportOptions.md) | Options for SVG export |

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

### toString()

> **toString**(`options`): `string`

Defined in: [textmode/Textmodifier.ts:142](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/textmode/Textmodifier.ts#L142)

Generate the current textmode rendering as a text string.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | `Omit`\<[`TXTExportOptions`](../textmode.js/namespaces/ExportOptions/type-aliases/TXTExportOptions.md), `"filename"`\> | Options for TXT generation (excluding filename) |

#### Returns

`string`

TXT content as a string

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
```

***

### toSVG()

> **toSVG**(`options`): `string`

Defined in: [textmode/Textmodifier.ts:200](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/textmode/Textmodifier.ts#L200)

Generate the current textmode rendering as an SVG string.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | `Omit`\<[`SVGExportOptions`](../textmode.js/namespaces/ExportOptions/type-aliases/SVGExportOptions.md), `"filename"`\> | Options for SVG generation (excluding filename) |

#### Returns

`string`

SVG content as a string

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

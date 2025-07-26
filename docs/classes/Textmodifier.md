[**textmode.js v0.0.10-beta.5**](../README.md)

***

[textmode.js](../README.md) / Textmodifier

# Class: Textmodifier

Defined in: [textmode/Textmodifier.ts:34](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/Textmodifier.ts#L34)

Manages textmode rendering on a canvas.

Each `Textmodifier` instance is applied to a specific HTML canvas element via `textmode.create()`.

## Accessors

### font

#### Get Signature

> **get** **font**(): [`TextmodeFont`](TextmodeFont.md)

Defined in: [textmode/Textmodifier.ts:416](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/Textmodifier.ts#L416)

Get the current font object used for rendering.

##### Returns

[`TextmodeFont`](TextmodeFont.md)

***

### frameCount

#### Get Signature

> **get** **frameCount**(): `number`

Defined in: [textmode/Textmodifier.ts:425](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/Textmodifier.ts#L425)

Get the current frame count.

##### Returns

`number`

***

### grid

#### Get Signature

> **get** **grid**(): [`TextmodeGrid`](TextmodeGrid.md)

Defined in: [textmode/Textmodifier.ts:413](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/Textmodifier.ts#L413)

Get the current grid object used for rendering.

##### Returns

[`TextmodeGrid`](TextmodeGrid.md)

***

### mode

#### Get Signature

> **get** **mode**(): `"manual"` \| `"auto"`

Defined in: [textmode/Textmodifier.ts:419](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/Textmodifier.ts#L419)

Get the current rendering mode.

##### Returns

`"manual"` \| `"auto"`

***

### pipeline

#### Get Signature

> **get** **pipeline**(): [`TextmodeConversionPipeline`](TextmodeConversionPipeline.md)

Defined in: [textmode/Textmodifier.ts:422](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/Textmodifier.ts#L422)

Get the current textmode conversion pipeline

##### Returns

[`TextmodeConversionPipeline`](TextmodeConversionPipeline.md)

## Methods

### converter()

> **converter**(`name`): `void` \| [`TextmodeConverter`](../textmode.js/namespaces/TextmodeConverters/classes/TextmodeConverter.md)

Defined in: [textmode/Textmodifier.ts:408](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/Textmodifier.ts#L408)

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

Defined in: [textmode/Textmodifier.ts:376](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/Textmodifier.ts#L376)

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

Defined in: [textmode/Textmodifier.ts:349](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/Textmodifier.ts#L349)

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

Defined in: [textmode/Textmodifier.ts:159](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/Textmodifier.ts#L159)

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

Defined in: [textmode/Textmodifier.ts:205](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/Textmodifier.ts#L205)

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

Defined in: [textmode/Textmodifier.ts:318](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/Textmodifier.ts#L318)

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

### saveSVG()

> **saveSVG**(`options`): `void`

Defined in: [textmode/Textmodifier.ts:135](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/Textmodifier.ts#L135)

Export the current textmode rendering to an SVG file.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`SVGExportOptions`](../type-aliases/SVGExportOptions.md) | Options for SVG export |

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

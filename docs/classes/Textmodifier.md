[**textmode.js v0.1.9**](../README.md)

***

[textmode.js](../README.md) / Textmodifier

# Class: Textmodifier

Defined in: [textmode/Textmodifier.ts:70](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/Textmodifier.ts#L70)

Manages textmode rendering on a canvas or video element.

Each `Textmodifier` instance applies a `HTMLCanvasElement` with custom WebGL rendering on top of the original content.

If the `Textmodifier` instance is created in `standalone` mode without a capture source, 
it simply creates a new `HTMLCanvasElement` to draw on using the `textmode.js` drawing API.

## Extends

- `TextmodifierCore`\<`this`\>.`RenderingCapabilities`.`ExportCapabilities`.`FontCapabilities`.`ConversionCapabilities`

## Accessors

### canvas

#### Get Signature

> **get** **canvas**(): `TextmodeCanvas`

Defined in: [textmode/Textmodifier.ts:732](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/Textmodifier.ts#L732)

Get the textmodifier canvas containing the rendered output.

##### Returns

`TextmodeCanvas`

***

### font

#### Get Signature

> **get** **font**(): [`TextmodeFont`](TextmodeFont.md)

Defined in: [textmode/Textmodifier.ts:692](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/Textmodifier.ts#L692)

Get the current font object used for rendering.

##### Returns

[`TextmodeFont`](TextmodeFont.md)

***

### frameCount

#### Get Signature

> **get** **frameCount**(): `number`

Defined in: [textmode/Textmodifier.ts:707](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/Textmodifier.ts#L707)

Get the current frame count.

##### Returns

`number`

#### Set Signature

> **set** **frameCount**(`value`): `void`

Defined in: [textmode/Textmodifier.ts:717](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/Textmodifier.ts#L717)

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

Defined in: [textmode/Textmodifier.ts:687](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/Textmodifier.ts#L687)

Get the current grid object used for rendering.

##### Returns

[`TextmodeGrid`](TextmodeGrid.md)

***

### height

#### Get Signature

> **get** **height**(): `number`

Defined in: [textmode/Textmodifier.ts:727](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/Textmodifier.ts#L727)

Get the height of the canvas.

##### Returns

`number`

***

### isDisposed

#### Get Signature

> **get** **isDisposed**(): `boolean`

Defined in: [textmode/Textmodifier.ts:737](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/Textmodifier.ts#L737)

Check if the instance has been disposed/destroyed.

##### Returns

`boolean`

***

### mode

#### Get Signature

> **get** **mode**(): `"manual"` \| `"auto"`

Defined in: [textmode/Textmodifier.ts:697](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/Textmodifier.ts#L697)

Get the current rendering mode.

##### Returns

`"manual"` \| `"auto"`

***

### pipeline

#### Get Signature

> **get** **pipeline**(): [`TextmodeConversionPipeline`](TextmodeConversionPipeline.md)

Defined in: [textmode/Textmodifier.ts:702](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/Textmodifier.ts#L702)

Get the current textmode conversion pipeline.

##### Returns

[`TextmodeConversionPipeline`](TextmodeConversionPipeline.md)

***

### renderer

#### Get Signature

> **get** **renderer**(): `GLRenderer`

Defined in: [textmode/Textmodifier.ts:712](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/Textmodifier.ts#L712)

Get the WebGL renderer.

##### Returns

`GLRenderer`

***

### width

#### Get Signature

> **get** **width**(): `number`

Defined in: [textmode/Textmodifier.ts:722](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/Textmodifier.ts#L722)

Get the width of the canvas.

##### Returns

`number`

## Methods

### addConverter()

> **addConverter**(`type`): `void` \| [`TextmodeConverter`](../textmode.js/namespaces/converters/classes/TextmodeConverter.md)\<[`TextmodeConverterOptions`](../textmode.js/namespaces/converters/interfaces/TextmodeConverterOptions.md)\>

Defined in: [textmode/mixins/ConversionMixin.ts:32](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/mixins/ConversionMixin.ts#L32)

Adds a new converter to the pipeline.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `type` | `"brightness"` \| `"custom"` | The type of converter to add. Can be either "brightness" or "custom". |

#### Returns

`void` \| [`TextmodeConverter`](../textmode.js/namespaces/converters/classes/TextmodeConverter.md)\<[`TextmodeConverterOptions`](../textmode.js/namespaces/converters/interfaces/TextmodeConverterOptions.md)\>

The newly created [TextmodeConverter](../textmode.js/namespaces/converters/classes/TextmodeConverter.md) instance or `void` if the addition failed.

#### Example

```javascript
// Fetch a canvas element to apply textmode rendering to
const canvas = document.querySelector('canvas#myCanvas');

// Create a Textmodifier instance
const textmodifier = await textmode.create(canvas);

// Add a new brightness converter
const myConverter = textmodifier.addConverter('brightness');

// Configure the new converter
myConverter.characters("▓▒░ ");
myConverter.enabled(true);

// Add a custom converter
const customConverter = textmodifier.addConverter('custom');
```

***

### background()

> **background**(`r`, `g?`, `b?`, `a?`): `void`

Defined in: [textmode/mixins/RenderingMixin.ts:390](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/mixins/RenderingMixin.ts#L390)

Set the background color for the canvas.

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

### clear()

> **clear**(): `void`

Defined in: [textmode/mixins/RenderingMixin.ts:434](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/mixins/RenderingMixin.ts#L434)

Clear the canvas.

#### Returns

`void`

***

### createFilterShader()

> **createFilterShader**(`fragmentSource`): `GLShader`

Defined in: [textmode/mixins/RenderingMixin.ts:406](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/mixins/RenderingMixin.ts#L406)

Create a filter shader program from a fragment source code.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fragmentSource` | `string` | The GLSL source code for the fragment shader. |

#### Returns

`GLShader`

The created filter shader program for use in `textmode.js`.

***

### createFramebuffer()

> **createFramebuffer**(`width`, `height`, `options`): [`Framebuffer`](../textmode.js/namespaces/rendering/classes/Framebuffer.md)

Defined in: [textmode/mixins/RenderingMixin.ts:442](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/mixins/RenderingMixin.ts#L442)

Create a framebuffer.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `width` | `number` | The width in pixels |
| `height` | `number` | The height in pixels |
| `options` | [`FramebufferOptions`](../textmode.js/namespaces/rendering/type-aliases/FramebufferOptions.md) | Additional options for the framebuffer |

#### Returns

[`Framebuffer`](../textmode.js/namespaces/rendering/classes/Framebuffer.md)

***

### destroy()

> **destroy**(): `void`

Defined in: [textmode/Textmodifier.ts:664](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/Textmodifier.ts#L664)

Completely destroy this Textmodifier instance and free all associated resources.

After calling this method, the instance should not be used and will be eligible for garbage collection.

This method is idempotent and safe to call multiple times.

#### Returns

`void`

#### Example

```javascript
// Create a textmodifier instance
const textmodifier = await textmode.create(canvas);

// Use it for rendering
textmodifier.render();

// When done, completely clean up
textmodifier.destroy();

// Instance is now safely disposed and ready for garbage collection
```

***

### draw()

> **draw**(`callback`): `void`

Defined in: [textmode/Textmodifier.ts:582](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/Textmodifier.ts#L582)

Set a draw callback function that will be executed before each render.
This method is primarily useful for standalone textmodifier instances, 
but can also be used to draw on top of the captured video or canvas.

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

Defined in: [textmode/mixins/RenderingMixin.ts:44](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/mixins/RenderingMixin.ts#L44)

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

Defined in: [textmode/mixins/FontMixin.ts:45](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/mixins/FontMixin.ts#L45)

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

Defined in: [textmode/Textmodifier.ts:390](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/Textmodifier.ts#L390)

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

### image()

> **image**(`source`, `posX`, `posY`, `width?`, `height?`): `void`

Defined in: [textmode/mixins/RenderingMixin.ts:429](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/mixins/RenderingMixin.ts#L429)

Draw an image to the canvas.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `source` | [`Framebuffer`](../textmode.js/namespaces/rendering/classes/Framebuffer.md) | The image source |
| `posX` | `number` | The x position to draw the image |
| `posY` | `number` | The y position to draw the image |
| `width?` | `number` | The width to draw the image (optional) |
| `height?` | `number` | The height to draw the image (optional) |

#### Returns

`void`

***

### isLooping()

> **isLooping**(): `boolean`

Defined in: [textmode/Textmodifier.ts:553](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/Textmodifier.ts#L553)

Check whether the textmodifier is currently running the automatic render loop.

Returns `true` when both the render mode is `'auto'` AND the loop is active.
Returns `false` when in `'manual'` mode or when [noLoop](#noloop) has been called.

#### Returns

`boolean`

True if the automatic render loop is currently active, false otherwise.

#### Example

```javascript
const textmodifier = await textmode.create(canvas);

// Check loop status in different states
console.log(textmodifier.isLooping()); // true (auto mode, looping)

textmodifier.noLoop();
console.log(textmodifier.isLooping()); // false (auto mode, not looping)

textmodifier.renderMode('manual');
console.log(textmodifier.isLooping()); // false (manual mode)

textmodifier.renderMode('auto');
console.log(textmodifier.isLooping()); // false (auto mode, but loop was stopped)

textmodifier.loop();
console.log(textmodifier.isLooping()); // true (auto mode, looping)
```

***

### line()

> **line**(`x1`, `y1`, `x2`, `y2`): `void`

Defined in: [textmode/mixins/RenderingMixin.ts:353](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/mixins/RenderingMixin.ts#L353)

Draw a line from point (x1, y1) to point (x2, y2) with the current stroke settings.
Lines respect stroke color, stroke weight, and rotation, but ignore fill properties.

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
const t = await textmode.create({
  width: 800,
  height: 600,
})

t.draw(() => {
  // Set the background color to black
  t.background(0);

  // Draw a simple line
  t.stroke(255, 0, 0); // Red stroke
  t.strokeWeight(2);   // 2px thick
  t.line(100, 100, 300, 200);

  // Draw an animated rotating line
  t.push();
  t.stroke(0, 255, 0); // Green stroke
  t.strokeWeight(4);   // 4px thick
  t.rotate(t.frameCount * 2); // Rotate based on frame count
  t.line(400, 300, 600, 300);
  t.pop();

  // Draw a thick yellow line
  t.stroke(255, 255, 0); // Yellow stroke
  t.strokeWeight(8);     // 8px thick
  t.line(200, 400, 400, 500);

  // Line with no stroke won't be visible
  t.noStroke();
  t.line(500, 100, 700, 200); // This won't render
});
```

***

### loadFont()

> **loadFont**(`fontSource`): `Promise`\<`void`\>

Defined in: [textmode/mixins/FontMixin.ts:27](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/mixins/FontMixin.ts#L27)

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

### loop()

> **loop**(): `void`

Defined in: [textmode/Textmodifier.ts:469](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/Textmodifier.ts#L469)

Resume the automatic rendering loop if it was stopped by [noLoop](#noloop).

This method restarts the render loop when in `'auto'` mode. If the render mode
is `'manual'`, the loop state will be set but automatic rendering will not start
until the mode is changed back to `'auto'`.

#### Returns

`void`

#### Example

```javascript
// Create a textmodifier instance
const textmodifier = await textmode.create(canvas);

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

### noFill()

> **noFill**(): `void`

Defined in: [textmode/mixins/RenderingMixin.ts:160](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/mixins/RenderingMixin.ts#L160)

Disables fill rendering for subsequent operations

#### Returns

`void`

#### Example

```javascript
const t = await textmode.create({
  width: 800,
  height: 600,
})

t.draw(() => {
  t.background(0);

  // Rectangle with fill
  t.fill(255, 0, 0);
  t.stroke(0, 255, 0);
  t.strokeWeight(4);
  t.rect(100, 100, 150, 100);

  // Rectangle without fill (stroke only)
  t.noFill();
  t.rect(300, 100, 150, 100);
});
```

***

### noLoop()

> **noLoop**(): `void`

Defined in: [textmode/Textmodifier.ts:432](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/Textmodifier.ts#L432)

Stop the automatic rendering loop while keeping the render mode as 'auto'.

This method pauses the render loop without changing the render mode, allowing
it to be resumed later with [loop](#loop). This is useful for temporarily pausing
animation while maintaining the ability to restart it.

**Note:** This only affects rendering when in `'auto'` mode. In `'manual'` mode,
this method has no effect since rendering is already controlled manually.

#### Returns

`void`

#### Example

```javascript
// Create a textmodifier instance in auto mode
const textmodifier = await textmode.create(canvas);

// The render loop is running automatically
console.log(textmodifier.isLooping()); // true

// Stop the automatic rendering loop
textmodifier.noLoop();
console.log(textmodifier.isLooping()); // false

// Resume the automatic rendering loop
textmodifier.loop();
console.log(textmodifier.isLooping()); // true
```

***

### noStroke()

> **noStroke**(): `void`

Defined in: [textmode/mixins/RenderingMixin.ts:133](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/mixins/RenderingMixin.ts#L133)

Disables stroke rendering for subsequent operations

#### Returns

`void`

#### Example

```javascript
const t = await textmode.create({
  width: 800,
  height: 600,
})

t.draw(() => {
  t.background(0);

  // Rectangle with stroke
  t.fill(255, 0, 0);
  t.stroke(0, 255, 0);
  t.strokeWeight(4);
  t.rect(100, 100, 150, 100);

  // Rectangle without stroke (fill only)
  t.noStroke();
  t.rect(300, 100, 150, 100);
});
```

***

### pop()

> **pop**(): `void`

Defined in: [textmode/mixins/RenderingMixin.ts:271](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/mixins/RenderingMixin.ts#L271)

Restore the most recently saved rendering state from the state stack.
Use with [push](#push) to isolate style changes within a block.

#### Returns

`void`

#### Example

```javascript
const t = await textmode.create({
  width: 800,
  height: 600,
})

t.draw(() => {
  t.background(0);

  // Default styles
  t.fill(255);           // White fill
  t.stroke(0);           // Black stroke
  t.strokeWeight(1);     // Thin stroke

  t.push(); // Save current state
  
  // Temporary style changes
  t.fill(255, 0, 0);     // Red fill
  t.strokeWeight(8);     // Thick stroke
  t.rect(50, 50, 100, 100);
  
  t.push(); // Save red style state
  
  t.fill(0, 255, 0);     // Green fill
  t.noStroke();          // No stroke
  t.rect(200, 50, 100, 100);
  
  t.pop(); // Back to red fill, thick stroke
  t.rect(350, 50, 100, 100);
  
  t.pop(); // Back to white fill, black stroke, thin stroke
  t.rect(500, 50, 100, 100);
});
```

***

### push()

> **push**(): `void`

Defined in: [textmode/mixins/RenderingMixin.ts:229](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/mixins/RenderingMixin.ts#L229)

Save the current rendering state (fill, stroke, etc.) to the state stack.
Use with [pop](#pop) to isolate style changes within a block.

#### Returns

`void`

#### Example

```javascript
const t = await textmode.create({
  width: 800,
  height: 600,
})

t.draw(() => {
  t.background(0);

  // Set initial styles
  t.fill(255, 0, 0);      // Red fill
  t.stroke(0, 255, 0);    // Green stroke
  t.strokeWeight(4);      // Thick stroke

  t.push(); // Save current state
  
  // Change styles temporarily
  t.fill(0, 0, 255);      // Blue fill
  t.stroke(255, 255, 0);  // Yellow stroke
  t.strokeWeight(2);      // Thin stroke
  t.rect(100, 100, 150, 100);
  
  t.pop(); // Restore previous state
  
  // Back to red fill, green stroke, thick stroke
  t.rect(300, 100, 150, 100);
});
```

***

### rect()

> **rect**(`x`, `y`, `width?`, `height?`): `void`

Defined in: [textmode/mixins/RenderingMixin.ts:308](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/mixins/RenderingMixin.ts#L308)

Draw a rectangle with the current shader or fill color.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `x` | `number` | X-coordinate of the rectangle |
| `y` | `number` | Y-coordinate of the rectangle |
| `width?` | `number` | Width of the rectangle |
| `height?` | `number` | Height of the rectangle |

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

### redraw()

> **redraw**(`n`): `void`

Defined in: [textmode/Textmodifier.ts:511](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/Textmodifier.ts#L511)

Execute the render function a specified number of times.

This method is useful when the render loop has been stopped with [noLoop](#noloop) 
or when in `'manual'` mode, allowing you to trigger rendering on demand.
Similar to p5.js's `redraw()` function.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `n` | `number` | `1` | The number of times to execute the render function. Defaults to 1. |

#### Returns

`void`

#### Example

```javascript
// Create a textmodifier instance
const textmodifier = await textmode.create(canvas, { renderMode: 'manual' });

// Set up drawing
textmodifier.draw(() => {
  textmodifier.background(0);
  textmodifier.fill(255, 0, 0);
  textmodifier.rect(100, 100, 200, 150);
});

// Render once manually
textmodifier.redraw();

// Render 5 times
textmodifier.redraw(5);

// Also useful when loop is stopped
textmodifier.noLoop();
textmodifier.redraw(3); // Render 3 times despite loop being stopped
```

***

### removeConverter()

> **removeConverter**(`nameOrInstance`): `void`

Defined in: [textmode/mixins/ConversionMixin.ts:57](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/mixins/ConversionMixin.ts#L57)

Removes a converter from the pipeline by name or instance.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `nameOrInstance` | `string` \| [`TextmodeConverter`](../textmode.js/namespaces/converters/classes/TextmodeConverter.md)\<[`TextmodeConverterOptions`](../textmode.js/namespaces/converters/interfaces/TextmodeConverterOptions.md)\> | The unique name of the converter or the converter instance to remove. |

#### Returns

`void`

#### Example

```javascript
// Fetch a canvas element to apply textmode rendering to
const canvas = document.querySelector('canvas#myCanvas');

// Create a Textmodifier instance
const textmodifier = await textmode.create(canvas);

// Add a converter
const myConverter = textmodifier.addConverter('temp-converter', 'brightness');

// Remove by name
textmodifier.removeConverter('temp-converter');

// Or remove by instance
const anotherConverter = textmodifier.addConverter('another', 'custom');
textmodifier.removeConverter(anotherConverter);
```

***

### render()

> **render**(): `void`

Defined in: [textmode/Textmodifier.ts:221](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/Textmodifier.ts#L221)

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

> **renderMode**(`mode`): `void`

Defined in: [textmode/Textmodifier.ts:363](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/Textmodifier.ts#L363)

Update the rendering mode. 

- `'manual'`: Requires manual [render](#render) calls
- `'auto'`: Automatically renders using [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `mode` | `"manual"` \| `"auto"` | The new rendering mode to set. |

#### Returns

`void`

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

Defined in: [textmode/Textmodifier.ts:626](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/Textmodifier.ts#L626)

Resize the `textmode.js` canvas. 

Can only be used in `standalone` mode since the textmode canvas otherwise automatically adjusts to the video/canvas size.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `width` | `number` | The new width of the canvas. |
| `height` | `number` | The new height of the canvas. |

#### Returns

`void`

***

### rotate()

> **rotate**(`degrees`): `void`

Defined in: [textmode/mixins/RenderingMixin.ts:193](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/mixins/RenderingMixin.ts#L193)

Sets the rotation angle for subsequent rendering operations

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `degrees` | `number` | The rotation angle in degrees |

#### Returns

`void`

#### Example

```javascript
const t = await textmode.create({
  width: 800,
  height: 600,
})

t.draw(() => {
  t.background(0);

  // Normal rectangle
  t.fill(255, 0, 0);
  t.rect(100, 100, 150, 100);

  // Rotated rectangle
  t.push(); // Save current state
  t.rotate(45); // Rotate 45 degrees
  t.fill(0, 255, 0);
  t.rect(300, 100, 150, 100);
  t.pop(); // Restore state (no rotation)

  // Back to normal (no rotation)
  t.fill(0, 0, 255);
  t.rect(500, 100, 150, 100);
});
```

***

### saveCanvas()

> **saveCanvas**(`filename`, `format?`, `options?`): `Promise`\<`void`\>

Defined in: [textmode/mixins/ExportMixin.ts:141](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/mixins/ExportMixin.ts#L141)

Export the current textmode rendering to an image file.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `filename` | `string` | The filename (without extension) to save the image as |
| `format?` | `"png"` \| `"jpg"` \| `"webp"` | The image format ('png', 'jpg', or 'webp') |
| `options?` | `Omit`\<[`ImageExportOptions`](../textmode.js/namespaces/export/type-aliases/ImageExportOptions.md), `"filename"` \| `"format"`\> | Additional options for image export |

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

> **saveStrings**(`options?`): `void`

Defined in: [textmode/mixins/ExportMixin.ts:60](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/mixins/ExportMixin.ts#L60)

Export the current textmode rendering to a TXT file.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`TXTExportOptions`](../textmode.js/namespaces/export/type-aliases/TXTExportOptions.md) | Options for TXT export |

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

> **saveSVG**(`options?`): `void`

Defined in: [textmode/mixins/ExportMixin.ts:111](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/mixins/ExportMixin.ts#L111)

Export the current textmode rendering to an SVG file.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`SVGExportOptions`](../textmode.js/namespaces/export/type-aliases/SVGExportOptions.md) | Options for SVG export |

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

Defined in: [textmode/mixins/RenderingMixin.ts:419](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/mixins/RenderingMixin.ts#L419)

Set a uniform variable for the current shader.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The name of the uniform variable to set. |
| `value` | [`UniformValue`](../textmode.js/namespaces/rendering/type-aliases/UniformValue.md) | The value to set for the uniform variable. |

#### Returns

`void`

***

### shader()

> **shader**(`shader`): `void`

Defined in: [textmode/mixins/RenderingMixin.ts:412](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/mixins/RenderingMixin.ts#L412)

Set the current shader for rendering.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `shader` | `GLShader` | The shader program to use for rendering. |

#### Returns

`void`

***

### stroke()

> **stroke**(`r`, `g?`, `b?`, `a?`): `void`

Defined in: [textmode/mixins/RenderingMixin.ts:79](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/mixins/RenderingMixin.ts#L79)

Sets the stroke color for subsequent rendering operations

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

  // Set stroke color to red and stroke weight to 4 pixels
  t.stroke(255, 0, 0);
  t.strokeWeight(4);

  // Draw a rectangle with red stroke
  t.rect(100, 100, 200, 150);

  // Rectangle with both fill and stroke
  t.fill(0, 255, 0);
  t.stroke(0, 0, 255);
  t.strokeWeight(2);
  t.rect(350, 100, 200, 150);
});
```

***

### strokeWeight()

> **strokeWeight**(`weight`): `void`

Defined in: [textmode/mixins/RenderingMixin.ts:106](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/mixins/RenderingMixin.ts#L106)

Sets the stroke weight (thickness) for subsequent stroke operations

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `weight` | `number` | The stroke thickness in pixels |

#### Returns

`void`

#### Example

```javascript
const t = await textmode.create({
  width: 800,
  height: 600,
})

t.draw(() => {
  t.background(0);

  // Thin stroke
  t.stroke(255);
  t.strokeWeight(1);
  t.rect(50, 50, 100, 100);

  // Thick stroke
  t.strokeWeight(8);
  t.rect(200, 50, 100, 100);
});
```

***

### toString()

> **toString**(`options?`): `string`

Defined in: [textmode/mixins/ExportMixin.ts:36](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/mixins/ExportMixin.ts#L36)

Generate the current textmode rendering as a text string.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | `Omit`\<[`TXTExportOptions`](../textmode.js/namespaces/export/type-aliases/TXTExportOptions.md), `"filename"`\> | Options for text generation *(excluding filename)* |

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
```

***

### toSVG()

> **toSVG**(`options?`): `string`

Defined in: [textmode/mixins/ExportMixin.ts:88](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/mixins/ExportMixin.ts#L88)

Generate the current textmode rendering as an SVG string.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | `Omit`\<[`SVGExportOptions`](../textmode.js/namespaces/export/type-aliases/SVGExportOptions.md), `"filename"`\> | Options for SVG generation *(excluding filename)* |

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

Defined in: [textmode/Textmodifier.ts:615](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/Textmodifier.ts#L615)

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

[**textmode.js v0.2.0**](../README.md)

***

[textmode.js](../README.md) / Textmodifier

# Class: Textmodifier

Manages textmode rendering on a [`HTMLCanvasElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement) and provides methods for drawing,
exporting, font management, and animation control.

If the `Textmodifier` instance is created without a canvas parameter,
it creates a new `HTMLCanvasElement` to draw on using the `textmode.js` drawing API.
If a canvas is provided, it will use that canvas instead.

## Extends

- `TextmodifierCore`\<`this`\>.`RenderingCapabilities`.`ExportCapabilities`.`FontCapabilities`.`AnimationCapabilities`

## Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| <a id="framecount"></a> `frameCount` | `number` | Get or set the current frame count. |

## Accessors

### canvas

#### Get Signature

> **get** **canvas**(): `HTMLCanvasElement`

Get the textmodifier canvas containing the rendered output.

##### Returns

`HTMLCanvasElement`

***

### font

#### Get Signature

> **get** **font**(): [`TextmodeFont`](TextmodeFont.md)

Get the current font object used for rendering.

##### Returns

[`TextmodeFont`](TextmodeFont.md)

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

> **cellColor**(`r`, `g`, `b`): `void`

Set the cell background color for subsequent rendering operations.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `r` | `number` | Red component (0-255) |
| `g` | `number` | Green component (0-255) |
| `b` | `number` | Blue component (0-255) |

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

> **charColor**(`r`, `g`, `b`): `void`

Set the character color for subsequent rendering operations.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `r` | `number` | Red component (0-255) |
| `g` | `number` | Green component (0-255) |
| `b` | `number` | Blue component (0-255) |

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
const textmodifier = await textmode.create();

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

Sets the rotation angles for subsequent shape rendering operations

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

### rotateX()

> **rotateX**(`degrees`): `void`

Sets the X-axis rotation angle for subsequent shape rendering operations

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

Sets the Y-axis rotation angle for subsequent shape rendering operations

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

Sets the Z-axis rotation angle for subsequent shape rendering operations

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

### saveCanvas()

> **saveCanvas**(`options?`): `Promise`\<`void`\>

Export the current textmode rendering to an image file.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ImageExportOptions`](../textmode.js/namespaces/export/type-aliases/ImageExportOptions.md) | Options for image export |

#### Returns

`Promise`\<`void`\>

#### Example

```javascript
// Fetch a canvas element to apply textmode rendering to
const canvas = document.querySelector('canvas#myCanvas');

// Create a Textmodifier instance
const textmodifier = textmode.create(canvas, {renderMode: 'manual'});

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
const textmodifier = textmode.create(canvas, {renderMode: 'manual'});

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
const textmodifier = textmode.create(canvas, {renderMode: 'manual'});

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
Pass null to return to the default shader.

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
  
  // Return to default shader
  t.shader(null);
});
```

***

### toString()

> **toString**(`options?`): `string`

Generate the current textmode rendering as a text string.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`TXTExportOptions`](../textmode.js/namespaces/export/type-aliases/TXTExportOptions.md) | Options for text generation *(excluding filename)* |

#### Returns

`string`

Textmode grid content as a string.

#### Example

```javascript
// Fetch a canvas element to apply textmode rendering to
const canvas = document.querySelector('canvas#myCanvas');

// Create a Textmodifier instance
const textmodifier = textmode.create(canvas, {renderMode: 'manual'});

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

Generate the current textmode rendering as an SVG string.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`SVGExportOptions`](../textmode.js/namespaces/export/type-aliases/SVGExportOptions.md) | Options for SVG generation *(excluding filename)* |

#### Returns

`string`

SVG content as a string.

#### Example

```javascript
// Fetch a canvas element to apply textmode rendering to
const canvas = document.querySelector('canvas#myCanvas');

// Create a Textmodifier instance
const textmodifier = textmode.create(canvas, {renderMode: 'manual'});

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

[textmode.js](../../../index.md) / [layering](../index.md) / TextmodeLayer

# Class: TextmodeLayer

A single layer within a multi-layered textmode rendering context.

Layers are composited together using various blend modes
to create complex visual effects. Each layer can be independently
manipulated in terms of visibility, opacity, blend mode, and position.

You can draw on each layer by providing a draw callback function,
like you would with the base layer's [Textmodifier.draw](../../../classes/Textmodifier.md#draw) method.

## Implements

- `ITextmodeLayer`

## Accessors

### drawFramebuffer

#### Get Signature

```ts
get drawFramebuffer(): 
  | undefined
  | TextmodeFramebuffer;
```

Returns the draw framebuffer for this layer.
If the layer is not yet initialized, returns undefined.

##### Returns

  \| `undefined`
  \| [`TextmodeFramebuffer`](../../../classes/TextmodeFramebuffer.md)

#### Implementation of

```ts
ITextmodeLayer.drawFramebuffer
```

***

### height

#### Get Signature

```ts
get height(): number;
```

Returns the height of the final ASCII framebuffer in pixels.
If the layer is not yet initialized, returns 0.

##### Returns

`number`

#### Implementation of

```ts
ITextmodeLayer.height
```

***

### texture

#### Get Signature

```ts
get texture(): undefined | WebGLTexture;
```

Returns the WebGL texture of the final ASCII framebuffer.
If the layer is not yet initialized, returns undefined.

##### Returns

`undefined` \| `WebGLTexture`

#### Implementation of

```ts
ITextmodeLayer.texture
```

***

### width

#### Get Signature

```ts
get width(): number;
```

Returns the width of the final ASCII framebuffer in pixels.
If the layer is not yet initialized, returns 0.

##### Returns

`number`

#### Implementation of

```ts
ITextmodeLayer.width
```

## Methods

### blendMode()

```ts
blendMode(mode): 
  | void
  | TextmodeLayerBlendMode;
```

Set or get the layer's blend mode for compositing with layers below.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `mode` | [`TextmodeLayerBlendMode`](../type-aliases/TextmodeLayerBlendMode.md) | The blend mode to set. |

#### Returns

  \| `void`
  \| [`TextmodeLayerBlendMode`](../type-aliases/TextmodeLayerBlendMode.md)

The current blend mode if no parameter is provided.

**Available Blend Modes:**
- `'normal'` - Standard alpha compositing
- `'additive'` - Adds colors together (great for glow/energy effects)
- `'multiply'` - Darkens by multiplying colors
- `'screen'` - Lightens; inverse of multiply
- `'subtract'` - Subtracts layer from base
- `'darken'` - Takes minimum of each channel
- `'lighten'` - Takes maximum of each channel
- `'overlay'` - Combines multiply/screen for contrast
- `'softLight'` - Subtle contrast enhancement
- `'hardLight'` - Intense overlay effect
- `'colorDodge'` - Brightens base by blend color
- `'colorBurn'` - Darkens base by blend color
- `'difference'` - Absolute difference; creates inverted effects
- `'exclusion'` - Softer difference effect

#### Example

```typescript
const t = textmode.create();

// Create 5 layers with different blend modes
const blendModes = ['additive', 'screen', 'overlay', 'difference', 'multiply'];
const colors = [[255, 80, 150], [80, 180, 255], [255, 200, 80], [150, 255, 120], [200, 120, 255]];
const layers = blendModes.map(mode => t.layers.add({ blendMode: mode, opacity: 0.85 }));

t.draw(() => {
    const time = t.frameCount * 0.2;
    t.background(12, 8, 20, 255);

    layers.forEach((layer, i) => {
        layer.draw(() => {
            t.charColor(...colors[i], 255);
            
            // Draw spiral of characters
            for (let j = 0; j < 30; j++) {
                const angle = j * 0.2 + time * (i % 2 ? 1 : -1);
                const radius = 3 + j * 0.4 + Math.sin(time + j) * 2;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius * 0.6;
                
                t.char('#*+=-.'[j % 6]);
                t.translate(Math.round(x), Math.round(y));
                t.rect(1, 1);
            }
        });
        
        // Offset each layer
        layer.offset(Math.sin(time * 0.6 + i) * 6, Math.cos(time * 0.3 + i) * 4);
    });
});
```

#### Implementation of

```ts
ITextmodeLayer.blendMode
```

***

### draw()

```ts
draw(callback): void;
```

Define this layer's draw callback. The callback is executed each frame
and should contain all drawing commands for this layer.

Inside the callback, use `t` (your textmode instance) to access drawing
methods like `char()`, `charColor()`, `translate()`, and `rect()`.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | () => `void` | The function to call when drawing this layer. |

#### Returns

`void`

#### Example

```typescript
const t = textmode.create();

// Create layers with different blend modes
const glowLayer = t.layers.add({ blendMode: 'additive', opacity: 0.7 });
const particleLayer = t.layers.add({ blendMode: 'screen', opacity: 0.5 });

// Base layer: animated background with subtle wave pattern
t.draw(() => {
  const time = t.frameCount * 0.02;
  t.background(8, 12, 24);

  // Draw undulating grid pattern
  for (let y = -t.grid.rows / 2; y < t.grid.rows / 2; y++) {
    for (let x = -t.grid.cols / 2; x < t.grid.cols / 2; x++) {
      const wave = Math.sin(x * 0.3 + time) * Math.cos(y * 0.3 + time * 0.7);
      const brightness = 20 + wave * 15;

      t.push();
      t.charColor(brightness, brightness + 5, brightness + 15);
      t.char(wave > 0.3 ? '+' : wave > -0.3 ? '·' : '.');
      t.translate(x, y);
      t.point();
      t.pop();
    }
  }
});

// Glow layer: pulsing orbital ring
glowLayer.draw(() => {
  t.clear();
  const time = t.frameCount * 0.03;
  const ringCount = 24;

  for (let i = 0; i < ringCount; i++) {
    const angle = (i / ringCount) * Math.PI * 2 + time;
    const pulse = Math.sin(time * 2 + i * 0.5) * 0.5 + 0.5;
    const radius = 8 + Math.sin(time * 1.5) * 2;

    t.push();
    t.charColor(255, 180 + pulse * 75, 80 + pulse * 100);
    t.char('#*+=-'[i % 5]);
    t.translate(Math.round(Math.cos(angle) * radius), Math.round(Math.sin(angle) * radius * 0.6));
    t.point();
    t.pop();
  }
});

// Particle layer: floating sparkles
particleLayer.draw(() => {
  t.clear();
  const time = t.frameCount * 0.015;

  for (let i = 0; i < 12; i++) {
    const seed = i * 137.5; // Golden angle for distribution
    const x = Math.sin(seed + time) * (6 + i * 0.8);
    const y = Math.cos(seed * 1.3 + time * 0.8) * (4 + i * 0.5);
    const flicker = Math.sin(time * 4 + i) * 0.5 + 0.5;

    t.push();
    t.charColor(200 + flicker * 55, 220, 255);
    t.char('*');
    t.translate(Math.round(x), Math.round(y));
    t.point();
    t.pop();
  }
});
```

#### Implementation of

```ts
ITextmodeLayer.draw
```

***

### filter()

#### Call Signature

```ts
filter<T>(name, params?): void;
```

Apply a post-processing filter to this layer's rendered output.

Filters are applied after ASCII conversion in the order they are called.
Call this method within your layer's draw callback to apply effects.

**Built-in Filters:**
- `'invert'` - Inverts all colors
- `'grayscale'` - Converts to grayscale (param: amount 0-1, default 1)
- `'sepia'` - Applies sepia tone (param: amount 0-1, default 1)
- `'threshold'` - Black/white threshold (param: threshold 0-1, default 0.5)

##### Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* [`BuiltInFilterName`](../../filters/type-aliases/BuiltInFilterName.md) |

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `T` | The name of the filter to apply (built-in or custom registered filter) |
| `params?` | [`BuiltInFilterParams`](../../filters/interfaces/BuiltInFilterParams.md)\[`T`\] | Optional parameters for the filter |

##### Returns

`void`

##### Example

```typescript
const t = textmode.create();

// Create a layer with filters applied
const effectLayer = t.layers.add({ blendMode: 'normal', opacity: 1.0 });

t.draw(() => {
  // Base layer: draw a simple pattern
  t.background(20, 20, 40);
  t.charColor(255, 200, 100);
  t.char('#');
  t.rect(t.grid.cols, t.grid.rows);
});

effectLayer.draw(() => {
  t.clear();
  t.charColor(100, 150, 255);
  t.char('*');
  t.rect(10, 10);

  // Apply filters in sequence
  if (t.frameCount % 120 < 60) {
    effectLayer.filter('invert');
  }
  effectLayer.filter('grayscale', Math.sin(t.frameCount * 0.05) * 0.5 + 0.5);
});
```

##### Implementation of

```ts
ITextmodeLayer.filter
```

#### Call Signature

```ts
filter(name, params?): void;
```

Apply a custom filter registered via `t.layers.filters.register()`.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The name of the custom filter |
| `params?` | `unknown` | Optional parameters for the custom filter |

##### Returns

`void`

##### Implementation of

```ts
ITextmodeLayer.filter
```

***

### hide()

```ts
hide(): void;
```

Hide this layer from rendering.

#### Returns

`void`

#### Implementation of

```ts
ITextmodeLayer.hide
```

***

### offset()

```ts
offset(x?, y?): 
  | void
  | {
  x: number;
  y: number;
};
```

Set or get the layer's offset in pixels.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `x?` | `number` | `undefined` | The x offset in pixels. |
| `y?` | `number` | `0` | The y offset in pixels. |

#### Returns

  \| `void`
  \| \{
  `x`: `number`;
  `y`: `number`;
\}

The current offset if no parameters are provided.

#### Example

```typescript
const t = textmode.create();

const LAYER_COUNT = 32;
const LABEL = 'textmode.js';

// Create trailing layers
const layers = Array.from({ length: LAYER_COUNT }, () =>
  t.layers.add({ blendMode: 'normal', opacity: 1.0 })
);

// Snake segments for smooth trailing effect
const segments = Array.from({ length: LAYER_COUNT + 1 }, () => ({ x: 0, y: 0 }));

// Helper to draw text label centered
const drawLabel = (color) => {
  t.charColor(...color);
  t.cellColor(0, 0, 0, 0);
  [...LABEL].forEach((char, i) => {
    t.push();
    t.char(char);
    t.translate(i - Math.floor(LABEL.length / 2), 0);
    t.rect(1, 1);
    t.pop();
  });
};

// Set up layer draw callbacks
layers.forEach((layer, index) => {
  layer.draw(() => {
    t.background(0, 0, 0, 0);
    const brightness = 255 - (index / LAYER_COUNT) * 180;
    drawLabel([brightness, brightness * 0.8, 255]);
  });
});

t.draw(() => {
  t.background(20, 20, 40);
  t.clear();

  // Compute head position (circular motion)
  const time = t.frameCount * 0.06;
  const head = {
    x: Math.cos(time) * 24,
    y: Math.sin(time * 0.7) * 12
  };

  // Update snake segments with elastic follow
  segments[0] = head;
  for (let i = 1; i < segments.length; i++) {
    const prev = segments[i - 1];
    segments[i].x += (prev.x - segments[i].x) * 0.3;
    segments[i].y += (prev.y - segments[i].y) * 0.3;
  }

  // Draw head on base layer
  t.layers.base.offset(Math.round(head.x), Math.round(head.y));
  drawLabel([255, 200, 100]);

  // Offset each trailing layer to its segment position
  layers.forEach((layer, index) => {
    const seg = segments[index + 1];
    layer.offset(Math.round(seg.x), Math.round(seg.y));
  });
});
```

#### Implementation of

```ts
ITextmodeLayer.offset
```

***

### opacity()

```ts
opacity(opacity?): number | void;
```

Define or retrieve the layer's opacity.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `opacity?` | `number` | The opacity value to set (between 0 and 1). |

#### Returns

`number` \| `void`

The current opacity if no parameter is provided.

#### Implementation of

```ts
ITextmodeLayer.opacity
```

***

### show()

```ts
show(): void;
```

Show this layer for rendering.

#### Returns

`void`

#### Implementation of

```ts
ITextmodeLayer.show
```

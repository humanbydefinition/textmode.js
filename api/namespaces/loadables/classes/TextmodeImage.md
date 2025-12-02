[textmode.js](../../../index.md) / [loadables](../index.md) / TextmodeImage

# Class: TextmodeImage

Represents an image uploaded for textmode rendering via [Textmodifier.loadImage](../../../classes/Textmodifier.md#loadimage).

It can be drawn to the canvas via [Textmodifier.image](../../../classes/Textmodifier.md#image).

An image uploaded currently runs through an adjustable brightness-converter that converts
the original image into a textmode representation using characters. 
Those adjustable options are available via chainable methods on this class.

## Example

```javascript
const t = textmode.create({
    width: 800,
    height: 600,
});

let img;

t.setup(async () => {
    img = await t.loadImage('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80');
    img.characters(" .:-=+*#%@");
    // ... other adjustments like img.flipX(boolean), img.cellColorMode('sampled' | 'fixed'), etc.
    // (can also be chained or updated during runtime)
});

t.draw(() => {
    t.background(0);

    if (img) {
        // Draw the loaded image
        t.image(img);
    }
});
```

## Extends

- `TextmodeSource`

## Accessors

### height

#### Get Signature

```ts
get height(): number;
```

Ideal height in grid cells.

##### Returns

`number`

#### Inherited from

```ts
TextmodeSource.height
```

***

### originalHeight

#### Get Signature

```ts
get originalHeight(): number;
```

Original pixel height.

##### Returns

`number`

#### Inherited from

```ts
TextmodeSource.originalHeight
```

***

### originalWidth

#### Get Signature

```ts
get originalWidth(): number;
```

Original pixel width.

##### Returns

`number`

#### Inherited from

```ts
TextmodeSource.originalWidth
```

***

### texture

#### Get Signature

```ts
get texture(): WebGLTexture;
```

Return the WebGL texture currently backing this source.

##### Returns

`WebGLTexture`

#### Inherited from

```ts
TextmodeSource.texture
```

***

### width

#### Get Signature

```ts
get width(): number;
```

Ideal width in grid cells.

##### Returns

`number`

#### Inherited from

```ts
TextmodeSource.width
```

## Methods

### background()

```ts
background(
   colorOrGray, 
   g?, 
   b?, 
   a?): this;
```

Defines the background color used for transparent pixels.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `colorOrGray` | `string` \| `number` \| [`TextmodeColor`](../../../classes/TextmodeColor.md) | A grayscale value (0-255), hex string ('#RGB', '#RRGGBB', '#RRGGBBAA'), or TextmodeColor instance |
| `g?` | `number` | Green component (0-255) if using RGB format |
| `b?` | `number` | Blue component (0-255) if using RGB format |
| `a?` | `number` | Alpha component (0-255) if using RGBA format |

#### Returns

`this`

This instance for chaining.

#### Inherited from

```ts
TextmodeSource.background
```

***

### cellColor()

```ts
cellColor(
   colorOrGray, 
   g?, 
   b?, 
   a?): this;
```

Defines the cell color when [cellColorMode](#cellcolormode) is `'fixed'`.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `colorOrGray` | `string` \| `number` \| [`TextmodeColor`](../../../classes/TextmodeColor.md) | A grayscale value (0-255), hex string ('#RGB', '#RRGGBB', '#RRGGBBAA'), or TextmodeColor instance |
| `g?` | `number` | Green component (0-255) if using RGB format |
| `b?` | `number` | Blue component (0-255) if using RGB format |
| `a?` | `number` | Alpha component (0-255) if using RGBA format |

#### Returns

`this`

This instance for chaining.

#### Inherited from

```ts
TextmodeSource.cellColor
```

***

### cellColorMode()

```ts
cellColorMode(mode): this;
```

Set cell color mode: `'sampled'` *(from source)* or `'fixed'`.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `mode` | `"sampled"` \| `"fixed"` | The cell color mode |

#### Returns

`this`

This instance for chaining.

#### Inherited from

```ts
TextmodeSource.cellColorMode
```

***

### characters()

```ts
characters(chars): this;
```

Define the characters to use for brightness mapping as a string.
Maximum length is 255; excess characters are ignored.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `chars` | `string` | String of characters to map |

#### Returns

`this`

This instance for chaining.

#### Inherited from

```ts
TextmodeSource.characters
```

***

### charColor()

```ts
charColor(
   colorOrGray, 
   g?, 
   b?, 
   a?): this;
```

Defines the character color when [charColorMode](#charcolormode) is `'fixed'`.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `colorOrGray` | `string` \| `number` \| [`TextmodeColor`](../../../classes/TextmodeColor.md) | A grayscale value (0-255), hex string ('#RGB', '#RRGGBB', '#RRGGBBAA'), or TextmodeColor instance |
| `g?` | `number` | Green component (0-255) if using RGB format |
| `b?` | `number` | Blue component (0-255) if using RGB format |
| `a?` | `number` | Alpha component (0-255) if using RGBA format |

#### Returns

`this`

This instance for chaining.

#### Inherited from

```ts
TextmodeSource.charColor
```

***

### charColorMode()

```ts
charColorMode(mode): this;
```

Set character color mode: `'sampled'` *(from source)* or `'fixed'`.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `mode` | `"sampled"` \| `"fixed"` | The character color mode |

#### Returns

`this`

This instance for chaining.

#### Inherited from

```ts
TextmodeSource.charColorMode
```

***

### charRotation()

```ts
charRotation(degrees): this;
```

Set the character rotation in degrees (0-360).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `degrees` | `number` | Rotation in degrees |

#### Returns

`this`

This instance for chaining.

#### Inherited from

```ts
TextmodeSource.charRotation
```

***

### colorFilter()

```ts
colorFilter(palette?): this;
```

Applies an optional color filter palette before MRT conversion.
When a palette is provided, all sampled pixels are quantized to the closest palette color
prior to character/color analysis.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `palette?` | \| `null` \| `string`[] \| \[`number`, `number`, `number`\][] \| \[`number`, `number`, `number`, `number`\][] \| [`TextmodeColor`](../../../classes/TextmodeColor.md)[] | A list of colors defined as [TextmodeColor](../../../classes/TextmodeColor.md) instances, hex strings, or RGBA tuples (0-255). Providing an empty array or `null` disables the filter. |

#### Returns

`this`

#### Inherited from

```ts
TextmodeSource.colorFilter
```

***

### conversionMode()

```ts
conversionMode(mode): this;
```

Select the conversion mode for this source.

`textmode.js` includes only a single built-in conversion strategy `'brightness'`.

Additional conversion strategies may be provided via add-on libraries.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `mode` | `TextmodeConversionMode` | Conversion mode to use. |

#### Returns

`this`

#### Inherited from

```ts
TextmodeSource.conversionMode
```

***

### flipX()

```ts
flipX(v): this;
```

Set horizontal flip indicator flag.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `v` | `number` \| `boolean` | `true` | Flip flag |

#### Returns

`this`

This instance for chaining.

#### Inherited from

```ts
TextmodeSource.flipX
```

***

### flipY()

```ts
flipY(v): this;
```

Set vertical flip indicator flag.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `v` | `number` \| `boolean` | `true` | Flip flag |

#### Returns

`this`

This instance for chaining.

#### Inherited from

```ts
TextmodeSource.flipY
```

***

### invert()

```ts
invert(v): this;
```

Set the invert flag, swapping character and cell colors when enabled.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `v` | `number` \| `boolean` | `true` | Invert flag |

#### Returns

`this`

This instance for chaining.

#### Inherited from

```ts
TextmodeSource.invert
```

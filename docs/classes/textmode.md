[**textmode.js v0.1.9**](../README.md)

***

[textmode.js](../README.md) / textmode

# Class: textmode

Defined in: [Textmode.ts:12](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/Textmode.ts#L12)

The main entry point for the `textmode.js` library.

Provides static methods for creating [Textmodifier](Textmodifier.md) instances and managing global settings.

## Accessors

### version

#### Get Signature

> **get** `static` **version**(): `string`

Defined in: [Textmode.ts:110](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/Textmode.ts#L110)

Returns the version of `textmode.js` being used.

##### Example

```javascript
console.log(textmode.version); // "1.0.0"
```

##### Returns

`string`

## Methods

### create()

> `static` **create**(`sourceOrOptions?`, `opts?`): `Promise`\<[`Textmodifier`](Textmodifier.md)\>

Defined in: [Textmode.ts:64](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/Textmode.ts#L64)

Create a [Textmodifier](Textmodifier.md) instance for textmode rendering.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `sourceOrOptions?` | `HTMLCanvasElement` \| `HTMLVideoElement` \| [`TextmodeOptions`](../type-aliases/TextmodeOptions.md) | Either a `HTMLCanvasElement` or `HTMLVideoElement` for capturing content, or options for standalone mode. |
| `opts?` | [`TextmodeOptions`](../type-aliases/TextmodeOptions.md) | Optional configuration options *(only used when first parameter is a `HTMLCanvasElement` or `HTMLVideoElement`)*. |

#### Returns

`Promise`\<[`Textmodifier`](Textmodifier.md)\>

A Promise that resolves to a [Textmodifier](Textmodifier.md) instance.

#### Examples

Creating a [Textmodifier](Textmodifier.md) for an existing canvas:
```javascript
const canvas = document.querySelector('canvas#myCanvas');
const textmodifier = await textmode.create(canvas);
```

Creating a [Textmodifier](Textmodifier.md) for a video element:
```javascript
const video = document.querySelector('video#myVideo');
const textmodifier = await textmode.create(video);
```

Creating a standalone [Textmodifier](Textmodifier.md) with animation:
```javascript
const t = await textmode.create({ width: 800, height: 600 });

// Set up a draw loop for standalone usage
t.draw(() => {
  t.background(0);

  const centerX = t.width / 2;
  const centerY = t.height / 2;
  const radius = Math.min(t.width, t.height) / 3;
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

### setErrorLevel()

> `static` **setErrorLevel**(`level`): `void`

Defined in: [Textmode.ts:98](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/Textmode.ts#L98)

Set the global error handling level for the library. This applies to all [Textmodifier](Textmodifier.md) instances present.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `level` | [`TextmodeErrorLevel`](../enumerations/TextmodeErrorLevel.md) | The error handling level to set. |

#### Returns

`void`

#### Example

```javascript
// Set error level to WARNING
textmode.setErrorLevel(TextmodeErrorLevel.WARNING);
```

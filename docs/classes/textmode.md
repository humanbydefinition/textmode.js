[**textmode.js v0.1.2**](../README.md)

***

[textmode.js](../README.md) / textmode

# Class: textmode

Defined in: [Textmode.ts:25](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/Textmode.ts#L25)

The main entry point for the `textmode.js` library.

Provides static methods for creating textmode instances and managing global settings.

## Accessors

### version

#### Get Signature

> **get** `static` **version**(): `string`

Defined in: [Textmode.ts:104](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/Textmode.ts#L104)

Returns the current version of the `textmode.js` library.

##### Example

```javascript
console.log(textmode.version); // "1.0.0"
```

##### Returns

`string`

## Methods

### create()

> `static` **create**(`sourceOrOptions?`, `opts?`): `Promise`\<[`Textmodifier`](Textmodifier.md)\>

Defined in: [Textmode.ts:71](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/Textmode.ts#L71)

Create a [Textmodifier](Textmodifier.md) instance for textmode rendering.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `sourceOrOptions?` | [`TextmodeOptions`](../type-aliases/TextmodeOptions.md) \| [`CaptureSource`](../type-aliases/CaptureSource.md) | Either an HTML canvas/video element for capturing content, or options for standalone mode. |
| `opts?` | [`TextmodeOptions`](../type-aliases/TextmodeOptions.md) | Optional configuration options *(only used when first parameter is a canvas/video element)*. |

#### Returns

`Promise`\<[`Textmodifier`](Textmodifier.md)\>

A Promise that resolves to a Textmodifier instance.

#### Example

```javascript
// Create a Textmodifier for an existing canvas
const canvas = document.querySelector('canvas#myCanvas');
const textmodifier = await textmode.create(canvas);

////////

// Create a Textmodifier for a video element
const video = document.querySelector('video#myVideo');
const textmodifier = await textmode.create(video);

////////

// Create a standalone Textmodifier
const t = await textmode.create({ width: 800, height: 600 });

// Set up a draw loop for standalone usage
t.draw(() => {
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

### setErrorLevel()

> `static` **setErrorLevel**(`level`): `void`

Defined in: [Textmode.ts:92](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/Textmode.ts#L92)

Set the global error handling level for the library. This applies to all `Textmodifier` instances.

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

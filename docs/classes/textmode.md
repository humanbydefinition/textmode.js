[**textmode.js v0.3.0**](../README.md)

***

[textmode.js](../README.md) / textmode

# Class: textmode

The main entry point for the `textmode.js` library.

Provides static methods for creating [Textmodifier](Textmodifier.md) instances and managing global settings.

## Accessors

### version

#### Get Signature

> **get** `static` **version**(): `string`

Returns the version of `textmode.js` being used.

##### Example

```javascript
console.log(textmode.version); // "1.0.0"
```

##### Returns

`string`

## Methods

### create()

> `static` **create**(`opts`): [`Textmodifier`](Textmodifier.md)

Create a new [Textmodifier](Textmodifier.md) instance with optional configuration.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `opts` | [`TextmodeOptions`](../type-aliases/TextmodeOptions.md) | Configuration options for the Textmodifier instance |

#### Returns

[`Textmodifier`](Textmodifier.md)

A new Textmodifier instance

#### Example

```javascript
// Create with default canvas
const textmodifier = textmode.create();

textmodifier.setup(() => {
  // Called when the Textmodifier is ready
  console.log(`Grid size: ${textmodifier.grid.cols}x${textmodifier.grid.rows}`);
});

textmodifier.draw(() => {
  textmodifier.background(128);
  textmodifier.rect(10, 10, 20, 20);
});

// Create with options
const textmodifier2 = textmode.create({ width: 1920, height: 1080 });

// Create with canvas and options
const textmodifier3 = textmode.create({ canvas: canvas, fontSize: 20 });
```

***

### setErrorLevel()

> `static` **setErrorLevel**(`level`): `void`

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

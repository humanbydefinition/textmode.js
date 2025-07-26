[**textmode.js v0.1.0**](../README.md)

***

[textmode.js](../README.md) / textmode

# Class: textmode

Defined in: [Textmode.ts:25](https://github.com/humanbydefinition/textmode.js-dev/blob/343f9ecda8003c649bb7b0b4174c4e0103447484/src/Textmode.ts#L25)

The main entry point for the `textmode.js` library.

Provides static methods for creating textmode instances and managing global settings.

## Accessors

### version

#### Get Signature

> **get** `static` **version**(): `string`

Defined in: [Textmode.ts:67](https://github.com/humanbydefinition/textmode.js-dev/blob/343f9ecda8003c649bb7b0b4174c4e0103447484/src/Textmode.ts#L67)

Returns the current version of the `textmode.js` library.

##### Example

```javascript
console.log(textmode.version); // "1.0.0"
```

##### Returns

`string`

## Methods

### create()

> `static` **create**(`canvas`, `opts`): `Promise`\<[`Textmodifier`](Textmodifier.md)\>

Defined in: [Textmode.ts:41](https://github.com/humanbydefinition/textmode.js-dev/blob/343f9ecda8003c649bb7b0b4174c4e0103447484/src/Textmode.ts#L41)

Create a [Textmodifier](Textmodifier.md) instance to apply textmode rendering to a given canvas.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `canvas` | `HTMLCanvasElement` | The HTML canvas element to capture content from. |
| `opts` | [`TextmodeOptions`](../type-aliases/TextmodeOptions.md) | Optional configuration options for the Textmodifier instance. |

#### Returns

`Promise`\<[`Textmodifier`](Textmodifier.md)\>

A Promise that resolves to a Textmodifier instance.

#### Example

```javascript
// Fetch a canvas element to apply textmode rendering to
const canvas = document.querySelector('canvas#myCanvas');

// Create a Textmodifier instance with default options
const textmodifier = await textmode.create(canvas);
```

***

### setErrorLevel()

> `static` **setErrorLevel**(`level`): `void`

Defined in: [Textmode.ts:55](https://github.com/humanbydefinition/textmode.js-dev/blob/343f9ecda8003c649bb7b0b4174c4e0103447484/src/Textmode.ts#L55)

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

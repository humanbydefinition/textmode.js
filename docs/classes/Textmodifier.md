[**textmode.js v0.0.2**](../README.md)

***

[textmode.js](../README.md) / Textmodifier

# Class: Textmodifier

Defined in: [textmode/Textmodifier.ts:24](https://github.com/humanbydefinition/textmode.js-dev/blob/b5681e0940ee259e7c3e1b7f6452addade1503bd/src/textmode/Textmodifier.ts#L24)

Main class for handling textmode rendering in a WebGL context.

## Accessors

### fontManager

#### Get Signature

> **get** **fontManager**(): [`TextmodeFont`](TextmodeFont.md)

Defined in: [textmode/Textmodifier.ts:150](https://github.com/humanbydefinition/textmode.js-dev/blob/b5681e0940ee259e7c3e1b7f6452addade1503bd/src/textmode/Textmodifier.ts#L150)

##### Returns

[`TextmodeFont`](TextmodeFont.md)

***

### grid

#### Get Signature

> **get** **grid**(): [`TextmodeGrid`](TextmodeGrid.md)

Defined in: [textmode/Textmodifier.ts:149](https://github.com/humanbydefinition/textmode.js-dev/blob/b5681e0940ee259e7c3e1b7f6452addade1503bd/src/textmode/Textmodifier.ts#L149)

##### Returns

[`TextmodeGrid`](TextmodeGrid.md)

## Methods

### loadFont()

> **loadFont**(`fontUrl`): `Promise`\<`void`\>

Defined in: [textmode/Textmodifier.ts:89](https://github.com/humanbydefinition/textmode.js-dev/blob/b5681e0940ee259e7c3e1b7f6452addade1503bd/src/textmode/Textmodifier.ts#L89)

Update the font used for rendering.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fontUrl` | `string` | The URL of the font to load. |

#### Returns

`Promise`\<`void`\>

***

### render()

> **render**(): `void`

Defined in: [textmode/Textmodifier.ts:102](https://github.com/humanbydefinition/textmode.js-dev/blob/b5681e0940ee259e7c3e1b7f6452addade1503bd/src/textmode/Textmodifier.ts#L102)

Apply textmode rendering to the canvas.

#### Returns

`void`

***

### setErrorLevel()

> **setErrorLevel**(`level`): `void`

Defined in: [textmode/Textmodifier.ts:134](https://github.com/humanbydefinition/textmode.js-dev/blob/b5681e0940ee259e7c3e1b7f6452addade1503bd/src/textmode/Textmodifier.ts#L134)

Set the global error handling level for the library. This applies to all `Textmodifier` instances.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `level` | [`TextmodeErrorLevel`](../enumerations/TextmodeErrorLevel.md) | The error handling level to set. |

#### Returns

`void`

***

### create()

> `static` **create**(`canvas`, `opts`): `Promise`\<`Textmodifier`\>

Defined in: [textmode/Textmodifier.ts:60](https://github.com/humanbydefinition/textmode.js-dev/blob/b5681e0940ee259e7c3e1b7f6452addade1503bd/src/textmode/Textmodifier.ts#L60)

Static factory method for creating and initializing a Textmodifier instance.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `canvas` | `HTMLCanvasElement` | The HTML canvas element to capture content from. |
| `opts` | [`TextmodeOptions`](../type-aliases/TextmodeOptions.md) | Optional configuration options for the `Textmodifier` instance. |

#### Returns

`Promise`\<`Textmodifier`\>

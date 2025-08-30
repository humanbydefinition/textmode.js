[**textmode.js v0.1.9**](../README.md)

***

[textmode.js](../README.md) / TextmodeFont

# Class: TextmodeFont

Defined in: [textmode/font/TextmodeFont.ts:21](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/font/TextmodeFont.ts#L21)

Manages the textmode font used for rendering characters.

This class coordinates font loading, character extraction, texture atlas creation,
and provides character color information. It acts as a facade for the font system.

## Accessors

### characters

#### Get Signature

> **get** **characters**(): [`TextmodeCharacter`](../type-aliases/TextmodeCharacter.md)[]

Defined in: [textmode/font/TextmodeFont.ts:249](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/font/TextmodeFont.ts#L249)

Returns the array of [TextmodeCharacter](../type-aliases/TextmodeCharacter.md) objects in the font.

##### Returns

[`TextmodeCharacter`](../type-aliases/TextmodeCharacter.md)[]

***

### fontSize

#### Get Signature

> **get** **fontSize**(): `number`

Defined in: [textmode/font/TextmodeFont.ts:261](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/font/TextmodeFont.ts#L261)

Returns the font size used for rendering.

##### Returns

`number`

***

### maxGlyphDimensions

#### Get Signature

> **get** **maxGlyphDimensions**(): `object`

Defined in: [textmode/font/TextmodeFont.ts:258](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/font/TextmodeFont.ts#L258)

Returns the maximum dimensions of a glyph in the font.

##### Returns

`object`

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `height` | `number` | [textmode/font/TextmodeFont.ts:258](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/font/TextmodeFont.ts#L258) |
| `width` | `number` | [textmode/font/TextmodeFont.ts:258](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/font/TextmodeFont.ts#L258) |

***

### textureColumns

#### Get Signature

> **get** **textureColumns**(): `number`

Defined in: [textmode/font/TextmodeFont.ts:252](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/font/TextmodeFont.ts#L252)

Returns the number of columns in the texture atlas.

##### Returns

`number`

***

### textureRows

#### Get Signature

> **get** **textureRows**(): `number`

Defined in: [textmode/font/TextmodeFont.ts:255](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/font/TextmodeFont.ts#L255)

Returns the number of rows in the texture atlas.

##### Returns

`number`

## Methods

### getCharacterColor()

> **getCharacterColor**(`character`): \[`number`, `number`, `number`\]

Defined in: [textmode/font/TextmodeFont.ts:205](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/font/TextmodeFont.ts#L205)

Get the color associated with a character.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `character` | `string` | The character to get the color for. |

#### Returns

\[`number`, `number`, `number`\]

The RGB color as an array `[r, g, b]`.

***

### getCharacterColors()

> **getCharacterColors**(`characters`): \[`number`, `number`, `number`\][]

Defined in: [textmode/font/TextmodeFont.ts:215](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/font/TextmodeFont.ts#L215)

Get the colors associated with a string of characters.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `characters` | `string` | The string of characters to get colors for. |

#### Returns

\[`number`, `number`, `number`\][]

An array of RGB colors for each character in the string.
Each color is represented as an array `[r, g, b]`.

***

### hasAllCharacters()

> **hasAllCharacters**(`str`): `boolean`

Defined in: [textmode/font/TextmodeFont.ts:224](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/font/TextmodeFont.ts#L224)

Checks if all characters in the given string exist in the font.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `str` | `string` | The string to check. |

#### Returns

`boolean`

`true` if all characters exist in the font, `false` otherwise.

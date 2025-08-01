[**textmode.js v0.1.2**](../README.md)

***

[textmode.js](../README.md) / TextmodeFont

# Class: TextmodeFont

Defined in: [textmode/font/TextmodeFont.ts:20](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/textmode/font/TextmodeFont.ts#L20)

Manages the textmode font used for rendering characters.

This class coordinates font loading, character extraction, texture atlas creation,
and provides character color information. It acts as a facade for the font system.

## Accessors

### characters

#### Get Signature

> **get** **characters**(): [`TextmodeCharacter`](../type-aliases/TextmodeCharacter.md)[]

Defined in: [textmode/font/TextmodeFont.ts:239](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/textmode/font/TextmodeFont.ts#L239)

Returns the array of [TextmodeCharacter](../type-aliases/TextmodeCharacter.md) objects in the font.

##### Returns

[`TextmodeCharacter`](../type-aliases/TextmodeCharacter.md)[]

***

### fontSize

#### Get Signature

> **get** **fontSize**(): `number`

Defined in: [textmode/font/TextmodeFont.ts:251](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/textmode/font/TextmodeFont.ts#L251)

Returns the font size used for rendering.

##### Returns

`number`

***

### maxGlyphDimensions

#### Get Signature

> **get** **maxGlyphDimensions**(): `object`

Defined in: [textmode/font/TextmodeFont.ts:248](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/textmode/font/TextmodeFont.ts#L248)

Returns the maximum dimensions of a glyph in the font.

##### Returns

`object`

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `height` | `number` | [textmode/font/TextmodeFont.ts:248](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/textmode/font/TextmodeFont.ts#L248) |
| `width` | `number` | [textmode/font/TextmodeFont.ts:248](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/textmode/font/TextmodeFont.ts#L248) |

***

### textureColumns

#### Get Signature

> **get** **textureColumns**(): `number`

Defined in: [textmode/font/TextmodeFont.ts:242](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/textmode/font/TextmodeFont.ts#L242)

Returns the number of columns in the texture atlas.

##### Returns

`number`

***

### textureRows

#### Get Signature

> **get** **textureRows**(): `number`

Defined in: [textmode/font/TextmodeFont.ts:245](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/textmode/font/TextmodeFont.ts#L245)

Returns the number of rows in the texture atlas.

##### Returns

`number`

## Methods

### getCharacterColor()

> **getCharacterColor**(`character`): \[`number`, `number`, `number`\]

Defined in: [textmode/font/TextmodeFont.ts:204](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/textmode/font/TextmodeFont.ts#L204)

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

Defined in: [textmode/font/TextmodeFont.ts:214](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/textmode/font/TextmodeFont.ts#L214)

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

Defined in: [textmode/font/TextmodeFont.ts:223](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/textmode/font/TextmodeFont.ts#L223)

Checks if all characters in the given string exist in the font.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `str` | `string` | The string to check. |

#### Returns

`boolean`

`true` if all characters exist in the font, `false` otherwise.

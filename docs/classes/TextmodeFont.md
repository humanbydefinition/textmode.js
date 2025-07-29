[**textmode.js v0.1.1**](../README.md)

***

[textmode.js](../README.md) / TextmodeFont

# Class: TextmodeFont

Defined in: [textmode/font/TextmodeFont.ts:20](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/textmode/font/TextmodeFont.ts#L20)

Manages the textmode font used for rendering characters.

This class coordinates font loading, character extraction, texture atlas creation,
and provides character color information. It acts as a facade for the font system.

## Accessors

### characters

#### Get Signature

> **get** **characters**(): [`TextmodeCharacter`](../type-aliases/TextmodeCharacter.md)[]

Defined in: [textmode/font/TextmodeFont.ts:222](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/textmode/font/TextmodeFont.ts#L222)

Returns the array of [TextmodeCharacter](../type-aliases/TextmodeCharacter.md) objects in the font.

##### Returns

[`TextmodeCharacter`](../type-aliases/TextmodeCharacter.md)[]

***

### fontSize

#### Get Signature

> **get** **fontSize**(): `number`

Defined in: [textmode/font/TextmodeFont.ts:234](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/textmode/font/TextmodeFont.ts#L234)

Returns the font size used for rendering.

##### Returns

`number`

***

### maxGlyphDimensions

#### Get Signature

> **get** **maxGlyphDimensions**(): `object`

Defined in: [textmode/font/TextmodeFont.ts:231](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/textmode/font/TextmodeFont.ts#L231)

Returns the maximum dimensions of a glyph in the font.

##### Returns

`object`

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `height` | `number` | [textmode/font/TextmodeFont.ts:231](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/textmode/font/TextmodeFont.ts#L231) |
| `width` | `number` | [textmode/font/TextmodeFont.ts:231](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/textmode/font/TextmodeFont.ts#L231) |

***

### textureColumns

#### Get Signature

> **get** **textureColumns**(): `number`

Defined in: [textmode/font/TextmodeFont.ts:225](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/textmode/font/TextmodeFont.ts#L225)

Returns the number of columns in the texture atlas.

##### Returns

`number`

***

### textureRows

#### Get Signature

> **get** **textureRows**(): `number`

Defined in: [textmode/font/TextmodeFont.ts:228](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/textmode/font/TextmodeFont.ts#L228)

Returns the number of rows in the texture atlas.

##### Returns

`number`

## Methods

### getCharacterColor()

> **getCharacterColor**(`character`): \[`number`, `number`, `number`\]

Defined in: [textmode/font/TextmodeFont.ts:187](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/textmode/font/TextmodeFont.ts#L187)

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

Defined in: [textmode/font/TextmodeFont.ts:197](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/textmode/font/TextmodeFont.ts#L197)

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

Defined in: [textmode/font/TextmodeFont.ts:206](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/textmode/font/TextmodeFont.ts#L206)

Checks if all characters in the given string exist in the font.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `str` | `string` | The string to check. |

#### Returns

`boolean`

`true` if all characters exist in the font, `false` otherwise.

[**textmode.js v0.0.2**](../README.md)

***

[textmode.js](../README.md) / TextmodeFont

# Class: TextmodeFont

Defined in: [textmode/Font.ts:30](https://github.com/humanbydefinition/textmode.js-dev/blob/b5681e0940ee259e7c3e1b7f6452addade1503bd/src/textmode/Font.ts#L30)

Manages the textmode font used for rendering characters.

This class handles loading the font, creating a texture atlas, and providing character color information.

## Accessors

### characters

#### Get Signature

> **get** **characters**(): [`TextmodeCharacter`](../type-aliases/TextmodeCharacter.md)[]

Defined in: [textmode/Font.ts:375](https://github.com/humanbydefinition/textmode.js-dev/blob/b5681e0940ee259e7c3e1b7f6452addade1503bd/src/textmode/Font.ts#L375)

Returns the array of [TextmodeCharacter](../type-aliases/TextmodeCharacter.md) objects in the font.

##### Returns

[`TextmodeCharacter`](../type-aliases/TextmodeCharacter.md)[]

***

### charactersString

#### Get Signature

> **get** **charactersString**(): `string`

Defined in: [textmode/Font.ts:378](https://github.com/humanbydefinition/textmode.js-dev/blob/b5681e0940ee259e7c3e1b7f6452addade1503bd/src/textmode/Font.ts#L378)

Returns a string representation of all characters in the font.

##### Returns

`string`

***

### fontSize

#### Get Signature

> **get** **fontSize**(): `number`

Defined in: [textmode/Font.ts:390](https://github.com/humanbydefinition/textmode.js-dev/blob/b5681e0940ee259e7c3e1b7f6452addade1503bd/src/textmode/Font.ts#L390)

Returns the font size used for rendering.

##### Returns

`number`

***

### maxGlyphDimensions

#### Get Signature

> **get** **maxGlyphDimensions**(): `object`

Defined in: [textmode/Font.ts:387](https://github.com/humanbydefinition/textmode.js-dev/blob/b5681e0940ee259e7c3e1b7f6452addade1503bd/src/textmode/Font.ts#L387)

Returns the maximum dimensions of a glyph in the font.

##### Returns

`object`

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `height` | `number` | [textmode/Font.ts:387](https://github.com/humanbydefinition/textmode.js-dev/blob/b5681e0940ee259e7c3e1b7f6452addade1503bd/src/textmode/Font.ts#L387) |
| `width` | `number` | [textmode/Font.ts:387](https://github.com/humanbydefinition/textmode.js-dev/blob/b5681e0940ee259e7c3e1b7f6452addade1503bd/src/textmode/Font.ts#L387) |

***

### textureColumns

#### Get Signature

> **get** **textureColumns**(): `number`

Defined in: [textmode/Font.ts:381](https://github.com/humanbydefinition/textmode.js-dev/blob/b5681e0940ee259e7c3e1b7f6452addade1503bd/src/textmode/Font.ts#L381)

Returns the number of columns in the texture atlas.

##### Returns

`number`

***

### textureRows

#### Get Signature

> **get** **textureRows**(): `number`

Defined in: [textmode/Font.ts:384](https://github.com/humanbydefinition/textmode.js-dev/blob/b5681e0940ee259e7c3e1b7f6452addade1503bd/src/textmode/Font.ts#L384)

Returns the number of rows in the texture atlas.

##### Returns

`number`

## Methods

### getCharacterColor()

> **getCharacterColor**(`character`): \[`number`, `number`, `number`\]

Defined in: [textmode/Font.ts:276](https://github.com/humanbydefinition/textmode.js-dev/blob/b5681e0940ee259e7c3e1b7f6452addade1503bd/src/textmode/Font.ts#L276)

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

Defined in: [textmode/Font.ts:295](https://github.com/humanbydefinition/textmode.js-dev/blob/b5681e0940ee259e7c3e1b7f6452addade1503bd/src/textmode/Font.ts#L295)

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

Defined in: [textmode/Font.ts:315](https://github.com/humanbydefinition/textmode.js-dev/blob/b5681e0940ee259e7c3e1b7f6452addade1503bd/src/textmode/Font.ts#L315)

Checks if all characters in the given string exist in the font.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `str` | `string` | The string to check. |

#### Returns

`boolean`

`true` if all characters exist in the font, `false` otherwise.

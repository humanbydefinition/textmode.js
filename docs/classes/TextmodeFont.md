[**textmode.js v0.2.0**](../README.md)

***

[textmode.js](../README.md) / TextmodeFont

# Class: TextmodeFont

Manages the font used for rendering characters.

This class coordinates font loading, character extraction, texture atlas creation,
and provides character information.

## Accessors

### characters

#### Get Signature

> **get** **characters**(): [`TextmodeCharacter`](../type-aliases/TextmodeCharacter.md)[]

Returns the array of [TextmodeCharacter](../type-aliases/TextmodeCharacter.md) objects in the font.

##### Returns

[`TextmodeCharacter`](../type-aliases/TextmodeCharacter.md)[]

***

### fontSize

#### Get Signature

> **get** **fontSize**(): `number`

Returns the font size used for rendering.

##### Returns

`number`

***

### maxGlyphDimensions

#### Get Signature

> **get** **maxGlyphDimensions**(): `object`

Returns the maximum dimensions of a glyph in the font.

##### Returns

`object`

| Name | Type |
| ------ | ------ |
| `height` | `number` |
| `width` | `number` |

***

### textureColumns

#### Get Signature

> **get** **textureColumns**(): `number`

Returns the number of columns in the texture atlas.

##### Returns

`number`

***

### textureRows

#### Get Signature

> **get** **textureRows**(): `number`

Returns the number of rows in the texture atlas.

##### Returns

`number`

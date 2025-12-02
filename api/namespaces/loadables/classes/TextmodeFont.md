[textmode.js](../../../index.md) / [loadables](../index.md) / TextmodeFont

# Class: TextmodeFont

Manages the font used for rendering characters via [Textmodifier.loadFont](../../../classes/Textmodifier.md#loadfont).

This class coordinates font loading, character extraction, texture atlas creation,
and provides character information.

The font used by your [Textmodifier](../../../classes/Textmodifier.md) instance is accessible via
the [Textmodifier.font](../../../classes/Textmodifier.md#font) property.

## Accessors

### characterMap

#### Get Signature

```ts
get characterMap(): Map<string, TextmodeCharacter>;
```

Returns the character map for O(1) lookups.

##### Returns

`Map`\<`string`, [`TextmodeCharacter`](../type-aliases/TextmodeCharacter.md)\>

***

### characters

#### Get Signature

```ts
get characters(): TextmodeCharacter[];
```

Returns the array of [TextmodeCharacter](../type-aliases/TextmodeCharacter.md) objects in the font.

##### Returns

[`TextmodeCharacter`](../type-aliases/TextmodeCharacter.md)[]

***

### fontFramebuffer

#### Get Signature

```ts
get fontFramebuffer(): TextmodeFramebuffer;
```

Returns the WebGL framebuffer containing the font texture atlas.

##### Returns

[`TextmodeFramebuffer`](../../../classes/TextmodeFramebuffer.md)

***

### fontSize

#### Get Signature

```ts
get fontSize(): number;
```

Returns the font size used for rendering.

##### Returns

`number`

***

### maxGlyphDimensions

#### Get Signature

```ts
get maxGlyphDimensions(): object;
```

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

```ts
get textureColumns(): number;
```

Returns the number of columns in the texture atlas.

##### Returns

`number`

***

### textureRows

#### Get Signature

```ts
get textureRows(): number;
```

Returns the number of rows in the texture atlas.

##### Returns

`number`

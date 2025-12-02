[textmode.js](../../../index.md) / [loadables](../index.md) / TextmodeCharacter

# Type Alias: TextmodeCharacter

```ts
type TextmodeCharacter = object;
```

Represents a single character in the [TextmodeFont.characters](../classes/TextmodeFont.md#characters) array.

## Properties

### character

```ts
character: string;
```

The character itself.

***

### color

```ts
color: [number, number, number];
```

The shader color associated with the character.

***

### glyphData

```ts
glyphData: GlyphData;
```

Glyph outline data including advance width and path information.

***

### unicode

```ts
unicode: number;
```

The Unicode code point of the character.

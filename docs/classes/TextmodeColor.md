[textmode.js](../index.md) / TextmodeColor

# Class: TextmodeColor

Represents a color in the `textmode.js` rendering system.

Values are stored as `0-255` integers for compatibility with public APIs,
while normalized versions are derived on demand for shader uploads.

Use [Textmodifier.color](Textmodifier.md#color) to create colors.

## Properties

| Property | Modifier | Type | Description |
| ------ | ------ | ------ | ------ |
| <a id="a"></a> `a` | `readonly` | `number` | Alpha component *(0-255)* |
| <a id="b"></a> `b` | `readonly` | `number` | Blue component *(0-255)* |
| <a id="g"></a> `g` | `readonly` | `number` | Green component *(0-255)* |
| <a id="r"></a> `r` | `readonly` | `number` | Red component *(0-255)* |

## Accessors

### normalized

#### Get Signature

```ts
get normalized(): [number, number, number, number];
```

Returns the normalized *(0-1)* RGBA array.

##### Returns

\[`number`, `number`, `number`, `number`\]

***

### rgb

#### Get Signature

```ts
get rgb(): [number, number, number];
```

Returns a plain RGB array with integer components.

##### Returns

\[`number`, `number`, `number`\]

***

### rgba

#### Get Signature

```ts
get rgba(): [number, number, number, number];
```

Returns a plain RGBA array with integer components.

##### Returns

\[`number`, `number`, `number`, `number`\]

## Methods

### withAlpha()

```ts
withAlpha(alpha): TextmodeColor;
```

Create a copy of this color with a different alpha value.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `alpha` | `number` |

#### Returns

`TextmodeColor`

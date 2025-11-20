[textmode.js](../index.md) / textmode

# Class: textmode

The main entry point for the `textmode.js` library.

Provides static methods for creating [Textmodifier](Textmodifier.md) instances and managing global settings.

## Accessors

### version

#### Get Signature

```ts
get static version(): string;
```

Returns the version of `textmode.js` being used.

##### Example

```javascript
console.log(textmode.version); // "1.0.0"
```

##### Returns

`string`

## Methods

### create()

```ts
static create(opts): Textmodifier;
```

Create a new [Textmodifier](Textmodifier.md) instance with optional configuration.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `opts` | [`TextmodeOptions`](../type-aliases/TextmodeOptions.md) | Configuration options for the Textmodifier instance |

#### Returns

[`Textmodifier`](Textmodifier.md)

A new Textmodifier instance

#### Example

```javascript
const t = textmode.create({ width: 800, height: 600, fontSize: 16 });

t.draw(() => {
    t.background(0);
    t.char("x");
    t.rotateZ(t.frameCount);
    t.rect(10, 10);
});
```

***

### setErrorLevel()

```ts
static setErrorLevel(level): void;
```

Set the global error handling level for the library. This applies to all [Textmodifier](Textmodifier.md) instances present.

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

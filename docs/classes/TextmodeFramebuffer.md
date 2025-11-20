[textmode.js](../index.md) / TextmodeFramebuffer

# Class: TextmodeFramebuffer

Framebuffer class for managing offscreen rendering targets initialized via [Textmodifier.createFramebuffer](Textmodifier.md#createframebuffer).

`TextmodeFramebuffer` instances contain 3 attachments to support the rendering pipeline:
- Attachment 0: Character and transform data *(RGBA)*
- Attachment 1: Primary color data *(RGBA)*
- Attachment 2: Secondary color data *(RGBA)*

## Implements

- `IFramebuffer`

## Accessors

### attachmentCount

#### Get Signature

```ts
get attachmentCount(): number;
```

Get the number of color attachments in this framebuffer

##### Returns

`number`

***

### height

#### Get Signature

```ts
get height(): number;
```

Get the height of the framebuffer

##### Returns

`number`

#### Implementation of

```ts
IFramebuffer.height
```

***

### textures

#### Get Signature

```ts
get textures(): WebGLTexture[];
```

Get the WebGL textures associated with this framebuffer

##### Returns

`WebGLTexture`[]

#### Implementation of

```ts
IFramebuffer.textures
```

***

### width

#### Get Signature

```ts
get width(): number;
```

Get the width of the framebuffer

##### Returns

`number`

#### Implementation of

```ts
IFramebuffer.width
```

## Methods

### begin()

```ts
begin(): void;
```

Begin rendering to this framebuffer.

#### Returns

`void`

#### Implementation of

```ts
IFramebuffer.begin
```

***

### end()

```ts
end(): void;
```

End rendering to this framebuffer and restore previous state.

#### Returns

`void`

#### Implementation of

```ts
IFramebuffer.end
```

***

### readPixels()

```ts
readPixels(attachmentIndex): Uint8Array;
```

Read pixels from a specific color attachment into an RGBA Uint8Array.

The returned pixel data:
- Is in RGBA format (4 bytes per pixel)
- Has top-left origin (first pixel is top-left corner)
- Is cached until the next render pass to this framebuffer

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `attachmentIndex` | `number` | The index of the color attachment to read (0-based)<br/> 0. Character data and transform info<br/> 1. Character colors<br/> 2. Cell background colors<br/> |

#### Returns

`Uint8Array`

A Uint8Array containing the pixel data in RGBA format

#### Implementation of

```ts
IFramebuffer.readPixels
```

***

### resize()

```ts
resize(width, height): void;
```

Resize the framebuffer to new dimensions.
This recreates the internal textures with the new size and invalidates any cached pixel data.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `width` | `number` | New width in pixels/cells |
| `height` | `number` | New height in pixels/cells |

#### Returns

`void`

#### Implementation of

```ts
IFramebuffer.resize
```

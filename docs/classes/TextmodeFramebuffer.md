[**textmode.js v0.3.1**](../README.md)

***

[textmode.js](../README.md) / TextmodeFramebuffer

# Class: TextmodeFramebuffer

Framebuffer class for managing offscreen rendering targets initialized via [Textmodifier.createFramebuffer](Textmodifier.md#createframebuffer).

## Accessors

### height

#### Get Signature

> **get** **height**(): `number`

Get the current framebuffer height.

##### Returns

`number`

***

### textures

#### Get Signature

> **get** **textures**(): `WebGLTexture`[]

Get all textures associated with this framebuffer. 

Useful for binding textures for reading in shaders.

TextmodeFramebuffers have 5 attachments:
- 0: Character colors that encode the character to display via red and green channels
- 1: Character colors
- 2: Cell background colors
- 3: Rotation of each character encoded in red and green channels
- 4: Inversion, horizontal, and vertical flip flags encoded in red, green, blue channels

##### Returns

`WebGLTexture`[]

***

### width

#### Get Signature

> **get** **width**(): `number`

Get the current framebuffer width.

##### Returns

`number`

## Methods

### begin()

> **begin**(): `void`

Begin rendering to this framebuffer.

#### Returns

`void`

***

### end()

> **end**(): `void`

End rendering to this framebuffer and restore previous state.

#### Returns

`void`

***

### resize()

> **resize**(`width`, `height`): `void`

Resize the framebuffer.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `width` | `number` | New width |
| `height` | `number` | New height |

#### Returns

`void`

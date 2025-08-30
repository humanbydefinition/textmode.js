[**textmode.js v0.1.9**](../../../../README.md)

***

[textmode.js](../../../../README.md) / [rendering](../README.md) / Framebuffer

# Class: `abstract` Framebuffer

Defined in: [rendering/core/Framebuffer.ts:91](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/rendering/core/Framebuffer.ts#L91)

Abstract base class for framebuffer implementations.

## Accessors

### height

#### Get Signature

> **get** **height**(): `number`

Defined in: [rendering/core/Framebuffer.ts:118](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/rendering/core/Framebuffer.ts#L118)

Height of the framebuffer in pixels

##### Returns

`number`

#### Implementation of

`IFramebuffer.height`

***

### options

#### Get Signature

> **get** **options**(): [`FramebufferOptions`](../type-aliases/FramebufferOptions.md)

Defined in: [rendering/core/Framebuffer.ts:120](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/rendering/core/Framebuffer.ts#L120)

##### Returns

[`FramebufferOptions`](../type-aliases/FramebufferOptions.md)

***

### pixels

#### Get Signature

> **get** **pixels**(): `null` \| `Uint8Array`\<`ArrayBufferLike`\>

Defined in: [rendering/core/Framebuffer.ts:119](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/rendering/core/Framebuffer.ts#L119)

Current pixel data *(if loaded)*

##### Returns

`null` \| `Uint8Array`\<`ArrayBufferLike`\>

#### Implementation of

`IFramebuffer.pixels`

***

### width

#### Get Signature

> **get** **width**(): `number`

Defined in: [rendering/core/Framebuffer.ts:117](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/rendering/core/Framebuffer.ts#L117)

Width of the framebuffer in pixels

##### Returns

`number`

#### Implementation of

`IFramebuffer.width`

## Methods

### begin()

> `abstract` **begin**(): `void`

Defined in: [rendering/core/Framebuffer.ts:168](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/rendering/core/Framebuffer.ts#L168)

Begin rendering to this framebuffer.
Saves current render state and sets this framebuffer as the active render target.

#### Returns

`void`

#### Implementation of

`IFramebuffer.begin`

***

### end()

> `abstract` **end**(): `void`

Defined in: [rendering/core/Framebuffer.ts:169](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/rendering/core/Framebuffer.ts#L169)

End rendering to this framebuffer and restore previous render state.

#### Returns

`void`

#### Implementation of

`IFramebuffer.end`

***

### get()

#### Call Signature

> `abstract` **get**(): `Uint8Array`

Defined in: [rendering/core/Framebuffer.ts:174](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/rendering/core/Framebuffer.ts#L174)

Get pixel data from the framebuffer.
Overloaded to support different access patterns:
- No parameters: returns entire framebuffer as `Uint8Array`
- Two parameters `(x, y)`: returns single pixel as `RGBA` array
- Four parameters `(x, y, w, h)`: returns region as `Uint8Array`

##### Returns

`Uint8Array`

##### Implementation of

`IFramebuffer.get`

#### Call Signature

> `abstract` **get**(`x`, `y`): \[`number`, `number`, `number`, `number`\]

Defined in: [rendering/core/Framebuffer.ts:175](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/rendering/core/Framebuffer.ts#L175)

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `x` | `number` |
| `y` | `number` |

##### Returns

\[`number`, `number`, `number`, `number`\]

##### Implementation of

`IFramebuffer.get`

#### Call Signature

> `abstract` **get**(`x`, `y`, `w`, `h`): `Uint8Array`

Defined in: [rendering/core/Framebuffer.ts:176](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/rendering/core/Framebuffer.ts#L176)

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `x` | `number` |
| `y` | `number` |
| `w` | `number` |
| `h` | `number` |

##### Returns

`Uint8Array`

##### Implementation of

`IFramebuffer.get`

***

### loadPixels()

> `abstract` **loadPixels**(): `void`

Defined in: [rendering/core/Framebuffer.ts:173](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/rendering/core/Framebuffer.ts#L173)

Load pixel data from the framebuffer into the pixels property.
This operation may be expensive and should be used sparingly.

#### Returns

`void`

#### Implementation of

`IFramebuffer.loadPixels`

***

### resize()

> `abstract` **resize**(`width`, `height`): `void`

Defined in: [rendering/core/Framebuffer.ts:170](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/rendering/core/Framebuffer.ts#L170)

Resize the framebuffer to new dimensions.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `width` | `number` | New width in pixels |
| `height` | `number` | New height in pixels |

#### Returns

`void`

#### Implementation of

`IFramebuffer.resize`

***

### updatePixels()

> `abstract` **updatePixels**(`pixelData`, `width`, `height`): `void`

Defined in: [rendering/core/Framebuffer.ts:172](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/rendering/core/Framebuffer.ts#L172)

Update the framebuffer texture with raw pixel data.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `pixelData` | `Uint8Array` | RGBA pixel data |
| `width` | `number` | Width of the pixel data |
| `height` | `number` | Height of the pixel data |

#### Returns

`void`

#### Implementation of

`IFramebuffer.updatePixels`

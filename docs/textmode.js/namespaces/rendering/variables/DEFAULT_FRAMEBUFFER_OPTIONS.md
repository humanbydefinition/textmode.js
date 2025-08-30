[**textmode.js v0.1.9**](../../../../README.md)

***

[textmode.js](../../../../README.md) / [rendering](../README.md) / DEFAULT\_FRAMEBUFFER\_OPTIONS

# Variable: DEFAULT\_FRAMEBUFFER\_OPTIONS

> `const` **DEFAULT\_FRAMEBUFFER\_OPTIONS**: [`FramebufferOptions`](../type-aliases/FramebufferOptions.md)

Defined in: [rendering/core/Framebuffer.ts:189](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/rendering/core/Framebuffer.ts#L189)

Default framebuffer options used when no options are specified.

**Default values:**
- `filter`: `'nearest'` - Use nearest neighbor filtering for sharp pixels
- `wrap`: `'clamp'` - Clamp texture coordinates to edges  
- `format`: `'rgba'` - Use RGBA color format with alpha channel
- `type`: `'unsigned_byte'` - Store color components as 8-bit unsigned integers *(0-255)*

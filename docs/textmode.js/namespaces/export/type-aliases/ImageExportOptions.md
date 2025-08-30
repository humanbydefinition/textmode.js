[**textmode.js v0.1.9**](../../../../README.md)

***

[textmode.js](../../../../README.md) / [export](../README.md) / ImageExportOptions

# Type Alias: ImageExportOptions

> **ImageExportOptions** = `object`

Defined in: [export/image/types.ts:13](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/export/image/types.ts#L13)

Options for exporting the textmode content to image format.

## Properties

### backgroundColor?

> `optional` **backgroundColor**: `string`

Defined in: [export/image/types.ts:51](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/export/image/types.ts#L51)

Background color for formats that don't support transparency (`'jpg'`).

**Format:** CSS color string.

Default is `'black'`.

***

### quality?

> `optional` **quality**: `number`

Defined in: [export/image/types.ts:33](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/export/image/types.ts#L33)

Image quality for lossy formats (`'jpg'`, `'webp'`). 

Range: `0.0` to `1.0`, where `1.0` is highest quality.

Default is `1.0`. Ignored for `'png'` format.

***

### scale?

> `optional` **scale**: `number`

Defined in: [export/image/types.ts:42](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/export/image/types.ts#L42)

Scale factor for the output image.

`1.0` = original size, `2.0` = double size, `0.5` = half size.

Default is `1.0`.

[**textmode.js v0.1.2**](../../../../README.md)

***

[textmode.js](../../../../README.md) / [export](../README.md) / ImageExportOptions

# Type Alias: ImageExportOptions

> **ImageExportOptions** = `object`

Defined in: [export/image/types.ts:13](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/export/image/types.ts#L13)

Options for exporting the textmode content to image format.

## Properties

### backgroundColor?

> `optional` **backgroundColor**: `string`

Defined in: [export/image/types.ts:53](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/export/image/types.ts#L53)

Background color for formats that don't support transparency (`'jpg'`).

Format: CSS color string or `'transparent'` for `'png'`/`'webp'`.

Default is `'black'`.

***

### filename?

> `optional` **filename**: `string`

Defined in: [export/image/types.ts:19](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/export/image/types.ts#L19)

The filename to save the image file as (without extension). 

If not provided, a default filename is used.

***

### format?

> `optional` **format**: `ImageFormat`

Defined in: [export/image/types.ts:26](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/export/image/types.ts#L26)

The image format to export (`'png'`, `'jpg'`, or `'webp'`).

Default is `'png'`.

***

### quality?

> `optional` **quality**: `number`

Defined in: [export/image/types.ts:35](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/export/image/types.ts#L35)

Image quality for lossy formats (`'jpg'`, `'webp'`). 

Range: `0.0` to `1.0`, where `1.0` is highest quality.

Default is `1.0`. Ignored for `'png'` format.

***

### scale?

> `optional` **scale**: `number`

Defined in: [export/image/types.ts:44](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/export/image/types.ts#L44)

Scale factor for the output image.

`1.0` = original size, `2.0` = double size, `0.5` = half size.

Default is `1.0`.

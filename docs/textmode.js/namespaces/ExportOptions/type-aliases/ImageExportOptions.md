[**textmode.js v0.1.1**](../../../../README.md)

***

[textmode.js](../../../../README.md) / [ExportOptions](../README.md) / ImageExportOptions

# Type Alias: ImageExportOptions

> **ImageExportOptions** = `object`

Defined in: [export/image/types.ts:13](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/export/image/types.ts#L13)

Options for exporting the textmode content to image format.

## Properties

### backgroundColor?

> `optional` **backgroundColor**: `string`

Defined in: [export/image/types.ts:45](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/export/image/types.ts#L45)

Background color for formats that don't support transparency (jpg).
Format: CSS color string or 'transparent' for PNG/WebP.
Default is 'black'.

***

### filename?

> `optional` **filename**: `string`

Defined in: [export/image/types.ts:18](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/export/image/types.ts#L18)

The filename to save the image file as (without extension). 
If not provided, a default filename is used.

***

### format?

> `optional` **format**: `ImageFormat`

Defined in: [export/image/types.ts:24](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/export/image/types.ts#L24)

The image format to export ('png', 'jpg', or 'webp').
Default is 'png'.

***

### quality?

> `optional` **quality**: `number`

Defined in: [export/image/types.ts:31](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/export/image/types.ts#L31)

Image quality for lossy formats (jpg, webp). 
Range: 0.0 to 1.0, where 1.0 is highest quality.
Default is 1.0. Ignored for PNG format.

***

### scale?

> `optional` **scale**: `number`

Defined in: [export/image/types.ts:38](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/export/image/types.ts#L38)

Scale factor for the output image.
1.0 = original size, 2.0 = double size, 0.5 = half size.
Default is 1.0.

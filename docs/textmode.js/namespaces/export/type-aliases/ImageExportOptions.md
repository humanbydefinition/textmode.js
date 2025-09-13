[**textmode.js v0.2.0**](../../../../README.md)

***

[textmode.js](../../../../README.md) / [export](../README.md) / ImageExportOptions

# Type Alias: ImageExportOptions

> **ImageExportOptions** = `object`

Options for exporting the textmode content to image format.

## Properties

### backgroundColor?

> `optional` **backgroundColor**: `string`

Background color for formats that don't support transparency (`'jpg'`).

**Format:** CSS color string.

Default is `'black'`.

***

### filename?

> `optional` **filename**: `string`

The filename to save the image file as (without extension).

***

### format?

> `optional` **format**: `"png"` \| `"jpg"` \| `"webp"`

The image format to export (`'png'`, `'jpg'`, or `'webp'`).

***

### quality?

> `optional` **quality**: `number`

Image quality for lossy formats (`'jpg'`, `'webp'`). 

Range: `0.0` to `1.0`, where `1.0` is highest quality.

Default is `1.0`. Ignored for `'png'` format.

***

### scale?

> `optional` **scale**: `number`

Scale factor for the output image.

`1.0` = original size, `2.0` = double size, `0.5` = half size.

Default is `1.0`.

[**textmode.js v0.1.9**](../../../../README.md)

***

[textmode.js](../../../../README.md) / [export](../README.md) / SVGExportOptions

# Type Alias: SVGExportOptions

> **SVGExportOptions** = `object`

Defined in: [export/svg/types.ts:68](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/export/svg/types.ts#L68)

Options for exporting the textmode content to SVG format.

## Properties

### backgroundColor?

> `optional` **backgroundColor**: \[`number`, `number`, `number`, `number`\]

Defined in: [export/svg/types.ts:108](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/export/svg/types.ts#L108)

Background color for the SVG as RGBA array `[r, g, b, a]`.

Default is transparent black `[0, 0, 0, 0]`.

***

### drawMode?

> `optional` **drawMode**: `"fill"` \| `"stroke"`

Defined in: [export/svg/types.ts:94](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/export/svg/types.ts#L94)

The drawing mode for ASCII characters.

When set to `'fill'`, characters are rendered as filled shapes.

When set to `'stroke'`, characters are rendered as outlines.

Default is `'fill'`.

***

### filename?

> `optional` **filename**: `string`

Defined in: [export/svg/types.ts:74](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/export/svg/types.ts#L74)

The filename to save the SVG file as. 

If not provided, a default filename is used.

***

### includeBackgroundRectangles?

> `optional` **includeBackgroundRectangles**: `boolean`

Defined in: [export/svg/types.ts:83](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/export/svg/types.ts#L83)

Whether to include cell background rectangles in the SVG output.

When `false`, only the character paths are included, creating a more compact SVG.

Default is `true`.

***

### strokeWidth?

> `optional` **strokeWidth**: `number`

Defined in: [export/svg/types.ts:101](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/export/svg/types.ts#L101)

The stroke width to use when drawMode is set to `'stroke'`.

Default is `1.0`.

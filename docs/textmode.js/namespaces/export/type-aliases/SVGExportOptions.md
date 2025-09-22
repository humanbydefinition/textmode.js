[**textmode.js v0.3.0**](../../../../README.md)

***

[textmode.js](../../../../README.md) / [export](../README.md) / SVGExportOptions

# Type Alias: SVGExportOptions

> **SVGExportOptions** = `object`

Options for exporting the textmode content to SVG format.

## Properties

### backgroundColor?

> `optional` **backgroundColor**: \[`number`, `number`, `number`, `number`\]

Background color for the SVG as RGBA array `[r, g, b, a]`.

Default is transparent black `[0, 0, 0, 0]`.

***

### drawMode?

> `optional` **drawMode**: `"fill"` \| `"stroke"`

The drawing mode for ASCII characters.

When set to `'fill'`, characters are rendered as filled shapes.

When set to `'stroke'`, characters are rendered as outlines.

Default is `'fill'`.

***

### filename?

> `optional` **filename**: `string`

The filename to save the SVG file as. 

If not provided, a default filename is used.

***

### includeBackgroundRectangles?

> `optional` **includeBackgroundRectangles**: `boolean`

Whether to include cell background rectangles in the SVG output.

When `false`, only the character paths are included, creating a more compact SVG.

Default is `true`.

***

### strokeWidth?

> `optional` **strokeWidth**: `number`

The stroke width to use when drawMode is set to `'stroke'`.

Default is `1.0`.

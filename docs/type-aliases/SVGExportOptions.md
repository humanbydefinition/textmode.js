[**textmode.js v0.1.0**](../README.md)

***

[textmode.js](../README.md) / SVGExportOptions

# Type Alias: SVGExportOptions

> **SVGExportOptions** = `object`

Defined in: [export/svg/types.ts:89](https://github.com/humanbydefinition/textmode.js-dev/blob/343f9ecda8003c649bb7b0b4174c4e0103447484/src/export/svg/types.ts#L89)

Options for exporting the textmode content to SVG format.

## Properties

### backgroundColor?

> `optional` **backgroundColor**: \[`number`, `number`, `number`, `number`\]

Defined in: [export/svg/types.ts:120](https://github.com/humanbydefinition/textmode.js-dev/blob/343f9ecda8003c649bb7b0b4174c4e0103447484/src/export/svg/types.ts#L120)

Background color for the SVG as RGBA array [r, g, b, a].
Default is transparent black [0, 0, 0, 0].

***

### drawMode?

> `optional` **drawMode**: `"fill"` \| `"stroke"`

Defined in: [export/svg/types.ts:108](https://github.com/humanbydefinition/textmode.js-dev/blob/343f9ecda8003c649bb7b0b4174c4e0103447484/src/export/svg/types.ts#L108)

The drawing mode for ASCII characters (`'fill'` or `'stroke'`).
When set to `'fill'`, characters are rendered as filled shapes.
When set to `'stroke'`, characters are rendered as outlines.
Default is `'fill'`.

***

### filename?

> `optional` **filename**: `string`

Defined in: [export/svg/types.ts:93](https://github.com/humanbydefinition/textmode.js-dev/blob/343f9ecda8003c649bb7b0b4174c4e0103447484/src/export/svg/types.ts#L93)

The filename to save the SVG file as. If not provided, a default filename is used.

***

### includeBackgroundRectangles?

> `optional` **includeBackgroundRectangles**: `boolean`

Defined in: [export/svg/types.ts:100](https://github.com/humanbydefinition/textmode.js-dev/blob/343f9ecda8003c649bb7b0b4174c4e0103447484/src/export/svg/types.ts#L100)

Whether to include cell background rectangles in the SVG output.
When false, only the character paths are included, creating a more compact SVG.
Default is `true`.

***

### strokeWidth?

> `optional` **strokeWidth**: `number`

Defined in: [export/svg/types.ts:114](https://github.com/humanbydefinition/textmode.js-dev/blob/343f9ecda8003c649bb7b0b4174c4e0103447484/src/export/svg/types.ts#L114)

The stroke width to use when drawMode is set to `'stroke'`.
Default is `1.0`.

**textmode.js v0.3.0**

***

# textmode.js v0.3.0

## Namespaces

| Namespace | Description |
| ------ | ------ |
| [export](textmode.js/namespaces/export/README.md) | All types related to export options for different formats. |

## Enumerations

| Enumeration | Description |
| ------ | ------ |
| [TextmodeErrorLevel](enumerations/TextmodeErrorLevel.md) | Error handling levels to control how errors are reported and handled. |

## Classes

| Class | Description |
| ------ | ------ |
| [textmode](classes/textmode.md) | The main entry point for the `textmode.js` library. |
| [TextmodeFont](classes/TextmodeFont.md) | Manages the font used for rendering characters. |
| [TextmodeFramebuffer](classes/TextmodeFramebuffer.md) | Framebuffer class for managing offscreen rendering targets. |
| [TextmodeGrid](classes/TextmodeGrid.md) | Manages the grid of a [Textmodifier](classes/Textmodifier.md) instance. |
| [TextmodeImage](classes/TextmodeImage.md) | Represents an image uploaded for textmode rendering via [Textmodifier.loadImage](classes/Textmodifier.md#loadimage). |
| [Textmodifier](classes/Textmodifier.md) | Manages textmode rendering on a [`HTMLCanvasElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement) and provides methods for drawing, exporting, font management, and animation control. |

## Type Aliases

| Type Alias | Description |
| ------ | ------ |
| [TextmodeCharacter](type-aliases/TextmodeCharacter.md) | Represents a single character in the [TextmodeFont.characters](classes/TextmodeFont.md#characters) array. |
| [TextmodeFramebufferOptions](type-aliases/TextmodeFramebufferOptions.md) | Options for creating a framebuffer. |
| [TextmodeOptions](type-aliases/TextmodeOptions.md) | Options for creating a [Textmodifier](classes/Textmodifier.md) instance. |

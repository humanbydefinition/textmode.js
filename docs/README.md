**textmode.js v0.4.0**

***

# textmode.js v0.4.0

## Namespaces

| Namespace | Description |
| ------ | ------ |
| [input](textmode.js/namespaces/input/README.md) | All types and interfaces related to input event handling. |

## Enumerations

| Enumeration | Description |
| ------ | ------ |
| [TextmodeErrorLevel](enumerations/TextmodeErrorLevel.md) | Error handling levels to control how errors are reported and handled. |

## Classes

| Class | Description |
| ------ | ------ |
| [textmode](classes/textmode.md) | The main entry point for the `textmode.js` library. |
| [TextmodeFont](classes/TextmodeFont.md) | Manages the font used for rendering characters. |
| [TextmodeFramebuffer](classes/TextmodeFramebuffer.md) | Framebuffer class for managing offscreen rendering targets initialized via [Textmodifier.createFramebuffer](classes/Textmodifier.md#createframebuffer). |
| [TextmodeGrid](classes/TextmodeGrid.md) | Manages the grid of a [Textmodifier](classes/Textmodifier.md) instance. |
| [TextmodeImage](classes/TextmodeImage.md) | Represents an image uploaded for textmode rendering via [Textmodifier.loadImage](classes/Textmodifier.md#loadimage). |
| [Textmodifier](classes/Textmodifier.md) | Manages textmode rendering on a [`HTMLCanvasElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement) and provides methods for drawing, exporting, font management, event handling, and animation control. |

## Interfaces

| Interface | Description |
| ------ | ------ |
| [TextmodePlugin](interfaces/TextmodePlugin.md) | A plugin interface for extending the functionality of a [Textmodifier](classes/Textmodifier.md) instance. |
| [TextmodePluginAPI](interfaces/TextmodePluginAPI.md) | An extended API provided to plugins when they are installed on a [Textmodifier](classes/Textmodifier.md) instance. |

## Type Aliases

| Type Alias | Description |
| ------ | ------ |
| [TextmodeCharacter](type-aliases/TextmodeCharacter.md) | Represents a single character in the [TextmodeFont.characters](classes/TextmodeFont.md#characters) array. |
| [TextmodeFramebufferOptions](type-aliases/TextmodeFramebufferOptions.md) | Options for creating a framebuffer. |
| [TextmodeOptions](type-aliases/TextmodeOptions.md) | Options for creating a [Textmodifier](classes/Textmodifier.md) instance. |

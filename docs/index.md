# textmode.js v0.6.0

## Namespaces

| Namespace | Description |
| ------ | ------ |
| [input](textmode.js/namespaces/input/index.md) | All types and interfaces related to input event handling. |
| [loadables](textmode.js/namespaces/loadables/index.md) | All loadable assets related to textmode rendering. |
| [loading](textmode.js/namespaces/loading/index.md) | All loading screen related modules and types. |

## Enumerations

| Enumeration | Description |
| ------ | ------ |
| [TextmodeErrorLevel](enumerations/TextmodeErrorLevel.md) | Error handling levels to control how errors are reported and handled. |

## Classes

| Class | Description |
| ------ | ------ |
| [textmode](classes/textmode.md) | The main entry point for the `textmode.js` library. |
| [TextmodeColor](classes/TextmodeColor.md) | Represents a color in the `textmode.js` rendering system. |
| [TextmodeFramebuffer](classes/TextmodeFramebuffer.md) | Framebuffer class for managing offscreen rendering targets initialized via [Textmodifier.createFramebuffer](classes/Textmodifier.md#createframebuffer). |
| [TextmodeGrid](classes/TextmodeGrid.md) | Manages the grid of a [Textmodifier](classes/Textmodifier.md) instance. |
| [Textmodifier](classes/Textmodifier.md) | Manages textmode rendering on a [`HTMLCanvasElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement) and provides methods for drawing, font management, event handling, and animation control. |

## Interfaces

| Interface | Description |
| ------ | ------ |
| [TextmodePlugin](interfaces/TextmodePlugin.md) | A plugin interface for extending the functionality of a [Textmodifier](classes/Textmodifier.md) instance. |
| [TextmodePluginAPI](interfaces/TextmodePluginAPI.md) | An extended API provided to plugins when they are installed on a [Textmodifier](classes/Textmodifier.md) instance. |

## Type Aliases

| Type Alias | Description |
| ------ | ------ |
| [TextmodeFramebufferOptions](type-aliases/TextmodeFramebufferOptions.md) | Options for creating a framebuffer. If not specified, width and height default to the current textmode grid size. |
| [TextmodeOptions](type-aliases/TextmodeOptions.md) | Options for creating a [Textmodifier](classes/Textmodifier.md) instance. |

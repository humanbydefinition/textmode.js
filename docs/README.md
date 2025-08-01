**textmode.js v0.1.2**

***

# textmode.js v0.1.2

## Namespaces

| Namespace | Description |
| ------ | ------ |
| [converters](textmode.js/namespaces/converters/README.md) | Contains all converters that can be added to a rendering pipeline to shape the textmode output. |
| [export](textmode.js/namespaces/export/README.md) | All types related to export options for different formats. |

## Enumerations

| Enumeration | Description |
| ------ | ------ |
| [TextmodeErrorLevel](enumerations/TextmodeErrorLevel.md) | Error handling levels to control how errors are reported and handled. |

## Classes

| Class | Description |
| ------ | ------ |
| [textmode](classes/textmode.md) | The main entry point for the `textmode.js` library. |
| [TextmodeConversionPipeline](classes/TextmodeConversionPipeline.md) | Manages the conversion pipeline for textmode rendering. |
| [TextmodeFont](classes/TextmodeFont.md) | Manages the textmode font used for rendering characters. |
| [TextmodeGrid](classes/TextmodeGrid.md) | Manages the grid for the ASCII rendering pipeline of a [Textmodifier](classes/Textmodifier.md) instance. |
| [Textmodifier](classes/Textmodifier.md) | Manages textmode rendering on a canvas or video element. |

## Type Aliases

| Type Alias | Description |
| ------ | ------ |
| [CaptureSource](type-aliases/CaptureSource.md) | Supported capture sources for textmode rendering |
| [TextmodeCharacter](type-aliases/TextmodeCharacter.md) | Represents a single character in the textmode font. |
| [TextmodeOptions](type-aliases/TextmodeOptions.md) | Options for creating a [Textmodifier](classes/Textmodifier.md) instance. |

## References

### default

Renames and re-exports [textmode](classes/textmode.md)

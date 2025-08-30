[**textmode.js v0.1.9**](../../../../README.md)

***

[textmode.js](../../../../README.md) / [converters](../README.md) / BRIGHTNESS\_DEFAULT\_OPTIONS

# Variable: BRIGHTNESS\_DEFAULT\_OPTIONS

> `const` **BRIGHTNESS\_DEFAULT\_OPTIONS**: [`TextmodeBrightnessConverterOptions`](../interfaces/TextmodeBrightnessConverterOptions.md)

Defined in: [textmode/converters/BrightnessConverter.ts:40](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/BrightnessConverter.ts#L40)

Default brightness converter options used when no options are specified.

**Default values:**
- `enabled`: `true` - Enable the brightness converter
- `characters`: `" .:-=+*%@#"` - Character set for brightness mapping *(from darkest to brightest)*
- `characterColor`: `#FFFFFF` - White color for ASCII characters *(only used when `characterColorMode` is `'fixed'`)*
- `characterColorMode`: `'sampled'` - Sample character colors from source texture
- `cellColor`: `#000000` - Black background color for cells *(only used when `cellColorMode` is `'fixed'`)*
- `cellColorMode`: `'fixed'` - Use fixed background color for all cells
- `invert`: `false` - Don't swap character and background colors
- `rotation`: `0` - No rotation applied to characters
- `flipHorizontally`: `false` - Don't flip characters horizontally
- `flipVertically`: `false` - Don't flip characters vertically
- `brightnessRange`: `[0, 255]` - Full brightness range for character mapping

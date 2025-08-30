[**textmode.js v0.1.9**](../../../../README.md)

***

[textmode.js](../../../../README.md) / [converters](../README.md) / TextmodeBrightnessConverterOptions

# Interface: TextmodeBrightnessConverterOptions

Defined in: [textmode/converters/BrightnessConverter.ts:19](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/BrightnessConverter.ts#L19)

Options interface for the brightness converter.

## Extends

- [`TextmodeFeatureConverterOptions`](TextmodeFeatureConverterOptions.md)

## Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="brightnessrange"></a> `brightnessRange` | \[`number`, `number`\] | Range of brightness values to map to ASCII characters | - | [textmode/converters/BrightnessConverter.ts:21](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/BrightnessConverter.ts#L21) |
| <a id="cellcolor"></a> `cellColor` | \[`number`, `number`, `number`, `number`\] | Cell background color. Only used when `cellColorMode` is set to `'fixed'` | [`TextmodeFeatureConverterOptions`](TextmodeFeatureConverterOptions.md).[`cellColor`](TextmodeFeatureConverterOptions.md#cellcolor) | [textmode/converters/FeatureConverter.ts:20](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/FeatureConverter.ts#L20) |
| <a id="cellcolormode"></a> `cellColorMode` | `"sampled"` \| `"fixed"` | Background color mode | [`TextmodeFeatureConverterOptions`](TextmodeFeatureConverterOptions.md).[`cellColorMode`](TextmodeFeatureConverterOptions.md#cellcolormode) | [textmode/converters/FeatureConverter.ts:22](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/FeatureConverter.ts#L22) |
| <a id="charactercolor"></a> `characterColor` | \[`number`, `number`, `number`, `number`\] | Color of the characters. Only used when `characterColorMode` is set to `'fixed'` | [`TextmodeFeatureConverterOptions`](TextmodeFeatureConverterOptions.md).[`characterColor`](TextmodeFeatureConverterOptions.md#charactercolor) | [textmode/converters/FeatureConverter.ts:16](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/FeatureConverter.ts#L16) |
| <a id="charactercolormode"></a> `characterColorMode` | `"sampled"` \| `"fixed"` | Character color mode | [`TextmodeFeatureConverterOptions`](TextmodeFeatureConverterOptions.md).[`characterColorMode`](TextmodeFeatureConverterOptions.md#charactercolormode) | [textmode/converters/FeatureConverter.ts:18](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/FeatureConverter.ts#L18) |
| <a id="characters"></a> `characters` | `string` | Characters used for mapping, usually ordered from least dense to most dense | [`TextmodeFeatureConverterOptions`](TextmodeFeatureConverterOptions.md).[`characters`](TextmodeFeatureConverterOptions.md#characters) | [textmode/converters/FeatureConverter.ts:14](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/FeatureConverter.ts#L14) |
| <a id="enabled"></a> `enabled` | `boolean` | Enable/disable the converter | [`TextmodeFeatureConverterOptions`](TextmodeFeatureConverterOptions.md).[`enabled`](TextmodeFeatureConverterOptions.md#enabled) | [textmode/converters/Converter.ts:12](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/Converter.ts#L12) |
| <a id="fliphorizontally"></a> `flipHorizontally` | `boolean` | Flip the characters horizontally | [`TextmodeFeatureConverterOptions`](TextmodeFeatureConverterOptions.md).[`flipHorizontally`](TextmodeFeatureConverterOptions.md#fliphorizontally) | [textmode/converters/FeatureConverter.ts:28](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/FeatureConverter.ts#L28) |
| <a id="flipvertically"></a> `flipVertically` | `boolean` | Flip the characters vertically | [`TextmodeFeatureConverterOptions`](TextmodeFeatureConverterOptions.md).[`flipVertically`](TextmodeFeatureConverterOptions.md#flipvertically) | [textmode/converters/FeatureConverter.ts:30](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/FeatureConverter.ts#L30) |
| <a id="invert"></a> `invert` | `boolean` | Swap the character and cell colors | [`TextmodeFeatureConverterOptions`](TextmodeFeatureConverterOptions.md).[`invert`](TextmodeFeatureConverterOptions.md#invert) | [textmode/converters/FeatureConverter.ts:24](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/FeatureConverter.ts#L24) |
| <a id="rotation"></a> `rotation` | \[`number`, `number`, `number`, `number`\] | Rotation angle stored as RGBA where RGB encodes the rotation and A is always 1 | [`TextmodeFeatureConverterOptions`](TextmodeFeatureConverterOptions.md).[`rotation`](TextmodeFeatureConverterOptions.md#rotation) | [textmode/converters/FeatureConverter.ts:26](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/textmode/converters/FeatureConverter.ts#L26) |

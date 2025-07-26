[**textmode.js v0.0.10-beta.5**](../../../../README.md)

***

[textmode.js](../../../../README.md) / [TextmodeConverters](../README.md) / TextmodeFeatureConverter

# Class: `abstract` TextmodeFeatureConverter

Defined in: [textmode/converters/FeatureConverter.ts:12](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/converters/FeatureConverter.ts#L12)

Abstract base class for all feature-based textmode converters like `'brightness'`.

## Extends

- [`TextmodeConverter`](TextmodeConverter.md)

## Extended by

- [`TextmodeBrightnessConverter`](TextmodeBrightnessConverter.md)

## Accessors

### characterFramebuffer

#### Get Signature

> **get** **characterFramebuffer**(): `Framebuffer`

Defined in: [textmode/converters/Converter.ts:58](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/converters/Converter.ts#L58)

Returns the framebuffer containing character data.

##### Returns

`Framebuffer`

#### Inherited from

[`TextmodeConverter`](TextmodeConverter.md).[`characterFramebuffer`](TextmodeConverter.md#characterframebuffer)

***

### primaryColorFramebuffer

#### Get Signature

> **get** **primaryColorFramebuffer**(): `Framebuffer`

Defined in: [textmode/converters/Converter.ts:61](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/converters/Converter.ts#L61)

Returns the framebuffer containing primary color data.

##### Returns

`Framebuffer`

#### Inherited from

[`TextmodeConverter`](TextmodeConverter.md).[`primaryColorFramebuffer`](TextmodeConverter.md#primarycolorframebuffer)

***

### rotationFramebuffer

#### Get Signature

> **get** **rotationFramebuffer**(): `Framebuffer`

Defined in: [textmode/converters/Converter.ts:67](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/converters/Converter.ts#L67)

Returns the framebuffer containing rotation data.

##### Returns

`Framebuffer`

#### Inherited from

[`TextmodeConverter`](TextmodeConverter.md).[`rotationFramebuffer`](TextmodeConverter.md#rotationframebuffer)

***

### secondaryColorFramebuffer

#### Get Signature

> **get** **secondaryColorFramebuffer**(): `Framebuffer`

Defined in: [textmode/converters/Converter.ts:64](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/converters/Converter.ts#L64)

Returns the framebuffer containing secondary color data.

##### Returns

`Framebuffer`

#### Inherited from

[`TextmodeConverter`](TextmodeConverter.md).[`secondaryColorFramebuffer`](TextmodeConverter.md#secondarycolorframebuffer)

***

### transformFramebuffer

#### Get Signature

> **get** **transformFramebuffer**(): `Framebuffer`

Defined in: [textmode/converters/Converter.ts:70](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/converters/Converter.ts#L70)

Returns the framebuffer containing transformation data.

##### Returns

`Framebuffer`

#### Inherited from

[`TextmodeConverter`](TextmodeConverter.md).[`transformFramebuffer`](TextmodeConverter.md#transformframebuffer)

## Methods

### cellColor()

> **cellColor**(`r`, `g`, `b`, `a`): `void`

Defined in: [textmode/converters/FeatureConverter.ts:92](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/converters/FeatureConverter.ts#L92)

Sets the cell color for all cells affected by the converter.
This is only used when `cellColorMode` is set to `'fixed'`.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `r` | `number` | `undefined` | Red component (0-255). |
| `g` | `number` | `r` | Green component (0-255). |
| `b` | `number` | `r` | Blue component (0-255). |
| `a` | `number` | `255` | Alpha component (0-255). |

#### Returns

`void`

***

### cellColorMode()

> **cellColorMode**(`mode`): `void`

Defined in: [textmode/converters/FeatureConverter.ts:110](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/converters/FeatureConverter.ts#L110)

Sets the cell color mode.
- `'sampled'`: Uses sampled colors from the source texture.
- `'fixed'`: Uses a fixed color set via [cellColor](#cellcolor).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `mode` | `"sampled"` \| `"fixed"` | The color mode to use for background cells. |

#### Returns

`void`

***

### characterColor()

> **characterColor**(`r`, `g`, `b`, `a`): `void`

Defined in: [textmode/converters/FeatureConverter.ts:54](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/converters/FeatureConverter.ts#L54)

Sets the color of the characters affected by the converter.
This is only used when `characterColorMode` is set to `'fixed'`.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `r` | `number` | `undefined` | Red component (0-255). |
| `g` | `number` | `r` | Green component (0-255). |
| `b` | `number` | `r` | Blue component (0-255). |
| `a` | `number` | `255` | Alpha component (0-255). |

#### Returns

`void`

***

### characterColorMode()

> **characterColorMode**(`mode`): `void`

Defined in: [textmode/converters/FeatureConverter.ts:72](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/converters/FeatureConverter.ts#L72)

Sets the character color mode.
- `'sampled'`: Uses sampled colors from the source texture.
- `'fixed'`: Uses a fixed color set by `characterColor()`.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `mode` | `"sampled"` \| `"fixed"` | The color mode to use for characters. |

#### Returns

`void`

***

### characters()

> **characters**(`characters`): `void`

Defined in: [textmode/converters/FeatureConverter.ts:34](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/converters/FeatureConverter.ts#L34)

Sets the characters used for mapping.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `characters` | `string` | The characters to use for mapping, usually ordered from darkest to brightest. |

#### Returns

`void`

***

### flipHorizontally()

> **flipHorizontally**(`flip`): `void`

Defined in: [textmode/converters/FeatureConverter.ts:165](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/converters/FeatureConverter.ts#L165)

Flips the characters horizontally.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `flip` | `number` \| `boolean` | If `true`, characters are flipped horizontally. If `false`, no flip is applied. |

#### Returns

`void`

***

### flipVertically()

> **flipVertically**(`flip`): `void`

Defined in: [textmode/converters/FeatureConverter.ts:181](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/converters/FeatureConverter.ts#L181)

Flips the characters vertically.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `flip` | `number` \| `boolean` | If `true`, characters are flipped vertically. If `false`, no flip is applied. |

#### Returns

`void`

***

### invert()

> **invert**(`invert`): `void`

Defined in: [textmode/converters/FeatureConverter.ts:126](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/converters/FeatureConverter.ts#L126)

Swaps the character and cell color.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `invert` | `number` \| `boolean` | If `true`, the character color becomes the cell color and vice versa. |

#### Returns

`void`

***

### rotation()

> **rotation**(`angle`): `void`

Defined in: [textmode/converters/FeatureConverter.ts:142](https://github.com/humanbydefinition/textmode.js-dev/blob/e3dc79bc1521c853de25f7f80d6e8ec46edd909c/src/textmode/converters/FeatureConverter.ts#L142)

Sets the rotation angle for the characters.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `angle` | `number` | The rotation angle in degrees. |

#### Returns

`void`

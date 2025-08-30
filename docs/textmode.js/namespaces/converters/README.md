[**textmode.js v0.1.9**](../../../README.md)

***

[textmode.js](../../../README.md) / converters

# converters

Contains all converters that can be added to a rendering pipeline to shape the textmode output.

## Classes

| Class | Description |
| ------ | ------ |
| [TextmodeBrightnessConverter](classes/TextmodeBrightnessConverter.md) | Converter that maps brightness values from a source texture to ASCII characters. |
| [TextmodeConverter](classes/TextmodeConverter.md) | Base class for all textmode converters. |
| [TextmodeFeatureConverter](classes/TextmodeFeatureConverter.md) | Abstract base class for all feature-based textmode converters like `'brightness'`. |

## Interfaces

| Interface | Description |
| ------ | ------ |
| [TextmodeBrightnessConverterOptions](interfaces/TextmodeBrightnessConverterOptions.md) | Options interface for the brightness converter. |
| [TextmodeConverterOptions](interfaces/TextmodeConverterOptions.md) | Base options interface for all textmode converters. |
| [TextmodeFeatureConverterOptions](interfaces/TextmodeFeatureConverterOptions.md) | Options interface for feature-based textmode converters. |

## Variables

| Variable | Description |
| ------ | ------ |
| [BRIGHTNESS\_DEFAULT\_OPTIONS](variables/BRIGHTNESS_DEFAULT_OPTIONS.md) | Default brightness converter options used when no options are specified. |

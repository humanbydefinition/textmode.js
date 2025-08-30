[**textmode.js v0.1.9**](../README.md)

***

[textmode.js](../README.md) / TextmodeErrorLevel

# Enumeration: TextmodeErrorLevel

Defined in: [errors/ErrorHandler.ts:14](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/errors/ErrorHandler.ts#L14)

Error handling levels to control how errors are reported and handled.

Determines how validation failures and errors are processed throughout the library.
Each level provides different behavior for error reporting and execution flow control.

## Example

```ts
// Set to `WARNING` level to log errors without stopping execution
textmode.setErrorLevel(TextmodeErrorLevel.WARNING);
```

## Enumeration Members

| Enumeration Member | Value | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="error"></a> `ERROR` | `2` | Log validation failures as errors. | [errors/ErrorHandler.ts:29](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/errors/ErrorHandler.ts#L29) |
| <a id="silent"></a> `SILENT` | `0` | Suppress all error output. Validation failures are handled silently without any console messages. | [errors/ErrorHandler.ts:19](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/errors/ErrorHandler.ts#L19) |
| <a id="throw"></a> `THROW` | `3` | Throw exceptions on validation failures *(default behavior)*. | [errors/ErrorHandler.ts:34](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/errors/ErrorHandler.ts#L34) |
| <a id="warning"></a> `WARNING` | `1` | Log validation failures as warnings. | [errors/ErrorHandler.ts:24](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/errors/ErrorHandler.ts#L24) |

[**textmode.js v0.0.2**](../README.md)

***

[textmode.js](../README.md) / TextmodeErrorLevel

# Enumeration: TextmodeErrorLevel

Defined in: [errors/ErrorHandler.ts:14](https://github.com/humanbydefinition/textmode.js-dev/blob/b5681e0940ee259e7c3e1b7f6452addade1503bd/src/errors/ErrorHandler.ts#L14)

Error handling levels to control how errors are reported and handled.

Determines how validation failures and errors are processed throughout the library.
Each level provides different behavior for error reporting and execution flow control.

## Example

```ts
// Set to `WARNING` level to log errors without stopping execution
textmodifier.setErrorLevel(TextmodeErrorLevel.WARNING);
```

## Enumeration Members

| Enumeration Member | Value | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="error"></a> `ERROR` | `2` | Log validation failures as errors. Execution continues, but errors are prominently displayed in the console. | [errors/ErrorHandler.ts:31](https://github.com/humanbydefinition/textmode.js-dev/blob/b5681e0940ee259e7c3e1b7f6452addade1503bd/src/errors/ErrorHandler.ts#L31) |
| <a id="silent"></a> `SILENT` | `0` | Suppress all error output. Validation failures are handled silently without any console messages. | [errors/ErrorHandler.ts:19](https://github.com/humanbydefinition/textmode.js-dev/blob/b5681e0940ee259e7c3e1b7f6452addade1503bd/src/errors/ErrorHandler.ts#L19) |
| <a id="throw"></a> `THROW` | `3` | Throw exceptions on validation failures. Stops execution immediately when errors occur *(default behavior)*. | [errors/ErrorHandler.ts:37](https://github.com/humanbydefinition/textmode.js-dev/blob/b5681e0940ee259e7c3e1b7f6452addade1503bd/src/errors/ErrorHandler.ts#L37) |
| <a id="warning"></a> `WARNING` | `1` | Log validation failures as warnings. Execution continues normally, but issues are reported to the console. | [errors/ErrorHandler.ts:25](https://github.com/humanbydefinition/textmode.js-dev/blob/b5681e0940ee259e7c3e1b7f6452addade1503bd/src/errors/ErrorHandler.ts#L25) |

[textmode.js](../index.md) / TextmodeErrorLevel

# Enumeration: TextmodeErrorLevel

Error handling levels to control how errors are reported and handled.

Determines how validation failures and errors are processed throughout the library.
Each level provides different behavior for error reporting and execution flow control.

## Note

This feature is currently not fully implemented across all modules, 
and most `textmode.js` functions will still throw errors if used incorrectly.

## Example

```javascript
// Set to `WARNING` level to log errors without stopping execution
textmode.setErrorLevel(TextmodeErrorLevel.WARNING);
```

## Enumeration Members

| Enumeration Member | Value | Description |
| ------ | ------ | ------ |
| <a id="error"></a> `ERROR` | `2` | Log validation failures as errors. |
| <a id="silent"></a> `SILENT` | `0` | Suppress all error output. Validation failures are handled silently without any console messages. |
| <a id="throw"></a> `THROW` | `3` | Throw exceptions on validation failures *(default behavior)*. |
| <a id="warning"></a> `WARNING` | `1` | Log validation failures as warnings. |

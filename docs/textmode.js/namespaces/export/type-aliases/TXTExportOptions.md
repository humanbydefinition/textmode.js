[**textmode.js v0.2.0**](../../../../README.md)

***

[textmode.js](../../../../README.md) / [export](../README.md) / TXTExportOptions

# Type Alias: TXTExportOptions

> **TXTExportOptions** = `object`

Options for exporting the textmode content to TXT format.

## Properties

### emptyCharacter?

> `optional` **emptyCharacter**: `string`

Character to use for empty cells *(when no character is rendered)*.
Default is a space `' '`.

***

### filename?

> `optional` **filename**: `string`

The filename to save the TXT file as. 

If not provided, a default filename is used.

***

### lineEnding?

> `optional` **lineEnding**: `"lf"` \| `"crlf"`

The line ending format to use *(`'lf'` for Unix/Linux, `'crlf'` for Windows)*.

Default is `'lf'`.

***

### preserveTrailingSpaces?

> `optional` **preserveTrailingSpaces**: `boolean`

Whether to preserve trailing spaces on each line.

When `false`, trailing spaces are trimmed from each line.

Default is `false`.

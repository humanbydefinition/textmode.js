[**textmode.js v0.1.9**](../../../../README.md)

***

[textmode.js](../../../../README.md) / [export](../README.md) / TXTExportOptions

# Type Alias: TXTExportOptions

> **TXTExportOptions** = `object`

Defined in: [export/txt/types.ts:11](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/export/txt/types.ts#L11)

Options for exporting the textmode content to TXT format.

## Properties

### emptyCharacter?

> `optional` **emptyCharacter**: `string`

Defined in: [export/txt/types.ts:39](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/export/txt/types.ts#L39)

Character to use for empty cells *(when no character is rendered)*.
Default is a space `' '`.

***

### filename?

> `optional` **filename**: `string`

Defined in: [export/txt/types.ts:17](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/export/txt/types.ts#L17)

The filename to save the TXT file as. 

If not provided, a default filename is used.

***

### lineEnding?

> `optional` **lineEnding**: `"lf"` \| `"crlf"`

Defined in: [export/txt/types.ts:33](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/export/txt/types.ts#L33)

The line ending format to use *(`'lf'` for Unix/Linux, `'crlf'` for Windows)*.

Default is `'lf'`.

***

### preserveTrailingSpaces?

> `optional` **preserveTrailingSpaces**: `boolean`

Defined in: [export/txt/types.ts:26](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/export/txt/types.ts#L26)

Whether to preserve trailing spaces on each line.

When `false`, trailing spaces are trimmed from each line.

Default is `false`.

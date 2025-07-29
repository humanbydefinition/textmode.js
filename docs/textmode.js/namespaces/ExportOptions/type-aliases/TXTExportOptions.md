[**textmode.js v0.1.1**](../../../../README.md)

***

[textmode.js](../../../../README.md) / [ExportOptions](../README.md) / TXTExportOptions

# Type Alias: TXTExportOptions

> **TXTExportOptions** = `object`

Defined in: [export/txt/types.ts:8](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/export/txt/types.ts#L8)

Options for exporting the textmode content to TXT format.

## Properties

### emptyCharacter?

> `optional` **emptyCharacter**: `string`

Defined in: [export/txt/types.ts:31](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/export/txt/types.ts#L31)

Character to use for empty cells (when no character is rendered).
Default is a space `' '`.

***

### filename?

> `optional` **filename**: `string`

Defined in: [export/txt/types.ts:12](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/export/txt/types.ts#L12)

The filename to save the TXT file as. If not provided, a default filename is used.

***

### lineEnding?

> `optional` **lineEnding**: `"lf"` \| `"crlf"`

Defined in: [export/txt/types.ts:25](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/export/txt/types.ts#L25)

The line ending format to use (`'lf'` for Unix/Linux, `'crlf'` for Windows).
Default is `'lf'`.

***

### preserveTrailingSpaces?

> `optional` **preserveTrailingSpaces**: `boolean`

Defined in: [export/txt/types.ts:19](https://github.com/humanbydefinition/textmode.js-dev/blob/a65ef74f9f1cec2f9aa76c00793fa738c0824751/src/export/txt/types.ts#L19)

Whether to preserve trailing spaces on each line.
When false, trailing spaces are trimmed from each line.
Default is `false`.

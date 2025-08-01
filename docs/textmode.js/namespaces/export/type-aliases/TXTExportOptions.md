[**textmode.js v0.1.2**](../../../../README.md)

***

[textmode.js](../../../../README.md) / [export](../README.md) / TXTExportOptions

# Type Alias: TXTExportOptions

> **TXTExportOptions** = `object`

Defined in: [export/txt/types.ts:8](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/export/txt/types.ts#L8)

Options for exporting the textmode content to TXT format.

## Properties

### emptyCharacter?

> `optional` **emptyCharacter**: `string`

Defined in: [export/txt/types.ts:36](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/export/txt/types.ts#L36)

Character to use for empty cells *(when no character is rendered)*.
Default is a space `' '`.

***

### filename?

> `optional` **filename**: `string`

Defined in: [export/txt/types.ts:14](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/export/txt/types.ts#L14)

The filename to save the TXT file as. 

If not provided, a default filename is used.

***

### lineEnding?

> `optional` **lineEnding**: `"lf"` \| `"crlf"`

Defined in: [export/txt/types.ts:30](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/export/txt/types.ts#L30)

The line ending format to use *(`'lf'` for Unix/Linux, `'crlf'` for Windows)*.

Default is `'lf'`.

***

### preserveTrailingSpaces?

> `optional` **preserveTrailingSpaces**: `boolean`

Defined in: [export/txt/types.ts:23](https://github.com/humanbydefinition/textmode.js-dev/blob/667e212b07d0571c5d8b15c2a0c3528d79d14b5e/src/export/txt/types.ts#L23)

Whether to preserve trailing spaces on each line.

When `false`, trailing spaces are trimmed from each line.

Default is `false`.

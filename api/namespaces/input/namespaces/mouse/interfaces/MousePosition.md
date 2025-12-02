[textmode.js](../../../../../index.md) / [input](../../../index.md) / [mouse](../index.md) / MousePosition

# Interface: MousePosition

Mouse coordinates in grid space.

Unlike the main drawing logic, where `(0,0,0)` is the center cell,
the mouse coordinates use the top-left cell as `(0,0)`. This means
you'll need to adjust accordingly when using these coordinates
for drawing or other grid operations.

## Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| <a id="x"></a> `x` | `number` | Grid X coordinate (column), -1 if mouse is outside grid |
| <a id="y"></a> `y` | `number` | Grid Y coordinate (row), -1 if mouse is outside grid |

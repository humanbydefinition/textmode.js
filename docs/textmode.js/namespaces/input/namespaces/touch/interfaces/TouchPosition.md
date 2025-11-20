[textmode.js](../../../../../../index.md) / [input](../../../index.md) / [touch](../index.md) / TouchPosition

# Interface: TouchPosition

Touch position expressed both in grid and client coordinates

## Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| <a id="clientx"></a> `clientX` | `number` | Client X coordinate in CSS pixels |
| <a id="clienty"></a> `clientY` | `number` | Client Y coordinate in CSS pixels |
| <a id="id"></a> `id` | `number` | Identifier provided by the browser for a touch point |
| <a id="pressure"></a> `pressure?` | `number` | Touch pressure (0-1) when supported |
| <a id="radiusx"></a> `radiusX?` | `number` | Contact ellipse radius on the X axis in CSS pixels |
| <a id="radiusy"></a> `radiusY?` | `number` | Contact ellipse radius on the Y axis in CSS pixels |
| <a id="rotationangle"></a> `rotationAngle?` | `number` | Contact ellipse angle in radians when provided |
| <a id="x"></a> `x` | `number` | Grid X coordinate (column), -1 if touch is outside grid |
| <a id="y"></a> `y` | `number` | Grid Y coordinate (row), -1 if touch is outside grid |

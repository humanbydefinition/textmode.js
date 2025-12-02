[textmode.js](../../../../../index.md) / [input](../../../index.md) / [mouse](../index.md) / MouseEventData

# Interface: MouseEventData

Mouse event data passed to event handlers

## Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| <a id="button"></a> `button?` | `number` | Mouse button that triggered the event *(for click events)* |
| <a id="delta"></a> `delta?` | `object` | Scroll delta for wheel events |
| `delta.x` | `number` | Scroll delta in X direction |
| `delta.y` | `number` | Scroll delta in Y direction |
| <a id="originalevent"></a> `originalEvent` | `MouseEvent` \| `WheelEvent` | Original DOM event |
| <a id="position"></a> `position` | [`MousePosition`](MousePosition.md) | Current mouse position in grid coordinates |
| <a id="previousposition"></a> `previousPosition` | [`MousePosition`](MousePosition.md) | Previous mouse position in grid coordinates |

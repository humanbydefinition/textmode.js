[textmode.js](../../../../../index.md) / [input](../../../index.md) / [touch](../index.md) / TouchRotateEventData

# Interface: TouchRotateEventData

Rotate gesture event data describing the angle change between the initial and current segment

## Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| <a id="center"></a> `center` | `object` | Centre of the gesture in grid coordinates |
| `center.x` | `number` | Grid X coordinate *(column)* |
| `center.y` | `number` | Grid Y coordinate *(row)* |
| <a id="deltarotation"></a> `deltaRotation` | `number` | Change in rotation since the previous callback |
| <a id="originalevent"></a> `originalEvent` | `TouchEvent` | Original browser event |
| <a id="rotation"></a> `rotation` | `number` | Total rotation in degrees relative to the initial angle |
| <a id="touches"></a> `touches` | \[[`TouchPosition`](TouchPosition.md), [`TouchPosition`](TouchPosition.md)\] | Touch points participating in the rotation, always two entries |

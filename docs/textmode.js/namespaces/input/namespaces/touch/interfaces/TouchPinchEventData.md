[textmode.js](../../../../../../index.md) / [input](../../../index.md) / [touch](../index.md) / TouchPinchEventData

# Interface: TouchPinchEventData

Pinch gesture event data describing the scaling factor between the initial and current distance

## Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| <a id="center"></a> `center` | `object` | Centre of the gesture in grid coordinates |
| `center.x` | `number` | Grid X coordinate *(column)* |
| `center.y` | `number` | Grid Y coordinate *(row)* |
| <a id="deltascale"></a> `deltaScale` | `number` | Scale delta compared to the previous callback |
| <a id="originalevent"></a> `originalEvent` | `TouchEvent` | Original browser event |
| <a id="scale"></a> `scale` | `number` | Scale factor relative to the initial distance *(1 == unchanged)* |
| <a id="touches"></a> `touches` | \[[`TouchPosition`](TouchPosition.md), [`TouchPosition`](TouchPosition.md)\] | Touch points participating in the pinch, always two entries |

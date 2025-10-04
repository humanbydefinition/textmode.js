[**textmode.js v0.4.0**](../../../../../../README.md)

***

[textmode.js](../../../../../../README.md) / [input](../../../README.md) / [touch](../README.md) / TouchSwipeEventData

# Interface: TouchSwipeEventData

Swipe event data reported when the finger travels a minimum distance within a time window

## Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| <a id="direction"></a> `direction` | `object` | Normalised swipe direction vector |
| `direction.x` | `number` | - |
| `direction.y` | `number` | - |
| <a id="distance"></a> `distance` | `number` | Total distance travelled in CSS pixels |
| <a id="originalevent"></a> `originalEvent` | `TouchEvent` | Original browser event |
| <a id="touch"></a> `touch` | [`TouchPosition`](TouchPosition.md) | Touch point at the end of the swipe |
| <a id="velocity"></a> `velocity` | `object` | Velocity in CSS pixels per millisecond |
| `velocity.x` | `number` | Velocity in X direction |
| `velocity.y` | `number` | Velocity in Y direction |

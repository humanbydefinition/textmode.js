[**textmode.js v0.4.0**](../../../../../../README.md)

***

[textmode.js](../../../../../../README.md) / [input](../../../README.md) / [touch](../README.md) / TouchEventData

# Interface: TouchEventData

Touch event data.

## Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| <a id="changedtouches"></a> `changedTouches` | [`TouchPosition`](TouchPosition.md)[] | Touches that changed during this event |
| <a id="deltatime"></a> `deltaTime` | `number` | Milliseconds elapsed since the previous update for this touch |
| <a id="originalevent"></a> `originalEvent` | `TouchEvent` | Original browser event |
| <a id="previoustouch"></a> `previousTouch?` | [`TouchPosition`](TouchPosition.md) | The previous position for this touch if available |
| <a id="previoustouches"></a> `previousTouches` | [`TouchPosition`](TouchPosition.md)[] | Active touches snapshot before this event |
| <a id="touch"></a> `touch` | [`TouchPosition`](TouchPosition.md) | The touch point that triggered this event |
| <a id="touches"></a> `touches` | [`TouchPosition`](TouchPosition.md)[] | All active touches mapped to grid coordinates |

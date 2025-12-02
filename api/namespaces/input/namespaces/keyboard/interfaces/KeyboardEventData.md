[textmode.js](../../../../../index.md) / [input](../../../index.md) / [keyboard](../index.md) / KeyboardEventData

# Interface: KeyboardEventData

Key event data passed to event handlers

## Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| <a id="altkey"></a> `altKey` | `boolean` | Whether Alt key is held down |
| <a id="ctrlkey"></a> `ctrlKey` | `boolean` | Whether Ctrl key is held down |
| <a id="ispressed"></a> `isPressed` | `boolean` | Whether this key is currently being held down (for keyPressed) or was released (for keyReleased) |
| <a id="key"></a> `key` | `string` | The key that was pressed/released (e.g., 'a', 'Enter', 'ArrowLeft') |
| <a id="keycode"></a> `keyCode` | `number` | The key code (for compatibility) |
| <a id="metakey"></a> `metaKey` | `boolean` | Whether Meta key (Windows/Cmd) is held down |
| <a id="originalevent"></a> `originalEvent` | `KeyboardEvent` | Original DOM keyboard event |
| <a id="shiftkey"></a> `shiftKey` | `boolean` | Whether Shift key is held down |

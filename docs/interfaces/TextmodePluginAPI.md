[**textmode.js v0.4.0**](../README.md)

***

[textmode.js](../README.md) / TextmodePluginAPI

# Interface: TextmodePluginAPI

An extended API provided to plugins when they are installed on a [Textmodifier](../classes/Textmodifier.md) instance.

## Extends

- `TextmodePluginContext`

## Properties

| Property | Type | Description | Inherited from |
| ------ | ------ | ------ | ------ |
| <a id="asciiframebuffer"></a> `asciiFramebuffer` | [`TextmodeFramebuffer`](../classes/TextmodeFramebuffer.md) | The framebuffer containing the ASCII representation. | `TextmodePluginContext.asciiFramebuffer` |
| <a id="canvas"></a> `canvas` | `TextmodeCanvas` | The canvas used by the Textmodifier instance. | `TextmodePluginContext.canvas` |
| <a id="drawframebuffer"></a> `drawFramebuffer` | [`TextmodeFramebuffer`](../classes/TextmodeFramebuffer.md) | The framebuffer the user draws to. | `TextmodePluginContext.drawFramebuffer` |
| <a id="font"></a> `font` | [`TextmodeFont`](../classes/TextmodeFont.md) | The font used by the Textmodifier instance. | `TextmodePluginContext.font` |
| <a id="grid"></a> `grid` | [`TextmodeGrid`](../classes/TextmodeGrid.md) | The grid used by the Textmodifier instance. | `TextmodePluginContext.grid` |
| <a id="renderer"></a> `renderer` | `GLRenderer` | The WebGL renderer used by the Textmodifier instance. | `TextmodePluginContext.renderer` |

## Methods

### flushDrawCommands()

> **flushDrawCommands**(): `void`

Immediately execute any pending draw commands.

#### Returns

`void`

#### Inherited from

`TextmodePluginContext.flushDrawCommands`

***

### registerPostDrawHook()

> **registerPostDrawHook**(`callback`): () => `void`

Register a callback to be invoked after each draw cycle. Happens outside of the draw framebuffer being bound.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `callback` | () => `void` |

#### Returns

> (): `void`

##### Returns

`void`

***

### registerPreDrawHook()

> **registerPreDrawHook**(`callback`): () => `void`

Register a callback to be invoked before each draw cycle. Happens outside of the draw framebuffer being bound.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `callback` | () => `void` |

#### Returns

> (): `void`

##### Returns

`void`

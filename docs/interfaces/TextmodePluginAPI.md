[textmode.js](../index.md) / TextmodePluginAPI

# Interface: TextmodePluginAPI

An extended API provided to plugins when they are installed on a [Textmodifier](../classes/Textmodifier.md) instance.

## Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| <a id="asciiframebuffer"></a> `asciiFramebuffer` | [`TextmodeFramebuffer`](../classes/TextmodeFramebuffer.md) | The framebuffer containing the ASCII representation.<br/> This framebuffer only has a single render target. |
| <a id="canvas"></a> `canvas` | `TextmodeCanvas` | The canvas used by the Textmodifier instance. |
| <a id="drawframebuffer"></a> `drawFramebuffer` | [`TextmodeFramebuffer`](../classes/TextmodeFramebuffer.md) | The framebuffer the user draws to with 3 render targets. |
| <a id="font"></a> `font` | [`TextmodeFont`](../textmode.js/namespaces/loadables/classes/TextmodeFont.md) | The font used by the Textmodifier instance. |
| <a id="grid"></a> `grid` | [`TextmodeGrid`](../classes/TextmodeGrid.md) | The grid used by the Textmodifier instance. |
| <a id="renderer"></a> `renderer` | `GLRenderer` | The WebGL renderer used by the Textmodifier instance. |

## Methods

### registerPostDrawHook()

```ts
registerPostDrawHook(callback): () => void;
```

Register a callback to be invoked after each draw cycle. Happens outside of the draw framebuffer being bound after the final result is drawn to the screen.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `callback` | () => `void` |

#### Returns

```ts
(): void;
```

##### Returns

`void`

***

### registerPreDrawHook()

```ts
registerPreDrawHook(callback): () => void;
```

Register a callback to be invoked before each draw cycle. Happens just before the draw framebuffer is being bound.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `callback` | () => `void` |

#### Returns

```ts
(): void;
```

##### Returns

`void`

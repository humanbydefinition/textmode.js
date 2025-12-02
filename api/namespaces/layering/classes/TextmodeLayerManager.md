[textmode.js](../../../index.md) / [layering](../index.md) / TextmodeLayerManager

# Class: TextmodeLayerManager

Manages all user-defined layers within a Textmodifier instance.

This manager is responsible for:
- Managing the collection of user layers (add, remove, move, swap)
- Coordinating layer rendering and compositing

The instance of this class can be accessed via [Textmodifier.layers](../../../classes/Textmodifier.md#layers).

The [base](#base) layer is not part of the public layer stack, but is instead managed internally.

## Implements

- `ILayerManager`

## Accessors

### all

#### Get Signature

```ts
get all(): readonly TextmodeLayer[];
```

Get all user layers as a readonly array.

##### Returns

readonly [`TextmodeLayer`](TextmodeLayer.md)[]

#### Implementation of

```ts
ILayerManager.all
```

***

### base

#### Get Signature

```ts
get base(): TextmodeLayer;
```

The base layer that is always rendered at the bottom of the layer stack.
This layer represents the main drawing content before any user layers are composited.

##### Returns

[`TextmodeLayer`](TextmodeLayer.md)

#### Implementation of

```ts
ILayerManager.base
```

## Methods

### add()

```ts
add(options): TextmodeLayer;
```

Add a new layer to the manager.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`TextmodeLayerOptions`](../interfaces/TextmodeLayerOptions.md) | Layer configuration options. |

#### Returns

[`TextmodeLayer`](TextmodeLayer.md)

The newly added layer.

#### Implementation of

```ts
ILayerManager.add
```

***

### move()

```ts
move(layer, newIndex): void;
```

Move a layer to a new index in the layer stack.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `layer` | [`TextmodeLayer`](TextmodeLayer.md) | The layer to move. |
| `newIndex` | `number` | The new index for the layer. |

#### Returns

`void`

#### Implementation of

```ts
ILayerManager.move
```

***

### remove()

```ts
remove(layer): void;
```

Remove a layer from the manager.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `layer` | [`TextmodeLayer`](TextmodeLayer.md) | The layer to remove. |

#### Returns

`void`

#### Implementation of

```ts
ILayerManager.remove
```

***

### swap()

```ts
swap(layerA, layerB): void;
```

Swap the order of two layers if they exist in the same collection.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `layerA` | [`TextmodeLayer`](TextmodeLayer.md) | The first layer to swap. |
| `layerB` | [`TextmodeLayer`](TextmodeLayer.md) | The second layer to swap. |

#### Returns

`void`

#### Implementation of

```ts
ILayerManager.swap
```

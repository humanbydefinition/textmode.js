[textmode.js](../../../index.md) / [filters](../index.md) / TextmodeFilterManager

# Class: TextmodeFilterManager

Manages filter registration, shader compilation, and filter chain application.

This class provides:
- A registry for custom and built-in filter strategies
- Lazy shader compilation and caching
- Ping-pong rendering for efficient multi-filter chains

Used both for layer-level filters and global post-processing filters.

## Example

```typescript
// Register a custom filter
await t.filters.register('brightness', brightnessShader, {
    u_amount: ['amount', 1.0]
});

// Use the filter globally
t.filter('brightness', 1.5);

// Or on a layer
t.layers.base.filter('brightness', { amount: 0.8 });
```

## Methods

### has()

```ts
has(id): boolean;
```

Check if a filter with the given ID is registered.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id` | `string` | The filter ID to check |

#### Returns

`boolean`

true if the filter exists

***

### register()

```ts
register(
   id, 
   shader, 
uniformDefs): Promise<void>;
```

Register a custom filter with the given ID, shader, and uniform definitions.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id` | `string` | Unique filter identifier |
| `shader` | `string` \| `GLShader` | Pre-compiled GLShader, fragment shader source string, or path to a .frag/.glsl file |
| `uniformDefs` | `Record`\<`string`, \[`string`, `unknown`\]\> | Maps uniform names to [paramName, defaultValue] tuples |

#### Returns

`Promise`\<`void`\>

#### Example

```typescript
// Register with inline shader source
await t.filters.register('blur', blurFragSource, {
    u_radius: ['radius', 5.0],
    u_direction: ['direction', [1.0, 0.0]]
});

// Register with file path
await t.filters.register('vignette', './vignette.frag', {
    u_intensity: ['intensity', 0.5]
});

// Register with pre-compiled shader
const shader = await t.createShader(vertSrc, fragSrc);
await t.filters.register('custom', shader, {});
```

***

### unregister()

```ts
unregister(id): boolean;
```

Unregister a filter by its ID.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id` | `string` | The filter ID to unregister |

#### Returns

`boolean`

true if the filter was unregistered, false if it wasn't found

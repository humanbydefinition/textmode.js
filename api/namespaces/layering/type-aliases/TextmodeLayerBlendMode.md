[textmode.js](../../../index.md) / [layering](../index.md) / TextmodeLayerBlendMode

# Type Alias: TextmodeLayerBlendMode

```ts
type TextmodeLayerBlendMode = 
  | "normal"
  | "additive"
  | "multiply"
  | "screen"
  | "subtract"
  | "darken"
  | "lighten"
  | "overlay"
  | "softLight"
  | "hardLight"
  | "colorDodge"
  | "colorBurn"
  | "difference"
  | "exclusion";
```

Blend modes available for [TextmodeLayer](../classes/TextmodeLayer.md) compositing in 2D mode.

- `'normal'`: Standard alpha compositing. Opaque layer pixels fully replace the base; translucent pixels fade in.
- `'additive'`: Layer color is added on top of the base. Great for glow/energy effects but will clip as values approach white.
- `'multiply'`: `result = layer * base`. Darkens wherever both layers have color; any channel multiplied by 0 becomes 0.
- `'screen'`: Inverse of multiply. `result = 1 - (1 - layer) * (1 - base)`. Preserves highlights while lightening midtones.
- `'subtract'`: `result = base - layer`. Useful for cutting out or darkening effects.
- `'darken'`: Takes the minimum of layer and base per channel. Only darkens; never lightens.
- `'lighten'`: Takes the maximum of layer and base per channel. Only lightens; never darkens.
- `'overlay'`: Combines multiply and screen. Darkens darks and lightens lights, increasing contrast.
- `'softLight'`: Softer version of overlay. Subtle contrast enhancement.
- `'hardLight'`: Like overlay but more intense. Uses blend color to determine multiply/screen.
- `'colorDodge'`: Brightens the base by the blend color. Creates intense highlights.
- `'colorBurn'`: Darkens the base by the blend color. Creates deep shadows.
- `'difference'`: `result = |base - blend|`. Creates inverted/solarized effects.
- `'exclusion'`: Softer version of difference. `result = base + blend - 2 * base * blend`.

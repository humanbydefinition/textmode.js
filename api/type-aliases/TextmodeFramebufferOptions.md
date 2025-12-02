[textmode.js](../index.md) / TextmodeFramebufferOptions

# Type Alias: TextmodeFramebufferOptions

```ts
type TextmodeFramebufferOptions = object;
```

Options for creating a framebuffer. If not specified, width and height default to the current textmode grid size.

## Properties

### attachments?

```ts
optional attachments: number;
```

Number of color attachments *(1-8)* 

Defaults to 3 for textmode framebuffers *(character/transform data, primary color, secondary color)*. 
You probably do not want to go below 3 for textmode rendering, otherwise rendering will not function correctly.

Going above 3 is only recommended for advanced use cases involving custom shaders that utilize additional attachments.

***

### height?

```ts
optional height: number;
```

Height of the framebuffer in grid cells

***

### width?

```ts
optional width: number;
```

Width of the framebuffer in grid cells

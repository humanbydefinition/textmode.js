# textmode.js (✿◠‿◠)

<div align="center">

<img alt="textmodejs_banner" src="https://github.com/user-attachments/assets/f03c2d74-7dc3-45cf-a0a5-043f9438231e" />


| [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![WebGL](https://img.shields.io/badge/WebGL1-990000?logo=webgl&logoColor=white)](https://www.khronos.org/webgl/) [![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/) | [![docs](https://img.shields.io/badge/docs-vitepress-646cff?logo=vitepress&logoColor=white)](https://code.textmode.art/) [![Discord](https://img.shields.io/discord/1357070706181017691?color=5865F2&label=Discord&logo=discord&logoColor=white)](https://discord.gg/sjrw8QXNks) | [![ko-fi](https://shields.io/badge/ko--fi-donate-ff5f5f?logo=ko-fi)](https://ko-fi.com/V7V8JG2FY) [![Github-sponsors](https://img.shields.io/badge/sponsor-30363D?logo=GitHub-Sponsors&logoColor=#EA4AAA)](https://github.com/sponsors/humanbydefinition) |
|:-------------|:-------------|:-------------|

</div>

`textmode.js` is a free, lightweight and framework-agnostic creative coding library for real-time ASCII art and textmode experiences in web browsers.

Transform any `<canvas>` or `<video>` element into dynamic ASCII representations with blazing-fast WebGL rendering. Whether you're using p5.js, three.js, or vanilla JavaScript, textmode.js seamlessly integrates with your existing projects to create interactive textmode games, live visual performances, and artistic installations.

For standalone projects, textmode.js provides its own p5.js-inspired drawing API, letting you create compelling ASCII experiences without additional dependencies. The library powers live coding performances, interactive installations, and digital art projects worldwide, bringing the nostalgic aesthetic of textmode art into modern web development.

## Features
- **Dependency-free**: No external libraries required, making it lightweight and easy to integrate into any project.
- **TTF/OTF font support**: Load and use TrueType and OpenType fonts for rendering textmode art, allowing for a wide range of styles and characters.
- **Framework-agnostic**: Use `textmode.js` with any JavaScript framework or library, such as `p5.js`, `three.js`, or even vanilla JavaScript.
- **Standalone drawing API**: Use the built-in `p5.js`-like drawing API for creating textmode art without any other dependencies.
- **Injectable**: Easily inject `textmode.js` into websites like YouTube to convert `<video>` or `<canvas>` elements into textmode representations for a unique viewing experience.
- **WebGL1/WebGL2 support**: All shader code provided by `textmode.js` is written in `GLSL ES 1.0`, making it compatible with both `WebGL1` and `WebGL2` contexts, allowing for a wide range of devices to run your ASCII projects.
- **Exporting**: Export your creations to various image formats, and as `.txt`, `.svg` and `.json` files for easy sharing, printing and plotting.
- **Typescript support**: Fully typed library with TypeScript definitions, making it easy to integrate into TypeScript projects and ensuring type safety.

## Installation

### Prerequisites

To get started with `textmode.js`, you'll need:
- A **modern web browser** with `WebGL` support
- A `<canvas>` or `<video>` element in your project *(optional, for capturing content from a different source)*
- **Node.js 16+** and `npm` *(optional, for ESM installation)*

### Importing `textmode.js`

`textmode.js` is available in multiple bundle variants to suit different project needs:

| Bundle type | File size | Font included? | Best for |
|-------------|-----------|---------------|----------|
| **Standard UMD** (`textmode.umd.js`) | ~117kB | ✅ [UrsaFont](https://ursafrank.itch.io/ursafont) embedded | Quick setup, prototyping |
| **Standard ESM** (`textmode.esm.js`) | ~183kB | ✅ [UrsaFont](https://ursafrank.itch.io/ursafont) embedded | Quick setup, prototyping |
| **Minified UMD** (`textmode.umd.min.js`) | ~71kB | ❌ Requires external font | Production apps, custom fonts |
| **Minified ESM** (`textmode.esm.min.js`) | ~136kB | ❌ Requires external font | Production apps, custom fonts |

**Choose Standard bundles for:**
- The simplest setup with no additional configuration
- Everything embedded and ready to use
- Getting started without worrying about fonts

**Choose Minified bundles for:**
- Bundle size optimization *(25-40% smaller)*
- Custom fonts instead of the default
- Production applications requiring maximum performance

#### UMD

To use `textmode.js` in a UMD environment, download the latest `umd` build from the [**GitHub releases page**](https://github.com/humanbydefinition/textmode.js/releases/) or import it directly from a CDN like [**jsDelivr**](https://www.jsdelivr.com/package/npm/textmode.js). The library is distributed as a single JavaScript file, which you can include in your project by adding the following script tag to your HTML file:

```html
<!DOCTYPE html>
<html>
<head>
    <title>textmode.js example</title>

    <!-- Standard bundle (with embedded UrsaFont) -->
    <script src="https://cdn.jsdelivr.net/npm/textmode.js@latest/dist/textmode.umd.js"></script>
    
    <!-- OR Minified bundle (requires external font) -->
    <!-- <script src="https://cdn.jsdelivr.net/npm/textmode.js@latest/dist/textmode.umd.min.js"></script> -->
</head>
<body>
    <canvas id="myCanvas" width="800" height="600"></canvas>
    <script>
        (async () => {
            // Reference your existing canvas element
            const canvas = document.querySelector('canvas#myCanvas');

            // Standard bundle - no font configuration needed
            const textmodifier = await textmode.create(canvas);
            
            // Minified bundle - font required
            // const textmodifier = await textmode.create(canvas, {
            //     fontSource: './path/to/your/font.ttf'
            // });
        })();
    </script>
</body>
</html>
```

#### ESM

To use `textmode.js` in an ESM environment, you can install it via `npm`:

```bash
npm install textmode.js
```

Then, you can import it in your JavaScript or TypeScript files:

```javascript
// Standard bundle (with embedded UrsaFont)
import { textmode } from 'textmode.js';

// OR Minified bundle (requires external font)
// import { textmode } from 'textmode.js/min';

(async () => {
    // Canvas example
    const canvas = document.querySelector('canvas#myCanvas');
    
    // Standard bundle - no font configuration needed
    const textmodifier = await textmode.create(canvas);
    
    // Minified bundle - font required
    // const textmodifier = await textmode.create(canvas, {
    //     fontSource: './path/to/your/font.ttf'
    // });
})();
```

### Next steps

Now that you have `textmode.js` set up, you can start creating your ASCII art projects! Check out the [**API documentation**](/api/) for detailed information on how to use the library, including examples and advanced features.

## Learn more

### 📚 [Visit the Official Documentation](https://code.textmode.art/)

Explore the comprehensive documentation at [code.textmode.art](https://code.textmode.art/) for:
- Detailed guides
- Interactive examples
- Complete API reference
- Tips and tricks
- ... and much more!

The documentation will help you unlock the full potential of `textmode.js` in your creative coding projects.

## Acknowledgements

`textmode.js` uses a custom-made minified version of [`Typr.js`](https://github.com/photopea/Typr.js) by [**Photopea**](https://github.com/photopea) for font loading and parsing, containing only the necessary components for our use case. `Typr.js` is licensed under the [**MIT License**](https://github.com/photopea/Typr.js/blob/main/LICENSE).

The non-minified version of `textmode.js` ships with [`UrsaFont`](https://ursafrank.itch.io/ursafont) as the default font, created by [**UrsaFrank**](https://ursafrank.itch.io/). This font is available under the [**CC0 (Creative Commons Zero) license**](https://creativecommons.org/publicdomain/zero/1.0/).


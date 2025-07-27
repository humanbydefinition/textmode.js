# textmode.js (✿◠‿◠)

<div align="center">

<img width="1584" height="768" alt="textmodejs_banner" src="https://github.com/user-attachments/assets/f03c2d74-7dc3-45cf-a0a5-043f9438231e" />


| [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![WebGL](https://img.shields.io/badge/WebGL1-990000?logo=webgl&logoColor=white)](https://www.khronos.org/webgl/) [![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/) | [![docs](https://img.shields.io/badge/docs-vitepress-646cff?logo=vitepress&logoColor=white)](https://code.textmode.art/) [![Discord](https://img.shields.io/discord/1357070706181017691?color=5865F2&label=Discord&logo=discord&logoColor=white)](https://discord.gg/sjrw8QXNks) | [![ko-fi](https://shields.io/badge/ko--fi-donate-ff5f5f?logo=ko-fi)](https://ko-fi.com/V7V8JG2FY) [![Github-sponsors](https://img.shields.io/badge/sponsor-30363D?logo=GitHub-Sponsors&logoColor=#EA4AAA)](https://github.com/sponsors/humanbydefinition) |
|:-------------|:-------------|:-------------|

</div>

`textmode.js` is a powerful TypeScript library, designed to transform *any* HTML canvas into dynamic ASCII representations in real-time. With `textmode.js`, you can create intricate ASCII art, textmode games, interactive ASCII experiences, and much more in the web browser with ease.

`textmode.js` and it's predecessor `p5.asciify` are used in live coding performances, installations, interactive art projects and more, allowing artists and developers to explore the unique aesthetic of ASCII art in a modern context. The library is designed to be flexible, efficient, and easy to use, offering a comprehensive range of tools to help you develop unique and engaging ASCII projects.

## Features

- **Renderer management**: Create and manage multiple textmode converters with different settings to create a unique rendering pipeline.
- **Pre-built renderers**: Add pre-built converters, like `'brightness'`-based ones, to your pipeline.
- **Custom renderers**: Add your own custom textmode converter to the pipeline through code to create unique effects by controlling each cell's ASCII character, character color, background color, and more individually.
- **Textmodifier management**: Create and manage multiple textmodifiers to apply textmode conversion onto multiple canvases in parallel.
- **Font management**: Set the font and font size for all ASCII renderers in the pipeline of a textmodifier.
- **Grid management**: Apply a perfect and responsive grid based on the canvas dimensions, font size, and font metrics, or create a custom grid with a specific number of columns and rows.
- **WebGL1/WebGL2 support**: All shader code provided by `textmode.js` is written in `GLSL ES 1.0`, making it compatible with both `WebGL1` and `WebGL2` contexts, allowing for a wide range of devices to run your ASCII projects.
- **Export functionality**: Export your ASCII art as `.txt`, `.svg` and `.json` files for easy sharing, printing and plotting.

## Installation

### Prerequisites

To get started with `textmode.js`, you'll need:
- A **modern web browser** with `WebGL` support
- **Node.js 16+** and `npm` *(optional, for ESM installation)*
- A **HTML canvas element** in your project to apply textmode conversion to

### Importing `textmode.js`

#### UMD

To use `textmode.js` in a UMD environment, download the latest `umd` build from the [**GitHub releases page**](https://github.com/humanbydefinition/textmode.js/releases/) or import it directly from a CDN like [**jsDelivr**](https://www.jsdelivr.com/package/npm/textmode.js). The library is distributed as a single JavaScript file, which you can include in your project by adding the following script tag to your HTML file:

```html
<!DOCTYPE html>
<html>
<head>
    <title>textmode.js example</title>

    <!-- Import textmode.js from jsDelivr CDN -->
    <script src="https://cdn.jsdelivr.net/npm/textmode.js@latest/dist/textmode.umd.js"></script>
</head>
<body>
    <canvas id="myCanvas" width="800" height="600"></canvas>
    <script>
        (async () => {
            // Reference your existing canvas element
            const canvas = document.querySelector('canvas#myCanvas');

            if (!canvas) {
                throw new Error('Canvas element not found');
            }

            // Create a `textmodifier` instance to apply textmode conversion to a given canvas
            const textmodifier = await textmode.create(canvas);
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
import { textmode } from 'textmode.js';

(async () => {
    // Reference your existing canvas element
    const canvas = document.querySelector('canvas#myCanvas');

    if (!canvas) {
        throw new Error('Canvas element not found');
    }

    // Create a `textmodifier` instance to apply textmode conversion to a given canvas
    const textmodifier = await textmode.create(canvas);
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
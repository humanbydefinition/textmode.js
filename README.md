# textmode.js (✿◠‿◠)

<div align="center">

<img alt="textmodejs_banner" src="https://github.com/user-attachments/assets/f03c2d74-7dc3-45cf-a0a5-043f9438231e" />

| [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![WebGL](https://img.shields.io/badge/WebGL2-990000?logo=webgl&logoColor=white)](https://www.khronos.org/webgl/) [![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/) | [![docs](https://img.shields.io/badge/docs-vitepress-646cff?logo=vitepress&logoColor=white)](https://code.textmode.art/) [![Discord](https://img.shields.io/discord/1357070706181017691?color=5865F2&label=Discord&logo=discord&logoColor=white)](https://discord.gg/sjrw8QXNks) | [![ko-fi](https://shields.io/badge/ko--fi-donate-ff5f5f?logo=ko-fi)](https://ko-fi.com/V7V8JG2FY) [![GitHub-sponsors](https://img.shields.io/badge/sponsor-30363D?logo=GitHub-Sponsors&logoColor=#EA4AAA)](https://github.com/sponsors/humanbydefinition) |
|:-------------|:-------------|:-------------|

</div>

textmode.js is a free, lightweight, and framework-agnostic creative-coding library for real‑time ASCII and textmode graphics in the browser. It combines a grid‑based API with a modern [`WebGL2`](https://developer.mozilla.org/en-US/docs/Web/API/WebGL2RenderingContext) pipeline, multiple render targets, and aggressive instanced rendering to deliver smooth, high‑performance rendering.

The library is designed to be easy to use and accessible to developers of all skill levels. Whether you're a seasoned developer or just starting out, `textmode.js` provides a simple and intuitive API that makes it easy to create stunning textmode art and animations.

## Features

- Real‑time* ASCII/textmode rendering with a simple drawing API
- Font system with runtime font loading and dynamic sizing *(supports TTF/OTF/WOFF)*
- Dynamic layering system with blend modes and opacity for multi‑layered textmode scenes
- Filter system with built-in filters and support for custom filter shaders
- Load images and videos as sources and render them in customizable textmode styles
- Author custom filter shaders in [`GLSL ES 3.00`](https://registry.khronos.org/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf) for advanced effects
- Flexible exporting: TXT, SVG, raster images *(PNG/JPG/WebP)*, animated GIFs, and video *(WebM)* via [`textmode.export.js`](https://github.com/humanbydefinition/textmode.export.js)
- Animation loop control: `frameRate`, `loop`/`noLoop`, `redraw`, `frameCount`, etc.
- Framework-agnostic: Use `textmode.js` with any canvas-based framework or library
- Zero dependencies, written in TypeScript, with comprehensive type definitions

> [!NOTE]
> *Performance depends on the complexity of your scene and device capabilities. Consider authoring filter shaders for complex effects at low cost.

## Try it online first

Before installing anything locally, you can try `textmode.js` directly in your browser using our dedicated web editor:

🌐 **[editor.textmode.art](https://editor.textmode.art)**

The web editor is specifically designed for `textmode.js` and provides:

- **Zero setup required** - Start coding immediately
- **Live preview** - See your creations in real-time  
- **Save & share** - Export your sketches and share with others
- **Built-in examples** - Learn from interactive examples
- **Full API access** - All `textmode.js` features available

The web editor is perfect for learning, prototyping, or creating quick experiments without any local setup!

## Installation

### Prerequisites

To get started with `textmode.js`, you'll need:

- A **modern web browser** with `WebGL2` support *(Chrome, Firefox, Safari, Edge, etc.)*
- A [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas) in your project *(optional, otherwise the library will create one for you)*
- [Node.js 20.8.1+](https://nodejs.org/) and `npm` *(optional, for ESM installation)*

> [!IMPORTANT]
> `textmode.js` is currently fully dependent on `WebGL2`. Ensure your target browsers support it. You can check compatibility on [caniuse.com](https://caniuse.com/webgl2).

### Importing `textmode.js`

#### UMD

To use `textmode.js` in a UMD environment, download the latest `umd` build from the [**GitHub releases page**](https://github.com/humanbydefinition/textmode.js/releases/) or import it directly from a CDN like [**jsDelivr**](https://www.jsdelivr.com/package/npm/textmode.js). The library is distributed as a single JavaScript file, which you can include in your project by adding the following script tag to your HTML file:

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
<head>
    <title>textmode.js sketch</title>

    <script src="https://cdn.jsdelivr.net/npm/textmode.js@latest/dist/textmode.umd.js"></script>
</head>
<body>
    <script src="sketch.js"></script>
</body>
</html>
```

```javascript
// sketch.js
const t = textmode.create({
    width: window.innerWidth,
    height: window.innerHeight,
    fontSize: 16,
    frameRate: 60
});

t.setup(() => {
    // Optional setup code here (e.g., load fonts/shaders, initialize variables that access 't')
});

t.draw(() => {
    t.background(32); // Dark gray background

    t.char('A');

    // Set drawing color to red
    t.charColor(255, 0, 0);

    // Draw a rectangle of 'A's in the top-left quarter
    t.translate(-t.grid.cols / 4, -t.grid.rows / 4);
    t.rect(t.grid.cols / 2, t.grid.rows / 2);

    // ...add your drawing code here!
});

t.windowResized(() => {
    t.resizeCanvas(window.innerWidth, window.innerHeight);
});
```

#### ESM

To use `textmode.js` in an ESM environment, you can install it via `npm`:

```bash
npm install textmode.js
```

Then, you can import it in your JavaScript or TypeScript files:

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>textmode.js sketch</title>
</head>
<body>
    <script type="module" src="./sketch.js"></script>
</body>
</html>
```

```javascript
// sketch.js
import { textmode } from 'textmode.js';

const t = textmode.create({
    width: window.innerWidth,
    height: window.innerHeight,
    fontSize: 16,
    frameRate: 60
});

t.setup(() => {
    // Optional setup code here (e.g., load fonts/shaders, initialize variables that access 't')
});

t.draw(() => {
    t.background(32); // Dark gray background

    t.char('A');

    // Set drawing color to red
    t.charColor(255, 0, 0);

    // Draw a rectangle of 'A's in the top-left quarter
    t.translate(-t.grid.cols / 4, -t.grid.rows / 4);
    t.rect(t.grid.cols / 2, t.grid.rows / 2);

    // ...add your drawing code here!
});

t.windowResized(() => {
    t.resizeCanvas(window.innerWidth, window.innerHeight);
});
```

## Next steps

Now that you have `textmode.js` set up, you can start creating your textmode art projects! Going forward, here are some resources to help you get the most out of the library:

**[Visit the Official Documentation](https://code.textmode.art/)** for detailed guides, interactive examples, complete API reference, tips and tricks, and much more to unlock the full potential of `textmode.js` in your creative coding projects.

**[Try the Web Editor](https://editor.textmode.art)** to experiment with `textmode.js` without setting up a local environment.

## Contributors

Thanks go to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/humanbydefinition"><img src="https://avatars.githubusercontent.com/u/59119064?v=4?s=100" width="100px;" alt="humanbydefinition"/><br /><sub><b>humanbydefinition</b></sub></a><br /><a href="https://github.com/humanbydefinition/textmode.js/commits?author=humanbydefinition" title="Code">💻</a> <a href="https://github.com/humanbydefinition/textmode.js/commits?author=humanbydefinition" title="Documentation">📖</a> <a href="#design-humanbydefinition" title="Design">🎨</a> <a href="#example-humanbydefinition" title="Examples">💡</a> <a href="#ideas-humanbydefinition" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-humanbydefinition" title="Maintenance">🚧</a> <a href="#infra-humanbydefinition" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#tool-humanbydefinition" title="Tools">🔧</a> <a href="#plugin-humanbydefinition" title="Plugin/utility libraries">🔌</a> <a href="https://github.com/humanbydefinition/textmode.js/pulls?q=is%3Apr+reviewed-by%3Ahumanbydefinition" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/trintlermint"><img src="https://www.github.com/trintlermint.png?s=100" width="100px;" alt="trintlermint"/><br /><sub><b>trintlermint</b></sub></a><br /><a href="#design-trintlermint" title="Design">🎨</a> <a href="#example-trintlermint" title="Examples">💡</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://allcontributors.org) specification.
Contributions of any kind are welcome.
Maintainers can update this section with `npm run contributors:add -- <github-username> <contribution[,contribution]>`
and `npm run contributors:generate`.

## License

`textmode.js` is licensed under the [GNU Lesser General Public License v2.1](./LICENSE).

Third-party license attributions are listed in [`THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md).

## Acknowledgements

`textmode.js` uses a custom-made TypeScript rewrite and minified version of [`Typr.js`](https://github.com/photopea/Typr.js) by [**Photopea**](https://github.com/photopea) for font loading and parsing, containing only the necessary components for our use case. `Typr.js` is licensed under the [**MIT License**](https://github.com/photopea/Typr.js/blob/main/LICENSE).

`textmode.js` ships with [`UrsaFont`](https://ursafrank.itch.io/ursafont) as the default font, created by [**UrsaFrank**](https://ursafrank.itch.io/). This font is available under the [**CC0 (Creative Commons Zero) license**](https://creativecommons.org/publicdomain/zero/1.0/).

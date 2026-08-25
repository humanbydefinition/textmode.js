# textmode.js

<div align="center">

<img alt="textmode.js — create textmode in your browser" src=".github/assets/readme-og.png" />

| [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/) [![WebGL2](https://img.shields.io/badge/WebGL2-990000?logo=webgl&logoColor=white)](https://www.khronos.org/webgl/) | [![API](https://img.shields.io/badge/API-typedoc-3178c6?logo=typescript&logoColor=white)](https://code.textmode.art/api/textmode.js/) [![docs](https://img.shields.io/badge/docs-vitepress-646cff?logo=vitepress&logoColor=white)](https://code.textmode.art/) | [![ko-fi](https://shields.io/badge/ko--fi-donate-ff5f5f?logo=ko-fi)](https://ko-fi.com/V7V8JG2FY) [![GitHub-sponsors](https://img.shields.io/badge/sponsor-30363D?logo=GitHub-Sponsors&logoColor=#EA4AAA)](https://github.com/sponsors/humanbydefinition) |
|:---|:---|:---|

</div>

textmode.js is a free, lightweight, and framework-agnostic creative-coding library for real‑time ASCII and textmode graphics in the browser. It combines a grid‑based API with a modern [`WebGL2`](https://developer.mozilla.org/en-US/docs/Web/API/WebGL2RenderingContext) pipeline, multiple render targets, and aggressive instanced rendering to deliver smooth, high‑performance rendering.

The library is designed to be easy to use and accessible to developers of all skill levels. Whether you're a seasoned developer or just starting out, `textmode.js` provides a simple and intuitive API that makes it easy to create stunning textmode art and animations.

## Features

- **Real-time creative drawing** - Grid-based WebGL2 rendering for characters, colors, text, glyph ramps, and 2D/3D primitives
- **Fonts and tilesets** - Runtime TTF/OTF/WOFF loading, bitmap tilesets, dynamic sizing, and reusable glyph atlases
- **Layers and compositing** - Independent grids, fonts, transforms, visibility, opacity, and blend modes per layer
- **Media conversion** - Images, videos, and live textures converted into configurable glyph and color data
- **Programmable GLSL rendering** - Push beyond the drawing API with custom [`GLSL ES 3.00`](https://registry.khronos.org/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf) materials, user-defined uniforms, textures, and offscreen framebuffers
- **Animation and generative tools** - Loop and timing controls, deterministic randomness, noise, vectors, math, and easing
- **Interaction and responsive rendering** - Built-in mouse, keyboard, touch, gamepad, resize, and HiDPI support
- **Plugins and framework integration** - Typed lifecycle hooks and layer/source extension points

> [!NOTE]
> *Performance depends on the complexity of your scene and device capabilities.

## Try it online first

Open [editor.textmode.art](https://editor.textmode.art/), a browser-based live-coding environment for the
complete official `textmode.js` ecosystem. Sketches run as you edit, with no local toolchain required.

The editor includes `textmode.js` and all four official add-ons: `textmode.export.js`, `textmode.filters.js`,
`textmode.figlet.js`, and `textmode.synth.js`.

- Write with Monaco-powered completions, hover documentation, and diagnostics.
- Start with a blank sketch, an included example, or a community gallery sketch.
- Keep code and preferences saved in the browser, then share sketches through URL-based links.
- Use microphone or line-input analysis for audio-reactive work, and create on desktop or mobile.

Use it to create and iterate on core sketches, then combine add-ons as your project grows.

## Installation

Follow the [official installation guide](https://code.textmode.art/docs/installation) to install `textmode.js`
with npm or a browser-ready UMD bundle and to add official plugins.

## Next steps

- **[Read the documentation](https://code.textmode.art/)** for core concepts, guides, and installation details.
- **[Browse the API reference](https://code.textmode.art/api/textmode.js/)** for the complete typed API.
- **[Explore the examples](./examples/)** to see common drawing, animation, media, and plugin patterns.
- **[Try the live editor](https://editor.textmode.art/)** to sketch interactively in the browser.

## Contributing

Thank you for considering contributing to this project! (✿◠‿◠)

Please read the [Contributing Guide](./CONTRIBUTING.md) to get started.

<!-- TEXTMODE-CONTRIBUTORS:START -->
<!-- prettier-ignore-start -->
<!-- Generated from https://github.com/humanbydefinition/code.textmode.art/blob/main/.vitepress/data/contributors.json and https://github.com/humanbydefinition/code.textmode.art/blob/main/.vitepress/data/contribution-types.json. Do not edit this section directly. -->
## Contributors

Thanks to the people who contribute code, documentation, design, examples, ideas, infrastructure, and care
across the textmode.js ecosystem.

<!-- markdownlint-disable MD033 -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%">
        <a href="https://github.com/humanbydefinition">
          <img src="https://github.com/humanbydefinition.png?s=100" width="100px" alt="humanbydefinition avatar" />
          <br /><sub><b>humanbydefinition</b></sub>
        </a>
        <br /><span title="Code: Commits and pull requests" aria-label="Code: Commits and pull requests">💻</span> <span title="Documentation: README, guides, and API documentation" aria-label="Documentation: README, guides, and API documentation">📖</span> <span title="Design: User experience, branding, and visual design" aria-label="Design: User experience, branding, and visual design">🎨</span> <span title="Examples: Usage examples and creative sketches" aria-label="Examples: Usage examples and creative sketches">💡</span> <span title="Ideas and planning: Feature proposals, planning, and feedback" aria-label="Ideas and planning: Feature proposals, planning, and feedback">🤔</span> <span title="Maintenance: Refactoring and project upkeep" aria-label="Maintenance: Refactoring and project upkeep">🚧</span> <span title="Infrastructure: Continuous integration, hosting, and build systems" aria-label="Infrastructure: Continuous integration, hosting, and build systems">🚇</span> <span title="Tools: Developer and community tooling" aria-label="Tools: Developer and community tooling">🔧</span> <span title="Plugins and libraries: Plugin and utility library development" aria-label="Plugins and libraries: Plugin and utility library development">🔌</span> <span title="Code review: Reviewing pull requests" aria-label="Code review: Reviewing pull requests">👀</span>
      </td>
      <td align="center" valign="top" width="14.28%">
        <a href="https://github.com/trintlermint">
          <img src="https://github.com/trintlermint.png?s=100" width="100px" alt="trintlermint avatar" />
          <br /><sub><b>trintlermint</b></sub>
        </a>
        <br /><span title="Design: User experience, branding, and visual design" aria-label="Design: User experience, branding, and visual design">🎨</span> <span title="Examples: Usage examples and creative sketches" aria-label="Examples: Usage examples and creative sketches">💡</span>
      </td>
    </tr>
  </tbody>
</table>
<!-- markdownlint-enable MD033 -->

Contribution details and profile links are maintained on the [textmode.js contributors page](https://code.textmode.art/docs/contributors).
<!-- prettier-ignore-end -->
<!-- TEXTMODE-CONTRIBUTORS:END -->

## License

`textmode.js` is licensed under the [MIT License](./LICENSE).

## Acknowledgements

- **[Typr.js](https://github.com/photopea/Typr.js)**
  - Custom-made TypeScript rewrite and minified subset by [Photopea](https://github.com/photopea), used for font loading and parsing.
  - License: [MIT License](https://github.com/photopea/Typr.js/blob/gh-pages/LICENSE).

- **[UrsaFont](https://ursafrank.itch.io/ursafont)**
  - Default bundled font created by [UrsaFrank](https://ursafrank.itch.io/).
  - License: [CC0 (Creative Commons Zero)](https://creativecommons.org/publicdomain/zero/1.0/).

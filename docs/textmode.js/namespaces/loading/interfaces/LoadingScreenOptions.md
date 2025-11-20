[textmode.js](../../../../index.md) / [loading](../index.md) / LoadingScreenOptions

# Interface: LoadingScreenOptions

Options for configuring the loading screen.

## Example

```js
const tm = textmode.create({
 width: 800,
 height: 600,
 loadingScreen: {
   message: 'booting...',
 }
});
```

## Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| <a id="message"></a> `message?` | `string` | Message to display on the loading screen. Default is `'loading...'`. |
| <a id="renderer"></a> `renderer?` | (`context`) => `void` | Provides a custom renderer function for the loading screen, overriding the default loading screen. The `context` parameter is a [LoadingScreenRendererContext](LoadingScreenRendererContext.md) object. |
| <a id="tone"></a> `tone?` | `"auto"` \| `"light"` \| `"dark"` | Color tone of the loading screen. Can be 'auto', 'light', or 'dark'. Default is 'auto'. <br/><br/> Based on the background color the `textmode.js` canvas is rendered on, the loading screen will automatically choose a light or dark theme when set to `'auto'`. |
| <a id="transition"></a> `transition?` | `"none"` \| `"fade"` | Type of transition effect. Default is `'fade'`. |
| <a id="transitionduration"></a> `transitionDuration?` | `number` | Duration of the transition effect in milliseconds. Default is `500`ms. |

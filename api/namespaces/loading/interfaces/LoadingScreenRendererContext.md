[textmode.js](../../../index.md) / [loading](../index.md) / LoadingScreenRendererContext

# Interface: LoadingScreenRendererContext

Context object passed to a loading screen renderer function.

Can be used to create a custom loading screen to fit your needs.

## Example

```ts
const t = textmode.create({
  width: 800,
  height: 600,
  loadingScreen: {
    message: 'loading...',
    renderer: (ctx) => {
      const { textmodifier: tm, grid, progress, message, transitionOpacity } = ctx;

      // Clear the screen
      tm.background(0, 0, 0, Math.floor(transitionOpacity * 255));

      // Position at top-left corner
      const x = -Math.floor(grid.cols / 2) + 2;
      const y = -Math.floor(grid.rows / 2) + 2;

      tm.push();
      tm.translate(x, y, 0);
      tm.charColor(255, 255, 255, transitionOpacity * 255);

      // Display message
      if (message) {
        for (let i = 0; i < message.length; i++) {
          tm.char(message[i]);
          tm.rect(1, 1);
          tm.translateX(1);
        }
      }

      // Display progress bar
      tm.translate(-message.length, 2, 0);
      const barWidth = 20;
      const filled = Math.floor(progress * barWidth);

      for (let i = 0; i < barWidth; i++) {
        tm.char(i < filled ? '=' : '-');
        tm.rect(1, 1);
        tm.translateX(1);
      }

      tm.pop();
    }
  }
});
```

## Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| <a id="elapsedms"></a> `elapsedMs` | `number` | The elapsed time since the loading started, in milliseconds. |
| <a id="errordetails"></a> `errorDetails?` | `string` | Detailed error information, if any. |
| <a id="errormessage"></a> `errorMessage?` | `string` | The error message to display, if any. |
| <a id="framecount"></a> `frameCount` | `number` | The number of frames rendered since the loading started. |
| <a id="grid"></a> `grid` | [`TextmodeGrid`](../../../classes/TextmodeGrid.md) | The TextmodeGrid representing the screen grid. |
| <a id="iserror"></a> `isError` | `boolean` | Indicates if the loading screen is in an error state. |
| <a id="message"></a> `message?` | `string` | The current loading message, if any. |
| <a id="palette"></a> `palette` | [`TextmodeColor`](../../../classes/TextmodeColor.md)[] | The palette of colors available for rendering based on the `theme`. |
| <a id="phases"></a> `phases` | [`LoadingPhaseSnapshot`](LoadingPhaseSnapshot.md)[] | The phases of the loading process. |
| <a id="progress"></a> `progress` | `number` | The current loading progress (0-1). |
| <a id="textmodifier"></a> `textmodifier` | [`Textmodifier`](../../../classes/Textmodifier.md) | The Textmodifier instance for rendering text and graphics. |
| <a id="theme"></a> `theme` | [`LoadingScreenTheme`](LoadingScreenTheme.md) | The current theme of the loading screen. |
| <a id="transitionopacity"></a> `transitionOpacity` | `number` | The opacity level for transition effects. |

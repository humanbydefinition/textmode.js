[textmode.js](../../../index.md) / [loading](../index.md) / LoadingScreenManager

# Class: LoadingScreenManager

Manages the loading screen display and state. Can be accessed via [Textmodifier.loading](../../../classes/Textmodifier.md#loading).

## Accessors

### progress

#### Get Signature

```ts
get progress(): number;
```

Get the current overall loading progress (0-1).

##### Example

```javascript
const t = textmode.create({
  width: 800,
  height: 600,
  loadingScreen: { message: 'starting...' }
});

// In setup we can start a phase and read the overall progress
t.setup(async () => {
  const phase = t.loading.beginPhase('assets', 1);
  phase.report(0.5); // half complete for the phase

  // The `progress` accessor reports the global progress across all phases
  console.log(`Loading: ${Math.round(t.loading.progress * 100)}%`);
});
```

##### Returns

`number`

## Methods

### addPhase()

```ts
addPhase(label, weight): LoadingPhaseHandle;
```

Begin a new loading phase.

With the returned [LoadingPhaseHandle](../interfaces/LoadingPhaseHandle.md) you can report progress,
track asynchronous work, and manage the phase lifecycle.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `label` | `string` | `undefined` | Label for the loading phase. |
| `weight` | `number` | `1` | Weight of the loading phase (default is 1). |

#### Returns

[`LoadingPhaseHandle`](../interfaces/LoadingPhaseHandle.md)

A handle to the created loading phase.

#### Example

```javascript
const t = textmode.create({
  width: 800,
  height: 600,
  loadingScreen: { message: 'preparing...' }
});

// In setup we start a phase and then track work in that phase
t.setup(async () => {
  const phase = t.loading.beginPhase('video preload', 2);

  // Example: report progress from a loader callback
  await phase.track(async () => {
    // Simulated work
    for (let i = 0; i <= 10; i++) {
      phase.report(i / 10);
      await new Promise((r) => setTimeout(r, 30));
    }
  });
});
```

***

### error()

```ts
error(error): void;
```

Report an error that occurred during loading.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `error` | `string` \| `Error` | The error message or `Error` object. |

#### Returns

`void`

#### Example

```javascript
const t = textmode.create({
  width: 800,
  height: 600,
  loadingScreen: { message: 'starting...' }
});

t.setup(async () => {
  const phase = t.loading.beginPhase('remote fetch', 1);
  try {
    await phase.track(async () => {
      // Failing call
      throw new Error('server down');
    });
  } catch (err) {
    // This will put the loading manager into an error state
    t.loading.error(err instanceof Error ? err : String(err));
  }
});
```

***

### message()

```ts
message(next?): undefined | string;
```

Get or set the loading screen message.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `next?` | `string` | Optional new message to set. |

#### Returns

`undefined` \| `string`

The current loading screen message.

#### Example

```javascript
const t = textmode.create({
  width: 800,
  height: 600,
  loadingScreen: { message: 'loading...' }
});

t.setup(() => {
  // Update the message visible on the loading screen
  t.loading.message('preloading video...');

  // Read the current message (useful in custom renderers)
  const msg = t.loading.message();
  console.log(msg);
});
```

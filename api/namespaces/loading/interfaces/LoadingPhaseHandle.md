[textmode.js](../../../index.md) / [loading](../index.md) / LoadingPhaseHandle

# Interface: LoadingPhaseHandle

Handle for managing a loading phase.

## Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | The unique identifier of the loading phase. |
| <a id="label"></a> `label` | `string` | The label or name of the loading phase. |

## Methods

### complete()

```ts
complete(): void;
```

Mark the loading phase as complete.

#### Returns

`void`

#### Example

```ts
const t = textmode.create({ width: 800, height: 600, loadingScreen: { message: 'prepping...' } });

t.setup(() => {
  const phase = t.loading.beginPhase('init', 1);
  // Finish phase when work is done
  phase.complete();
});
```

***

### fail()

```ts
fail(error?): void;
```

Mark the loading phase as failed.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `error?` | `Error` | An optional error object describing the failure. |

#### Returns

`void`

#### Example

```ts
const t = textmode.create({ width: 800, height: 600 });

t.setup(async () => {
  const phase = t.loading.beginPhase('fetch', 1);
  try {
    // simulate failure
    throw new Error('network error');
  } catch (err) {
    phase.fail(err instanceof Error ? err : String(err));
  }
});
```

***

### report()

```ts
report(progress): void;
```

Update the progress of the loading phase.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `progress` | `number` | A number between 0 and 1 representing the phase's progress. |

#### Returns

`void`

#### Example

```ts
const t = textmode.create({ width: 800, height: 600, loadingScreen: { message: 'prepping...' } });

// Create a phase and report progress as work proceeds
t.setup(async () => {
  const phase = t.loading.beginPhase('assets', 1);
  phase.report(0.25);
  // ...load assets...
  phase.report(0.75);
  phase.complete();
});
```

***

### track()

```ts
track<T>(task): Promise<T>;
```

Track a task within this loading phase.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `task` | `Promise`\<`T`\> \| () => `T` \| `Promise`\<`T`\> | A promise or function representing the task to track. |

#### Returns

`Promise`\<`T`\>

A promise that resolves with the task's result.

#### Example

```ts
const t = textmode.create({ width: 800, height: 600, loadingScreen: { message: 'loading...' } });

t.setup(async () => {
  const phase = t.loading.beginPhase('video', 2);
  await phase.track(async () => {
    // do async work and report updates
    for (let i = 0; i <= 10; i++) {
      phase.report(i / 10);
      await new Promise((r) => setTimeout(r, 30));
    }
  });
});
```

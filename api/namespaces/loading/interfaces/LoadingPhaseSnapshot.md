[textmode.js](../../../index.md) / [loading](../index.md) / LoadingPhaseSnapshot

# Interface: LoadingPhaseSnapshot

Snapshot of a loading phase's state.

## Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | The unique identifier of the loading phase. |
| <a id="label"></a> `label` | `string` | The label or name of the loading phase. |
| <a id="progress"></a> `progress` | `number` | The progress of the loading phase, represented as a number between 0 and 1. |
| <a id="status"></a> `status` | `"pending"` \| `"running"` \| `"complete"` \| `"failed"` | The current status of the loading phase. |
| <a id="weight"></a> `weight` | `number` | The weight of this phase for calculating overall progress. |

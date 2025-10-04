[**textmode.js v0.4.0**](../README.md)

***

[textmode.js](../README.md) / TextmodePlugin

# Interface: TextmodePlugin

A plugin interface for extending the functionality of a [Textmodifier](../classes/Textmodifier.md) instance.

Users can create plugins by implementing this interface.

## Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| <a id="name"></a> `name` | `string` | Unique name for the plugin. |
| <a id="version"></a> `version?` | `string` | Version string for the plugin. |

## Methods

### install()

> **install**(`textmodifier`, `api`): `void` \| `Promise`\<`void`\>

Called when the plugin is installed on a [Textmodifier](../classes/Textmodifier.md) instance.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `textmodifier` | [`Textmodifier`](../classes/Textmodifier.md) | The Textmodifier instance the plugin is being installed on. |
| `api` | [`TextmodePluginAPI`](TextmodePluginAPI.md) | An API object providing access to the Textmodifier's context and hook registration methods. |

#### Returns

`void` \| `Promise`\<`void`\>

***

### uninstall()?

> `optional` **uninstall**(`textmodifier`, `api`): `void` \| `Promise`\<`void`\>

Called when the plugin is uninstalled from a [Textmodifier](../classes/Textmodifier.md) instance.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `textmodifier` | [`Textmodifier`](../classes/Textmodifier.md) | The Textmodifier instance the plugin is being uninstalled from. |
| `api` | [`TextmodePluginAPI`](TextmodePluginAPI.md) | An API object providing access to the Textmodifier's context and hook registration methods. |

#### Returns

`void` \| `Promise`\<`void`\>

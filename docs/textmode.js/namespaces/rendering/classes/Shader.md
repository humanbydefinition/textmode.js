[**textmode.js v0.1.9**](../../../../README.md)

***

[textmode.js](../../../../README.md) / [rendering](../README.md) / Shader

# Class: `abstract` Shader

Defined in: [rendering/core/Shader.ts:65](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/rendering/core/Shader.ts#L65)

Abstract base class for shader implementations.

## Accessors

### isReady

#### Get Signature

> **get** **isReady**(): `boolean`

Defined in: [rendering/core/Shader.ts:71](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/rendering/core/Shader.ts#L71)

Whether the shader is currently compiled and ready to use

##### Returns

`boolean`

#### Implementation of

`IShader.isReady`

## Methods

### setUniform()

> `abstract` **setUniform**(`name`, `value`): `void`

Defined in: [rendering/core/Shader.ts:82](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/rendering/core/Shader.ts#L82)

Set a uniform value by name.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | Name of the uniform |
| `value` | [`UniformValue`](../type-aliases/UniformValue.md) | Value to set |

#### Returns

`void`

#### Implementation of

`IShader.setUniform`

***

### setUniforms()

> **setUniforms**(`uniforms`): `void`

Defined in: [rendering/core/Shader.ts:74](https://github.com/humanbydefinition/textmode.js-dev/blob/02f2317592c96b7b0129f0da9a382c12c28ad890/src/rendering/core/Shader.ts#L74)

Set multiple uniforms at once.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `uniforms` | `Record`\<`string`, [`UniformValue`](../type-aliases/UniformValue.md)\> | Object containing uniform name-value pairs |

#### Returns

`void`

#### Implementation of

`IShader.setUniforms`

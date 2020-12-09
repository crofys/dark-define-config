# @crofys/dark-define-config

> 使用插件后,会将项目下的 config 文件,动态注入到项目中.并生成相应到 type 文件 语法提示;
> 支持vue3.0

## 安装

```bash
npm i --save-dev @crofys/define-config-plugin
```

```bash
yarn add -dev @crofys/define-config-plugin
```

## 使用

> 注意: config 配置文件 需要用 es 模块化导出

<!-- 所需阐述:

| 参数名称 | 类型   | 收否必传 | 默认值                              |
| -------- | ------ | -------- | ----------------------------------- |
| path     | string | 否       | path.join(\_\_dirname, './config/') | -->

webpack.config.js

```ts
const DefineConfig = require("@crofys/dark-define-config");

module.exports = {
  mode: 'production',
  entry: ******,
  output: ******,,
  module: {
    ...
  },
  plugins: [
    new DarkDefineConfigPlugin(),
    ...
  ],
}

```
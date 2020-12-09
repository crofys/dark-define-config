import webpack from 'webpack'
import { join } from 'path'
import { mkdirSync } from './utils/fs'
import { DarkDefineConfig } from './runtime-core'

const pluginName = 'DarkDefineConfigPlugin'

interface IDarkDefineConfigPluginOpts {

}
class DarkDefineConfigPlugin {
  private DarkDefineConfig: DarkDefineConfig
  private __PWD__: string = process.cwd()
  private __DIR__: string = join(this.__PWD__, '/src/.dark')

  constructor(opts: IDarkDefineConfigPluginOpts) {
    // if (!isObject(opts)) throw new Error('请传入参数')
    console.log('生成 `Config` 配置文件......')
    this.DarkDefineConfig = new DarkDefineConfig({ dir: this.__DIR__ })
    this._init()
  }

  apply(compiler: webpack.Compiler) {
    compiler.hooks.run.tapPromise(pluginName, async () => {
      // this._init()
      // await this.init(compiler)
    })
    compiler.hooks.watchRun.tapPromise(pluginName, async (compiler) => {
      // await this.init(compiler)
    })
  }
  private _init() {
    // 动态生成 .vue 文件夹
    // deleteDir(this.__DIR__)
    mkdirSync(this.__DIR__)
    // 动态生成 config 文件
    this.DarkDefineConfig.init()
  }
}


module.exports = DarkDefineConfigPlugin
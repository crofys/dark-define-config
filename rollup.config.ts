import JsonPlugin from '@rollup/plugin-json'
import CommonPlugin from '@rollup/plugin-commonjs'
import ResolvePlugin from '@rollup/plugin-node-resolve'
import TsPlugin from 'rollup-plugin-typescript2'
import PolyfillPlugin from 'rollup-plugin-node-polyfills'
import BabelPlugin from 'rollup-plugin-babel'
import builtins from 'rollup-plugin-node-builtins'
import { terser } from 'rollup-plugin-terser'
import alias from '@rollup/plugin-alias';
import path from 'path'
import Pkg from './package.json'
import copy from 'rollup-plugin-copy'

const isProd = process.env.NODE_ENV === 'production'
const extensions = ['.js', '.ts']
const resolve = (...args) => path.resolve(__dirname, ...args)
const banner = `/*!
 * ${Pkg.name} v${Pkg.version}
 * (c) 2020-${new Date().getFullYear()} Russell
 * https://github.com/any86/any-touch
 * Released under the MIT License.
 */`

const BaseConfig = {
  input: resolve('./packages/index.ts'),
  output: [
    {
      file: Pkg.main,
      format: 'cjs',
      banner,
    },
    {
      file: Pkg.module,
      format: 'esm',
      banner,
    },
  ],
  external: ['webpack', 'fs'],
  plugins: [
    builtins(),
    JsonPlugin(),
    CommonPlugin(),
    ResolvePlugin({
      extensions,
      preferBuiltins: false,
    }),
    TsPlugin({
      tsconfig: 'tsconfig.json',
    }),
    PolyfillPlugin(),
    BabelPlugin({
      exclude: ['node_modules'],
      runtimeHelpers: true,
    }),
    copy({
      targets: [
        { src: 'packages/template/**/*', dest: 'lib/template' }
      ]
    }),
    alias({
      entries: [
        { find: '@utils', replacement: 'src/utils' },
        { find: '@', replacement: 'src' },
      ]
    })
    // terser(),
  ],
}

if (isProd) {
  BaseConfig.plugins.push(terser())
}

export default [BaseConfig]

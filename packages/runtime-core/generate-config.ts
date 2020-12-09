import { replaceEjsTemplate } from '@utils/index'
import { join } from 'path'
import glob from 'glob'


export class DarkDefineConfig {
  private _dir: string
  private _fileNames: string[] = []
  constructor(opts: { dir: string }) {
    this._dir = opts.dir
  }
  public init() {
    const _configPath = join(process.cwd(), '/config/config.ts')
    const _dest = join(this._dir, 'config.ts')
    const { routes, ...args } = require(_configPath)
    const $Layouts = this._layout()
    const $Routes = JSON.stringify(this._filterRoutes(routes), null, 2).replace(/\"%%/g, "").replace(/\%%"/g, "").replace(/\%%/g, "")
    const $Config = JSON.stringify(args, null, 2)
    replaceEjsTemplate(
      'template/router.config.ejs',
      _dest,
      {
        $Layouts,
        $Routes,
        $Config,
      }
    );
  }
  /**
   * 匹配layout 路径 引入vue文件
   * @param
   */
  private _layout() {
    let _layout: string = ''
    const entryFiles = glob.sync(process.cwd() + '/src/layout/*.vue')
    entryFiles.map(filePath => {
      const file_name = filePath.replace(/(.*\/)*([^.]+).*/ig, "$2");
      this._fileNames.push(file_name)
    })
    this._fileNames.map(item => {
      _layout += `import ${item} from "@/layout/${item}.vue";\n`
    })
    return _layout
  }
  /**
   * 递归虚幻routes方法
   * @param routes
   */
  private _filterRoutes(routes: any[]) {
    const _routes = []
    if (!routes || !routes.length) return
    for (const route of routes) {
      const _routesItem: any = { ...route }
      if (route.children && route.children.length) {
        _routesItem.children = this._filterRoutes(route.children)
      }
      if (this._fileNames.includes(_routesItem.component)) {
        _routesItem.component = `%%${_routesItem.component}%%`
      } else {
        _routesItem.component = `%%()=> import(/* webpackChunkName: '${_routesItem.name}' */ '@/views/${_routesItem.component}')%%`
      }
      _routes.push(_routesItem)
    }
    return _routes
  }
}
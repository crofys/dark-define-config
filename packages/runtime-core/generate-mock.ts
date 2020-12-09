import { replaceEjsTemplate } from '../utils'
import { join } from 'path'

export class GenerateConfig {
  private _dir: string
  constructor(opts: { dir: string }) {
    this._dir = opts.dir
  }
  public init() {
    const _configPath = join(process.cwd(), '/config/config.ts')
    const _dest = join(this._dir, 'config.ts')
    const { routes, ...args } = require(_configPath)
    const $Routes = JSON.stringify(this._filterRoutes(routes), null, 2).replace(/\"%%/g, "").replace(/\%%"/g, "").replace(/\%%/g, "")
    const $Config = JSON.stringify(args, null, 2)

    replaceEjsTemplate(
      'template/router.config.ejs',
      _dest,
      {
        $Routes,
        $Config,
      }
    );
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
      if (['AdminLayout', 'DefaultLayout'].includes(_routesItem.component)) {
        _routesItem.component = `%%${_routesItem.component}%%`
      } else {
        _routesItem.component = `%%()=> import(/* webpackChunkName: '${_routesItem.name}' */ '@/views/${_routesItem.component}')%%`
      }
      _routes.push(_routesItem)
    }
    return _routes
  }
}
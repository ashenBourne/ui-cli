// 这个文件旨在处理路由，
import langs from './i18n/route.json' // 获取所有的语言
import routers from './routes.json' // 获取所有的路由

const LOAD_MAP = {
  'zh-CN': name => {
    return r => require.ensure([], () =>
      r(require(`./pages/zh-CN/${name}.vue`)),
    'zh-CN')
  },
  'en-US': name => {
    return r => require.ensure([], () =>
      r(require(`./pages/en-US/${name}.vue`)),
    'en-US')
  }
}

// 注意这里路径上有"/"
const LOAD_DOCS_MAP = {
  'zh-CN': path => {
    return r => require.ensure([], () =>
      r(require(`./docs/zh-CN${path}.md`)),
    'zh-CN')
  },
  'en-US': path => {
    return r => require.ensure([], () =>
      r(require(`./docs/en-US${path}.md`)),
    'en-US')
  }
}
// 路由加载vue文件的
const load = function(lang, path) {
  return LOAD_MAP[lang](path)
}
// 路由记载markdown文档的
const loadDocs = function(lang, path) {
  return LOAD_DOCS_MAP[lang](path)
}
// 注册路由
const registerRoute = (routers) => {
  let route = []
  Object.keys(routers).forEach((lang, index) => {
    let navs = routers[lang]
    route.push({
      path: `/${lang}/component`,
      redirect: `/${lang}/component/button`,
      component: load(lang, 'component'), // 举例：
      children: []
    })
    navs.forEach(nav => {
      if (nav.href) return
      if (nav.children) {
        nav.children.forEach(group => {
          group.children.forEach(nav => {
            addRoute(nav, lang, index)
          })
        })
      } else {
        addRoute(nav, lang, index)
      }
    })
  })
  function addRoute(page, lang, index) {
    //   更新日志是单独的vue页面
    console.log(page)
    const component = page.path === '/changelog'
      ? load(lang, 'changelog')
      : loadDocs(lang, page.path)

    let child = {
      path: page.path.slice(1), // 不要那根斜线，作为子路由不需要
      meta: {
        title: page.title || page.name,
        description: page.description,
        lang
      },
      name: 'component-' + lang + (page.title || page.name),
      component: component.default || component
    }

    route[index].children.push(child)
  }

  return route
}
const generateMiscRoutes = (lang)=>{
  let indexRoute = {
    path: `/${lang}`, // 首页
    meta: { lang },
    name: 'home' + lang,
    component: load(lang, 'index')
  }
  return [indexRoute]
}
let route = registerRoute(routers)
langs.forEach(lang => {
  route = route.concat(generateMiscRoutes(lang.lang))
})
// 默认语言
let defaultPath = '/zh-CN'
route = route.concat([{
  path: '/',
  redirect: defaultPath
}, {
  path: '*',
  redirect: defaultPath
}])
console.log('获取路由')
console.log(route)
export default route


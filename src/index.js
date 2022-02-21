// src/index.js
import Button from '../packages/button/index.js'

const components = [Button]

// 便于全局多组件注册
const install = (Vue) => {
  components.forEach(component => {
    Vue.component(component.name, component) // 每个组件需提供 name 属性
  })
}
// 这是以防以script方式引入Vue，这样再引入element的话，就可以直接注册
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default {
  install,
  Button
}

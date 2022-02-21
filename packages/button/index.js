import ElButton from './src/button.vue'

// 为了可以使用Vue.use(ELButton)，便于按需加载
ElButton.install = function (Vue) {
  Vue.component(ElButton.name, ElButton)
}

export default ElButton

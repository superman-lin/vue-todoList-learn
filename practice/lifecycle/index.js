import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  // template: '<div>{{text}}</div>',
  data: {
    text: 0
  },
  // render()方法在beforeMount()和mounted()之间执行的
  render (h) {
    throw new TypeError('render error')
    // console.log('render functiong invoked')
    // return h('div', {}, this.text)
  },
  // 开发的时候才会调用，方便调试；正式打包上线的时候不会被调用
  // 本组件出现错误的时候才会被调用，子组件出现错误时不会调用，只关心自己组件是否渲染成功
  renderError (h, err) {
    return h('div', {}, err.stack)
  },
  // 较高级，可以用在正式开发环境里。可以搜集线上的一些错误
  // 如果在根组件使用该方法，那任何组件报错可以捕捉到，除非子组件把向上冒泡事件停止掉
  errorCaptured () {
    // 会向上冒泡，并且正式环境可以使用
  },
  // beforeCreate()、created()、beforeMount()、mounted()只被调用一次
  // 服务端渲染的时候，只有beforeCreate()和created(),因为mounted是和DOM操作有关的，服务器没有DOM执行的环境，所以没有其他的生命周期函数
  // 无法在beforeCreate()和created()中进行DOM操作，因为根本无法拿到DOM节点
  beforeCreate () {
    console.log(this.$el, 'beforeCreate')
  },
  created () {
    console.log(this.$el, 'created')
  },
  beforeMount () {
    console.log(this.$el, 'beforeMount')
  },
  mounted () {
    console.log(this.$el, 'mounted')
  },
  beforeUpdate () {
    console.log(this, 'beforeUpdate')
  },
  updated () {
    console.log(this, 'updated')
  },
  activated () { // 在组建章节讲解
    console.log(this, 'activated')
  },
  deactivated () { // 在组建章节讲解
    console.log(this, 'deactivated')
  },
  beforeDestroy () {
    console.log(this, 'beforeDestroy')
  },
  destroyed () {
    console.log(this, 'destroyed')
  }

})

app.$mount('#root')
// setInterval(() => {
//   app.text = app.text += 1
// }, 1000)

setTimeout(() => {
  app.$destroy()
}, 1000)

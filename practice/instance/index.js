import Vue from 'vue'

// 第一种：
// new Vue({
//   el: '#root',
//   template: '<div>this is content</div>'
// })

// 另一种挂载到root节点的方式：
const app = new Vue({
  template: '<div ref="div">{{text}}</div>',
  data: {
    text: 0
  },
  // watch无用时要及时销毁，防止内存溢出
  // watch属性方式，在app销毁的时候会自动销毁watch
  watch: {
    // text (newText, oldText) {
    //   console.log(`${newText} : ${oldText}`)
    // }
  }
})
app.$mount('#root')

// setInterval(() => {
//   app.text += 1
//   // app.$options.data.text += 1 // 直接修改$options上面的data无作用
//   // app.$data.text += 1  // 与app.text是一个对象，作用相同
// }, 1000)

/** vue实例属性 */
// console.log(app.$data)
// console.log(app.$props)
// console.log(app.$el) // 挂载的html节点的引用
// console.log(app.$options)
// app.$options.render = (h) => {
//   return h('div', {}, 'new render function') // $options的render方法有作用，但是要等第二次渲染的时候值才能发生变化
// }
// console.log(app.$root === app) // true
// console.log(app.$children)  // 组件中详细讲解
// 插槽的概念（有用，组件中详解）
// console.log(app.$slots)
// console.log(app.$scopedSlots)
// 引用，快速定位到模板的某一个节点或某一个组件[如果是html节点，会返回该节点的对象;如果是组件，会返回组件的实例（就是vue的实例）]
// console.log(app.$refs)
// console.log(app.$isServer) // 只有在服务端渲染的时候才会做这个判断

/** vue实例方法 */
// watch无用时要及时销毁，防止内存溢出
// app.$watch方式需要手动销毁
// const unWatch = app.$watch('text', (newText, oldText) => {
//   console.log(`${newText} : ${oldText}`)
// })
// setTimeout(() => {
//   unWatch()
// }, 2000)
// $on和$emit都只能同时作用于一个vue对象上面才会生效，不会冒泡
// 事件监听
// app.$on('test', (a, b) => {
//   console.log(`test emited ${a} ${b}`)
// })
// 事件触发
// app.$emit('test', 1, 2)
// 事件只触发一次
app.$once('test', (a, b) => {
  console.log(`test emited ${a} ${b}`)
})
setInterval(() => {
  app.$emit('test', 1, 2)
}, 1000)
// 强制组件重新去渲染一次
// app.$forceUpdate()

// app.$set()
// app.$delete()

// app.$nextTick()

import Vue from 'vue' // 引用vue类库
import App from './App.vue'

// import './assets/styles/test.css'
import './assets/styles/global.styl'
// import './assets/images/bg.jpeg'

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  render: (h) => h(App) // 将App挂载到html里
}).$mount(root) // 将vue的内容插到root里面

import Vue from 'vue'

const component = {
  // props是指定这个组件被外部使用时一些可变的行为
  props: {
    active: Boolean,
    // 推荐用小驼峰，模板中用带“-”
    propOne: String
  },
  template: `
    <div>
      <input type="text" v-model="text">
      <span @click="handleChange">{{propOne}}</span>
      <span v-show="active">see me if active</span>
    </div>
  `,
  // 子组件中data必须为function
  data () {
    return {
      text: 0
    }
  },
  mounted () {
    console.log('comp mounted')
  },
  methods: {
    handleChange () {
      this.$emit('change')
    }
  }
}

const parent = new Vue({
  name: 'parent'
})

const component2 = {

  extends: component,
  data () {
    return {
      text: 1
    }
  },
  mounted () {
    console.log(this.$parent.$options.name)
  }
}

// const CompVue = Vue.extend(component)

// new CompVue({
//   el: '#root',
//   propsData: {
//     propOne: 'xxx'
//   },
//   data: {
//     text: '123'
//   },
//   mounted () {
//     console.log('instance mounted')
//   }

// })

new Vue({
  parent: parent,
  name: 'root',
  el: '#root',
  template: `
    <div>
      <span>{{text}}</span>
      <comp></comp>
    </div>
  `,
  components: {
    comp: component2
  },
  data: {
    text: 23333
  },
  methods: {

  },
  mounted () {
    // 可以查看parent上面的东西，但是尽量不要修改上面的东西
    console.log(this.$parent.$options.name)
  }
})

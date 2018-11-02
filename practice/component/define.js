import Vue from 'vue'

const component = {
  // props是指定这个组件被外部使用时一些可变的行为
  props: {
    // props的数据验证
    active: {
      type: Boolean,
      // required: true
      // default: true
      validator (value) {
        return typeof value === 'boolean'
      }
    },
    // active: Boolean,
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
  methods: {
    handleChange () {
      this.$emit('change')
    }
  }
}

// 组件名建议使用大写开头，大驼峰写法
Vue.component('CompOne', component)

new Vue({
  el: '#root',
  template: `
    <div>
      <comp-one ref="comp1" :active="true" :prop-one="prop1" @change="handleChange"></comp-one>
      <comp-one :active="false" propOne="text2"></comp-one>
    </div>
  `,
  mounted () {
    console.log(this.$refs.comp1)
  },
  data: {
    prop1: 'text1'
  },
  methods: {
    handleChange () {
      this.prop1 += 1
    }
  }
})

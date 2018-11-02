import Vue from 'vue'

// 双向绑定   简单实现v-model

const component = {
  model: {
    prop: 'value1',
    event: 'change'
  },
  props: ['value', 'value1'],
  template: `
    <div>
      <input type="text" @input="handleInput" :value="value1">
    </div>
  `,
  // 子组件中data必须为function
  data () {
    return {
      // text: 0
    }
  },
  methods: {
    handleInput (e) {
      this.$emit('change', e.target.value)
    }
  }
}

new Vue({
  components: {
    CompOne: component
  },
  el: '#root',
  // <comp-one :value="value" @input="value = arguments[0]"></comp-one>
  template: `
    <div>
      <comp-one v-model="value"></comp-one>
    </div>
  `,
  data () {
    return {
      value: '123'
    }
  },
  methods: {

  }
})

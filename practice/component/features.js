import Vue from 'vue'

const ChildComponent = {
  template: `<div>this is child component: {{data.value}}</div>`,
  inject: ['yeye', 'data'],
  mounted () {
    // console.log(this.$parent.$options.name)
    // console.log(this.yeye)
    // console.log(this.value)
  }
}

const component = {
  name: 'comp',
  // template: `
  //   <div :style="style">
  //     <div class="header">
  //       <slot name="header"></slot>
  //     </div>
  //     <div class="body">
  //       <slot name="body"></slot>
  //     </div>
  //   </div>
  // `,
  template: `
    <div :style="style">
      <slot :value="value" aaa="111"></slot>
      <child-component></child-component>
    </div>
  `,
  // 子组件中data必须为function
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      },
      value: 'component value'
    }
  },
  components: {
    ChildComponent: ChildComponent
  },
  methods: {

  }
}

new Vue({
  name: 'root',
  components: {
    CompOne: component
  },
  provide () {
    const data = {}
    Object.defineProperty(data, 'value', {
      get: () => this.value,
      enumerable: true
    })
    return {
      yeye: this,
      data
    }
  },
  el: '#root',
  template: `
    <div>
      <comp-one ref="comp">
        <span slot-scope="props" ref="span">{{props.value}}  {{props.aaa}}  {{value}}</span>
      </comp-one>
      <input type="text" v-model="value">
    </div>
  `,
  data () {
    return {
      value: '123'
    }
  },
  mounted () {
    // 尽量不要用this.$refs去操作,不利用团队协作，勿滥用，可以通过props
    console.log(this.$refs.comp.value)
    console.log(this.$refs.span)
  },
  methods: {

  }
})

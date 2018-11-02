import Vue from 'vue'

const component = {
  props: ['props1'],
  name: 'comp',
  // template: `
  //   <div :style="style">
  //     <slot></slot>
  //   </div>
  // `,
  render (createElement) {
    return createElement('div', {
      style: this.style
      // on: {
      //   click: () => {
      //     this.$emit('click')
      //   }
      // }
    }, [
      this.$slots.header,
      this.props1
    ])
  },
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

  },
  methods: {

  }
}

new Vue({
  name: 'root',
  components: {
    CompOne: component
  },
  el: '#root',
  // template: `
  //   <div>
  //     <comp-one ref="comp">
  //       <span ref="span">{{value}}</span>
  //     </comp-one>
  //   </div>
  // `,
  data () {
    return {
      value: '123'
    }
  },
  render (createElement) {
    return createElement(
      'comp-one',
      {
        ref: 'comp',
        props: {
          props1: this.value
        },
        // on: {
        //   click: this.handleClick
        // },
        nativeOn: {
          click: this.handleClick
        }
      },
      [
        createElement('span', {
          ref: 'span',
          slot: 'header',
          attrs: {
            id: 'test'
          },
          domProps: {
            innerHTML: '<span>345</span>'
          }
        }, this.value)
      ]
    )
  },
  mounted () {
    console.log(this.$refs.span)
  },
  methods: {
    handleClick () {
      console.log('clicked')
    }
  }
})

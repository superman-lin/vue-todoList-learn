import Vue from 'vue'

// 访问不到globalVar
var globalVar = '111' // eslint-disable-line

new Vue({
  el: '#root',
  // template: `
  //   <div v-bind:id='aaa' v-on:click="handleClick">
  //     <p v-html='html'></p>
  //   </div>
  // `,
  template: `
    <div
      :class="[{active: isActive}]"
      :style = "[styles,styles2]"
    >
      <p>{{getJoinedArr(arr)}}</p>
    </div>
  `,
  data: {
    isActive: false,
    arr: [1, 2, 3],
    html: '<span>123</span>',
    aaa: 'main',
    styles: {
      color: 'red',
      appearance: 'none'
    },
    styles2: {
      color: 'black'
    }
  },
  computed: {

  },
  methods: {
    handleClick () {
      alert('clicked')  //eslint-disable-line
    },
    getJoinedArr (arr) {
      return arr.join(' ')
    }
  }
})

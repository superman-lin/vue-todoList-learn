import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
      <p>Name:{{name}}</p>
      <p>Name:{{getName()}}</p>
      <p>Number:{{number}}</p>
      <p>FullName:{{fullName}}</p>
      <p><input type='text' v-model="number"></p>
      <p>FirstName:<input type='text' v-model="firstName"></p>
      <p>LastName:<input type='text' v-model="lastName"></p>
      <p>name:<input type='text' v-model="name"></p>
      <p>Obj.a:<input type='text' v-model="obj.a"></p>
    </div>
  `,
  data: {
    firstName: 'Jokcy',
    lastName: 'Lou',
    number: 0,
    fullName: '',
    obj: {
      a: '123'
    }
  },
  // 注意：尽量不要在computed和watch里进行任何值的修改，特别是computed。不要改任何监听的属性值
  // computed性能开销比较小
  computed: {
    // name () {
    //   console.log('new name')
    //   return `${this.firstName} ${this.lastName}`
    // }
    name: {
      get () {
        console.log('new name')
        return `${this.firstName} ${this.lastName}`
      },
      // 不到万不得已，尽量不要使用computed的set()方法
      set (name) {
        const names = name.split(' ')
        this.firstName = names[0]
        this.lastName = names[1]
      }
    }
  },
  mounted () {
    this.obj = {
      a: '456'
    }
  },
  // watch不适用于要显示某一个数据
  // 适用于：监听某个值的变化，给后台发请求
  watch: {
    // 最初绑定watch的时候是不会执行的
    // firstName (newName, oldName) {
    //   this.fullName = newName + '' + this.lastName
    // }
    // 如果需要执行，如下：
    // firstName: {
    //   handler (newName, oldName) {
    //     this.fullName = newName + '' + this.lastName
    //   },
    //   immediate: true // 立刻执行
    // },
    'obj.a': {
      handler () {
        console.log('obj.a changed')
      },
      immediate: true // 立刻执行
      // 默认是false
      // deep:false时，obj是对象，监听不到a改变,重新复制给obj才会改变
      // deep:true时，会遍历obj对象的所有属性进行监听，性能开销大,优化：直接监听obj.a
      // deep: true
    }

  },
  methods: {
    getName () {
      console.log('getName invoked')
      return `${this.firstName} ${this.lastName}`
    }
  }
})

import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HelloVue from '@/components/HelloVue'
import index from '@/components/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/HelloVue',
      name:'HelloVue',
      component:HelloVue
    },
    {
      path:'/',
      name:'index',
      component:index
    }
  ]
})

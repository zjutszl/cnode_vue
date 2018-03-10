import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import post from '@/components/post'
import index from '@/components/index'
// import detail from '@/components/detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/post/:id',
      name:'post',
      component:post
    },
    {
      path:'/',
      name:'index',
      component:index
    },
    {
      path:'/:type',
      name:'index',
      component:index
    }
  ]
})

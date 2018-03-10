import Vue from 'vue'
import Router from 'vue-router'
import post from '@/components/post'
import index from '@/components/index'
import postTest from '@/components/postTest'
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
      path:'/post/:id/test',
      name:'postTest',
      component:postTest
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

import Vue from 'vue'
import Router from 'vue-router'
import post from '@/components/post'
import index from '@/components/index'
import postTest from '@/components/postTest'
import authormessage from '@/components/authormessage'
import authorIndex from '@/components/authorIndex'
import authorStar from '@/components/authorStar'

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
      name:'index1',
      component:index
    },
    {
      path:'/:type',
      name:'index2',
      component:index
    },
    {
      path:'/profile/:loginname/message',
      name:'authormessage',
      component:authormessage
    },
    {
      path:'/profile/:loginname/index',
      name:'authorIndex',
      component:authorIndex
    },
    {
      path:'/profile/:loginname/star',
      name:'authorStar',
      component: authorStar
    }

  ]
})

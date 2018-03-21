import Vue from 'vue'
import Router from 'vue-router'
import post from '@/components/post'
import index from '@/components/index'
import authorMessage from '@/components/authorMessage'
import authorIndex from '@/components/authorIndex'
import authorStar from '@/components/authorStar'
import permissionDenyed from '@/components/permissionDenyed'


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
      name:'authorMessage',
      component:authorMessage
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
    // },
    // {
    //   path:'/404/denyed',
    //   name:'denyed',
    //   component:permissionDenyed
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/home'
import first from '@/components/first'
import conditions from '@/views/conditions';
import operations from '@/components/operations/operations';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HelloWorld
    },{
      path:'/test',
      name:'Test',
      component:first,
    },
    {
      path:'/conditions',
      name:'Condition',
      component:conditions,
    },
    {
      path:'/operations',
      name:'Operations',
      component:operations,
    }
  ]
})

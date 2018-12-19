import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Register from '@/components/Register'
import CreateShip from '@/components/CreateShip'
import EditShip from '@/components/EditShip'
import ShipList from '@/components/ShipList'
import ShowShip from '@/components/ShowShip'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path:'/',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/ship-list',
      name: 'ShipList',
      component: ShipList
    },
    {
      path:'/show-ship/:id',
      name: 'ShowShip',
      component: ShowShip
    },
    {
      path:'/add-ship',
      name: 'CreateShip',
      component: CreateShip
    },
    {
      path: '/edit-ship/:id',
      name: 'EditShip',
      component: EditShip
    }
  ]
})

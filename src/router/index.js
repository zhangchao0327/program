import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import User from '@/views/user/user.vue'
import Goods  from '@/views/goods/goods.vue'
import GoodsAdd  from '@/views/goods/goodsAdd.vue'
import Categores from '@/views/goods/categores.vue'
Vue.use(Router)

const router = new Router({
  routes: [
    { name: 'login', path: '/login', component: Login },
    { name: 'home',
      path: '/',
      component: Home,
      children: [
        {
          name: 'user',
          path: '/user',
          component: User
        },
        {
          name: 'goods',
          path: '/goods',
          component: Goods
        },
        {
          name: 'goodsAdd',
          path: '/goods/add',
          component: GoodsAdd
        },
        {
          name: 'categores',
          path: '/categores',
          component: Categores
        }
      ]
    }
  ]
})

// 设置路由首位
router.beforeEach((to, from, next) => {
  if(to.name === 'login') {
    next()
  } else {
    const token = sessionStorage.getItem('token')
    if(token) {
      next()
    } else {
      router.push('/login')
    }
  }
})

export default router

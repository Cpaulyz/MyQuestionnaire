import router from './index'
import store from '../store'
import { getToken } from '../utils/auth'

router.beforeEach((to, from, next) => {
  // console.log(store)
  // console.log(store.state)
  // console.log(store.state.user)
  if(store.state.user.loginState) {
    // console.log('login state true')
    if(to.path === '/login') {
      next({ name: 'overview' })
    } else {
      next()
    }
    return
  }
  const token = getToken()
  console.log(`token: ${token}`)
  if(token) {
    store.commit('set_loginState', true)
    store.commit('set_userInfo', { id: Number(token) })
    if(to.path === '/login') {
      console.log('go front page')
      next({ name: 'overview' })
    } else {
      next()
    }
    return
  } else if(to.path === '/login' || to.path.startsWith('/customer')) {
    // console.log('in white list')
    next()
  } else {
    // console.log('not login and redirect')
    next('/login')
  }
})
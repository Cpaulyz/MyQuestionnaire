import Cookies from 'js-cookie'

const tokenKey = 'NJUSE-QUESTIONNAIRE'

export function getToken() {
  return Cookies.get(tokenKey)
}

export function setToken(value) {
  return Cookies.set(tokenKey, value)
}

export function removeToken() {
  return Cookies.remove(tokenKey)
}
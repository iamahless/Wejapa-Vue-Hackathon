import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null
  },
  getters: {
    loggedIn(state) {
      return state.token !== null
    }
  },
  mutations: {
    loginUser(state, token) {
      state.token = token
    }
  },
  actions: {
    loginUser(context, {
      email,
      password
    }) {
      return new Promise((resolve, reject) => {
        axios.post('developer/login', {
            email,
            password
          })
          .then((resp) => {
            const token = resp.data.data.token;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(resp.data.data))
            context.commit('loginUser', token)
            resolve(resp)
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    }
  },
  modules: {}
})
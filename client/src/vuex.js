import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      user: null
    }
  },
  mutations: {
    user(state, { user }) {
      state.user = user;
    }
  },
  actions: {
    user({ commit }, user) {
      commit('user', { user });
      console.log('user executed');
    }
  }
})

export default store;
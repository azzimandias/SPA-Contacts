import Vue from 'vue'
import Vuex from 'vuex'
//import index from "vuex";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contacts: [
      {
        firstName: 'Andrew',
        lastName: 'Sharanda',
        secondName: 'Dmitrievitch',
        telNumber: '89118294005',
        massiveOfValues: {
          Email: 'andrew@yandex.ru',
          work: 'Junior Frontend Developer'
        }
      },
      {
        firstName: 'Sofya',
        lastName: 'Ogirok',
        secondName: 'Dmitrievna',
        telNumber: '89502223344',
        massiveOfValues: {
          Email: 'sonuaNya@yandex.ru',
          work: 'TeamLead'
        }
      },
      {
        firstName: 'Dima',
        lastName: undefined,
        secondName: undefined,
        telNumber: '89502223344',
        massiveOfValues: {}
      },
    ],
    index: 0,
  },
  getters: {
  },
  mutations: {
    updateIndex(state, i) {
      state.index = i;
    },
    updateContacts(state) {
      state.contacts[state.index].massiveOfValues = {};
    }
  },
  actions: {
  },
  modules: {
  }
})

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
    savedMassiveOfValues: {},
    i: 0,
    index: 0,
  },
  getters: {
    allContacts(state) {
      return state.contacts;
    },
    getIndex(state) {
      return state.index;
    },
    getSaved(state) {
      return state.savedMassiveOfValues;
    },
    getI(state) {
      return state.i;
    }
  },
  mutations: {
    updateIndex(state, i) {
      state.index = i;
    },
    updateObject(state, fir) {
      delete (this.state.contacts[fir[0]].massiveOfValues)[fir[1]];
    },
    updateSaved(state, obj) {
      if (this.state.i === 0) {
        this.state.savedMassiveOfValues = obj;
        this.state.i = 1;
      }
    }
  },
  actions: {
  },
  modules: {
  }
})

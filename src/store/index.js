import Vue from 'vue'
import Vuex from 'vuex'
//import index from "vuex";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contacts: [
      {
        firstName: 'Андрей',
        lastName: 'Шаранда',
        secondName: 'Дмитриевич',
        telNumber: '89118294005',
        massiveOfValues: {
          Email: 'andrew@yandex.ru',
          Work: 'Junior Frontend Developer'
        }
      },
      {
        firstName: 'Сонька',
        lastName: 'Огирок',
        secondName: 'Дмитриевна',
        telNumber: '89502223344',
        massiveOfValues: {
          Email: 'sonuaNya@yandex.ru',
          work: 'TeamLead'
        }
      },
      {
        firstName: 'Дима',
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
    updateContacts(state, obj) {
      state.contacts[state.index].massiveOfValues = {};
      Object.assign(state.contacts[state.index].massiveOfValues, obj);
    },
    updateContactsDef(state, array) {
      state.contacts[state.index].firstName = array[0];
      state.contacts[state.index].lastName = array[1];
      state.contacts[state.index].secondName = array[2];
      state.contacts[state.index].telNumber = array[3];
    },
  },
  actions: {
  },
  modules: {
  }
})

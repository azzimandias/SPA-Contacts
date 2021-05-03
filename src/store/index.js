import Vue from 'vue'
import Vuex from 'vuex'

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
          Work: 'Junior Frontend Developer',
          Hobby: 'Web-develop',
          Sex: 'Male',
          Wife: 'Sofya Ogirok',
        }
      },
      {
        firstName: 'Софья',
        lastName: 'Огирок',
        secondName: 'Дмитриевна',
        telNumber: '89502223344',
        massiveOfValues: {
          Email: 'sonuaNya@yandex.ru',
          work: 'TeamLead',
          Hobby: 'Web-develop',
          Sex: 'Female',
          Husband: 'Sharanda Andrew',
        }
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
    contactMassiveMutation(state, obj) {
      state.contacts[state.index].massiveOfValues = {};
      Object.assign(state.contacts[state.index].massiveOfValues, obj);
    },
    defaultFieldsMutation(state, array) {
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

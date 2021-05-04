import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contacts: [
      {
        firstName: 'Andrew',
        lastName: 'Sharanda',
        secondName: 'Dmitrievich',
        telNumber: '89119508008',
        massiveOfValues: {
          Email: 'andrew@yandex.ru',
          Work: 'Junior Frontend Developer',
          Sex: 'Male',
        }
      },
      {
        firstName: 'Ariana',
        lastName: 'Grande',
        secondName: '',
        telNumber: '89502223344',
        massiveOfValues: {
          Email: 'Grande@yandex.ru',
          work: 'Singer',
          Sex: 'Female',
        }
      },
      {
        firstName: 'Aleksander',
        lastName: 'Petrov',
        secondName: 'Andreevich',
        telNumber: '89119508008',
        massiveOfValues: {
          Email: 'Petrov@yandex.ru',
          Work: 'Actor',
          Sex: 'Male',
        }
      },
      {
        firstName: 'Kendall',
        lastName: 'Jenner',
        secondName: '',
        telNumber: '89502223344',
        massiveOfValues: {
          Email: 'Kendall@yandex.ru',
          work: 'Model',
          Sex: 'Female',
        }
      },
      {
        firstName: 'Pavel',
        lastName: 'Durov',
        secondName: 'Valerievich',
        telNumber: '89119508008',
        massiveOfValues: {
          Email: 'Durov@yandex.ru',
          Work: 'Programmer',
          Sex: 'Male',
        }
      },
      {
        firstName: 'Selena',
        lastName: 'Gomez',
        secondName: '',
        telNumber: '89502223344',
        massiveOfValues: {
          Email: 'Gomez@yandex.ru',
          work: 'Singer',
          Sex: 'Female',
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

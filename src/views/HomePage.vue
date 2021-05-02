<template>
  <div class="home-page">
    <div class="nav">
      <div class="nav__body">
        <div class="nav__content">
          <h2 class="nav__title">Контакты</h2>
          <button
              class="nav__adder non-selectable-element"
              title="Добавить контакт"
              @click="showAddModal()"
          >➕</button>
        </div>
      </div>
    </div>
    <div class="contacts">
      <div class="contacts__body">
        <ul class="contacts__list" v-if="!isEmpty">
          <Contact
              v-for="(contact, index) in contacts"
              :key="index"
              :i="index"
              :firstName="contact.firstName"
              :lastName="contact.lastName"
              :secondName="contact.secondName"
              @showDelModal="showDelModal"
          />
        </ul>
        <p
           class="empty"
           v-else
        >Здесь пусто</p>
        <Validate
            v-show="wannaShow"
            :modalName="modalName"
            :deletedContactName="deletedContactName"
            @removeContact="removeContact()"
            @addContact="addContact"
            @unShowModal="unShowModal()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ContactPage from './ContactPage';
import Contact from '../components/Contact';
import Validate from '../components/Validate';

import { mapState } from 'vuex';

export default {
  name: 'HomePage',
  components: {
    ContactPage,
    Contact,
    Validate
  },
  data: () => ({
    newName: '',
    isEmpty: false,
    wannaShow: false,
    modalName: '',
    deletedContactName: '',
    delIndex: 0
  }),
  methods: {
    addContact(newContact) {
      this.unShowModal();
      this.contacts.push(newContact);
      this.isEmpty = false;
    },
    showAddModal() {
      this.modalName = 'AddOnFirstPage';
      this.wannaShow = true;
    },
    showDelModal(index) {
      this.modalName = 'DelOnFirstPage';
      this.deletedContactName = this.contacts[index].firstName;
      this.delIndex = index;
      this.wannaShow = true;
    },
    removeContact() {
      this.unShowModal();
      this.contacts.splice(this.delIndex, 1);
      this.delIndex = 0;
      if (this.contacts.length === 0) this.isEmpty = true;
    },
    unShowModal() {
      this.wannaShow = false;
    }
  },
  computed: {
    ...mapState(['contacts'])
  }
}
</script>

<style>
  .nav__body {
    width: 100%;
    margin-bottom: 20px;
    padding: 20px 10px;

    background-color: honeydew;
    box-shadow: 0 0 10px 1px gray;
  }

  .nav__body_padding {
    padding: 20px 0;
  }

  .nav__content{
    display: flex;
    align-items: center;
    justify-content: space-between;

    max-width: 700px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .nav__title {
    flex: 0 1 calc(50% + 71px);
    text-align: right;
    font-size: 30px;
  }

  .nav__title_margin {
    flex: 0 1 calc(50% + 225px);
    text-align: left;
  }

  .nav__adder {
    font-size: 20px;
    background-color: inherit;
  }

  .nav__adder_display {
    display: none;
  }

  .contacts__body {
    padding-top: 10px;
  }

  .contacts__list {
    max-width: 720px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .empty {
    text-align: center;
  }

  .key-style {
    background-color: honeydew;
    border: 1px solid gray;
    border-radius: 5px;
    box-shadow: 0 5px 1px 1px gray;
  }

  .non-selectable-element {
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  }

  .remover1 {
    padding: 10px;
  }

  @media screen and (max-width: 720px) {
    .nav__title {
      flex: 0 1 calc(50% + 59px);
      font-size: 25px;
    }

    .nav__title_margin {
      flex: 0 1 calc(50% + 150px);
      font-size: 20px;
    }

    .nav__body_padding {
      padding: 20px 10px;
    }

    .contacts__link1 {
      font-size: 18px;
    }

    .link {
      font-size: 15px;
    }

    .controls__fake {
      width: 105px;
    }

    .controls__undo {
      width: 50px;
      height: 50px;
      font-size: 20px;
      align-self: center;
    }

    .controls__cancale {
      width: 50px;
      height: 50px;
      font-size: 20px;
      align-self: center;
    }

    .controls__title {
      font-size: 18px;
    }

    .controls__adder {
      height: 50px;
      margin-top: 5px;
      font-size: 18px;
      align-self: center;
    }

    .default-fields__list {
      display: flex;
      flex-direction: column;
    }

    .default-fields__element {
      width: 100%;
      font-size: 15px;
    }

    .default-fields__value {
      width: 50%;
    }

    .fields__key {
      font-size: 18px;
      flex: 0 0 40%;
      width: 30%;
    }

    .fields__value {
      font-size: 18px;
      flex: 0 0 50%;
      width: 30%;
    }

    .modal__body {
      width: 350px;
      height: 200px;
      left: calc(50% - 175px);
    }

    .modal__tittle {
      font-size: 18px;
      padding: 0 10px;
    }

    .modal__input {
      width: 130px;
      font-size: 17px;
    }

    .controls__undo:active {
      margin-top: 10px;
    }

    .controls__cancale:active {
      margin-top: 10px;
    }

    .controls__adder:active {
      margin-top: 10px;
    }
  }

  @media screen and (max-width: 515px) {
    .nav__title_margin {
      flex: 0 1 auto;
      font-size: 17px;
    }

    .controls__title {
      font-size: 16px;
    }

    .default-fields__key {
      font-size: 15px;
    }

    .default-fields__input {
      font-size: 15px;
      width: 100px;
    }

    .fields__key {
      font-size: 15px;
    }

    .fields__value {
      font-size: 15px;
    }

    .controls__fake {
      width: 55px;
    }

    .controls__cancale {
      display: none;
    }

    .controls__cancale-1 {
      display: block;
      margin-top: 5px;
    }

    .controls__adder {
      display: none;
    }

    .nav__adder_display {
      display: block;
    }
  }

  @media screen and (max-width: 360px) {
    .nav__title_margin {
      flex: 0 1 auto;
      font-size: 16px;
    }

    .controls__title {
      font-size: 14px;
    }

    .controls__undo {
      margin: 0;
    }

    .controls__fake {
      width: 50px;
    }

    .controls__cancale {
      margin: 5px 0 0 0;
    }

    .contacts__link1 {
      flex-direction: column;
    }
  }
</style>

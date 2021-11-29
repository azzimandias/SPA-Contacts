<template>
  <div class="home-page">
    <div class="nav">
      <div class="nav__body">
        <div class="nav__content">
          <ThemeSwitcher/>
          <h2 class="nav__title">Contacts 📔</h2>
          <button
              class="nav__adder non-selectable-element"
              title="Add contact"
              @click="showAddModal()"
          >➕</button>
        </div>
      </div>
    </div>
    <div class="contacts">
      <div class="contacts__body">
        <ul class="contacts__list" v-if="!listIsEmpty">
          <Contact
              v-for="(contact, index) in contacts"
              :key="index"
              :contactIndex="index"
              :firstName="contact.firstName"
              :lastName="contact.lastName"
              :secondName="contact.secondName"
              @showRemoveModal="showRemoveModal"
          />
        </ul>
        <p
           class="empty"
           v-else
        >It's empty here</p>
        <Validate
            v-show="wannaShowModal"
            :modalName="modalName"
            :removeContactName="removeContactName"
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
import ThemeSwitcher from "../components/ThemeSwitcher";
import Contact from '../components/Contact';
import Validate from '../components/Validate';

import { mapState, mapMutations } from 'vuex';

export default {
  name: 'HomePage',
  components: {
    ContactPage,
    ThemeSwitcher,
    Contact,
    Validate
  },
  data: () => ({
    listIsEmpty: false,
    wannaShowModal: false,
    modalName: '',
    removeContactName: '',
    removeIndex: 0
  }),
  methods: {
    ...mapMutations(['setContacts']),
    addContact(newContact) {
      this.unShowModal();
      this.contacts.push(newContact);
      this.listIsEmpty = false;
      //localStorage.contacts.push(this.contacts[this.contacts.length - 1]);
    },
    showAddModal() {
      this.modalName = 'AddOnFirstPage';
      this.wannaShowModal = true;
    },
    showRemoveModal(contactIndex) {
      this.modalName = 'RemoveOnFirstPage';
      this.removeContactName = this.contacts[contactIndex].firstName;
      this.removeIndex = contactIndex;
      this.wannaShowModal = true;
    },
    removeContact() {
      this.unShowModal();
      this.contacts.splice(this.removeIndex, 1);
      this.removeIndex = 0;
      //localStorage.contacts = this.contacts;
      if (this.contacts.length === 0) this.listIsEmpty = true;
    },
    unShowModal() {
      this.wannaShowModal = false;
    }
  },
  computed: {
    ...mapState(['contacts'])
  },
  mounted() {
    //console.log(localStorage.getItem('contacts'));
    /*if (localStorage.getItem('contacts')) {
      this.setContacts(localStorage.getItem('contacts'));
    }
    else {
      localStorage.setItem('contacts', []);
    }*/
  }
}
</script>

<style>
  :root {
    --border-key: grey;
    --bc-key: honeydew;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --border-key: #2c3e50;
      --bc-key: darkslategrey;
    }
  }

  [data-theme="light"] {
    --border-key: grey;
    --bc-key: honeydew;
  }

  [data-theme="dark"] {
    --border-key: #2c3e50;
    --bc-key: darkslategrey;
  }

  .nav__body {
    width: 100%;
    margin-bottom: 20px;
    padding: 20px 10px;
    background-color: var(--bc-key);
    box-shadow: 0 0 10px 1px var(--border-key);
  }

  .nav__content{
    display: grid;
    grid-template-columns: 270px 1fr 27px;
    align-items: center;
    justify-content: center;
    max-width: 720px;
    margin: 0 auto;
    padding: 0 30px 0 20px;
  }

  .nav__title {
    display: inline-block;
    text-align: left;
    font-size: 30px;
  }

  .nav__adder {
    font-size: 20px;
    text-align: right;
    background-color: inherit;
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

  .non-selectable-element {
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  }

  @media screen and (max-width: 720px) {
    .nav__content{
      grid-template-columns: 40% 1fr 27px;
    }
  }

  @media screen and (max-width: 515px) {
    .nav__content{
      grid-template-columns: 27px 1fr 27px;
    }

    .nav__title {
      text-align: center;
    }
  }
</style>

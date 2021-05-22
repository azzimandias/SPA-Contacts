<template>
  <div class="home-page">
    <div class="nav">
      <div class="nav__body">
        <div class="nav__content">
          <h2 class="nav__title">Contacts</h2>
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
    listIsEmpty: false,
    wannaShowModal: false,
    modalName: '',
    removeContactName: '',
    removeIndex: 0
  }),
  methods: {
    addContact(newContact) {
      this.unShowModal();
      this.contacts.push(newContact);
      this.listIsEmpty = false;
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
      if (this.contacts.length === 0) this.listIsEmpty = true;
    },
    unShowModal() {
      this.wannaShowModal = false;
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

  .nav__content{
    display: flex;
    align-items: center;
    justify-content: space-between;

    max-width: 700px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .nav__title {
    flex: 0 1 calc(50% + 64px);
    text-align: right;
    font-size: 30px;
  }

  .nav__adder {
    font-size: 20px;
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
    .nav__title {
      flex: 0 1 calc(50% + 53px);
      font-size: 25px;
    }
  }
</style>

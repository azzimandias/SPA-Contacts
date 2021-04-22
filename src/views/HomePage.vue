<template>
  <div class="home">
    <h2>Записная книжка</h2>
    <ul v-if="!isEmpty">
      <Contact
          v-for="(contact, index) in allContacts"
          :key="index"
          :index="index"
          :firstName="contact.firstName"
          :lastName="contact.lastName"
          :secondName="contact.secondName"
          @showDelModal="showDelModal"
      />
    </ul>
    <p v-else>Здесь пусто</p>
    <button @click="showAddModal()">➕</button>
    <RemoveValidate
        v-if="wannaShow"
        :modalName="modalName"
        :delitedContactName="delitedContactName"
        @removeContact="removeContact()"
        @addContact="addContact"
        @unShowModal="unShowModal()"
    />
  </div>
</template>

<script>
import ContactPage from './ContactPage'
import Contact from '../components/Contact'
import AddContact from '../components/AddContact'
import RemoveValidate from '../components/RemoveValidate'

import { mapGetters } from 'vuex'

export default {
  name: 'HomePage',
  components: {
    ContactPage,
    Contact,
    AddContact,
    RemoveValidate
  },
  data: () => ({
    newName: '',
    isEmpty: false,
    wannaShow: false,
    modalName: '',
    delitedContactName: '',
    delIndex: 0
  }),
  methods: {
    addContact(newContact) {
      this.unShowModal();
      this.allContacts.push(newContact);
      this.isEmpty = false;
    },
    showAddModal() {
      this.modalName = 'AddOnFirstPage';
      this.wannaShow = true;
    },
    showDelModal(index) {
      this.modalName = 'DelOnFirstPage';
      this.delitedContactName = this.allContacts[index].firstName;
      this.delIndex = index;
      this.wannaShow = true;
    },
    removeContact() {
      this.unShowModal();
      this.allContacts.splice(this.delIndex, 1);
      this.delIndex = 0;
      if (this.allContacts.length === 0) this.isEmpty = true;
    },
    unShowModal() {
      this.wannaShow = false;
    }
  },
  computed: mapGetters(['allContacts'])
}
</script>

<style>
  li {
    display: flex;
    justify-content: space-between;
  }
</style>

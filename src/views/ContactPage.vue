<template>
  <div class="about">
    <router-link to="/">⬅</router-link>
    <h2>{{ getFullName() }}</h2>
    <h3>Контактная информация</h3>
    <ul>
      <KeyValue
          v-for="val in Object.entries(allContacts[getIndex].massiveOfValues)"
          :key="val.id"
          :val="val"
          @showDellModal="showDellModal"
      />
      <button @click="showAddModal()">➕</button>
      <RemoveValidate
          v-if="wannaShow"
          :modalName="modalName"
          :delitedFieldName="delitedFieldName"
          @addField="addField"
          @removeFild="removeFild()"
          @unShowModal="unShowModal()"
      />
    </ul>
  </div>
</template>

<script>
import KeyValue from '../components/KeyValue'
import RemoveValidate from '../components/RemoveValidate'
import { mapGetters } from 'vuex'

export default {
  name: 'ContactPage',
  components: {
    RemoveValidate,
    KeyValue
  },
  data: () => ({
    newName: '',
    isEmpty: false,
    wannaShow: false,
    modalName: '',
    delitedFieldName: ''
  }),
  methods: {
    getFullName() {
      return `${this.allContacts[this.getIndex].firstName}
              ${this.allContacts[this.getIndex].lastName}
              ${this.allContacts[this.getIndex].secondName}`;
    },
    showAddModal() {
      this.modalName = 'AddOnSecondPage';
      this.wannaShow = true;
    },
    showDellModal(newKey) {
      this.modalName = 'DelOnSecondPage';
      this.delitedFieldName = newKey;
      this.wannaShow = true;
    },
    addField(key, value) {
      (this.allContacts[this.getIndex].massiveOfValues)[key] = value;
      this.unShowModal();
    },
    removeFild() {
      delete (this.allContacts[this.getIndex].massiveOfValues)[this.delitedFieldName];
      this.unShowModal();
    },
    unShowModal() {
      this.wannaShow = false;
    }
  },
  computed: mapGetters(['allContacts', 'getIndex'])
}
</script>

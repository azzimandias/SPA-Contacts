<template>
  <div class="about">
    <div @click="cleanSaved">
      <router-link to="/">⬅</router-link>
    </div>
    <h2>{{ getFullName() }} {{ savingObj }}</h2>
    <h3>Контактная информация</h3>
    <ul>
      <KeyValue
          v-for="val in Object.entries(contacts[index].massiveOfValues)"
          :key="val.id"
          :val="val"
          :newKeyValue="newKeyValue"
          @done="done"
          @showDellModal="showDellModal"
          @showCanceleModal="showCanceleModal"
          @save="save"
      />

      <button
          v-if="showCancele"
          @click="showCanceleModal"
      >Отмена</button>

      <button @click="showAddModal()">➕</button>

      <RemoveValidate
          v-if="wannaShow"
          :modalName="modalName"
          :delitedFieldName="delitedFieldName"
          @addField="addField"
          @removeFild="removeFild()"
          @canceleNew="canceleNew"
          @unShowModal="unShowModal()"
      />
    </ul>
  </div>
</template>

<script>
import KeyValue from '../components/KeyValue';
import RemoveValidate from '../components/RemoveValidate';
import { mapGetters } from 'vuex';
import { mapState } from 'vuex';

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
    delitedFieldName: '',
    newKeyValue: '',
    showCancele: false,
    savedMassive: {},
    nk: '',
    nv: '',
    ok: '',
    ov: ''
  }),
  methods: {
    getFullName() {
      Object.assign(this.savedMassive, this.contacts[this.index].massiveOfValues);
      return `${this.contacts[this.index].firstName}
              ${this.contacts[this.index].lastName}
              ${this.contacts[this.index].secondName}`;
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
      (this.contacts[this.index].massiveOfValues)[key] = value;
      this.unShowModal();
    },
    removeFild() {
      delete (this.contacts[this.index].massiveOfValues)[this.delitedFieldName];
      this.unShowModal();
    },
    unShowModal() {
      this.wannaShow = false;
    },
    save() {
      this.$store.commit('updateSaved', this.contacts[this.index].massiveOfValues);
    },
    cleanSaved() {
      this.contacts[this.index].massiveOfValues = {};
      this.$store.commit('updateSaved', {});
    },
    done(key, value, old_key, old_value) {
      this.nk = key;
      this.nv = value;
      this.ok = old_key;
      this.ov = old_value;

      (this.contacts[this.index].massiveOfValues)[key] = (this.contacts[this.index].massiveOfValues)[old_key];
      this.$set(this.contacts[this.index].massiveOfValues, `${key}`, value);
      delete this.contacts[this.index].massiveOfValues[old_key];
      (this.contacts[this.index].massiveOfValues)[key] = value;
      //Object.defineProperty(this.allContacts[this.getIndex].massiveOfValues, key,
      //    Object.getOwnPropertyDescriptor(this.allContacts[this.getIndex].massiveOfValues, old_key));
      //delete (this.allContacts[this.getIndex].massiveOfValues)[old_key];

      this.showCancele = true;

      console.log(key, value, old_key, old_value);
      console.log(this.contacts[this.index].massiveOfValues);
    },
    showCanceleModal() {
      this.modalName = 'CanOnSecondPage';
      this.wannaShow = true;
    },
    canceleNew() {
      this.contacts[this.index].massiveOfValues = this.savedMassive;
      this.showCancele = false;
      this.unShowModal();
    }
  },
  computed: {
    savingObj() {
      Object.assign(this.savedMassive, this.contacts[this.index].massiveOfValues);
      return '';
    },
    ...mapGetters(['allContacts', 'getIndex', 'getSaved', 'getI']),
    ...mapState(['contacts', 'index', 'savedMassiveOfValues', 'i'])
  }


}
</script>

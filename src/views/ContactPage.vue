<template>
  <div class="ContactPage">
    {{ CloneMassiveOfValues }}
    <div class="liave-page">
      <div @click="cleanSaved()">
        <router-link to="/">⬅</router-link>
      </div>
      <h2>{{ getFullName() }}</h2>
    </div>
    <br>
    <div class="controls">
      <button
          v-show="showUndo"
          @click="undoOneThing()"
      >↩Undo</button>
      <h3>Контактная информация</h3>
      <button @click="showAddModal()">➕</button>
    </div>

    <ul>
      <KeyValue
          v-for="val in Object.entries(savedMassiveOfValues)"
          :key="val.id"
          :val="val"
          :newKeyValue="newKeyValue"
          @done="done"
          @showDellModal="showDellModal"
          @showCanceleModal="showCanceleModal()"
      />
    </ul>

    <div>
      <button
          v-if="showCancele"
          @click="showCanceleModal()"
      >Отменить все изменения</button>
    </div>

    <div class="remove-window">
      <RemoveValidate
          v-if="wannaShow"
          :modalName="modalName"
          :delitedFieldName="delitedFieldName"
          @addField="addField"
          @removeFild="removeFild()"
          @canceleAll="canceleAll()"
          @unShowModal="unShowModal()"
      />
    </div>
  </div>
</template>

<script>
import KeyValue from '../components/KeyValue';
import RemoveValidate from '../components/RemoveValidate';
import { mapState } from 'vuex';

export default {
  name: 'ContactPage',
  components: {
    RemoveValidate,
    KeyValue
  },
  data: () => ({
    //componentKey: 0,
    newName: '',
    isEmpty: false,
    wannaShow: false,
    modalName: '',
    delitedFieldName: '',
    newKeyValue: '',
    showUndo: false,
    showCancele: false,
    savedMassiveOfValues: {},
    undo: [],
    addedKeyValue: [],
    deletedKeyValue: [],
    changedKeyValue: [],
    forOptimize: []
  }),
  methods: {
    /*forceRerender() {
      this.componentKey += 1;
    },*/
/////////////////////////////////////////////////////////////////////////Clean///////////////////
    cleanSaved() {
      this.updateContacts();
      this.updateSaved();
      this.cleanUndo();
    },
    updateSaved() {
      this.savedMassiveOfValues = {};
    },
    updateContacts() {
      this.$store.commit('updateContacts');
      Object.assign(this.contacts[this.index].massiveOfValues,
          this.savedMassiveOfValues);
    },
    getFullName() {
      return `${this.contacts[this.index].firstName}
              ${this.contacts[this.index].lastName}
              ${this.contacts[this.index].secondName}`;
    },
/////////////////////////////////////////////////////////////////////////Undo///////////////////
    updateUndo(str){
      switch (str) {
        case 'wasAdded':
          this.undo.push('wasAdded');
          break;
        case 'wasDeleted':
          this.undo.push('wasDeleted');
          break;
        case 'wasChanged':
          this.undo.push('wasChanged');
          break;
      }
    },
    undoOneThing() {
      switch (this.undo[this.undo.length - 1]) {
        case 'wasAdded':
          this.undo.splice(this.searchLastIndex(this.undo), 1);
          this.goBackAdd();
          break;
        case'wasDeleted':
          this.undo.splice(this.searchLastIndex(this.undo), 1);
          this.goBackDel();
          break;
        case 'wasChanged':
          this.undo.splice(this.searchLastIndex(this.undo), 1);
          this.goBackChe();
          break;
      }
    },
    goBackAdd() {
      this.getAllIndexes(this.addedKeyValue[this.searchLastIndex(this.addedKeyValue)]);
      delete this.savedMassiveOfValues[this.forOptimize[0]];
      this.addedKeyValue.splice(this.searchLastIndex(this.addedKeyValue), 1);
      this.cleanForOptimize();
      this.unShowUndo();
    },
    goBackDel() {
      this.getAllIndexes(this.deletedKeyValue[this.searchLastIndex(this.deletedKeyValue)]);
      this.savedMassiveOfValues[this.forOptimize[0]] = this.forOptimize[1];
      this.deletedKeyValue.splice(this.searchLastIndex(this.deletedKeyValue), 1);
      this.cleanForOptimize();
      this.unShowUndo();
    },
    goBackChe() {
      this.getAllIndexes(this.changedKeyValue[this.searchLastIndex(this.changedKeyValue)]);
      this.savedMassiveOfValues[this.forOptimize[0]] = this.savedMassiveOfValues[this.forOptimize[2]];
      delete (this.savedMassiveOfValues)[this.forOptimize[2]];
      this.savedMassiveOfValues[this.forOptimize[0]] = this.forOptimize[1];
      this.changedKeyValue.splice(this.searchLastIndex(this.changedKeyValue), 1);
      this.cleanForOptimize();
      this.unShowUndo();
    },
    searchLastIndex(array) {
      return array.lastIndexOf(array[array.length - 1]);
    },
    getAllIndexes(array) {
      for(let element of array) {
        this.forOptimize.push(element);
      }
    },
    cleanForOptimize() {
      this.forOptimize = [];
    },
    unShowUndo() {
      if (this.undo.length === 0) {
        this.showUndo = false;
        this.showCancele = false;
      }
    },
    cleanUndo() {
      this.undo = [];
    },
/////////////////////////////////////////////////////////////////////////Add///////////////////
    showAddModal() {
      this.modalName = 'AddOnSecondPage';
      this.wannaShow = true;
    },
    addField(key, value) {
      (this.savedMassiveOfValues)[key] = value;
      this.unShowModal();
      this.showCancele = true;
      this.showUndo = true;
      this.updateUndo('wasAdded');
      this.addedKeyValue.push([key, value]);
    },
/////////////////////////////////////////////////////////////////////////Del///////////////////
    showDellModal(newKey) {
      this.modalName = 'DelOnSecondPage';
      this.delitedFieldName = newKey;
      this.wannaShow = true;
    },
    removeFild() {
      this.deletedKeyValue.push([this.delitedFieldName,
                                this.savedMassiveOfValues[this.delitedFieldName]]);
      delete (this.savedMassiveOfValues)[this.delitedFieldName];
      this.unShowModal();
      this.showCancele = true;
      this.showUndo = true;
      this.updateUndo('wasDeleted');
    },
/////////////////////////////////////////////////////////////////////////Redecting///////////////////
    done(key, value, old_key, old_value) {
      this.changedKeyValue.push([old_key, old_value, key, value]);
      (this.savedMassiveOfValues)[key] = (this.savedMassiveOfValues)[old_key];
      delete (this.savedMassiveOfValues)[old_key];
      (this.savedMassiveOfValues)[key] = value;
      //Object.defineProperty(this.allContacts[this.getIndex].massiveOfValues, key,
      //    Object.getOwnPropertyDescriptor(this.allContacts[this.getIndex].massiveOfValues, old_key));
      //delete (this.allContacts[this.getIndex].massiveOfValues)[old_key];

      this.showCancele = true;
      this.showUndo = true;

      this.updateUndo('wasChanged');

      console.log(key, value, old_key, old_value);
      console.log(this.savedMassiveOfValues);
    },
/////////////////////////////////////////////////////////////////////////CanceleAll///////////////////
    showCanceleModal() {
      this.modalName = 'CanOnSecondPage';
      this.wannaShow = true;
    },
    canceleAll() {
      this.updateSaved();
      Object.assign(this.savedMassiveOfValues,
                    this.contacts[this.index].massiveOfValues);
      this.showCancele = false;
      this.showUndo = false;
      this.unShowModal();
      this.cleanUndo();
      this.addedKeyValue = [];
      this.deletedKeyValue = [];
      this.changedKeyValue = [];
    },
//////////////////////////////////////////////////////////////////////////////////////////////////////
    unShowModal() {
      this.wannaShow = false;
    },
  },
  computed: {
    CloneMassiveOfValues() {
      this.savedMassiveOfValues = {};
      Object.assign(this.savedMassiveOfValues,
                    this.contacts[this.index].massiveOfValues);
      return '';
    },
    ...mapState(['contacts', 'index'])
  }
}
</script>

<style>
  .liave-page {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .controls {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  h3 {
    /*flex-basis: auto;
    flex-grow: 1;*/
  }

  ul {
    padding: 0 60px;
  }

  .remove-window {

  }

  button {
    min-width: 60px;
    max-width: 200px;
    max-height: 30px;
    margin: 0;
    padding: 5px;
  }
</style>

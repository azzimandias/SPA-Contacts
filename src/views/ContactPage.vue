<template>
  <div class="ContactPage">
    {{ CloneMassiveOfValues }}
    <div class="liave-page">
      <div @click="cleanSaved()">
        <router-link to="/">⬅</router-link>
      </div>
      <h2 class="forMargin1" >{{ getLastname }} {{ getName }} {{ getSecondname }}</h2>
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

      <DefaultField
          :firstName="this.firstName"
          :lastName="this.lastName"
          :secondName="this.secondName"
          :telNumber="this.telNumber"
          @go="go"
      />

    <hr/>

    <ul v-if="!isEmpty">
      <KeyValue
          v-for="(val, i) in Object.entries(savedMassiveOfValues)"
          :key="getKey(i)"
          :val="val"
          :newKeyValue="newKeyValue"
          @done="done"
          @showDellModal="showDellModal"
          @showCanceleModal="showCanceleModal()"
      />
    </ul>
    <p v-else>Здесь пусто</p>

    <div>
      <button
          v-if="showCancele"
          @click="showCanceleModal()"
      >Отменить все изменения</button>
    </div>

    <div class="remove-window">
      <Validate
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
import Validate from '../components/Validate';
import DefaultField from '../components/DefaultField'
import { mapState } from 'vuex';

export default {
  name: 'ContactPage',
  components: {
    Validate,
    KeyValue,
    DefaultField
  },
  data: () => ({
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
    changedDefKeyValue: [],
    forOptimize: [],
    firstName: '',
    lastName: '',
    secondName: '',
    telNumber: 0,
    defArray: [],
    componentKey: 1,
    flg: false,
  }),
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
    getKey(id) {
      return (id + this.componentKey);
    },
/////////////////////////////////////////////////////////////////////////Clean///////////////////
    cleanSaved() {
      this.updateContacts();
      this.updateSaved();
      this.cleanUndo();
      localStorage.removeItem('index');
    },
    updateContacts() {
      this.defFieldsMutation(this.firstName, this.lastName, this.secondName, this.telNumber);
      this.$store.commit('updateContacts', this.savedMassiveOfValues);
      this.isEmpty = false;
    },
    updateSaved() {
      this.savedMassiveOfValues = {};
    },
/////////////////////////////////////////////////////////////////////////Undo///////////////////
    updateUndo(str){
      switch (str) {
        case 'wasAdded':
          this.undo.push(str);
          break;
        case 'wasDeleted':
          this.undo.push(str);
          break;
        case 'wasChanged':
          this.undo.push(str);
          break;
        case 'wasChangedDef':
          this.undo.push(str);
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
        case 'wasChangedDef':
          this.undo.splice(this.searchLastIndex(this.undo), 1);
          this.goBackCheDef();
          break;
      }
    },
    goBackAdd() {
      this.getAllIndexes(this.addedKeyValue[this.searchLastIndex(this.addedKeyValue)]);
      delete this.savedMassiveOfValues[this.forOptimize[0]];
      this.addedKeyValue.splice(this.searchLastIndex(this.addedKeyValue), 1);
      this.cleanForOptimize();
      this.unShowUndo();
      this.getIsEmpty();
      this.forceRerender();
    },
    goBackDel() {
      this.getAllIndexes(this.deletedKeyValue[this.searchLastIndex(this.deletedKeyValue)]);
      this.savedMassiveOfValues[this.forOptimize[0]] = this.forOptimize[1];
      this.deletedKeyValue.splice(this.searchLastIndex(this.deletedKeyValue), 1);
      this.cleanForOptimize();
      this.unShowUndo();
      this.getIsEmpty();
      this.forceRerender();
    },
    goBackChe() {
      this.getAllIndexes(this.changedKeyValue[this.searchLastIndex(this.changedKeyValue)]);
      let obj = this.ObjMutation(this.forOptimize[2]);
      this.savedMassiveOfValues[this.forOptimize[0]] = this.savedMassiveOfValues[this.forOptimize[2]];
      delete (this.savedMassiveOfValues)[this.forOptimize[2]];
      this.savedMassiveOfValues[this.forOptimize[0]] = this.forOptimize[1];
      Object.assign(this.savedMassiveOfValues, obj);
      this.changedKeyValue.splice(this.searchLastIndex(this.changedKeyValue), 1);
      this.cleanForOptimize();
      this.unShowUndo();
      this.forceRerender();
    },
    goBackCheDef() {
      this.getAllIndexes(this.changedDefKeyValue[this.searchLastIndex(this.changedDefKeyValue)]);
      this.firstName = this.forOptimize[0];
      this.lastName = this.forOptimize[1];
      this.secondName = this.forOptimize[2];
      this.telNumber = this.forOptimize[3];
      this.defFieldsMutation(this.forOptimize[0],
                            this.forOptimize[1],
                            this.forOptimize[2],
                            this.forOptimize[3]);
      this.changedDefKeyValue.splice(this.searchLastIndex(this.changedDefKeyValue), 1);
      this.cleanForOptimize();
      this.unShowUndo();
      this.getName;
      this.getLastname;
      this.getSecondname;
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
      this.savedMassiveOfValues[key] = value;
      this.unShowModal();
      this.showCancele = true;
      this.showUndo = true;
      this.updateUndo('wasAdded');
      this.addedKeyValue.push([key, value]);
      this.isEmpty = false;
      this.forceRerender();
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
      this.getIsEmpty();
      this.forceRerender();
    },
/////////////////////////////////////////////////////////////////////////Redecting///////////////////
    done(key, value, old_key, old_value) {
      this.changedKeyValue.push([old_key, old_value, key, value]);
      let obj = this.ObjMutation(old_key);
      this.savedMassiveOfValues[key] = this.savedMassiveOfValues[old_key];
      delete this.savedMassiveOfValues[old_key];
      this.savedMassiveOfValues[key] = value;
      Object.assign(this.savedMassiveOfValues, obj);

      this.showCancele = true;
      this.showUndo = true;
      this.updateUndo('wasChanged');
      this.forceRerender();
    },
/////////////////////////////////////////////////////////////////////////Redecting Def///////////////////
    go(value1, value2, value3, value4, value11, value22, value33, value44) {
      this.changedDefKeyValue.push([value11, value22, value33, value44]);

      this.firstName = value1;
      this.lastName = value2;
      this.secondName = value3;
      this.telNumber = value4;
      this.defFieldsMutation(value1, value2, value3, value4);

      this.showCancele = true;
      this.showUndo = true;
      this.updateUndo('wasChangedDef');
      this.getName;
      this.getLastname;
      this.getSecondname;
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
      this.defFieldsMutation(this.defArray[0], this.defArray[1], this.defArray[2], this.defArray[3]);
      this.showCancele = false;
      this.showUndo = false;
      this.unShowModal();
      this.cleanUndo();
      this.addedKeyValue = [];
      this.deletedKeyValue = [];
      this.changedKeyValue = [];
      this.getIsEmpty();
    },
//////////////////////////////////////////////////////////////////////////////////////////////////////
    unShowModal() {
      this.wannaShow = false;
    },
    getIsEmpty() {
      this.isEmpty = Object.keys(this.savedMassiveOfValues).length === 0;
    },
    defFieldsMutation(value1, value2, value3, value4) {
      let array = [];
      array[0] = value1;
      array[1] = value2;
      array[2] = value3;
      array[3] = value4;
      this.$store.commit('updateContactsDef', array);
    },
    ObjMutation(old_key) {
      let obj = {};
      let flag = false
      for(let element in this.savedMassiveOfValues) {
        if (flag) {
          obj[element] = this.savedMassiveOfValues[element];
          delete this.savedMassiveOfValues[element];
        }
        if (this.savedMassiveOfValues[element] === this.savedMassiveOfValues[old_key]) {
          flag = true;
        }
      }
      return obj;
    },
  },
  computed: {
    CloneMassiveOfValues() {
      if (!this.flg) {
        this.updateSaved();
        Object.assign(this.savedMassiveOfValues,
            this.contacts[this.index].massiveOfValues);
        this.getIsEmpty();
        this.defArray.push(this.firstName = this.contacts[this.index].firstName);
        this.defArray.push(this.lastName = this.contacts[this.index].lastName);
        this.defArray.push(this.secondName = this.contacts[this.index].secondName);
        this.defArray.push(this.telNumber = this.contacts[this.index].telNumber);
        this.flg = true;
      }
      return '';
    },
    getName() {
      return `${this.contacts[this.index].firstName}`;
    },
    getLastname() {
      if (this.contacts[this.index].lastName !== undefined) {
        return `${this.contacts[this.index].lastName}`;
      } else {
        return '';
      }
    },
    getSecondname() {
      if (this.contacts[this.index].secondName !== undefined) {
        return `${this.contacts[this.index].secondName}`;
      } else {
        return '';
      }
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

  .forMargin1 {
    margin: 0 35% 0 0;
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

  .forMargin {
    margin: 0 510px 0 0;
  }
</style>

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
          @mousedown="undoOneThing()"
      >↩Undo</button>
      {{ unShowUndo() }}
      <h3>Контактная информация</h3>
      <button @click="showAddModal()">➕</button>
    </div>
      <DefaultField
          :propFullName="fullName"
          @go="go"
          :key="defaultFieldKey"
      />
    <hr/>
    <ul v-if="!isEmpty">
      <KeyValue
          v-for="(val, i) in Object.entries(savedMassiveOfValues)"
          :key="getKey(i)"
          :val="val"
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
          :deletedFieldName="deletedFieldName"
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
  data() {
    return {
      isEmpty: false,
      flag: false,
      wannaShow: false,
      showUndo: false,
      showCancele: false,
      modalName: '',
      deletedFieldName: '',
      savedMassiveOfValues: {},
      undo: [],
      whatsUndo: [[], [], [], []],
      forOptimize: [],
      fullName: [],
      defArray: [],
      KeyValueKey: 0,
      defaultFieldKey: 0,
    }
  },
  methods: {
    forceRerenderKeyValue() {
      this.KeyValueKey += 1;
    },
    forceRerenderDefaultField() {
      this.defaultFieldKey += 1;
    },
    getKey(id) {
      return (id + this.KeyValueKey);
    },
/////////////////////////////////////////////////////////////////////////Clean///////////////////
    cleanSaved() {
      this.updateContacts();
      this.updateSaved();
      this.cleanUndo();
      localStorage.removeItem('index');
    },
    updateContacts() {
      this.defFieldsMutation(this.fullName);
      this.$store.commit('updateContacts', this.savedMassiveOfValues);
      this.isEmpty = false;
    },
    updateSaved() {
      this.savedMassiveOfValues = {};
    },
/////////////////////////////////////////////////////////////////////////Undo///////////////////
    undoOneThing() {
      switch (this.undo[this.undo.length - 1]) {
        case 'wasAdded':
          this.goBackAdd();
          break;
        case'wasDeleted':
          this.goBackDel();
          break;
        case 'wasChanged':
          this.goBackChe();
          break;
        case 'wasChangedDef':
          this.goBackCheDef();
          break;
      }
      this.undo.splice(this.searchLastIndex(this.undo), 1);
    },
    goBackAdd() {
      this.getAllIndexes(this.whatsUndo[0][this.searchLastIndex(this.whatsUndo[0])]);
      delete this.savedMassiveOfValues[this.forOptimize[0]];
      this.whatsUndo[0].splice(this.searchLastIndex(this.whatsUndo[0]), 1);
      this.cleanForOptimize();
      this.getIsEmpty();
      this.forceRerenderKeyValue();
    },
    goBackDel() {
      this.getAllIndexes(this.whatsUndo[1][this.searchLastIndex(this.whatsUndo[1])]);
      let obj = this.ObjMutation(this.forOptimize[2]);
      this.savedMassiveOfValues[this.forOptimize[0]] = this.forOptimize[1];
      Object.assign(this.savedMassiveOfValues, obj);
      this.whatsUndo[1].splice(this.searchLastIndex(this.whatsUndo[1]), 1);

      this.cleanForOptimize();
      this.getIsEmpty();
      this.forceRerenderKeyValue();
    },
    goBackChe() {
      this.getAllIndexes(this.whatsUndo[2][this.searchLastIndex(this.whatsUndo[2])]);
      let obj = this.ObjMutation(this.forOptimize[2]);
      this.savedMassiveOfValues[this.forOptimize[0]] = this.savedMassiveOfValues[this.forOptimize[2]];
      delete (this.savedMassiveOfValues)[this.forOptimize[2]];
      this.savedMassiveOfValues[this.forOptimize[0]] = this.forOptimize[1];
      Object.assign(this.savedMassiveOfValues, obj);
      this.whatsUndo[2].splice(this.searchLastIndex(this.whatsUndo[2]), 1);
      this.cleanForOptimize();
      this.forceRerenderKeyValue();
    },
    goBackCheDef() {
      this.getAllIndexes(this.whatsUndo[3][this.searchLastIndex(this.whatsUndo[3])]);
      this.defFieldsMutation(this.forOptimize);
      this.updateFullName;
      this.forceRerenderDefaultField();
      this.whatsUndo[3].splice(this.searchLastIndex(this.whatsUndo[3]), 1);
      this.cleanForOptimize();
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
      this.undo.push('wasAdded');
      this.whatsUndo[0].push([key, value]);
      this.isEmpty = false;
    },
/////////////////////////////////////////////////////////////////////////Del///////////////////
    showDellModal(newKey) {
      this.modalName = 'DelOnSecondPage';
      this.deletedFieldName = newKey;
      this.wannaShow = true;
    },
    removeFild() {
      let key = Object.keys(this.savedMassiveOfValues);
      for (let element of key) {
        if (element === this.deletedFieldName) {
          break;
        }
        key = element;
      }
      if (typeof key !== 'string') {
        key = 0;
      }
      this.whatsUndo[1].push([this.deletedFieldName,
                                this.savedMassiveOfValues[this.deletedFieldName],
                                key]);
      delete (this.savedMassiveOfValues)[this.deletedFieldName];
      this.unShowModal();
      this.showCancele = true;
      this.showUndo = true;
      this.undo.push('wasDeleted');
      this.getIsEmpty();
    },
/////////////////////////////////////////////////////////////////////////redaction///////////////////
    done(keysValues) {
      this.whatsUndo[2].push(keysValues);

      if (keysValues[0] === keysValues[2]) {
        this.savedMassiveOfValues[keysValues[0]] = keysValues[3];
      }
      if (keysValues[0] !== keysValues[2]) {
        let obj = this.ObjMutation(keysValues[0]);
        Object.defineProperty(this.savedMassiveOfValues, keysValues[2],
            Object.getOwnPropertyDescriptor(this.savedMassiveOfValues, keysValues[0]));
        delete this.savedMassiveOfValues[keysValues[0]];
        Object.assign(this.savedMassiveOfValues, obj);
      }

      this.showCancele = true;
      this.showUndo = true;
      this.undo.push('wasChanged');
    },
/////////////////////////////////////////////////////////////////////////redaction Def///////////////////
    go(fullName, oldFullName) {
      this.whatsUndo[3].push(oldFullName);
      this.fullName = fullName;
      this.defFieldsMutation(fullName);

      this.showCancele = true;
      this.showUndo = true;
      this.undo.push('wasChangedDef');
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
      this.defFieldsMutation(this.defArray);
      this.showCancele = false;
      this.showUndo = false;
      this.unShowModal();
      this.cleanUndo();
      this.whatsUndo = [[], [], [], []];
      this.getIsEmpty();
    },
//////////////////////////////////////////////////////////////////////////////////////////////////////
    unShowModal() {
      this.wannaShow = false;
    },
    getIsEmpty() {
      this.isEmpty = Object.keys(this.savedMassiveOfValues).length === 0;
    },
    defFieldsMutation(fullName) {
      this.$store.commit('updateContactsDef', fullName);
    },
    ObjMutation(old_key) {
      let obj = {};
      let flag = false
      if (old_key === 0) {
        obj = this.savedMassiveOfValues;
        this.savedMassiveOfValues = {};
      } else {
        for (let element in this.savedMassiveOfValues) {
          if (flag) {
            obj[element] = this.savedMassiveOfValues[element];
            delete this.savedMassiveOfValues[element];
          }
          if (this.savedMassiveOfValues[element] === this.savedMassiveOfValues[old_key]) {
            flag = true;
          }
        }
      }
      return obj;
    },
  },
  computed: {
    CloneMassiveOfValues() {
      if (!this.flag) {
        this.updateSaved();
        Object.assign(this.savedMassiveOfValues,
            this.contacts[this.index].massiveOfValues);
        this.getIsEmpty();
        this.defArray.push(this.fullName[0] = this.contacts[this.index].firstName);
        this.defArray.push(this.fullName[1] = this.contacts[this.index].lastName);
        this.defArray.push(this.fullName[2] = this.contacts[this.index].secondName);
        this.defArray.push(this.fullName[3] = this.contacts[this.index].telNumber);
        this.flag = true;
      }
      return '';
    },
    updateFullName() {
      this.fullName[0] = this.contacts[this.index].firstName;
      this.fullName[1] = this.contacts[this.index].lastName;
      this.fullName[2] = this.contacts[this.index].secondName;
      this.fullName[3] = this.contacts[this.index].telNumber;
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

  /*.forMargin {
    margin: 0 510px 0 0;
  }*/

  label {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
  }
</style>

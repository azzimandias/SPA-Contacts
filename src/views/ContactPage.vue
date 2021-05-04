<template>
  <div class="contact-page">
    {{ cloneMassiveOfValues() }}
    {{ pup }}
    <div class="nav">
      <div class="nav__body nav__body_padding">
        <div class="nav__content">
          <div class="nav__link-body">
            <div class="nav__link"  @click="cleanAllSavedData()">
              <router-link class="link non-selectable-element"
                           title="Contacts"
                           to="/"
              >◀</router-link>
            </div>
          </div>
          <div class="nav__title nav__title_margin" >
            <div class="lastname">{{ getLastname() }}</div>
            {{ getName() }}
            {{ getSecondName() }}
          </div>
          <div class="nav__link non-visible"></div>
          <button
              class="nav__adder nav__adder_display non-selectable-element"
              title="Add field"
              @click="showAddModal()"
          >➕</button>
        </div>
      </div>
    </div>
    <div class="contact-page-body">
      <div class="controls">
        <div class="controls__fake" v-if="!showUndo"></div>
        <div class="controls__buttons" v-else-if="showUndo">
          <button
              class="controls__undo key-style non-selectable-element"
              title="Undo the last change"
              @mousedown="whatIsUndo()"
          >↩</button>
          {{ unShowUndo() }}
          <button
              class="controls__cancel key-style non-selectable-element"
              title="Undo all changes"
              @click="showCancelModal()"
          >🔄</button>
        </div>
        <h3 class="controls__title">Contact information</h3>
        <div class="controls__fake">
          <button
              class="controls__cancel controls__cancel-1 key-style non-selectable-element"
              title="Undo all changes"
              @click="showCancelModal()"
              v-if="showUndo"
          >🔄</button>
          <button
              class="controls__adder key-style non-selectable-element"
              title="Add field"
              @click="showAddModal()"
          >➕</button>
        </div>
      </div>
      <DefaultField
          :propFullContactName="fullContactName"
          :key="defaultFieldKey"
          @changeDefaultField="changeDefaultField"
      />
      <ul class="fields" v-if="!fieldsIsEmpty">
        <KeyValue
            v-for="(val, i) in Object.entries(savedMassiveOfValues)"
            :key="getFieldKey(i)"
            :val="val"
            @changeField="changeField"
            @showRemoveModal="showRemoveModal"
        />
      </ul>
      <p
          class="empty"
          v-else
      >It's empty here</p>
  </div>
    <Validate
        v-if="wannaShowModal"
        :modalName="modalName"
        :removeFieldName="removeFieldName"
        @addField="addField"
        @removeField="removeField()"
        @cancelAll="cancelAll()"
        @unShowModal="unShowModal()"
    />
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
      fieldsIsEmpty: false,
      doCloneMassive: true,
      wannaShowModal: false,
      showUndo: false,
      showCancel: false,
      modalName: '',
      removeFieldName: '',
      savedMassiveOfValues: {},
      undo: [],
      whatsUndo: [[], [], [], []],
      forOptimize: [],
      fullContactName: [],
      defaultArray: [],
      fieldKey: 0,
      defaultFieldKey: 0,
    }
  },
  methods: {
    forceRerenderFields() {
      this.fieldKey += 1;
    },
    forceRerenderDefaultFields() {
      this.defaultFieldKey += 1;
    },
    getFieldKey(id) {
      return (id + this.fieldKey);
    },
/////////////////////////////////////////////////////////////////////////Clean///////////////////
    cleanAllSavedData() {
      this.contactMassiveMutation();
      this.cleanSavedMassive();
      this.cleanUndo();
      localStorage.removeItem('index');
    },
    contactMassiveMutation() {
      this.defaultFieldsMutation(this.fullContactName);
      this.$store.commit('contactMassiveMutation', this.savedMassiveOfValues);
      this.fieldsIsEmpty = false;
    },
    cleanSavedMassive() {
      this.savedMassiveOfValues = {};
    },
/////////////////////////////////////////////////////////////////////////Undo///////////////////
    whatIsUndo() {
      switch (this.undo[this.undo.length - 1]) {
        case 'wasAdded':
          this.undoAdd();
          break;
        case'wasRemoved':
          this.undoRemove();
          break;
        case 'wasChanged':
          this.undoChangedFields();
          break;
        case 'wasChangedDefault':
          this.undoChangedDefaultFields();
          break;
      }
      this.undo.splice(this.searchLastIndex(this.undo), 1);
    },
    undoAdd() {
      this.getAllIndexes(this.whatsUndo[0][this.searchLastIndex(this.whatsUndo[0])]);
      delete this.savedMassiveOfValues[this.forOptimize[0]];
      this.whatsUndo[0].splice(this.searchLastIndex(this.whatsUndo[0]), 1);
      this.cleanForOptimize();
      this.getIsEmpty();
      this.forceRerenderFields();
    },
    undoRemove() {
      this.getAllIndexes(this.whatsUndo[1][this.searchLastIndex(this.whatsUndo[1])]);
      let obj = this.ObjMutation(this.forOptimize[2]);
      this.savedMassiveOfValues[this.forOptimize[0]] = this.forOptimize[1];
      Object.assign(this.savedMassiveOfValues, obj);
      this.whatsUndo[1].splice(this.searchLastIndex(this.whatsUndo[1]), 1);

      this.cleanForOptimize();
      this.getIsEmpty();
      this.forceRerenderFields();
    },
    undoChangedFields() {
      this.getAllIndexes(this.whatsUndo[2][this.searchLastIndex(this.whatsUndo[2])]);
      let obj = this.ObjMutation(this.forOptimize[2]);
      this.savedMassiveOfValues[this.forOptimize[0]] = this.savedMassiveOfValues[this.forOptimize[2]];
      delete (this.savedMassiveOfValues)[this.forOptimize[2]];
      this.savedMassiveOfValues[this.forOptimize[0]] = this.forOptimize[1];
      Object.assign(this.savedMassiveOfValues, obj);
      this.whatsUndo[2].splice(this.searchLastIndex(this.whatsUndo[2]), 1);
      this.cleanForOptimize();
      this.forceRerenderFields();
    },
    undoChangedDefaultFields() {
      this.getAllIndexes(this.whatsUndo[3][this.searchLastIndex(this.whatsUndo[3])]);
      this.defaultFieldsMutation(this.forOptimize);
      this.updateFullName();
      this.forceRerenderDefaultFields();
      this.whatsUndo[3].splice(this.searchLastIndex(this.whatsUndo[3]), 1);
      this.cleanForOptimize();
      this.getName();
      this.getLastname();
      this.getSecondName();
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
        this.showCancel = false;
      }
    },
    cleanUndo() {
      this.undo = [];
    },
/////////////////////////////////////////////////////////////////////////Add///////////////////
    showAddModal() {
      this.modalName = 'AddOnSecondPage';
      this.wannaShowModal = true;
    },
    addField(key, value) {
      this.savedMassiveOfValues[key] = value;
      this.unShowModal();
      this.showCancel = true;
      this.showUndo = true;
      this.undo.push('wasAdded');
      this.whatsUndo[0].push([key, value]);
      this.fieldsIsEmpty = false;
    },
/////////////////////////////////////////////////////////////////////////Remove///////////////////
    showRemoveModal(newKey) {
      this.modalName = 'RemoveOnSecondPage';
      this.removeFieldName = newKey;
      this.wannaShowModal = true;
    },
    removeField() {
      let key = Object.keys(this.savedMassiveOfValues);
      for (let element of key) {
        if (element === this.removeFieldName) {
          break;
        }
        key = element;
      }
      if (typeof key !== 'string') {
        key = 0;
      }
      this.whatsUndo[1].push([this.removeFieldName,
                                this.savedMassiveOfValues[this.removeFieldName],
                                key]);
      delete (this.savedMassiveOfValues)[this.removeFieldName];
      this.unShowModal();
      this.showCancel = true;
      this.showUndo = true;
      this.undo.push('wasRemoved');
      this.getIsEmpty();
    },
/////////////////////////////////////////////////////////////////////////Change///////////////////
    changeField(keysValues, trim) {
      if (!trim) {
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

        this.showCancel = true;
        this.showUndo = true;
        this.undo.push('wasChanged');
      }
    },
/////////////////////////////////////////////////////////////////////////ChangeDef///////////////////
    changeDefaultField(fullName, oldFullName, trim) {
      if (!trim) {
        this.whatsUndo[3].push(oldFullName);
        this.fullContactName = fullName;
        this.defaultFieldsMutation(fullName);

        this.showCancel = true;
        this.showUndo = true;
        this.undo.push('wasChangedDefault');
        this.getName();
        this.getLastname();
        this.getSecondName();
      }
    },
/////////////////////////////////////////////////////////////////////////CancelAll///////////////////
    showCancelModal() {
      this.modalName = 'CanOnSecondPage';
      this.wannaShowModal = true;
    },
    cancelAll() {
      this.cleanSavedMassive();
      Object.assign(this.savedMassiveOfValues,
                    this.contacts[this.index].massiveOfValues);
      this.defaultFieldsMutation(this.defaultArray);
      this.showCancel = false;
      this.showUndo = false;
      this.unShowModal();
      this.cleanUndo();
      this.whatsUndo = [[], [], [], []];
      this.getIsEmpty();
      this.forceRerenderDefaultFields();
      this.updateFullName();
    },
//////////////////////////////////////////////////////////////////////////////////////////////////////
    unShowModal() {
      this.wannaShowModal = false;
    },
    getIsEmpty() {
      this.fieldsIsEmpty = Object.keys(this.savedMassiveOfValues).length === 0;
    },
    defaultFieldsMutation(fullName) {
      this.$store.commit('defaultFieldsMutation', fullName);
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
    cloneMassiveOfValues() {
      if (this.doCloneMassive) {
        this.cleanSavedMassive();
        Object.assign(this.savedMassiveOfValues,
            this.contacts[this.index].massiveOfValues);
        this.getIsEmpty();
        this.defaultArray.push(this.fullContactName[0] = this.contacts[this.index].firstName);
        this.defaultArray.push(this.fullContactName[1] = this.contacts[this.index].lastName);
        this.defaultArray.push(this.fullContactName[2] = this.contacts[this.index].secondName);
        this.defaultArray.push(this.fullContactName[3] = this.contacts[this.index].telNumber);
        this.doCloneMassive = false;
      }
      return '';
    },
    updateFullName() {
      this.fullContactName[0] = this.contacts[this.index].firstName;
      this.fullContactName[1] = this.contacts[this.index].lastName;
      this.fullContactName[2] = this.contacts[this.index].secondName;
      this.fullContactName[3] = this.contacts[this.index].telNumber;
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
    getSecondName() {
      if (this.contacts[this.index].secondName !== undefined) {
        return `${this.contacts[this.index].secondName}`;
      } else {
        return '';
      }
    },
  },
  computed: {
    pup() {
      addEventListener("popstate", this.cleanAllSavedData, false);
    },
    ...mapState(['contacts', 'index'])
  }
}
</script>

<style>
  .nav__link {
    width: 14px;
    height: 16px;
  }

  .link {
    font-size: 20px;
    color: #2c3e50;
    font-weight: bold;
  }

  .lastname {
    width: 100%;
    text-align: center;
  }

  .contact-page-body {
    max-width: 720px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .controls {
    display: flex;
    max-width: 700px;
    height: 60px;
    margin: 10px auto 50px auto;

  }

  .controls__fake {
    width: 115px;
  }

  .controls__buttons {
    display: flex;
  }

  .controls__undo {
    width: 55px;
    height: 55px;
    font-size: 25px;
    padding: 10px;
    margin-right: 5px;
  }

  .controls__undo:active {
    margin-top: 10px;
    box-shadow: none;
  }

  .controls__cancel {
    width: 55px;
    height: 55px;
    font-size: 25px;
    text-align: center;
    padding: 10px;
  }

  .controls__cancel:active {
    margin-top: 10px;
    box-shadow: none;
  }

  .controls__cancel-1 {
    display: none;
  }

  .controls__title {
    flex: 1 0 auto;
    font-size: 20px;
    align-self: center;
  }

  .controls__adder {
    width: 100%;
    height: 55px;
    font-size: 20px;
    padding: 10px;
  }

  .controls__adder:active {
    margin-top: 5px;
    box-shadow: none;
  }
</style>

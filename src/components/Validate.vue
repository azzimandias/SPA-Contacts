<template>
  <div class="modal">
    <div class="modal__background" @click="unShowModal()"></div>
    <div
        class="modal__body key-style"
        v-if="modalName === 'AddOnFirstPage'"
    >
      <h4 class="modal__tittle">Add new contact:</h4>
      <label class="modal__inputs-body">
        <input
            class="modal__input"
            type="text"
            placeholder=" Name"
            v-model="values[0]"
        />
        <input
            class="modal__input"
            type="number"
            placeholder=" Phone number"
            v-model="values[1]"
        />
      </label>
      <div class="modal__buttons-body">
        <button class="modal__button non-selectable-element"
                @click="addContact()"
                @keypress.enter="addContact()"
        >&#9989</button>
        <button class="modal__button non-selectable-element"
                @click="unShowModal()"
                @keypress.esc="unShowModal()"
        >❌</button>
      </div>
    </div>
    <div class="modal__body key-style" v-else-if="modalName === 'RemoveOnFirstPage'">
      <h4 class="modal__tittle">Are you sure you want to delete the contact {{ removeContactName }}?</h4>
      <div class="modal__buttons-body">
        <button class="modal__button non-selectable-element"
                @click="removeContact()"
                @keypress.enter="removeContact()"
        >&#9989</button>
        <button class="modal__button non-selectable-element"
                @click="unShowModal()"
                @keypress.esc="unShowModal()"
        >❌</button>
      </div>
    </div>
    <div class="modal__body key-style" v-else-if="modalName === 'AddOnSecondPage'">
      <h4 class="modal__tittle">Add new field:</h4>
      <label class="modal__inputs-body">
        <input
            class="modal__input"
            type="text"
            placeholder=" Key"
            v-model="values[0]"
        />
        <input
            class="modal__input"
            placeholder=" Value"
            v-model="values[1]"
        />
      </label>
      <div class="modal__buttons-body">
        <button class="modal__button non-selectable-element"
                @click="addField()"
                @keypress.enter="addField()"
        >&#9989</button>
        <button class="modal__button non-selectable-element"
                @click="unShowModal()"
                @keypress.esc="unShowModal()"
        >❌</button>
      </div>
    </div>
    <div class="modal__body key-style" v-else-if="modalName === 'RemoveOnSecondPage'">
      <h4 class="modal__tittle">Are you sure you want to delete the field {{ removeFieldName }}?</h4>
      <div class="modal__buttons-body">
        <button class="modal__button non-selectable-element"
                @click="removeField()"
                @keypress.enter="removeField()"
        >&#9989</button>
        <button class="modal__button non-selectable-element"
                @click="unShowModal()"
                @keypress.esc="unShowModal()"
        >❌</button>
      </div>
    </div>
    <div class="modal__body key-style" v-else-if="modalName === 'CanOnSecondPage'">
      <h4 class="modal__tittle">Are you sure you want to discard all changes?</h4>
      <div class="modal__buttons-body">
        <button class="modal__button non-selectable-element"
                @click="cancelAll()"
                @keypress.enter="cancelAll()"
        >&#9989</button>
        <button class="modal__button non-selectable-element"
                @click="unShowModal()"
                @keypress.esc="unShowModal()"
        >❌</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['removeContactName', 'removeFieldName', 'modalName'],
  data() {
    return {
      values: []
    }
  },
  methods: {
    addContact() {
      if (this.values[0] && this.values[1]) {
        const newContact = {
          firstName: this.values[0],
          lastName: undefined,
          secondName: undefined,
          telNumber: this.values[1],
          massiveOfValues: {}
        };
        this.values = [];
        this.$emit('addContact', newContact);
      }
    },
    removeContact() {
      this.$emit('removeContact');
    },
    addField() {
      if (this.values[0] && this.values[1]) {
        this.$emit('addField', this.values[0], this.values[1]);
        this.values = [];
      }
    },
    removeField() {
      this.$emit('removeField');
    },
    cancelAll() {
      this.$emit('cancelAll');
    },
    unShowModal() {
      this.$emit('unShowModal');
    }
  }
}
</script>

<style>
  .modal__background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;

    background-color: rgba(240, 255, 240, 0.7);
    //transition: all 0.8s ease 0s;
  }

  .modal__body {
    position: fixed;
    top: 20%;
    left: calc(50% - 250px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 500px;
    height: 250px;
    overflow: hidden;
  }

  .modal__tittle {
    margin-top: 40px;
    padding: 0 20px;
    flex: 0 0 20%;
    font-size: 25px;
  }

  .modal__inputs-body {
    display: flex;
    justify-content: space-around;
    flex: 0 0 auto;
  }

  .modal__input {
    width: 200px;
    flex: 0 1 auto;

    font-size: 20px;
    background-color: inherit;
    border-bottom: 1px solid black;
  }

  .modal__buttons-body {
    display: flex;
    justify-content: space-around;
    flex: 0 0 30%;
  }

  .modal__button {
    width: 55px;
    height: 55px;
    margin: 10px;
    flex: 0 1 auto;
    font-size: 35px;
    background-color: inherit;
  }
</style>

<template>
  <div>

    <div v-if="modalName === 'AddOnFirstPage'">

      <h4>Добавать новый контакт:</h4>
      <label>
        <input
            type="text"
            placeholder="Имя"
            v-model="values[0]"
        />
        <input
            type="text"
            placeholder="Номер телефона"
            v-model="values[1]"
        />
      </label>
      <button @click="addContact()">Добавить</button>
      <button @click="unShowModal()">Отмена</button>
    </div>

    <div v-else-if="modalName === 'DelOnFirstPage'">
      <h4>Вы уверены, что хотите удалить контакт {{ delitedContactName }}?</h4>
      <button @click="removeContact()">Да</button>
      <button @click="unShowModal()">Нет</button>
    </div>

    <div v-else-if="modalName === 'AddOnSecondPage'">
      <label>
        <input
            type="text"
            placeholder="Ключ"
            v-model="values[0]"
        />
        <input
            type="text"
            placeholder="Значение"
            v-model="values[1]"
        />
      </label>
      <button @click="addField()">Добавить</button>
      <button @click="unShowModal()">Отмена</button>
    </div>

    <div v-else-if="modalName === 'DelOnSecondPage'">
      <h4>Вы уверены, что хотите удалить поле {{ deletedFieldName }}?</h4>
      <button @click="removeFild()">Да</button>
      <button @click="unShowModal()">Нет</button>
    </div>

    <div v-else-if="modalName === 'CanOnSecondPage'">
      <h4>Вы уверены, что хотите отменить последнее изменение?</h4>
      <button @click="canceleAll()">Да</button>
      <button @click="unShowModal()">Нет</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['deletedFieldName', 'modalName'],
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
    removeFild() {
      this.$emit('removeFild');
    },
    canceleAll() {
      this.$emit('canceleAll');
    },
    unShowModal() {
      this.$emit('unShowModal');
    }
  }
}
</script>

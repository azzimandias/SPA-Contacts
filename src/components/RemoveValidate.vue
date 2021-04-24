<template>
  <div>

    <div v-if="modalName === 'AddOnFirstPage'">
      <h4>Добавать новый контакт:</h4>
      <input
          type="text"
          placeholder="Имя"
          v-model="newName"
      />
      <input
          type="text"
          placeholder="Номер телефона"
          v-model="newTel"
      />
      <button @click="addContact()">Добавить</button>
      <button @click="unShowModal()">Отмена</button>
    </div>

    <div v-else-if="modalName === 'DelOnFirstPage'">
      <h4>Вы уверены, что хотите удалить контакт {{ delitedContactName }}?</h4>
      <button @click="removeContact()">Да</button>
      <button @click="unShowModal()">Нет</button>
    </div>

    <div v-else-if="modalName === 'AddOnSecondPage'">
      <input
          type="text"
          placeholder="Ключ"
          v-model="newKey"
      />
      <input
          type="text"
          placeholder="Значение"
          v-model="newValue"
      />
      <button @click="addField()">Добавить</button>
      <button @click="unShowModal()">Отмена</button>
    </div>

    <div v-else-if="modalName === 'DelOnSecondPage'">
      <h4>Вы уверены, что хотите удалить поле {{ delitedFieldName }}?</h4>
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
  props: ['delitedContactName', 'delitedFieldName', 'modalName'],
  data: () => ({
    newName: '',
    newTel: '',
    newKey: '',
    newValue: ''
  }),
  methods: {
    addContact() {
      if (this.newName && this.newTel) {
        const newContact = {
          firstName: this.newName,
          lastName: undefined,
          secondName: undefined,
          telNumber: this.newTel,
        };
        this.newName = '';
        this.newTel = '';
        this.$emit('addContact', newContact);
      }
    },
    removeContact() {
      this.$emit('removeContact');
    },
    addField() {
      this.$emit('addField', this.newKey, this.newValue);
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

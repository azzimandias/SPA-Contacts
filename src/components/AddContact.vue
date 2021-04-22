<template>
  <div>
<!--    <input
        type="text"
        placeholder="Имя"
        v-model="newName"
    />-->
    <button
        @click="showAddModal"
    >➕</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    newName: ''
  }),
  methods: {
    showAddModal() {
      this.$emit('showAddModal');
    },
    /*addContact() {
      if (this.newName) {
        const newContact = {
          firstName: this.newName,
          lastName: undefined,
          secondName: undefined,
          telNumber: undefined,
        };
        this.newName = '';
        this.$emit('addContact', newContact);
      }
    }*/
  }
}
</script>

<template>
  <li class="fields__element key-style">
    <label class="fields__body">
      <input
          class="fields__key"
          type="text"
          v-model.trim="val[0]"
          @mouseup="save(val)"
          @change="changeField"
      />|
      <input
          class="fields__value"
          type="text"
          v-model.trim="val[1]"
          @mouseup="save(val)"
          @change="changeField"
      />
    </label>
    <button
        class="remover non-selectable-element"
        title="Удалить поле"
        @click="showRemoveModal"
    >❌</button>
  </li>
</template>

<script>
export default {
  props: ['val'],
  data() {
    return {
      keysValues: [],
      flag: true
    }
  },
  methods: {
    showRemoveModal() {
      this.$emit('showRemoveModal', this.val[0]);
    },
    changeField() {
      this.keysValues[2] = this.val[0];
      this.keysValues[3] = this.val[1];
      this.$emit('changeField', this.keysValues);
      this.keysValues = [];
      this.flag = true;
    },
    save(val) {
      if (this.flag) {
        this.keysValues[0] = val[0];
        this.keysValues[1] = val[1];
        this.flag = false;
      }
    },
  }
}
</script>

<style>
  .fields__element {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 15%;
    margin-bottom: 20px;
    padding: 10px;
  }

  .fields__element:first-child {
    margin: 20px 0;
  }

  .fields__body {
    display: flex;
    justify-content: space-between;
    flex: 1 1 auto;
  }

  .fields__key {
    flex: 0 0 44%;
    font-weight: bold;
    font-size: 20px;
    background-color: inherit;
  }

  .fields__key:focus {
    border-bottom: 1px solid black;
  }

  .fields__value {
    flex: 0 0 43%;
    font-size: 20px;
    background-color: inherit;
    margin-right: 10px;
  }

  .fields__value:focus {
    border-bottom: 1px solid black;
  }
</style>

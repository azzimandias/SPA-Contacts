<template>
  <li>
    <div>
      <input
          type="text"
          v-model.lazy="val[0]"
          @mousedown="save(val[0], val[1])"
          @change="done"
      /> :
      <input
          type="text"
          v-model.lazy="val[1]"
          @mousedown="save(val[0], val[1])"
          @change="done"
      />
    </div>

    <button
        class="into"
        @click="showDellModal"
    >❌</button>
  </li>
</template>

<script>
export default {
  props: ['val', 'newKeyValue'],
  data: () => ({
    old_key: '',
    old_value: '',
    flag: true
  }),
  methods: {
    showDellModal() {
      this.$emit('showDellModal', this.val[0]);
    },
    done() {
      console.log('Enter')
      this.$emit('done', this.val[0], this.val[1], this.old_key, this.old_value);
      this.old_key = '';
      this.old_value = '';
      this.flag = true;
    },
    save(key, value) {
      if (this.flag) {
        this.old_key = key;
        this.old_value = value;
        this.flag = false;
      }
    }
  }
}
</script>

<style>
li {
  display: flex;
  justify-content: space-between;
}
</style>

<template>
  <li>
    <label class="inputs">
      <input
          type="text"
          v-model.lazy="val[0]"
          @mouseup="save(val)"
          @change="done"
      /> :
      <input
          type="text"
          v-model.lazy="val[1]"
          @mouseup="save(val)"
          @change="done"
      />
    </label>

    <button
        class="into1"
        @click="showDellModal"
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
    showDellModal() {
      this.$emit('showDellModal', this.val[0]);
    },
    done() {
      setTimeout(this.done1(), 1000);

    },
    done1() {
      this.keysValues[2] = this.val[0];
      this.keysValues[3] = this.val[1];
      this.$emit('done', this.keysValues);
      this.keysValues = [];
      this.flag = true;
    },
    save(val) {
      if (this.flag) {
        this.keysValues[0] = val[0];
        this.keysValues[1] = val[1];
        this.flag = false;
      }
    }
  }
}
</script>

<style>
li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 10px 0;
}

.inputs {
  margin: 0;
}

.into1 {
  margin: 0;
}
</style>

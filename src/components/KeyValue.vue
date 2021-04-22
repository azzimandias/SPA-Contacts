<template>
  <li>
    <div>{{ val[0] }}: {{ val[1] }}</div>
    <button
        class="into"
        @click="showDellModal"
    >❌</button>
  </li>
</template>

<script>
export default {
  props: ['val'],
  methods: {
    showDellModal() {
      this.$emit('showDellModal', this.val[0]);
    }
  }
}
</script>

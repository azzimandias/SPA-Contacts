<template>
  <li>
    <div class="into">{{ getFullName() }}</div>
    <div @mousedown="newIndex()">
      <router-link
        class="into"
        to="/contact"
      >✍</router-link>
    </div>
    <button
        class="into"
        @click="showDelModal()"
    >❌</button>
  </li>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    i: Number,
    firstName: {
      type: String,
      default: ''
    },
    lastName: {
      type: String,
      default: ''
    },
    secondName: {
      type: String,
      default: ''
    }
  },
  methods: {
    getFullName() {
      return `${this.lastName}
              ${this.firstName}
              ${this.secondName}`;
    },
    showDelModal() {
      this.$emit('showDelModal', this.i);
    },
    newIndex() {
      localStorage.setItem('index', '1');
      this.$store.commit('updateIndex', this.i);
    }
  },
  computed: {
    ...mapState(['contacts', 'index'])
  }

}
</script>

<style>
  .into {
    flex-basis: 30%;
  }
</style>

<template>
  <li>
    <div class="into">{{ getFullName() }}</div>
    <div @click="newIndex()">
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
import { mapGetters } from 'vuex'

export default {
  props: {
    index: Number,
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
    /*getFullName(contact) {
      return `${contact.firstName}
              ${contact.lastName}
              ${contact.secondName}`;
    }*/
    getFullName() {
      return `${this.firstName}
              ${this.lastName}
              ${this.secondName}`;
    },
    showDelModal() {
      this.$emit('showDelModal', this.index);
    },
    newIndex() {
      this.$store.commit('updateIndex', this.index);
    }
  },
  computed: mapGetters(['allContacts', 'getIndex'])

}
</script>

<style>
  .into {
    flex-basis: 30%;
  }
</style>

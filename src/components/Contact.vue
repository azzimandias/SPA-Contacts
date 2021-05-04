<template>
  <li class="contacts__element-body">
    <div class="contacts__element key-style">
      <div class="contacts__index-taker"
           @mousedown="saveContactIndex()"
      >
        <router-link
            class="contacts__link"
            title="Contact Information"
            to="/contact">
          <div class="contacts__link1">
            <div class="contacts__contact-name">
              {{ getLastName() }}
            </div>
            {{ getFullName() }}
          </div>
        </router-link>
        <button
            class="remover remover1 non-selectable-element"
            title="Remove contact"
            @click="showRemoveModal()"
        >❌</button>
      </div>
    </div>
  </li>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    contactIndex: Number,
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
    getLastName() {
      return `${this.lastName}`;
    },
    getFullName() {
      return `${this.firstName}
              ${this.secondName}`;
    },
    showRemoveModal() {
      this.$emit('showRemoveModal', this.contactIndex);
    },
    saveContactIndex() {
      localStorage.setItem('index', '1');
      this.$store.commit('updateIndex', this.contactIndex);
    }
  },
  computed: {
    ...mapState(['contacts', 'index'])
  }
}
</script>

<style>
  .contacts__element-body {
    height: 55px;
    margin-top: 20px;
  }

  .contacts__element {
    width: 100%;
    height: 50px;
    overflow: hidden;
  }

  .contacts__element-body:active {
    padding-top: 5px;
  }

  .contacts__element:active {
    box-shadow: none;
  }

  .contacts__index-taker {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .contacts__element-body:last-child {
    margin-bottom: 100px;
  }

  .contacts__link {
    display: flex;
    flex: 1 1 auto;
    text-align: left;
    width: 100%;
    height: 100%;
    padding: 10px 0 10px 10px;
  }

  .contacts__link1 {
    display: flex;
    flex: 1 1 auto;
    font-size: 20px;
    text-align: left;
  }

  .contacts__contact-name {
    font-weight: bold;
    margin-right: 6px;
  }

  .remover {
    font-size: 20px;
    flex: 0 0 auto;
    background-color: inherit;
  }
</style>

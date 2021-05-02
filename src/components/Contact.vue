<template>
  <li class="contacts__element key-style">
    <div class="contacts__index-taker"
         @mousedown="newIndex()">
      <router-link
          class="contacts__link"
          title="Контактная информация"
          to="/contact">
        <div class="contacts__link1"> <!--Не нравится-->
          <div class="contacts__contact-name">
            {{ getLastName() }}
          </div>
          {{ getFullName() }}
        </div>
      </router-link>
      <button
          class="remover remover1 non-selectable-element"
          title="Удалить контакт"
          @click="showDelModal()"
      >❌</button>
    </div>
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
    getLastName() {
      return `${this.lastName}`;
    },
    getFullName() {
      return `${this.firstName}
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
  .contacts__element {
    width: 100%;
    height: 15%;
    margin-bottom: 20px;
    //padding: 10px;
    overflow: hidden;
  }

  .contacts__element:first-child:active {
    margin-top: 5px;
    box-shadow: none;
  }

  .contacts__element:active {
    margin-top: 25px;
    box-shadow: none;
  }

  .contacts__index-taker {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .contacts__element:last-child {
    margin: 0 0 100px 0;
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

<template>
  <div class="default-fields">
    <div class="default-fields__body">
      <ul class="default-fields__list">
        {{ pup() }}
        <li class="default-fields__element key-style">
          <p class="default-fields__key">Имя:</p>
          <label class="default-fields__value">
            <input
              class="default-fields__input"
              v-model="propFullName[0]"
              @click="saving(propFullName)"
              @change="go()"
            />
          </label>
        </li>
        <li class="default-fields__element key-style">
          <p class="default-fields__key">Фамилия:</p>
          <label class="default-fields__value">
            <input
              class="default-fields__input"
              v-model.lazy="propFullName[1]"
              @click="saving(propFullName)"
              @change="go()"
            />
          </label>
        </li>
      </ul>
      <ul class="default-fields__list">
        <li class="default-fields__element key-style">
          <p class="default-fields__key">Отчество:</p>
          <label class="default-fields__value">
            <input
              class="default-fields__input"
              v-model.lazy="propFullName[2]"
              @click="saving(propFullName)"
              @change="go()"
            />
          </label>
        </li>
        <li class="default-fields__element key-style">
          <p class="default-fields__key">Номер телефона:</p>
          <label class="default-fields__value">
            <input
              class="default-fields__input"
              v-model.lazy="propFullName[3]"
              @click="saving(propFullName)"
              @change="go()"
            />
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['propFullName'],
  data() {
    return {
      fullName: [],
      oldFullName: [],
      flag: true,
    }
  },
  methods: {
    saving(fullName) {
      if (this.flag) {
        for (let i = 0; i < fullName.length; i++) {
          this.oldFullName[i] = fullName[i];
        }
        this.flag = false;
      }
    },
    go() {
      this.$emit('go', this.propFullName, this.oldFullName);
      this.oldFullName = [];
      this.flag = true;
      this.pup();
    },
    pup() {
      this.fullName = this.propFullName;
      return '';
    }
  },
  computed: {

  }
}
</script>

<style>
  .default-fields__body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .default-fields__list {
    display: flex;
    justify-content: space-between;
  }

  .default-fields__element {
    display: flex;
    justify-content: space-between;
    width: 48%;
    height: 50px;
    margin-bottom: 20px;
    padding: 14px 10px 10px 10px;
  }

  .default-fields__key {
    font-weight: bold;
    flex: 0 0 auto;
    text-align: left;
    font-size: 18px;
  }

  .default-fields__value {
    width: 50%;
    flex: 0 0 auto;
  }

  .default-fields__input {
    width: 150px;
    text-align: left;
    font-size: 18px;
    background-color: inherit;
  }

  .default-fields__input:focus {
    border-bottom: 1px solid black;
  }
</style>

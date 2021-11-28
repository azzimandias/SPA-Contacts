<template>
  <div class="default-fields">
    <div class="default-fields__body">
      <ul class="default-fields__list">
        <li class="default-fields__element key-style">
          <p class="default-fields__key">Name:</p>
          <label class="default-fields__value">
            <input
              class="default-fields__input"
              type="text"
              placeholder="Empty"
              v-model.trim="propFullContactName[0]"
              @click="saveOldFullName(propFullContactName)"
              @change="changeDefaultField()"
            />
          </label>
        </li>
        <li class="default-fields__element key-style">
          <p class="default-fields__key">Lastname:</p>
          <label class="default-fields__value">
            <input
              class="default-fields__input"
              type="text"
              placeholder="Empty"
              v-model.trim="propFullContactName[1]"
              @click="saveOldFullName(propFullContactName)"
              @change="changeDefaultField()"
            />
          </label>
        </li>
      </ul>
      <ul class="default-fields__list">
        <li class="default-fields__element key-style">
          <p class="default-fields__key">Secondname:</p>
          <label class="default-fields__value">
            <input
              class="default-fields__input"
              type="text"
              placeholder="Empty"
              v-model.trim="propFullContactName[2]"
              @click="saveOldFullName(propFullContactName)"
              @change="changeDefaultField()"
            />
          </label>
        </li>
        <li class="default-fields__element key-style">
          <p class="default-fields__key">Phone number:</p>
          <label class="default-fields__value">
            <input
              class="default-fields__input"
              type="number"
              placeholder="Empty"
              v-model.trim="propFullContactName[3]"
              @click="saveOldFullName(propFullContactName)"
              @change="changeDefaultField()"
            />
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['propFullContactName'],
  data() {
    return {
      oldFullName: [],
      trim: false,
      flag: true,
    }
  },
  methods: {
    saveOldFullName(fullName) {
      if (this.flag) {
        for (let i = 0; i < fullName.length; i++) {
          this.oldFullName[i] = fullName[i];
        }
        this.flag = false;
      }
    },
    changeDefaultField() {
      this.trimField();
      this.$emit('changeDefaultField', this.propFullContactName, this.oldFullName, this.trim);
      this.oldFullName = [];
      this.trim = false;
      this.flag = true;
    },
    trimField() {                                                           // Checking for adding spaces to fields
      if (this.oldFullName[0] === this.propFullContactName[0].trim() &&     // If only spaces were added,
          this.oldFullName[1] === this.propFullContactName[1].trim() &&     // they will not be saved
          this.oldFullName[2] === this.propFullContactName[2].trim()) {
        this.trim = true;
      }
    },
  },
}
</script>

<style scoped>
  :root {
    --border-color: black;
    --text-color: #2c3e50;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --border-color: aliceblue;
      --text-color: aliceblue;
    }
  }

  [data-theme="light"] {
    --border-color: black;
    --text-color: #2c3e50;
  }

  [data-theme="dark"] {
    --border-color: aliceblue;
    --text-color: aliceblue;
  }

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
    color: var(--text-color);
  }

  .default-fields__input:focus {
    border-bottom: 1px solid var(--border-color);
  }

  @media screen and (max-width: 720px) {
    .default-fields__list {
      display: flex;
      flex-direction: column;
    }

    .default-fields__element {
      width: 100%;
      font-size: 15px;
    }

    .default-fields__value {
      width: 50%;
    }
  }

  @media screen and (max-width: 515px) {
    .default-fields__key {
      font-size: 15px;
    }

    .default-fields__input {
      font-size: 15px;
      width: 100px;
    }
  }
</style>

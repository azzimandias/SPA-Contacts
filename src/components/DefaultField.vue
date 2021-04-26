<template>
  <ul>
    {{ pup }}
    <li>
      <label>Имя:
        <input
          class="forMargin"
          v-model="propFullName[0]"
          @click="saving(propFullName)"
          @change="go()"
        />
      </label>
    </li>
    <li>
      <label>Фамилия:
        <input
          class="forMargin"
          v-model.lazy="propFullName[1]"
          @click="saving(propFullName)"
          @change="go()"
        />
      </label>
    </li>
    <li>
      <label>Отчество:
        <input
          class="forMargin"
          v-model.lazy="propFullName[2]"
          @click="saving(propFullName)"
          @change="go()"
        />
      </label>
    </li>
    <li>
      <label>Номер телефона:
        <input
          class="forMargin"
          v-model.lazy="propFullName[3]"
          @click="saving(propFullName)"
          @change="go()"
        />
      </label>
    </li>
  </ul>
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
      this.pup;
    }
  },
  computed: {
    pup() {
      this.fullName = this.propFullName;
      return '';
    }
  }
}
</script>

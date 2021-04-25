<template>
  <ul>
    {{ pup }}
    <li>
    Имя:<input
        class="forMargin"
        v-model.lazy="fn"
        @mouseup="saving(fn, ln, sn, tel)"
        @change="go()"
    />
    </li>
    <li>
      Фамилия:<input
        class="forMargin"
        v-model.lazy="ln"
        @mouseup="saving(fn, ln, sn, tel)"
        @change="go()"
    />
    </li>
    <li>
      Отчество:<input
        class="forMargin"
        v-model.lazy="sn"
        @mouseup="saving(fn, ln, sn, tel)"
        @change="go()"
    />
    </li>
    <li>
      Номер телефона:<input
        class="forMargin"
        v-model.lazy="tel"
        @mouseup="saving(fn, ln, sn, tel)"
        @change="go()"
    />
    </li>
  </ul>
</template>

<script>
export default {
  props: ['firstName', 'lastName', 'secondName', 'telNumber'],
  data: () => ({
    fn: '',
    ln: '',
    sn: '',
    tel: 0,
    old_name: '',
    old_lname: '',
    old_sname: '',
    old_tel: '',
    flag: true
  }),
  methods: {
    saving(name, lname, sname, tel) {
      if (this.flag) {
        this.old_name = name;
        this.old_lname = lname;
        this.old_sname = sname;
        this.old_tel = tel;
        this.flag = false;
      }
    },
    go() {
      this.$emit('go',
                  this.fn,
                  this.ln,
                  this.sn,
                  this.tel,
                  this.old_name,
                  this.old_lname,
                  this.old_sname,
                  this.old_tel);
      this.old_name = '';
      this.old_lname = '';
      this.old_sname = '';
      this.old_tel = '';
      this.flag = true;
      this.pup;
    }
  },
  computed: {
    pup() {
      this.fn = this.firstName;
      this.ln = this.lastName;
      this.sn = this.secondName;
      this.tel = this.telNumber;
      return '';
    }
  }
}
</script>

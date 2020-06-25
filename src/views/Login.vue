<template>
  <div>
    <p>模拟教师：1001,1001</p>
    <p>
      <br />
    </p>

    <p>学生：2017214228,123456</p>
    <br />
    <form ref="form">
      学号/工号：<input v-model="num" type="text" />
      <br />
      密码：<input v-model="password" type="password" />
      <br />
      <p>{{ isLogin }}</p>
      <button @click="login" type="button">登录</button>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { LOGIN } from "@/store/types.js";
export default {
  data: () => ({
    num: null,
    password: null
  }),
  methods: {
    login() {
      this.$store.dispatch(LOGIN, {
        num: this.num,
        password: this.password
      });
      this.$refs.form.reset();
    }
  },
  computed: {
    ...mapState(["isLogin"])
  }
};
</script>

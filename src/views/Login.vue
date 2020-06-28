<template>
  <div>
    <p>模拟教师：1001,1001</p>
    <p>
      <br />
    </p>

    <p>已选择学生：2017214228,123456</p>
    <br />
    <p>未选择学生：2017214186,2017214186</p>
    <br />
    <form ref="form">
      学号/工号：
      <input type="text" v-model="num" />
      <br />
      密码：
      <input type="password" v-model="password" />
      <br />
      <button @click="login" type="button">登录</button>
      <br />
      <router-link to="resetPassword">忘记密码</router-link>
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

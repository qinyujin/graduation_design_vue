<template>
  <div>
    学号/工号：<input type="text" v-model="num" />
    <button type="submit" @click="resetPassword">重置密码</button>
  </div>
</template>

<script>
import axios from "../axios/MyAxios";
export default {
  data: () => ({
    num: null
  }),
  methods: {
    resetPassword() {
      axios.patch("resetPassword", {
        num: this.num
      });
    }
  }
};
</script>

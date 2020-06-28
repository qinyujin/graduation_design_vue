<template>
  <div>
    <h1>{{ student.user.name }}同学你好</h1>
    更新密码:
    <input type="password" v-model="pwd" />

    <button @click="updatePassword">
      修改
    </button>
    <button @click="LOGOUT">退出</button>
    <selected v-if="student.teacher != null"></selected>
    <unselected v-else-if="student.teacher == null"></unselected>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    pwd: null
  }),
  created() {
    this.$store.dispatch("stuIndex");
  },
  components: {
    selected: () => import("@/views/selected"),
    unselected: () => import("@/views/unselected")
  },
  methods: {
    LOGOUT() {
      this.$store.commit("LOGOUT");
      location.reload();
    },

    updatePassword() {
      this.$store.dispatch(
        "updatePassword",
        {
          password: this.pwd
        },
        location.reload()
      );
    }
  },
  computed: {
    ...mapState(["student", "teacher"])
  }
};
</script>

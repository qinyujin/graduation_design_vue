<template>
  <div>
    <Login v-if="!isLogin"></Login>
    <TeacherHome v-else-if="role == '6983f953b49c88210cb9'"></TeacherHome>
    <StuHome v-else-if="role == 'bb63e5f7e0f2ffae845c'"></StuHome>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  components: {
    Login: () => import("./Login"),
    TeacherHome: () => import("./teacherHomePage"),
    StuHome: () => import("./stuPage")
  },
  computed: {
    ...mapState(["isLogin", "role"])
  }
};
</script>

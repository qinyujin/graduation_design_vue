<template>
  <div>
    <table v-if="selectedCourses != null">
      <thead>
        <td>#</td>
        <td>名称</td>
        <td>分数</td>
      </thead>

      <tr v-for="(sc, index) in selectedCourses" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ sc.course.courseName }}</td>
        <td>{{ sc.score }}</td>
      </tr>
    </table>

    <p v-if="allowSelect">
      你确定要选择王波老师作为导师吗？
      <button type="submit" @click="agree">确定</button>
    </p>

    <p v-else>
      导师人数已满，请您联系其他导师
    </p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  created() {
    this.$store.dispatch("stuIndex");
  },
  methods: {
    agree() {
      this.$store.dispatch("agree");
    }
  },
  computed: {
    ...mapState(["selectedCourses", "teacher", "allowSelect"])
  }
};
</script>

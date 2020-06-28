<template>
  <div>
    <p>{{ student.user.name }}同学：</p>
    <p>您已成功选择王波导师，祝你前程似锦、未来可期</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  created() {
    this.$store.dispatch("stuIndex");
  },
  computed: {
    ...mapState(["student"])
  }
};
</script>

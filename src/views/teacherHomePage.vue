<template>
  <div>
    <h1>欢迎您：王波老师</h1>
    <br />

    <h1>读取excel表格</h1>
    <form>
      <input type="file" @change="read" />
    </form>
    <table>
      <tr>
        <td>#</td>
        <td>学号</td>
        <td>姓名</td>
        <td>成绩</td>
      </tr>
      <tr v-for="(s, index) in students" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ s.number }}</td>
        <td>{{ s.name }}</td>
        <td>{{ s.score }}</td>
      </tr>
    </table>

    <br />

    课程：
    <form>
      <select v-model="id">
        <option v-for="(c, index) in courses" :key="index" :value="c.id"
          >{{ c.courseName }}
        </option>
      </select>
      <br />
      权重：<input type="number" step="0.1" v-model="weight" />
      <br />
      最低分：<input type="number" step="0.1" v-model="lowestScore" />
      <br />
      <button type="button" @click="setWeight">修改</button>
    </form>

    <br />
    设置实际指导学生数：
    <form>
      学生数：<input type="number" v-model="totalStudents" /><button
        type="button"
        @click="patchAmount"
      >
        提交
      </button>
    </form>
    <br />

    所有信息：
    <table style="center">
      <thead>
        <td>可接受学生数</td>
        <td>符合条件学生数</td>
      </thead>

      <tr>
        <td>{{ teacher.totalStudents }}</td>
        <td>{{ teacher.suitableStudents }}</td>
      </tr>
    </table>

    已经接受的学生：
    <ul>
      <li v-for="(s, index) in students" :key="index">{{ s.user.name }}</li>
    </ul>

    <br />

    课程信息:
    <table>
      <thead>
        <td>#</td>
        <td>课程名</td>
        <td>权重</td>
        <td>最低分</td>
      </thead>

      <tr v-for="(c, index) in courses" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ c.courseName }}</td>
        <td>{{ c.weight }}</td>
        <td>{{ c.lowestScore }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { readStudentFile } from "@/util/ExcelUtils.js";
import { mapState } from "vuex";
export default {
  created() {
    this.$store.dispatch("backendIndex");
    // console.log("page" + this.students);
  },
  data: () => ({
    id: null,
    weight: null,
    lowestScore: null,
    totalStudents: null
  }),
  methods: {
    read(event) {
      //读取文件,获得学生成绩单
      let file = event.target.files[0];
      readStudentFile(file).then(data => {
        this.students = data;
        console.log("vue");
      });
    },
    setWeight() {
      this.$store.dispatch("setWeight", {
        id: this.id,
        weight: this.weight,
        lowestScore: this.lowestScore
      });
      location.reload();
    },
    patchAmount() {
      this.$store.dispatch("patchAmount", {
        totalStudents: this.totalStudents
      });
      location.reload();
    }
  },
  computed: {
    ...mapState(["role", "teacher", "students", "courses"])
  }
};
</script>

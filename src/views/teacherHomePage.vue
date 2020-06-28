<template>
  <div>
    <h1>欢迎您：王波老师</h1>

    <button type="submit" @click="logout">退出</button>

    <br />

    更新密码:
    <input type="password" v-model="pwd" />

    <button @click="updatePassword">
      修改
    </button>

    <h1>读取学生成绩单</h1>
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

    <button @click="addStudents">添加学生</button>
    <br />
    <br />

    添加课程: 课程名<input type="text" v-model="courseName" /><button
      type="submit"
      @click="addCourse"
    >
      添加课程
    </button>
    <br />
    <br />

    添加学生成绩： 课程：
    <select v-model="id">
      <option v-for="(c, index) in courses" :key="index" :value="c.id"
        >{{ c.courseName }}
      </option>
    </select>
    <button type="submit" @click="addStudentScore">添加名单学生成绩</button>
    <br />
    <br />

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
    <li v-for="(s, index) in stus" :key="index">{{ s.user.name }}</li>

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

    <br />
    添加方向：
    <form>
      <input type="text" v-model="detail" />
      <button type="submit" @click="addDirections">添加</button>
    </form>
    修改方向：
    <form>
      detail:<input type="text" v-model="detail" />
      <select v-model="did">
        <option v-for="(d, index) in directions" :key="index" :value="d.id"
          >{{ d.detail }}
        </option>
      </select>
      <button type="submit" @click="updateDirection">修改</button>
    </form>

    <br />

    选择学生：<br />
    学号：<input type="number" v-model="num" />
    <button type="submit" @click="selectStudent">选择</button>
    <br />
    <br />

    修改学生课程成绩: 课程：
    <select v-model="id">
      <option v-for="(c, index) in courses" :key="index" :value="c.id"
        >{{ c.courseName }}
      </option>
    </select>
    学号：<input type="number" v-model="stuNumber" /><br />
    成绩：<input type="number" step="0.1" v-model="score" />
    <button type="submit" @click="updateStudentScore">修改成绩</button>

    <br />

    学生成绩列表：
    <table>
      <thead>
        <td>#</td>
        <td>姓名</td>
        <td>学号</td>
        <td>加权平均分</td>
      </thead>

      <tr v-for="(ss, index) in sortStudents" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ ss.user.name }}</td>
        <td>{{ ss.user.num }}</td>
        <td>{{ ss.weightScore }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { readStudentFile } from "@/util/ExcelUtils.js";
import { mapState } from "vuex";
import axios from "../axios/MyAxios";
export default {
  created() {
    this.$store.dispatch("backendIndex");
    this.$store.dispatch("getDirections");
    this.$store.dispatch("sortStudents");
    // console.log("page" + this.students);
  },
  data: () => ({
    id: null,
    did: null,
    weight: null,
    lowestScore: null,
    totalStudents: null,
    students: null,
    pwd: null,
    detail: null,
    num: null,
    courseName: null,
    score: null,
    stuNumber: null
  }),
  methods: {
    read(event) {
      //读取文件,获得学生成绩单

      let file = event.target.files[0];
      console.log(file);
      readStudentFile(file).then(data => {
        this.students = data;
        // console.log("vue");
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
    },

    addStudents() {
      for (var i = 1; i <= this.students.length; i++) {
        this.$store.dispatch("addStudents", {
          name: this.students[i].name,
          num: this.students[i].number,
          password: this.students[i].number,
          role: "STUDENT"
        });
      }
    },

    updatePassword() {
      this.$store.dispatch(
        "updatePassword",
        {
          password: this.pwd
        },
        location.reload()
      );
    },

    logout() {
      this.$store.commit("LOGOUT");
      location.reload();
    },

    addDirections() {
      this.$store.dispatch("addDirection", {
        detail: this.detail
      });
      location.reload();
    },

    updateDirection() {
      this.$store.dispatch("updateDirection", {
        detail: this.detail,
        id: this.did
      });
      location.reload();
    },

    selectStudent() {
      this.$store.dispatch("selectStudent", {
        num: this.num
      });
    },

    addCourse() {
      this.$store.dispatch("addCourse", {
        courseName: this.courseName
      });
      location.reload();
    },

    /**
     * 添加学生成绩
     */
    addStudentScore() {
      for (var i = 1; i <= this.students.length; i++) {
        axios.post(
          `teacher/addStuScore/course/${this.id}/student/${this.students[i].number}`,
          {
            score: this.students[i].score
          }
        );
      }
      // location.reload();
    },

    updateStudentScore() {
      axios.patch(
        `teacher/updateStuScore/course/${this.id}/student/${this.stuNumber}`,
        {
          score: this.score
        }
      );
      location.reload();
    }
  },
  computed: {
    ...mapState([
      "role",
      "teacher",
      "stus",
      "courses",
      "directions",
      "sortStudents"
    ])
  }
};
</script>

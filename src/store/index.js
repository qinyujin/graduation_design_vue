/* eslint-disable no-unused-vars */
import Vue from "vue";
import Vuex from "vuex";
import * as types from "./types";
import axios from "@/axios/MyAxios";
import { author } from "@/util/Const";

Vue.use(Vuex);

const myState = {
  exception: { message: null },
  isLogin: false,
  role: null,
  teacher: null,
  courses: null,
  stus: null,
  directions: null,
  student: null,
  selectedCourses: [],
  sortStudents: [],
  allowSelect: null
};

const myMutations = {
  [types.LOGIN](state, data) {
    state.isLogin = data;
  },
  [types.GET_EXCEPTION](state, data) {
    state.exception = data;
  },
  [types.SET_ROLE](state, data) {
    state.role = data;
  },
  teacher(state, data) {
    state.teacher = data;
  },
  courses(state, data) {
    state.courses = data;
  },
  students(state, data) {
    state.stus = data;
  },
  student(state, data) {
    state.student = data;
  },
  LOGOUT(state, data) {
    sessionStorage.removeItem("authorization");
    sessionStorage.removeItem("role");
  },
  Directions(state, data) {
    state.directions = data;
  },
  selectedCourses(state, data) {
    state.selectedCourses = data;
  },
  sortStudents(state, data) {
    state.sortStudents = data;
  },
  allowSelect(state, data) {
    state.allowSelect = data;
  }
};

const myActions = {
  //登录
  async [types.LOGIN]({ commit }, data) {
    let resp = await axios.post("login", data);
    let auth = resp.headers[author];
    console.log(resp.data);
    if (auth != null) {
      sessionStorage.setItem(author, auth);
      sessionStorage.setItem("role", resp.data.role);
      // sessionStorage.removeItem("role");
      commit(types.LOGIN, true);
      commit(types.SET_ROLE, resp.data.role);
    }
  },

  //从后端拿数据
  async backendIndex({ commit }, data) {
    let resp = await axios.get("teacher/index");

    commit("teacher", resp.data.teacher);
    commit("courses", resp.data.courses);
    commit("students", resp.data.students);
    console.log(resp.data.teacher);
    console.log(resp.data.students);
    console.log(resp.data.courses);
  },

  //设置权重
  async setWeight({ commit }, data) {
    let resp = await axios.post("teacher/setWeight", {
      id: data.id,
      weight: data.weight,
      lowestScore: data.lowestScore
    });
  },

  //更新可选学生数
  async patchAmount({ commit }, data) {
    let resp = await axios.patch("teacher/patchAmount", data);
  },

  //添加学生
  async addStudents({ commit }, data) {
    let resp = await axios.post("teacher/postStu", data);
    console.log(resp.data.Teacher);
  },

  //更新密码
  async updatePassword({ commit }, data) {
    console.log("updatePwd");
    let resp = await axios.patch("updatePwd", data);
    // commit("LOGOUT");
  },

  //增加方向
  async addDirection({ commit }, data) {
    let resp = await axios.post("teacher/addDirection", data);
    // console.log("direction:" + resp.data.direction);
  },

  //获取方向列表
  async getDirections({ commit }, data) {
    let resp = await axios.get("directions");
    commit("Directions", resp.data.directionsList);
    // console.log("directions" + resp.data.directionsList);
  },

  //更新方向
  async updateDirection({ commit }, data) {
    let resp = await axios.patch("teacher/updateDirection", data);
    console.log(resp);
  },

  //选择学生
  async selectStudent({ commit }, data) {
    let resp = await axios.post("teacher/1/addStu", data);
    console.log(resp);
  },

  //未选学生页面
  async stuIndex({ commit }, data) {
    let resp = await axios.get("stu/index", data);
    commit("student", resp.data.student);
    commit("selectedCourses", resp.data.selectedCourses);
    commit("allowSelect", resp.data.allowSelect);
    console.log(resp.data.student);
    console.log(resp.data.selectedCourses);
  },

  //学生同意选择导师
  async agree({ commit }, data) {
    let resp = await axios.get("stu/agree");
    console.log("enter agrees");
    console.log(resp.data.student);
  },

  //增添课程
  async addCourse({ commit }, data) {
    let resp = await axios.post("teacher/addCourses", data);
    console.log(resp.data.course);
  },

  async sortStudents({ commit }, data) {
    let resp = await axios.get("teacher/sortStudents");

    commit("sortStudents", resp.data.sortStudents);
  }
};

export default new Vuex.Store({
  state: myState,
  mutations: myMutations,
  actions: myActions,
  modules: {}
});

// 执行时判断，刷新时检测；也可以添加长度等更严格判断
if (sessionStorage.getItem(author) != null) {
  myState.isLogin = true;
}

if (sessionStorage.getItem("role") != null) {
  myState.role = sessionStorage.getItem("role");
}

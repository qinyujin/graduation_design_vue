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
  role: "none",
  teacher: null,
  courses: null,
  students: null
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
    state.students = data;
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
      commit(types.LOGIN, true);
      commit(types.SET_ROLE, resp.data.role);
    }
  },

  async backendIndex({ commit }, data) {
    let resp = await axios.get("teacher/index");

    commit("teacher", resp.data.teacher);
    commit("courses", resp.data.courses);
    commit("students", resp.data.students);
    console.log("teacher" + resp.data.teacher);
    console.log("students" + resp.data.students);
    console.log("courses" + resp.data.courses);
  },

  async setWeight({ commit }, data) {
    let resp = await axios.post("teacher/setWeight", {
      id: data.id,
      weight: data.weight,
      lowestScore: data.lowestScore
    });
  },

  async patchAmount({ commit }, data) {
    let resp = await axios.patch("teacher/patchAmount", data);
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

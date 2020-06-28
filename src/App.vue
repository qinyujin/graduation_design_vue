<template>
  <div id="app">
    <div id="nav">
      <alertDialog></alertDialog>
      <header id="title">
        导师双选系统(本系统专供王波老师使用，如果想选其他导师请另行联系)
      </header>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  components: {
    alertDialog: () => import("@/components/AlertDialog")
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#title {
  font-size: 20px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

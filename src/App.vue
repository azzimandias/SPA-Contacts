<template>
  <div id="app">
    <div id="nav">
<!--      <router-link to="/about">About</router-link>-->
    </div>
    <router-view/>
  </div>
</template>

<style>
* {
  max-width: 1000px;
  background-color: cornsilk;
  margin-left: auto;
  margin-right: auto;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

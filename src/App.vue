<template>
  <div id="app">
<!--    <div id="nav">
&lt;!&ndash;      <router-link to="/about">About</router-link>&ndash;&gt;
    </div>-->
    <router-view/>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  border: 0;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

ul li{list-style: none}

a, a:visited {
  text-decoration: none;
  color: #2c3e50 !important;
}

button, input {
  cursor: pointer;
}

input {outline:none;}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

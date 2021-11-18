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
    -webkit-tap-highlight-color: transparent;
  }

  ul li{list-style: none}

  a, a:visited {
    text-decoration: none;
    color: #2c3e50 !important;
  }

  button, input {
    cursor: pointer;
  }

  input {
    outline:none;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .key-style {
    background-color: honeydew;
    border: 1px solid gray;
    border-radius: 5px;
    box-shadow: 0 5px 1px 1px gray;
  }


</style>

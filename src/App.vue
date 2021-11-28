<template>
  <div id="app">
<!--    <div id="nav">
&lt;!&ndash;      <router-link to="/about">About</router-link>&ndash;&gt;
    </div>-->
    <router-view/>
  </div>
</template>

<style>
  :root {
    --text-color: #2c3e50;
    --border-key: grey;
    --bc-key: honeydew;
    --background-color: white;
  }
  
  @media (prefers-color-scheme: dark) {
    :root {
      --text-color: aliceblue;
      --border-key: aliceblue;
      --bc-key: darkslategrey;
      --background-color: black;
    }
  }

  [data-theme="light"] {
    --text-color: #2c3e50;
    --border-key: grey;
    --bc-key: honeydew;
    --background-color: white;
  }

  [data-theme="dark"] {
    --text-color: aliceblue;
    --border-key: aliceblue;
    --bc-key: darkslategrey;
    --background-color: black;
  }

  * {
    margin: 0;
    padding: 0;
    border: 0;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  body {
    background-color: var(--background-color);
  }

  button {
    background-color: inherit;
  }

  ul li{list-style: none}

  a, a:visited {
    text-decoration: none;
    color: var(--text-color) !important;
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
    color: var(--text-color);
    transition: 0.3s;
  }

  .key-style {
    background-color: var(--bc-key);
    border: 1px solid var(--border-key);
    border-radius: 5px;
    box-shadow: 0 5px 1px 1px var(--border-key);
  }
</style>

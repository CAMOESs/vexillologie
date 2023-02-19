<template>


  <router-view/>
</template>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  display: flex;
  flex-direction: column;
}

nav {
  padding: 10px;
}

nav a {
  font-weight: bold;
  color: #d8e2ec;
  padding: 5px;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.contain{
    flex: 1 0 auto;
  }

footer{
    flex-shrink: 0;
  }

</style>

<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <Login />
    <Profile token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAyLCJmbmFtZSI6IkpvaG4iLCJsbmFtZSI6IkNlbmEiLCJhZ2UiOjIxLCJlbWFpbCI6InN1c2h5QGdtLmNvbSIsImlhdCI6MTU0ODAxMzA0NCwiZXhwIjoxNTQ4MDE0MjQ0fQ.zZQNHfFHZruj3NzjSLeert0xkXDnWkF3Vaw96AFVq1I"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Login from './components/Login.vue'
import Profile from './components/Profile.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    Login,
    Profile
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>

<template>
  <div id="app">
    <nav>
      <ul>
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li v-if="!authenticated">
          <router-link to="/login">Login</router-link>
        </li>
        <li v-if="!authenticated">
          <router-link to="/register">Register</router-link>
        </li>
        <li v-if="authenticated">
          <router-link to="/profile">Profile</router-link>
        </li>
        <li v-if="authenticated">
          <a href="#" @click="logout">Logout</a>
        </li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  computed: {
    authenticated() { console.log(this.$store.getters.authenticated)
      return this.$store.getters.authenticated;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push('login')
    },
  },
};
</script>

<style>
nav {
  background-color: #f5f5f5;
  padding: 10px;
}

nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
}

nav li {
  margin-right: 10px;
}

nav a {
  text-decoration: none;
  color: #333;
  padding: 5px;
  border-radius: 5px;
}

nav a:hover {
  background-color: #ddd;
}
</style>

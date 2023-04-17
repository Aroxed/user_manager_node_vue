<template>
  <div>
    <h1>Welcome to my app</h1>
    <p v-if="isAuthenticated">You are logged in as {{ user.email }}</p>
    <p v-else>Please login or register to continue</p>
  </div>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.state.auth.isAuthenticated;
    },
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

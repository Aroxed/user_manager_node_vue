<template>
  <div>
    <h2>User Profile</h2>
    <p>Email: {{ user.email }}</p>
    <p>ID: {{ user.id }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  beforeRouteEnter(to, from, next) {
    if (!localStorage.getItem("token")) {
      next({ path: "/login" });
    } else {
      next();
    }
  },
};
</script>

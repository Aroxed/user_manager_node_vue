<template>
  <form @submit.prevent="login">
    <h2>Login</h2>
    <div>
      <label for="email">Email:</label>
      <input type="email" name="email" v-model="email" required>
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" name="password" v-model="password" required>
    </div>
    <button type="submit">Login</button>
    <p v-if="error" style="color: red">{{ error }}</p>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async login() {
      const success = await this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      });

      if (!success) {
        this.error = "Invalid email or password";
      }
    },
  },
};
</script>

<template>
  <form @submit.prevent="register">
    <h2>Register</h2>
    <div>
      <label for="email">Email:</label>
      <input type="email" name="email" v-model="email" required>
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" name="password" v-model="password" required>
    </div>
    <button type="submit">Register</button>
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
    async register() {
      const success = await this.$store.dispatch("register", {
        email: this.email,
        password: this.password,
      });

      if (!success) {
        this.error = "Unable to register with provided credentials";
      }
    },
  },
};
</script>

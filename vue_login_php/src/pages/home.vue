<template>
  <div>
    <v-container>
      <h1 class="text-2xl font-bold text-purple-700">Home</h1>
      <section class="flex flex-row gap-3">
        <v-btn color="primary" :to="'/register'">Register</v-btn>
        <v-btn @click="logout" color="warning">Logout</v-btn>
      </section>
    </v-container>
  </div>
</template>

<script>
import { message } from "ant-design-vue";

export default {
  name: "Home",
  data: () => ({}),
  methods: {
    logout() {
      localStorage.removeItem("isLogin");
      localStorage.removeItem("userLogin");
      message.success("ออกจากระบบเรียบร้อย");
      this.$router.replace("/login");
    },
  },
};
</script>

<style lang="scss" scoped></style>

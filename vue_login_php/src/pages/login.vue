<script>
import { message } from "ant-design-vue";
import axios from "axios";
export default {
  data: () => ({
    loading: false,
    username: null,
    password: null,
    API_URL: import.meta.env.VITE_API_BASE_URL,
    rules: {
      username: [
        (v) => !!v || "username is required",
        // (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
      password: [(v) => !!v || "password is required"],
    },
  }),

  methods: {
    async login() {
      this.loading = true;
      try {
        const { valid } = await this.$refs.form.validate();
        if (!valid) {
          message.error("This is an error message");
          this.loading = false;
          return;
        }
        const payload = {
          username: this.username,
          password: this.password,
        };
        const response = await axios.post(`${this.API_URL}/login.php`, payload);
        if (!response.data.success) {
          this.loading = false;
          message.error("เข้าสู่ระบบไม่สําเร็จ กรุณาตรวจสอบข้อมูลให้ถูกต้อง");
          return;
        }
        await localStorage.setItem("isLogin", true);
        await localStorage.setItem(
          "userLogin",
          JSON.stringify({ username: this.username })
        );
        await message.success("เข้าสู่ระบบเรียบร้อย");
        await this.$router.push("/");
      } catch (error) {
        this.loading = false;
        console.log(error);
        message.error("เข้าสู่ระบบไม่สําเร็จ กรุณาตรวจสอบข้อมูลให้ถูกต้อง");
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>
<template>
  <div>
    <v-card
      :disabled="loading"
      :loading="loading"
      class="mx-3 my-12 pb-3 mx-md-auto mt-16"
      max-width="374"
    >
      <template v-slot:loader="{ isActive }">
        <v-progress-linear
          :active="isActive"
          color="deep-purple"
          height="4"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img
        height="250"
        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
        cover
      ></v-img>

      <v-card-item>
        <v-card-title>
          <h1 class="text-2xl text-primary font-bold">Login</h1>
        </v-card-title>

        <!-- <v-card-subtitle> -->
        <!-- <span class="me-1">Login User</span> -->
        <!-- <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon> -->
        <!-- </v-card-subtitle> -->
      </v-card-item>

      <v-card-text>
        <v-form ref="form" @submit.prevent="login">
          <v-text-field
            v-model="username"
            color="primary"
            label="username"
            :rules="rules.username"
            variant="underlined"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :rules="rules.password"
            color="primary"
            label="Password"
            type="password"
            placeholder="Enter your password"
            variant="underlined"
          ></v-text-field>
          <v-btn
            variant="text"
            block
            color="primary"
            class="mt-3"
            :to="'/register'"
          >
            ถ้ายังไม่มีบัญชี สมัครสมาชิก ที่นี่
          </v-btn>
          <v-btn color="primary" class="mt-6" type="submit" block>
            Login
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

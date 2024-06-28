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
    async register() {
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
        const response = await axios.post(
          `${this.API_URL}/register.php`,
          payload
        );
        if (!response.data.success) {
          message.error("ลงทะเบียนไม่สําเร็จ กรุณาตรวจสอบข้อมูลให้ถูกต้อง");
          this.loading = false;
          return;
        }
        this.loading = false;
        await message.success("ลงทะเบียนเรียบร้อย");
        await this.$router.push("/login");
      } catch (error) {
        this.loading = false;
        console.log(error);
        message.error("ลงทะเบียนไม่สําเร็จ กรุณาตรวจสอบข้อมูลให้ถูกต้อง");
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
          <h1 class="text-2xl text-primary font-bold">Register</h1>
        </v-card-title>

        <!-- <v-card-subtitle> -->
        <!-- <span class="me-1">Login User</span> -->
        <!-- <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon> -->
        <!-- </v-card-subtitle> -->
      </v-card-item>

      <v-card-text>
        <v-form ref="form" @submit.prevent="register">
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
            :to="'/login'"
          >
            เข้าสู่ระบบ
          </v-btn>
          <v-btn color="primary" class="mt-3" type="submit" block>
            ลงทะเบียน
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

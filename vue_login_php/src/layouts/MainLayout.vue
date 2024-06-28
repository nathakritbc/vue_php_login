<template>
  <v-app>
    <v-main>
      <AppBarComponent />
      <div>
        <!-- <v-skeleton-loader
          boilerplate
          type="card, article, actions"
        ></v-skeleton-loader> -->
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script setup></script>

<style lang="scss" scoped></style>

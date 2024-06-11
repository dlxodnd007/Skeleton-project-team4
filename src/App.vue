<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/category">Category</RouterLink>
  </nav>
  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<style scoped></style>

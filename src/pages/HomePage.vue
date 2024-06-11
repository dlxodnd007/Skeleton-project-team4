<template>
  <div class="home-page">
    <UserProfile />
  </div>
</template>

<script setup>
import UserProfile from '@/components/UserProfile.vue';
</script>

<style scoped>
.home-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
}
</style>

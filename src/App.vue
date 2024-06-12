<script setup>
import { RouterLink, RouterView } from 'vue-router';
import UserProfile from '@/components/UserProfile.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
  <div>
    <UserProfile class="header" />
    <RouterView />
    <Footer class="footer" />
  </div>
</template>

<style scoped>
.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-bottom-left-radius: 39px;
  border-bottom-right-radius: 39px;
}
.header {
  top: 0;
  left: 0;
}
</style>

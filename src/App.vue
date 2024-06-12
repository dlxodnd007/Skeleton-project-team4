<script setup>
import { RouterLink, RouterView } from 'vue-router';
import UserProfile from '@/components/UserProfile.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
  <div>
    <UserProfile class="header" />
<<<<<<< HEAD
    <router-link to="/profile"></router-link>
=======
>>>>>>> b467c367c6f4e41e79dad6430979bae4e52361ce
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

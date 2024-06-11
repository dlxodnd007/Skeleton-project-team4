<template>
  <div class="container">
    <UserProfile />
    <div class="main">
      <button @click="showModal">모달 열기</button>
      <ModalComponents :visible="isModalVisible" @close-modal="hideModal">
      </ModalComponents>
      <ShowList />
    </div>
    <AddButton class="addbutton-container" />
  </div>
</template>
<script setup>
import AddButton from '@/components/AddButton.vue';
import UserProfile from '@/components/UserProfile.vue';
</script>
<style scoped></style>

<script setup>
import { ref } from 'vue';
import ModalComponents from '@/components/Modal.vue';
import ShowList from '@/components/ShowList.vue';
ShowList;

const isModalVisible = ref(false);

function showModal() {
  isModalVisible.value = true;
}

function hideModal() {
  isModalVisible.value = false;
}
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

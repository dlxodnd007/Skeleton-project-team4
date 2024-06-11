<template>
  <div class="main">
    <button @click="showModal">모달 열기</button>
    <ModalComponents :visible="isModalVisible" @close-modal="hideModal">
    </ModalComponents>
    <!-- <ShowList /> -->
  </div>
</template>

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

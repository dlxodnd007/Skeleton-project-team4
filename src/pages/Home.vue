<template>
  <div>
    <ModalComponents :visible="isModalVisible" @close-modal="hideModal" />
    <div class="button-area">
      <AddButton button @click="showModal" />
      <TotalExpenses />
      <br />
      <TotalIncomes />
      <ShowList />
    </div>
  </div>
</template>

<script setup>
import AddButton from '@/components/AddButton.vue';
import { ref } from 'vue';
import ModalComponents from '@/components/Modal.vue';
import ShowList from '@/components/ShowList.vue';
import TotalExpenses from '@/components/TotalExpenses.vue';
import TotalIncomes from '@/components/TotalIncomes.vue';

const isModalVisible = ref(false);

function showModal() {
  isModalVisible.value = true;
}

function hideModal() {
  isModalVisible.value = false;
}
</script>

<style scoped>
.button-area {
  position: absolute;
  bottom: 100px;
  right: 30px;
}
</style>

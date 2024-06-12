<template>
  <div class="history-container" v-for="ordered of orderedDate">
    <div class="left-column">
      <div>{{ ordered.description }}</div>
      <div class="text-muted small">{{ ordered.date }}</div>
    </div>
    <div class="right-column">
      {{ ordered.mark }}{{ formatNumber(ordered.amount) }}
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, computed, watch } from 'vue';
import { useChangeStore } from '@/stores/changedb.js';

const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const changeStore = useChangeStore();
const orderedDate = computed(() => changeStore.orderedDate);
</script>
<style scoped>
.history-container {
  background: white;
  width: 100%;
  height: 76px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
  margin-bottom: 1rem;
  display: flex;
  padding: 1rem;
  align-items: center;
  justify-content: space-between;
}

.left-column {
  display: flex;
  flex-direction: column;
}
.right-column {
  font-weight: bold;
}
</style>

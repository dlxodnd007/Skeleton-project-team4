<template>
  <div class="expenses-summary" v-if="totalExpenses !== null">
    <h5><strong>총 지출</strong></h5>
    <h6>{{ formatNumber(totalExpenses) }}원</h6>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

import { useChangeStore } from '@/stores/changedb.js';
const changeStore = useChangeStore();
const orderedDate = computed(() => changeStore.computedOrderedDate);

const totalExpensesValue = ref(0);

const totalExpenses = computed(() => totalExpensesValue.value);
const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const fetchExpenses = async () => {
  try {
    const response = await axios.get('http://localhost:3000/expenses');
    totalExpensesValue.value = response.data.reduce(
      (acc, expenses) => acc + expenses.amount,
      0
    );
  } catch (error) {
    console.error('지출 데이터를 가져오는 중 오류가 발생했습니다:', error);
  }
};

onMounted(() => {
  fetchExpenses();
});
</script>

<style scoped>
.expenses-summary {
  width: 160px;
  height: 123px;
  background-color: #56d1a5;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 1rem;

  color: white;
}
</style>

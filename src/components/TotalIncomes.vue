<template>
  <div class="incomes-summary" v-if="totalIncomes !== null">
    <h5><strong>총 수입</strong></h5>
    <h6>{{ formatNumber(totalIncomes) }}원</h6>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

import { useChangeStore } from '@/stores/changedb.js';
const changeStore = useChangeStore();
const orderedDate = computed(() => changeStore.computedOrderedDate);

const totalIncomesValue = ref(0); // totalIncomes를 변경할 수 있는 변수 생성

const totalIncomes = computed(() => totalIncomesValue.value); // computed 속성 변경

const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const fetchIncomes = async () => {
  try {
    const response = await axios.get('http://localhost:3000/income');
    totalIncomesValue.value = response.data.reduce(
      (acc, income) => acc + income.amount,
      0
    );
  } catch (error) {
    console.error('수입 데이터를 가져오는 중 오류가 발생했습니다:', error);
  }
};

onMounted(() => {
  fetchIncomes();
});
</script>

<style scoped>
.incomes-summary {
  width: 160px;
  height: 123px;
  background-color: #56d1a5;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 1rem;
  color: white;
}
</style>

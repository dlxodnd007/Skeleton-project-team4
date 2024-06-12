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
import { ref } from 'vue';
const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const transaction = ref([]);
const orderedDate = ref([]);

async function fetchList() {
  try {
    const url_income = 'http://localhost:3000/income';
    const user_income = await axios.get(url_income);
    console.log('user_income', user_income.data);

    for (let i = 0; i < user_income.data.length; i++) {
      user_income.data[i].check = '입금';
      user_income.data[i].mark = '+';
      transaction.value.push(user_income.data[i]);
    }

    const url_expenses = 'http://localhost:3000/expenses';
    const user_expenses = await axios.get(url_expenses);
    console.log('user_expenses', user_expenses);

    for (let i = 0; i < user_expenses.data.length; i++) {
      user_expenses.data[i].check = '지출';
      user_expenses.data[i].mark = '-';
      transaction.value.push(user_expenses.data[i]);
    }
    console.log('transaction', transaction.value);

    orderedDate.value = transaction.value
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .reverse();
    console.log('orderedDate', orderedDate.value);
  } catch (e) {
    alert('데이터 불러오기 문제 발생!');
    console.log(e);
  }
}
fetchList();
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

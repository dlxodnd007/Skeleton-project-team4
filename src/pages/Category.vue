<template>
  <div>
    <select class="monthSelect" v-model="selectedMonth" @change="changeMonth">
      <option v-for="month in 12" :value="month" :key="month">
        {{ month }}월
      </option>
    </select>
    <div class="title">가장 많은 지출을 한 카테고리는</div>
    <div class="title">
      <span class="emphasis">{{ mostSpentCategory }}</span
      >입니다!
    </div>

    <!-- <Doughnut :data="data" :options="options" /> -->

    <ul class="categoryList">
      <li v-for="expenses in reactiveExpensesArray" :key="expenses.id">
        <span class="circle" :style="{ backgroundColor: expenses.color }">
          {{ expenses.percentage }}%
        </span>
        <span class="categoryName categoryText">{{ expenses.category }}</span>
        <span class="categoryText">{{ expenses.amount.toLocaleString() }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted, computed } from 'vue';
import { useAccountBookStore } from '@/stores/accountBook.js';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'vue-chartjs';
import * as chartConfig from '@/chartConfig.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const accountBookStore = useAccountBookStore();
const { fetchExpenseData, monthExpensesData } = accountBookStore;

const mostSpentCategory = ref('');
const totalAmount = ref(0);
const selectedMonth = ref(new Date().getMonth() + 1);

const reactiveExpensesArray = reactive([
  { category: '식비', amount: 0, color: '#0DC9B9', percentage: 0 },
  {
    category: '교통비',
    amount: 0,
    color: '#FFE70E',
    percentage: 0,
  },
  {
    category: '적금',
    amount: 0,
    color: '#41B6E8',
    percentage: 0,
  },
  {
    category: '쇼핑',
    amount: 0,
    color: '#E982AD',
    percentage: 0,
  },
  {
    category: '이체',
    amount: 0,
    color: '#9771EF',
    percentage: 0,
  },
]);

function updateData(month) {
  const foodExpenses = accountBookStore.accountBookExpenses
    .filter((item) => item.category === '식비')
    .filter((item) => parseInt(item.date.slice(5, 7)) === parseInt(month))
    .reduce((acc, cur) => (acc += parseInt(cur.amount)), 0);
  const transportationExpenses = accountBookStore.accountBookExpenses
    .filter((item) => item.category === '교통비')
    .filter((item) => parseInt(item.date.slice(5, 7)) === parseInt(month))
    .reduce((acc, cur) => (acc += parseInt(cur.amount)), 0);
  const savingsExpenses = accountBookStore.accountBookExpenses
    .filter((item) => item.category === '적금')
    .filter((item) => parseInt(item.date.slice(5, 7)) === parseInt(month))
    .reduce((acc, cur) => (acc += parseInt(cur.amount)), 0);
  const shoppingExpenses = accountBookStore.accountBookExpenses
    .filter((item) => item.category === '쇼핑')
    .filter((item) => parseInt(item.date.slice(5, 7)) === parseInt(month))
    .reduce((acc, cur) => (acc += parseInt(cur.amount)), 0);
  const transferExpenses = accountBookStore.accountBookExpenses
    .filter((item) => item.category === '이체')
    .filter((item) => parseInt(item.date.slice(5, 7)) === parseInt(month))
    .reduce((acc, cur) => (acc += parseInt(cur.amount)), 0);

  reactiveExpensesArray.find((item) => item.category === '식비').amount =
    foodExpenses;
  reactiveExpensesArray.find((item) => item.category === '교통비').amount =
    transportationExpenses;
  reactiveExpensesArray.find((item) => item.category === '적금').amount =
    savingsExpenses;
  reactiveExpensesArray.find((item) => item.category === '쇼핑').amount =
    shoppingExpenses;
  reactiveExpensesArray.find((item) => item.category === '이체').amount =
    transferExpenses;

  totalAmount.value =
    foodExpenses +
    transportationExpenses +
    savingsExpenses +
    shoppingExpenses +
    transferExpenses;

  if (totalAmount.value === 0) {
    reactiveExpensesArray.forEach((item) => (item.percentage = 0));
  } else {
    reactiveExpensesArray.find((item) => item.category === '식비').percentage =
      Math.round((foodExpenses / totalAmount.value) * 100);
    reactiveExpensesArray.find(
      (item) => item.category === '교통비'
    ).percentage = Math.round(
      (transportationExpenses / totalAmount.value) * 100
    );
    reactiveExpensesArray.find((item) => item.category === '적금').percentage =
      Math.round((savingsExpenses / totalAmount.value) * 100);
    reactiveExpensesArray.find((item) => item.category === '쇼핑').percentage =
      Math.round((shoppingExpenses / totalAmount.value) * 100);
    reactiveExpensesArray.find((item) => item.category === '이체').percentage =
      Math.round((transferExpenses / totalAmount.value) * 100);
  }

  mostSpentCategory.value = reactiveExpensesArray.sort(
    (a, b) => b.amount - a.amount
  )[0].category;
}

function changeMonth() {
  updateData(selectedMonth.value);
}

fetchExpenseData();

watch(
  () => accountBookStore.accountBookExpenses,
  () => {
    updateData(selectedMonth.value);
  },
  { immediate: true }
);
</script>

<!-- <script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'vue-chartjs';
import * as chartConfig from '@/chartConfig.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: 'App',
  components: {
    Doughnut,
  },
  data() {
    return chartConfig;
  },
};
</script> -->

<style>
.title {
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  color: #504e64;
  margin: 8px 0px;
}
.emphasis {
  font-weight: 700;
  font-size: 25px;
  color: #0dc9b9;
}
.monthSelect {
  width: 62px;
  border: 1px solid #c9c9c9;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 7px 3px;
  font-weight: 400;
  font-size: 15px;
  color: #504e64;
  text-align: center;
  outline: none;
}

.monthSelect:focus {
  background-color: #0dc9b9;
  border: 1px solid #0dc9b9;
  color: white;
}

.monthSelect option {
  color: #504e64;
}

.categoryList {
  list-style: none;
  padding: 0;
  margin: 20px 0 0 0;
  width: 100%;
  text-align: left;
}
.categoryList li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 14px 0;
}
.circle {
  display: inline-block;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-right: 10px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
.categoryName {
  flex-grow: 1;
  padding-left: 10px;
}
.categoryText {
  font-size: 18px;
  color: #504e64;
}
</style>

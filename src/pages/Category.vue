<<<<<<< HEAD
<template>
  <div>
    <div class="title">가장 많은 지출을 한 카테고리는</div>
    <div class="title">
      <span class="emphasis">{{ mostSpentCategory }}</span
      >입니다!
    </div>
    <!-- <Doughnut :chart-data="chartData" :options="chartOptions" /> -->
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
import { ref, reactive, watch } from 'vue';
import { useAccountBookStore } from '@/stores/accountBook.js';

const accountBookStore = useAccountBookStore();
const { fetchExpenseData } = accountBookStore;

const mostSpentCategory = ref('');
const totalAmmount = ref(0);

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

function updateData() {
  const foodExpenses = accountBookStore.accountBookExpenses
    .filter((item) => item.category === '식비')
    .reduce((acc, cur) => (acc += parseInt(cur.amount)), 0);
  const transportationExpenses = accountBookStore.accountBookExpenses
    .filter((item) => item.category === '교통비')
    .reduce((acc, cur) => (acc += parseInt(cur.amount)), 0);
  const savingsExpenses = accountBookStore.accountBookExpenses
    .filter((item) => item.category === '적금')
    .reduce((acc, cur) => (acc += parseInt(cur.amount)), 0);
  const shoppingExpenses = accountBookStore.accountBookExpenses
    .filter((item) => item.category === '쇼핑')
    .reduce((acc, cur) => (acc += parseInt(cur.amount)), 0);
  const transferExpenses = accountBookStore.accountBookExpenses
    .filter((item) => item.category === '이체')
    .reduce((acc, cur) => (acc += parseInt(cur.amount)), 0);

  reactiveExpensesArray[0].amount = foodExpenses;
  reactiveExpensesArray[1].amount = transportationExpenses;
  reactiveExpensesArray[2].amount = savingsExpenses;
  reactiveExpensesArray[3].amount = shoppingExpenses;
  reactiveExpensesArray[4].amount = transferExpenses;

  totalAmmount.value =
    foodExpenses +
    transportationExpenses +
    savingsExpenses +
    shoppingExpenses +
    transferExpenses;

  reactiveExpensesArray[0].percentage = Math.round(
    (foodExpenses / totalAmmount.value) * 100
  );

  reactiveExpensesArray[1].percentage = Math.round(
    (transportationExpenses / totalAmmount.value) * 100
  );
  reactiveExpensesArray[2].percentage = Math.round(
    (savingsExpenses / totalAmmount.value) * 100
  );
  reactiveExpensesArray[3].percentage = Math.round(
    (shoppingExpenses / totalAmmount.value) * 100
  );
  reactiveExpensesArray[4].percentage = Math.round(
    (transferExpenses / totalAmmount.value) * 100
  );

  mostSpentCategory.value = reactiveExpensesArray.sort(
    (a, b) => b.amount - a.amount
  )[0].category;
}
fetchExpenseData();
watch(
  () => accountBookStore.accountBookExpenses,
  () => {
    updateData();
  },
  { immediate: true }
);
</script>
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
=======
<template></template>

<script setup></script>

<style></style>
>>>>>>> 4eaf913dfda76a3d4d466405aa0c206588bf1766

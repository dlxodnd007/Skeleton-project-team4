import { ref, computed } from 'vue';
import axios from 'axios';
import { defineStore } from 'pinia';

export const useChangeStore = defineStore('changedb', () => {
  const transaction = ref([]);
  const orderedDate = ref([]);
  const select_month = ref(0);
  const months = ref([
    { value: 1, label: '1월' },
    { value: 2, label: '2월' },
    { value: 3, label: '3월' },
    { value: 4, label: '4월' },
    { value: 5, label: '5월' },
    { value: 6, label: '6월' },
    { value: 7, label: '7월' },
    { value: 8, label: '8월' },
    { value: 9, label: '9월' },
    { value: 10, label: '10월' },
    { value: 11, label: '11월' },
    { value: 12, label: '12월' },
  ]);

  async function fetchListOrder() {
    transaction.value = [];
    orderedDate.value = [];

    try {
      const url_income = 'http://localhost:3000/income';
      const user_income = await axios.get(url_income);
      // console.log("user_income", user_income.data);

      for (let i = 0; i < user_income.data.length; i++) {
        user_income.data[i].check = '입금';
        user_income.data[i].mark = '+';
        delete user_income.data[i].id;
        transaction.value.push(user_income.data[i]);
      }

      const url_expenses = 'http://localhost:3000/expenses';
      const user_expenses = await axios.get(url_expenses);
      // console.log("user_expenses", user_expenses);

      for (let i = 0; i < user_expenses.data.length; i++) {
        user_expenses.data[i].check = '지출';
        user_expenses.data[i].mark = '-';
        delete user_expenses.data[i].id;
        transaction.value.push(user_expenses.data[i]);
      }
      // console.log("transaction", transaction.value);

      orderedDate.value = transaction.value
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .reverse();

      console.log('orderedDate', orderedDate.value);
    } catch (e) {
      alert('데이터 불러오기 문제 발생!');
      console.log(e);
    }
  }
  fetchListOrder();
  return {
    transaction,
    orderedDate,
    months,
    select_month,
    fetchListOrder,
  };
});

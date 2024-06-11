import { defineStore } from 'pinia';
import { reactive, computed } from 'vue';
import axios from 'axios';

export const useAccountBookStore = defineStore('accountBook', () => {
  const state = reactive({
    user: {},
  });

  // localhost:3000
  const BASEURL = '/api/user';

  async function fetchUserData() {
    try {
      const fetchUserDataRes = await axios.get(BASEURL);

      state.user = fetchUserDataRes.data;
    } catch (error) {
      alert('가계부 데이터 통신 Err 발생');
      console.log(error);
    }
  }

  async function editName(newName) {
    try {
      const payload = { ...state.user, name: newName };

      const response = await axios.put(`${BASEURL}`, payload);
      fetchUserData();
    } catch (error) {
      alert('이름 변경 오류발생');
      console.log(error);
    }
  }

  async function editIncomeGoal(newGoal) {
    try {
      const payload = { ...state.user, income_goal: newGoal };

      const response = await axios.put(`${BASEURL}`, payload);
      fetchUserData();
    } catch (error) {
      alert('이름 변경 오류발생');
      console.log(error);
    }
  }

  async function editExpenseGoal(newGoal) {
    try {
      const payload = { ...state.user, expense_goal: newGoal };

      const response = await axios.put(`${BASEURL}`, payload);
      fetchUserData();
    } catch (error) {
      alert('이름 변경 오류발생');
      console.log(error);
    }
  }

  const accountBookUser = computed(() => state);

  return {
    fetchUserData,
    accountBookUser,
    editName,
    editIncomeGoal,
    editExpenseGoal,
  };
});

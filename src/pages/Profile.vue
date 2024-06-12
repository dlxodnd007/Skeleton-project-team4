<template>
  <div class="profile-header">
    <div class="profile-img-container">
      <img :src="user.profilePicture" alt="Profile" class="profile-img" />
      <button @click="toggleAvatar" class="profile-img-button">+</button>
      <div id="avatars" v-if="avatarEditingMode">
        <img
          @click="editCharacter('/src/asset/images/avatar1.png')"
          class="avatar"
          src="@/asset/images/avatar1.png"
          alt="avatar1"
        />
        <img
          @click="editCharacter('/src/asset/images/avatar2.png')"
          class="avatar"
          src="@/asset/images/avatar2.png"
          alt="avatar2"
        />
        <img
          @click="editCharacter('/src/asset/images/avatar3.png')"
          class="avatar"
          src="@/asset/images/avatar3.png"
          alt="avatar3"
        />
        <img
          @click="editCharacter('/src/asset/images/avatar4.png')"
          class="avatar"
          src="@/asset/images/avatar4.png"
          alt="avatar4"
        />
      </div>
    </div>
    <h2>{{ user.name }}</h2>
    <div v-if="editingMode">
      <input type="text" v-model.trim="newName" />
      <button @click="editName(newName)">변경</button>
      <button>취소</button>
    </div>

    <br />
    <button id="logout" class="main-btn">🔐로그아웃</button>
    <button @click="toggleGoalEdit()" class="main-btn">📑목표 수정</button>
    <div class="goal">
      <h3>목표</h3>
      <div id="content">
        <span>
          <span>💰이번달 목표 수입금액:</span>
          <br />
          <h3 @click="toggleIncomeEdit">₩ {{ user.income_goal }}</h3>
          <div v-if="goalEditingMode">
            <input type="text" v-model.trim.number="newIncomeGoal" />
            <button @click="editIncomeGoal(newIncomeGoal)">변경</button>
            <button @click="toggleIncomeEdit">취소</button>
          </div>
          <br />
        </span>
        <br />
        <span>
          <span>💸이번달 목표 지출금액:</span>
          <br />
          <h3 @click="toggleExpenseEdit()">₩ {{ user.expense_goal }}</h3>
          <div v-if="goalEditingMode">
            <input type="text" v-model.trim.number="newExpenseGoal" />
            <button @click="editExpenseGoal(newExpenseGoal)">변경</button>
            <button @click="toggleExpenseEdit">취소</button>
          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useUserStore } from '@/stores/user.js';
const userStore = useUserStore();
const {
  fetchUserData,
  accountBookUser,
  editName,
  editIncomeGoal,
  editExpenseGoal,
  editCharacter,
} = userStore;

const editingMode = ref(true);
const incomeEditingMode = ref(true);
// const expenseEditingMode = ref(true);
const avatarEditingMode = ref(true);
const newName = ref('');
const goalEditingMode = ref('');

function toggleAvatar() {
  avatarEditingMode.value = !avatarEditingMode.value;
}

function toggleEditMode() {
  editingMode.value = !editingMode.value;
}

// function toggleIncomeEdit() {
//   incomeEditingMode.value = !incomeEditingMode.value;
// }

// function toggleExpenseEdit() {
//   expenseEditingMode.value = !expenseEditingMode.value;
// }

function toggleGoalEdit() {
  goalEditingMode.value = !goalEditingMode.value;
}

fetchUserData();

const user = computed(() => accountBookUser.user);
</script>

<style lang="scss" scoped>
#body {
  width: 80%;
}

// #container {
// }

// #user-img {
//   border: solid 3px #56d1a5;
//   border-radius: 50%;
//   width: 100px;
//   height: 100px;
// }

.avatar {
  width: 70px;
}

.main-btn {
  margin: 10px;
  background-color: #56d1a5;
  display: inline-block;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 30px;
  border-radius: 10px;
  border: none;
  text-align: center;
  cursor: pointer;
  position: relative;
}

.main-btn:hover {
  background-color: #00796b;
}

.profile-header {
  text-align: center;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-img-container {
  position: relative;
  display: inline-block;
}

.profile-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid #56d1a5;
}

.profile-img-button {
  position: absolute;
  top: 70px;
  left: 70px;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logout-button,
.edit-button {
  margin: 10px;
  padding: 10px 20px;
  border: none;
  background-color: #e0f7fa;
  color: #00796b;
  cursor: pointer;
  border-radius: 15px;
  font-size: 14px;
}

.logout-button:hover,
.edit-button:hover {
  background-color: #b2dfdb;
}

.goal {
  margin-top: 20px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.goal-title {
  font-weight: bold;
  margin-bottom: 10px;
}

#content {
  text-align: left;
  margin-left: 20px;
  font-size: 14px;
}

#content span {
  display: block;
}
</style>

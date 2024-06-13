<template>
  <div class="profile-header">
    <div class="profile-img-container">
      <div id="top-image-btn">
        <img :src="user.profilePicture" alt="Profile" class="profile-img" />
        <button @click="toggleAvatarWithName" class="profile-img-button">
          <h3 style="line-height: 8px">{{ avatarEditingMode ? '-' : '+' }}</h3>
        </button>
      </div>

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
    <div v-if="isShowNameToggle" id="name-with-icon">
      <h2 id="name">
        {{ user.name }}
        <div id="edit-icon" @click="toggleEditMode()" style="cursor: pointer">
          ✏
        </div>
      </h2>
    </div>

    <div class="inputBtns" v-if="editingMode">
      <input
        type="text"
        id="name-input"
        v-model.trim="newName"
        ref="nameChangeInput"
      />

      <div
        @click="editNameHandler()"
        class="main-btn"
        style="color: aliceblue; width: 40px; margin: 2px; height: 30px"
      >
        변경
      </div>
      <div
        @click="toggleEditMode"
        class="main-btn"
        style="
          background-color: #d7f0e7;
          color: #56d1a5;
          width: 40px;
          margin: 2px;
          height: 30px;
        "
      >
        취소
      </div>
    </div>

    <div class="main-btn-container">
      <button id="logout" class="main-btn" style="color: aliceblue">
        🔐로그아웃
      </button>
      <button
        @click="toggleGoalEdit()"
        class="main-btn"
        style="color: aliceblue"
      >
        📑목표수정
      </button>
    </div>
    <div class="goal">
      <h3 style="font-weight: bold">목표</h3>
      <div id="content">
        <span>
          <span style="font-weight: bold; font-size: 16px"
            >💰이번달 목표 수입금액:</span
          >
          <br />
          <h3 @click="toggleIncomeEdit" style="font-weight: bold">
            ₩ {{ user.income_goal.toLocaleString() }}
          </h3>
          <div class="inputBtns" v-if="goalEditingMode">
            <input
              type="text"
              v-model.trim.number="newIncomeGoal"
              ref="incomeGoalChangeInput"
            />
          </div>
          <br />
        </span>

        <span>
          <span style="font-weight: bold; font-size: 16px"
            >💸이번달 목표 지출금액:</span
          >
          <br />
          <h3 style="font-weight: bold">
            ₩ {{ user.expense_goal.toLocaleString() }}
          </h3>
          <div class="inputBtns" v-if="goalEditingMode">
            <input
              type="text"
              v-model.trim.number="newExpenseGoal"
              ref="expenseGoalChangeInput"
            />
          </div>
        </span>
        <div v-if="goalEditingMode" class="main-btn-container">
          <div
            @click="editGoalHandler"
            class="main-btn"
            style="color: aliceblue"
          >
            변경
          </div>
          <div
            @click="toggleGoalEdit"
            class="main-btn"
            id="name-cancle-btn"
            style="background-color: #d7f0e7; color: #56d1a5"
          >
            취소
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue';
import { useUserStore } from '@/stores/user.js';
const userStore = useUserStore();
const { fetchUserData, accountBookUser, editName, editCharacter, editGoal } =
  userStore;

const editingMode = ref(false);
// const incomeEditingMode = ref(true);
const avatarEditingMode = ref(false);
const newName = ref('');
const goalEditingMode = ref('');
const newIncomeGoal = ref('');
const newExpenseGoal = ref('');
const isShowNameToggle = ref(true);
const nameChangeInput = ref(null);
const incomeGoalChangeInput = ref(null);
const expenseGoalChangeInput = ref(null);

fetchUserData();

const user = computed(() => accountBookUser.user);

function editGoalHandler() {
  editGoal(newIncomeGoal.value, newExpenseGoal.value);
  newIncomeGoal.value = '';
  newExpenseGoal.value = '';
}

function editNameHandler() {
  editName(newName.value);
  isShowNameToggle.value = !isShowNameToggle.value;
  editingMode.value = !editingMode.value;
  newName.value = '';
}

function toggleAvatarWithName() {
  if (editingMode.value === true) {
    avatarEditingMode.value = !avatarEditingMode.value;
    return (isShowNameToggle.value = false);
  }
  avatarEditingMode.value = !avatarEditingMode.value;
  isShowNameToggle.value = !isShowNameToggle.value;
}

function toggleEditMode() {
  editingMode.value = !editingMode.value;
  isShowNameToggle.value = !isShowNameToggle.value;
  newName.value = user.value.name;
  nextTick(() => {
    if (nameChangeInput.value) {
      nameChangeInput.value.focus();
      nameChangeInput.value.select();
    }
  });
}

function toggleGoalEdit() {
  goalEditingMode.value = !goalEditingMode.value;

  // // 목표값이 각각 나오게 하기
  // newIncomeGoal.value = user.value.income_goal;
  // newExpenseGoal.value = user.value.expense_goal;
  // // 포커스가고, select할 수 있도록 하기
  // nextTick(() => {
  //   incomeGoalChangeInput.value.focus();
  //   incomeGoalChangeInput.value.select();
  // });
  // nextTick(() => {
  //   expenseGoalChangeInput.value.focus();
  //   expenseGoalChangeInput.value.select();
  // });
}

function isShowName() {
  isShowNameToggle.value = !isShowNameToggle.value;
}
</script>

<style lang="scss" scoped>
#body {
  width: 80%;
}

#name {
  padding-top: 5px;
  font-weight: bold;
}

#name-input {
  width: 100px;
  height: 35px;
}

#edit-icon {
  display: inline-block;
  font-size: 15px;
  padding: 0;
  margin: 0;
}

.main-btn-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

#avatars {
  width: 300px;
  padding-bottom: 15px;
}

.avatar {
  width: 70px;
  cursor: pointer;
}

.avatar:hover {
  transform: scale(1.2, 1.2);
  transition-duration: 0.5s;
}

.inputBtns {
  width: 380px;
  display: felx;
  flex-direction: column;
  justify-content: center;
}

.goal-change-btn {
  background-color: #56d1a5;
}

.main-btn {
  margin: 10px;
  background-color: #56d1a5;
  display: inline-block;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 40px;
  border-radius: 10px;
  border: none;
  text-align: center;
  cursor: pointer;
  position: relative;
  line-height: 40px;
  font-weight: bold;
}

.main-btn:hover {
  background-color: #00796b;
}

.profile-header {
  text-align: center;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
}

.profile-img-container {
  position: relative;
  display: inline-block;
}

.profile-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 5px solid #56d1a5;
  position: relative;
}

#top-image-btn {
  width: 300px;
  position: relative;
}

.profile-img-button {
  position: absolute;
  top: 52px;
  right: 87px;

  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  background-color: #56d1a5;
  color: white;
  font-weight: bold;
  cursor: pointer;
  font-size: 18px;
  text-align: center;
  line-height: 2px;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
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

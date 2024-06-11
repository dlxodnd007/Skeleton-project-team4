<template>
    <div>
        <h2>최근사용내역</h2>
        <ul>
            <li v-for="transaction in sortedTransactions" :key="transaction.id">
                {{ transaction.date }} - {{ transaction.amount }} -
                {{ transaction.description }} ({{ transaction.type }})
            </li>
        </ul>
    </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

const cat = ref([]);

async function fetchList() {
    try {
        const url_income = "http://localhost:3000/income";
        const user_income = await axios.get(url_income);
        console.log("user_income", user_income);

        const url_expenses = "http://localhost:3000/income";
        const user_expenses = await axios.get(url_expenses);
        console.log("user_expenses", user_expenses);
    } catch (e) {
        alert("데이터 불러오기 문제 발생!");
        console.log(e);
    }
}
fetchList();
</script>

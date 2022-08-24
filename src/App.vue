/* eslint-disable no-console */
<script setup lang="ts">
import { ref, reactive, provide, watch, computed, InjectionKey, h } from 'vue';
import axios from 'axios';
import Item from './components/Item.vue';
import { cardpayHistory, fetchHistories, histories, historyKey, selectedHistories } from './cardpayHistory';

type optionDate = {
  startDate: string,
  endDate: string
}

provide(historyKey, selectedHistories);

const targetDate = ref<string>('');
const isfixedcost = ref(false);

// TODO: ここcomputedじゃなくmethodでもいい？
const dateSelectOptions = computed(() => {
  // 開始年月(2021年10月)
  const startDate = new Date(2021,8);

  // 翌月
  const d = new Date();
  d.setDate(1);
  d.setHours(0);
  d.setMinutes(0);
  d.setSeconds(0);
  d.setMilliseconds(0);
  d.setMonth(d.getMonth() + 1);

  const selectboxList = [];

  // 1ヶ月ずつ減らしてリストに追加していく
  while(d.getTime() != startDate.getTime()) {
    selectboxList.push({
      text: `${d.getFullYear()}年${d.getMonth()+1}月`,
      value: `${d.getFullYear()}${_zeroPadding(d.getMonth()+1, 2)}`
    });
    d.setMonth(d.getMonth() - 1);
  }
  targetDate.value = selectboxList[0].value;
  return selectboxList;
});

/**
 * @param {number} month - 月の数字
 * @param {number} digit - 0詰めする桁数
 * @return {string} 0詰めした文字列
 */
const _zeroPadding = (month: number, digit: number): string => {
  const d = digit * -1;
  return ('0' + month).slice(d);
}

const sumAmount = computed(() => {
  return histories.value?.reduce(
    (prev: number, current: cardpayHistory): number => prev + (selectedHistories.value.includes(current.id)? current.amount : 0)
    ,0
  );
})

</script>

<template>
  <div id="app">
    <h2>Monthly Billing of CreditCard</h2>
    <div class="header">
      <p>合計: {{ sumAmount?.toLocaleString() }} 円</p>
      <div>
        <select name="date" id="date" v-model="targetDate">
          <option v-for="option in dateSelectOptions" :key="option.text" :value="option.value">
              {{ option.text }}
          </option>
        </select>
        <button @click="fetchHistories(targetDate)">SHOW</button>
      </div>
    </div>
    <ul>
      <li class="money-list" v-for="history in histories" :key="history.id">
        <item :history=history />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.header {
  position: sticky;
  top: 10px;
  z-index: 3;
  background-color: white;
  opacity: 0.9;
}
  ul {
    padding: 0px;
  }
  .money-list {
    list-style-type: none;
    background-color: #B8E9FE;
    background: linear-gradient(#83d4fb, #B8EAC0);
    border-radius: 10px;
    margin: 10px 15px;
    padding: 2px 5px 5px;
  }
  .list-inner-container {
    display: flex;
    justify-content: space-between;
    font-family: 'Noto Sans JP', sans-serif
  }
  .list-inner-container-right {
    margin: 5px;
  }
  .list-bottom {
    background-color: aliceblue;
    border-radius: 3px;
  }
  .p-comment {
    margin: 0px;
    padding: 5px;
    font-size: 12px;
  }
  .list-amount {
    font-size: 20px;
  }
  .list-date {
    font-size: 13px;
  }
  .list-genre {
    margin: 0px;
    font-size: 13px;
  }
</style>

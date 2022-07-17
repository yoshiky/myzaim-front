/* eslint-disable no-console */
<script setup lang="ts">
import { ref, reactive, provide, watch, computed, InjectionKey } from 'vue';
import axios from 'axios';
import Item from './components/Item.vue';
import { fetchHistories, histories, historyKey, selectedHistories } from './cardpayHistory';

type optionDate = {
  startDate: string,
  endDate: string
}

// const selectedHistories = ref<number[]>([]);
// provide('selectedHistories', selectedHistories);

provide(historyKey, selectedHistories);

const targetDate = ref<string>('');
const isfixedcost = ref(false);

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

</script>

<template>
  <div id="app">
    <div>{{ selectedHistories }}</div>
    <h2>Monthly Billing of CreditCard</h2>
    <p>合計: {{  }}</p>
    <div>
      <select name="date" id="date" v-model="targetDate">
        <option v-for="option in dateSelectOptions" :key="option.text" :value="option.value">
            {{ option.text }}
        </option>
      </select>
      <button @click="fetchHistories(targetDate)">SHOW</button>
      <div v-show="histories">
        <input type="radio" name="is-fixed-cost" id="fc-fca" v-model="isfixedcost" value="all"><label for="fc-fca">全て</label>
        <input type="radio" name="is-fixed-cost" id="fc-fcy" v-model="isfixedcost" value="固定費" ><label for="fc-fcy">固定費</label>
        <input type="radio" name="is-fixed-cost" id="fc-fcn" v-model="isfixedcost" value="" ><label for="fc-fcn">固定費以外</label>
      </div>
    </div>
    <ul>
      <li class="money-list" v-for="history in histories" :key="history.id">
        <item :history=history />
      </li>
    </ul>
  </div>
</template>

<style>

</style>

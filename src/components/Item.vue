<script setup lang="ts">
import { inject, onMounted } from "vue";
import { cardpayHistory, historyKey } from '../cardpayHistory';

type Props = {
  history: cardpayHistory
}
const props = defineProps<Props>();
const state = inject(historyKey);
if(!state) { throw Error('selectedHistories is not defined!') }
const selectedHistories = state;

// チェックボックスがデフォルトで選択状態にならないので対策
selectedHistories.value.push(props.history.id);

</script>

<template>
  <div>
    <div class="list-inner-container">
      <input type="checkbox" :id="'h-'+history.id" :value="history.id" v-model="selectedHistories" checked>
      <div class="list-inner-container-left">
        <span class="list-amount">￥{{ history.amount?.toLocaleString() }}</span>
      </div>
      <div class="list-inner-container-right">
        <span class="list-date">{{ history.date }}</span>
      </div>
    </div>
    <span class="list-genre">{{ history.genre_id }}</span>
    <span class="p-comment">{{ history.place }}</span>
    <div class="list-bottom">
      <p class="p-comment">{{ history.comment }}</p>
    </div>
  </div>
</template>


<style scoped>
.list-inner-container {
    display: flex;
    justify-content: space-between;
    font-family: 'Noto Sans JP', sans-serif
}
.list-inner-container-left {
  margin-right: 20px;
  margin-left: auto;
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
  margin-right: 0;
  margin-left: auto;
  width: 60%;
  text-align: right;
  display: inline-block;
}
.list-date {
  font-size: 13px;
}
.list-genre {
  margin: 0px;
  font-size: 13px;
}
</style>
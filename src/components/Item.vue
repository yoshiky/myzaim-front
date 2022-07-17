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

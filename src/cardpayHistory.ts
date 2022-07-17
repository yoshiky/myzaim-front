import { ref, InjectionKey } from "vue";
import axios from 'axios';

type cardpayHistory = {
  id: number,
  user_id: number,
  date: string,
  mode: string,
  category_id: number,
  genre_id: number,
  from_account_id: number,
  to_account_id: number,
  amount: number,
  comment: string,
  active: string,
  created_at: string,
  currency_code: string,
  name: string,
  receipt_id: number,
  place: string
}

const histories =  ref<cardpayHistory[]>();

/**
 * Zaimからデータを取得
 * @param {string} dt 取得対象の年月(yyyymm形式)
 */
const fetchHistories = async (dt: string) => { 
  // リクエストパラメタの構築
  const yyyy: number = Number(dt.substring(0,4));
  const mm: number = Number(dt.substring(4,6));
  const startDate: string = _format(new Date(yyyy, mm - 1));
  const endDate: string = _format(_getEndDate(dt));
  
  // zaimからデータを取得
  const response = await axios.get(`https://myzaim.herokuapp.com/zaim/creditcard?mapping=1&start_date=${startDate}&end_date=${endDate}`);
  histories.value = response.data;

  // 年月を切り替えるたびに追加されていくので、選択中historyを空にする
  selectedHistories.value.splice(0);
}

/**
 * 指定年月の月末日を返却する
 * (翌月-1日の計算なので日本時間以外だと期待通りにならない可能性がある）
 * @param {string} yyyymm 指定年月(yyyymm形式)
 * @return { Date } 指定年月の月末日
 */
const _getEndDate = (yyyymm: string): Date => {
  const year: number = Number(yyyymm.substring(0,4));
  const month: number = Number(yyyymm.substring(4,6));

  // Date型に変換
  const d = new Date(year, month - 1);
  // 翌月にして1日減らす
  d.setMonth(d.getMonth() + 1);
  d.setDate(d.getDate() - 1);

  return d;
} 

/**
 * yyyy-mm-dd形式にフォーマットする
 * @param { Date } d フォーマット対象Date
 */
const _format = (d: Date): string => {
  return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`
}

const selectedHistories = ref<number[]>([]);
type historyType = typeof selectedHistories;
const historyKey: InjectionKey<historyType> = Symbol('history');

export { fetchHistories, histories, historyKey, selectedHistories };
export type { cardpayHistory };
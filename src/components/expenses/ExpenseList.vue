<template>
  <section>
    <q-toolbar class="bg-secondary text-white shadow-2">
      <q-toolbar-title>Histórico de gastos</q-toolbar-title>
    </q-toolbar>

    <q-list bordered>
      <q-item
        v-for="element in expenseList"
        :key="element.id"
        class="q-my-sm"
        clickable
        v-ripple
        :active="element.selected"
        active-class="bg-blue-2 text-black"
        @click="onSelectExpense(element)"
      >
        <q-item-section>
          <q-item-label>{{ element.userName }}</q-item-label>
          <q-item-label caption lines="2">{{
            element.description
          }}</q-item-label>
          <q-item-label caption lines="3">{{ element.isoDate }}</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label v-if="element.timeAgo !== ''" caption
            >Hace {{ element.timeAgo }}</q-item-label
          >
          <q-item-label v-else caption>Hace menos de 1 minuto</q-item-label>
          <q-item-label class="main__item--amount"
            >{{ element.amount }} €</q-item-label
          >
        </q-item-section>
      </q-item>
    </q-list>
  </section>
</template>

<script lang="js">
import { defineComponent, onMounted, computed, watch, ref } from 'vue'
import { useStore } from 'src/store'

import * as dayjs from 'dayjs'
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)

export default defineComponent({
  name: 'expense-list',
  emits: ['select-expense'],
  props: {
    expenses: {
      type: Array,
      required: false,
      default: () => []
    },
  },
  setup(props, context) {
    const store = useStore()
    const myWindow = ref({ width: 0, height: 0 })
    const listHeight = ref('0px')
    const expenseList = ref([])

    const users = computed(() => {
      return store.state.rau.users
    })
    const userData = ref({})

    const expenses = computed(() => {
      return store.state.rau.expenses
    })
    watch(expenses, () => {
      showData()
    })

    watch(
      () => props.expenses,
      () => {
        showData()
      }
    )

    onMounted(() => {
      handleResize()
      loadUserData()
      showData()
    })

    function handleResize() {
      myWindow.value.width = window.innerWidth
      myWindow.value.height = window.innerHeight
      listHeight.value = myWindow.value.height - 110 + 'px'
    }

    function loadUserData() {
      userData.value = users.value.reduce(function (map, obj) {
        map[obj.id] = obj
        return map
      }, {})
    }

    function getDiff(timestamp) {
      let diffTime = Math.abs(new Date().valueOf() - new Date(timestamp).valueOf());
      let days = diffTime / (24*60*60*1000);
      let hours = (days % 1) * 24;
      let minutes = (hours % 1) * 60;
      let secs = (minutes % 1) * 60;
      [days, hours, minutes, secs] = [Math.floor(days), Math.floor(hours), Math.floor(minutes), Math.floor(secs)]

      let out = ''
      if (days > 0) {
        out = out + days + ' días, '
      }
      if (hours === 1) {
        out = out + hours + ' hora y '
      } else if (hours > 0) {
        out = out + hours + ' horas y '
      }
      if (minutes === 1) {
        out = out + minutes + ' minuto'
      } else if (minutes > 0) {
        out = out + minutes + ' minutos'
      }

      return out
    }

    function showData() {
      expenseList.value.length = 0
      expenses.value.forEach((el) => {
        expenseList.value.push({
          ...el,
          userName: userData.value[el.userId].name ? userData.value[el.userId].name : '',
          isoDate: dayjs(el.timestamp).format('DD/MM/YYYY - HH:mm'),
          timeAgo: getDiff(el.timestamp),
        })
      })
      expenseList.value.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1))
    }

    function onSelectExpense(expense) {
      expenseList.value.forEach(el=>{
        if (expense.id === el.id) {
          el.selected = true
        } else {
          el.selected = false
        }
      })
      context.emit('select-expense', expense)

    }

    return { listHeight, expenseList, onSelectExpense }
  },
})
</script>

<style scoped>
.main__item--amount {
  font-size: 1.1rem;
  font-weight: bold;
}
</style>

<template>
  <section>
    <q-toolbar class="bg-grey-2 text-black shadow-2">
      <q-toolbar-title class="main__toolbar"
        ><span>Lista de Deudas</span>
        <au-btn
          v-if="debtList.length > 0"
          size="md"
          icon="check"
          color="primary"
          label="Liquidar deudas"
          @on-click="onSettle()"
        />
      </q-toolbar-title>
    </q-toolbar>

    <q-list bordered>
      <q-item
        v-for="element in debtList"
        :key="element.userIdOrigin"
        class="q-my-sm"
        v-ripple
      >
        <q-item-section>
          <q-item-label
            >{{ element.nameOrigin }}
            <q-icon name="east" size="2em" color="positive" />
            {{ element.nameDestination }}
          </q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label lines="2" class="main__item--amount"
            >{{ element.amount }} €</q-item-label
          >
        </q-item-section>
      </q-item>
    </q-list>
  </section>

  <au-dialog
    v-model="confirmSettle"
    message="¿Seguro que deseas liquidar todas las deudas? ESTA ACCIÓN NO SE PUEDE DESHACER, TODOS LOS DATOS DE GASTOS SERÁN ELIMINADOS
        DEL SISTEMA"
    @ok="onSettleOk"
    @hide="onSettleCancel"
  />

  <q-inner-loading :showing="isLoading">
    <q-spinner-puff size="100px" color="primary" />
  </q-inner-loading>
</template>

<script lang="js">
import { defineComponent, onMounted, computed, watch, ref } from 'vue'
import { useStore } from 'src/store'
import useHttp from 'src/util/useHttp.js'
import useToast from 'src/util/useToast.js'
import AuBtn from '@/components/ui/AuBtn.vue'
import AuDialog from '@/components/ui/AuDialog.vue'

export default defineComponent({
  name: 'debts-list',
  components: {
    AuBtn,
    AuDialog
  },
  setup(props, context) {
    const store = useStore()
    const isLoading = ref(false)
    const { showToast } = useToast()
    const { get } = useHttp()
    const myWindow = ref({ width: 0, height: 0 })
    const listHeight = ref('0px')
    const debtList = ref([])
    const payments = ref({})
    const confirmSettle = ref(false)

    const users = computed(() => {
      return store.state.rau.users
    })
    const userData = ref({})

    const expenses = computed(() => {
      return store.state.rau.expenses
    })
    watch(expenses, () => {
      calculatePayments()
      splitPayments()
    })

    onMounted(() => {
      handleResize()
      loadUserData()
      loadData()
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

    function calculatePayments() {
      expenses.value.forEach(el=>{
        payments.value[el.userId] = payments.value[el.userId] ? payments.value[el.userId] + el.amount : el.amount
      })
      // fill with users without payments
      users.value.forEach(el=>{
        if (payments.value[el.id] === undefined) {
          payments.value[el.id] = 0
        }
      })
    }

    function splitPayments() {
      debtList.value.length = 0
      const people = Object.keys(payments.value);
      const valuesPaid = Object.values(payments.value);

      const sum = valuesPaid.reduce((acc, curr) => curr + acc);
      const mean = sum / people.length;

      const sortedPeople = people.sort((personA, personB) => payments.value[personA] - payments.value[personB]);
      const sortedValuesPaid = sortedPeople.map((person) => payments.value[person] - mean);

      let i = 0;
      let j = sortedPeople.length - 1;
      let debt;

      while (i < j) {
        debt = Math.min(-(sortedValuesPaid[i]), sortedValuesPaid[j]);
        sortedValuesPaid[i] += debt;
        sortedValuesPaid[j] -= debt;

        // console.log(`${sortedPeople[i]} owes ${sortedPeople[j]} $${debt}`);
        if (debt > 0) {
        debtList.value.push({
          userIdOrigin: sortedPeople[i],
          userIdDestination: sortedPeople[j],
          nameOrigin: userData.value[sortedPeople[i]].name ? userData.value[sortedPeople[i]].name : '',
          nameDestination: userData.value[sortedPeople[j]].name ? userData.value[sortedPeople[j]].name : '',
          amount: debt.toFixed(2)
        })
      }

        if (sortedValuesPaid[i] === 0) {
          i++;
        }

        if (sortedValuesPaid[j] === 0) {
          j--;
        }
      }
    }

    const loadData = async () => {
      try {
        isLoading.value = true
        const response = await get('/expenses', {})
        isLoading.value = false
        store.commit('rau/setExpenses', [...response.data])
      } catch (err) {
        showToast('negative', 'Error leyendo los gastos')
        isLoading.value = false
        console.error(err)
      }
    }


    function onSettle() {
      confirmSettle.value = true
    }

    function onSettleOk() {
      console.log('settle ok')
      confirmSettle.value = true
    }

    function onSettleCancel() {
      console.log('settle cancel')
      doSettle()
    }

    const doSettle = async () => {
      try {
        isLoading.value = true
        await get('/expenses/settle', {})
        isLoading.value = false
        showToast('positive', 'Todas las deudas han sido liquidadas')
        debtList.value.length = 0
      } catch (err) {
        showToast('negative', 'Error liquidando las deudas')
        isLoading.value = false
        console.error(err)
      }
    }


    return { isLoading, listHeight, debtList, onSettle, confirmSettle, onSettleOk, onSettleCancel }
  },
})
</script>

<style scoped>
.main__toolbar {
  display: flex;
  justify-content: space-between;
}

.main__item--amount {
  font-size: 1.1rem;
  font-weight: bold;
}
</style>

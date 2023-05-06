<template>
  <div class="main">
    <div class="main__tabs">
      <q-tabs
        v-model="mainTab"
        dense
        inline-label
        outside-arrows
        mobile-arrows
        class="bg-white text-black main__tabs"
      >
        <q-tab name="AdminUsers" icon="person" label="Usuarios"></q-tab>
        <q-tab
          id="tab-expenses"
          name="AdminExpenses"
          icon="euro"
          label="Gastos"
        ></q-tab>
        <q-tab
          name="BalanceList"
          icon="account_balance"
          label="Balance"
        ></q-tab>
        <q-tab name="DebtsList" icon="payments" label="Deudas"></q-tab>
      </q-tabs>
    </div>

    <div class="main__option">
      <component :is="mainTab" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import AdminUsers from '@/components/users/AdminUsers.vue'
import AdminExpenses from '@/components/expenses/AdminExpenses.vue'
import BalanceList from '@/components/balance/BalanceList.vue'
import DebtsList from '@/components/debts/DebtsList.vue'

export default defineComponent({
  name: 'MainComponent',
  components: {
    AdminUsers,
    AdminExpenses,
    BalanceList,
    DebtsList,
  },
  props: {},
  setup() {
    const mainTab = ref('AdminUsers')

    onMounted(() => {
      console.log('onMounted MainComponent')
    })

    return {
      mainTab,
    }
  },
})
</script>

<style scoped>
.main {
  padding: 0.5rem;
  background-color: white;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
}

.main__tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
}
</style>

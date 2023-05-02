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
        <q-tab name="users" icon="person" label="Usuarios"></q-tab>
        <q-tab name="expenses" icon="euro" label="Gastos"></q-tab>
        <q-tab name="balance" icon="account_balance" label="Balance"></q-tab>
      </q-tabs>
    </div>

    <div class="main__option">
      <AdminUsers v-if="mainTab === 'users'" />
      <AdminExpenses v-if="mainTab === 'expenses'" />
      <BalanceList v-if="mainTab === 'balance'" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import AdminUsers from '@/components/users/AdminUsers.vue'
import AdminExpenses from '@/components/expenses/AdminExpenses.vue'
import BalanceList from '@/components/balance/BalanceList.vue'

export default defineComponent({
  name: 'MainComponent',
  components: {
    AdminUsers,
    AdminExpenses,
    BalanceList,
  },
  props: {},
  setup() {
    const mainTab = ref('users')

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

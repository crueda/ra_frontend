<template>
  <div class="main">
    <section class="main__buttons">
      <au-btn
        size="md"
        icon="add"
        color="secondary"
        label="Nuevo gasto"
        @on-click="showAddPanel()"
      />
      <au-btn
        v-if="expenseSelected.id !== 0"
        size="md"
        outline
        icon="edit"
        color="secondary"
        label="Editar"
        @on-click="showEditPanel()"
      />
      <au-btn
        v-if="expenseSelected.id !== 0"
        size="md"
        outline
        icon="delete"
        color="negative"
        label="Eliminar"
        @on-click="confirmDelete = true"
      />
    </section>
    <section class="main__list">
      <ExpenseList :expenses="expenses" @select-expense="onSelectExpense" />
    </section>
  </div>

  <q-dialog v-model="isAddPanelOpen" persistent>
    <q-card style="width: 400px" class="q-px-sm q-pb-md">
      <q-card-section class="main__panel--title">
        <div class="text-h6">Nuevo gasto</div>
      </q-card-section>

      <q-card-section>
        <q-select
          v-model="expenseSelected.user"
          :options="userOptions"
          label="Usuario"
        />

        <q-input
          v-model="expenseSelected.amount"
          label="Importe"
          type="number"
          mask="#.##"
          fill-mask="#"
          reverse-fill-mask
          stack-label
        />
        <q-input
          v-model="expenseSelected.description"
          label="Descripción"
          stack-label
        />

        <div>
          <q-input v-model="expenseSelected.date">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="expenseSelected.date"
                    mask="YYYY-MM-DD HH:mm"
                  >
                    <div class="row items-center justify-end">
                      <q-btn
                        v-close-popup
                        label="Close"
                        color="secondary"
                        flat
                      />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>

            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time
                    v-model="expenseSelected.date"
                    mask="YYYY-MM-DD HH:mm"
                    format24h
                  >
                    <div class="row items-center justify-end">
                      <q-btn
                        v-close-popup
                        label="Close"
                        color="secondary"
                        flat
                      />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </q-card-section>

      <q-card-actions align="center" class="text-primary">
        <q-btn
          color="secondary"
          outline
          label="Cancelar"
          v-close-popup
          @click="isAddPanelOpen = false"
        />
        <q-btn color="primary" label="Añadir" @click="onNewExpense()" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="isEditPanelOpen" persistent>
    <q-card style="width: 400px" class="q-px-sm q-pb-md">
      <q-card-section class="main__unsubscribePanel--title">
        <div class="text-h6">Editar gasto</div>
      </q-card-section>

      <q-card-section>
        <q-select
          v-model="expenseSelected.user"
          :options="userOptions"
          label="Usuario"
        />

        <q-input
          v-model="expenseSelected.amount"
          label="Importe"
          type="number"
          mask="#.##"
          fill-mask="#"
          reverse-fill-mask
          stack-label
        />
        <q-input
          v-model="expenseSelected.description"
          label="Descripción"
          stack-label
        />

        <div>
          <q-input v-model="expenseSelected.date">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="expenseSelected.date"
                    mask="YYYY-MM-DD HH:mm"
                  >
                    <div class="row items-center justify-end">
                      <q-btn
                        v-close-popup
                        label="Close"
                        color="secondary"
                        flat
                      />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>

            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time
                    v-model="expenseSelected.date"
                    mask="YYYY-MM-DD HH:mm"
                    format24h
                  >
                    <div class="row items-center justify-end">
                      <q-btn
                        v-close-popup
                        label="Close"
                        color="secondary"
                        flat
                      />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </q-card-section>

      <q-card-actions align="center" class="text-primary">
        <q-btn
          color="secondary"
          outline
          label="Cancelar"
          v-close-popup
          @click="isEditPanelOpen = false"
        />
        <q-btn
          color="primary"
          label="Guardar cambios"
          @click="onEditExpense()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog
    v-model="confirmDelete"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 300px">
      <q-card-section>
        <div class="text-h6">Confirmar la acción</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        ¿Esta seguro desea eliminar este gasto?</q-card-section
      >
      <q-card-section class="q-pt-none">
        ESTA ACCIÓN NO SE PUEDE DESHACER, LOS DATOS DEL GASTO SERÁN ELIMINADOS
        DEL SISTEMA</q-card-section
      >

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn
          outline
          color="red"
          label="Cancelar"
          v-close-popup
          @click="isDeletePanelOpen = true"
        />
        <q-btn
          color="primary"
          label="Confirmar"
          v-close-popup
          @click="onDeleteExpense()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-inner-loading :showing="isLoading">
    <q-spinner-puff size="100px" color="primary" />
  </q-inner-loading>
</template>

<script lang="js">
import { defineComponent, onMounted, computed, ref } from 'vue'
import ExpenseList from '@/components/expenses/ExpenseList.vue'
import AuBtn from '@/components/ui/AuBtn.vue'

import { useStore } from 'src/store'
import useHttp from 'src/util/useHttp.js'
import useToast from 'src/util/useToast.js'

export default defineComponent({
  name: 'admin-expenses',
  components: {
    ExpenseList,
    AuBtn
  },
  props: {},
  setup() {
    const store = useStore()
    const { get, post, put, remove } = useHttp()
    const { showToast } = useToast()
    const isLoading = ref(false)
    const expenseSelected = ref({
      user: '',
      id: 0,
      userId: 0,
      amount: 0,
      description: '',
      timestamp: 0,
      date:  ''
    })
    const isAddPanelOpen = ref(false)
    const isEditPanelOpen = ref(false)
    const confirmDelete = ref(false)
    const expenses = ref([])
    const users = computed(() => {
      return store.state.rau.users
    })
    const userOptions = ref([])

    onMounted(() => {
      loadUserOptions()
      loadData()
      initExpenseSelected()
    })

    function loadUserOptions() {
      userOptions.value.length = 0
      users.value.forEach(el=>{
        userOptions.value.push({
          ...el,
          label: el.name
        })
      })
      userOptions.value.sort((a, b) => (a.username > b.username ? 1 : -1))
    }

    function getActualDate() {
      let today = new Date()
      let dayToday = today.getDate()
      let dayTodayFormatted = (dayToday < 10 ? '0' : '') + dayToday
      let monthToday = today.getMonth() + 1
      let monthTodayFormatted = (monthToday < 10 ? '0' : '') + monthToday
      let yearToday = today.getFullYear()
      let hourNow = today.getHours()
      let minuteNow = today.getMinutes()
      return yearToday + '-' + monthTodayFormatted + '-' + dayTodayFormatted + ' ' + hourNow + ':' + minuteNow
    }

    function initExpenseSelected() {
      if (userOptions.value.length > 0) {
        expenseSelected.value.user = userOptions.value[0]
      }
      expenseSelected.value.amount = 0
      expenseSelected.value.description = ''
      expenseSelected.value.date = getActualDate()
    }

    function showAddPanel() {
      initExpenseSelected()
      isAddPanelOpen.value = true
    }

    function showEditPanel() {
      initExpenseSelected()
      isEditPanelOpen.value = true
    }

    const loadData = async () => {
      try {
        isLoading.value = true
        const response = await get('/expenses', {})
        isLoading.value = false
        let expenses = [...response.data]
        expenses.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1))
        expenses.value = expenses
      } catch (err) {
        showToast('negative', 'Error leyendo los gastos')
        isLoading.value = false
        console.error(err)
      }
    }

    function onSelectExpense(expense) {
      expenseSelected.value = { ...expense }
    }

    const onNewExpense = async () => {
      const expenseData = {
        userId: expenseSelected.value.user.id,
        amount: parseFloat(expenseSelected.value.amount),
        description: expenseSelected.value.description,
        timestamp: new Date(expenseSelected.value.date).getTime()
      }

      try {
        isLoading.value = true
        delete expenseSelected.value.id
        await post('/expense', {...expenseData })
        isLoading.value = false
        showToast('positive', 'Gasto añadido al sistema')
        isAddPanelOpen.value = false
        loadData()
      initExpenseSelected()
      } catch (err) {
        showToast('negative', 'Error añadiendo el gasto')
        isLoading.value = false
        console.error(err)
      }
    }

    const onEditExpense = async () => {
      const expenseData = {
        id: expenseSelected.value.id,
        userId: expenseSelected.value.user.id,
        amount: parseFloat(expenseSelected.value.amount),
        description: expenseSelected.value.description,
        timestamp: new Date(expenseSelected.value.date).getTime()
      }
      console.log(expenseData)
      try {
        isLoading.value = true
        await put('/expense', {...expenseData })
        isLoading.value = false
        showToast('positive', 'Gasto editado')
        isEditPanelOpen.value = false
        loadData()
        initExpenseSelected()
      } catch (err) {
        showToast('negative', 'Error editado el gasto')
        isLoading.value = false
        console.error(err)
      }
    }

    const onDeleteExpense = async () => {
      try {
        isLoading.value = true
        await remove('/expense', {
          data: {
            id: expenseSelected.value.id,
          }
        })
        isLoading.value = false
        showToast('positive', 'Gasto eliminado del sistema')
        loadData()
      } catch (err) {
        showToast('negative', 'Error eliminando el gasto')
        isLoading.value = false
        console.error(err)
      }
    }

    return {isLoading, expenseSelected, onSelectExpense, isAddPanelOpen, isEditPanelOpen, confirmDelete, onNewExpense, onEditExpense, onDeleteExpense, expenses, userOptions, showAddPanel, showEditPanel}
  },
})
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.main__buttons {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
}

.main__panel--title {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
</style>

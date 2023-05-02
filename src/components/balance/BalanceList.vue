<template>
  <section>
    <q-toolbar class="bg-grey-9 text-white shadow-2">
      <q-toolbar-title>Balance de gastos</q-toolbar-title>
    </q-toolbar>

    <q-list bordered>
      <q-item
        v-for="element in balanceList"
        :key="element.userId"
        class="q-my-sm"
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ element.letter }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ element.name }}</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label :class="getAmountClass(element)" lines="1">{{
            element.amount
          }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </section>
  <q-inner-loading :showing="isLoading">
    <q-spinner-puff size="100px" color="primary" />
  </q-inner-loading>
</template>

<script lang="js">
import { defineComponent, onMounted, computed, watch, ref } from 'vue'
import { useStore } from 'src/store'
import useHttp from 'src/util/useHttp.js'
import useToast from 'src/util/useToast.js'

export default defineComponent({
  name: 'users-list',
  emits: ['select-user'],
  props: {},
  setup(props, context) {
    const store = useStore()
    const isLoading = ref(false)
    const { showToast } = useToast()
    const { get } = useHttp()
    const myWindow = ref({ width: 0, height: 0 })
    const listHeight = ref('0px')
    const balances = ref([])
    const balanceList = ref([])

    const users = computed(() => {
      return store.state.rau.users
    })
    const userData = ref({})

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

    const loadData = async () => {
      try {
        isLoading.value = true
        const response = await get('/balance', {})
        console.log(response)
        isLoading.value = false
        balances.value = [ ...response.data]
        showData()
      } catch (err) {
        showToast('negative', 'Error leyendo el balance de gastos')
        isLoading.value = false
        console.error(err)
      }
    }

    function showData() {
      balanceList.value.length = 0
      balances.value.forEach((el) => {
        balanceList.value.push({
          ...el,
          name: userData.value[el.userId].name ? userData.value[el.userId].name : '',
          letter: userData.value[el.userId].name ? userData.value[el.userId].name[0] : '',
        })
      })
    }

    function getAmountClass(element) {
      if (element.amount > 0) {
        return 'main__item--amount--positive'
      }
      return 'main__item--amount--negative'
    }

    return { listHeight, balanceList, getAmountClass }
  },
})
</script>

<style scoped>
.main__item--amount--positive {
  font-size: 1.1rem;
  font-weight: bold;
  color: rgb(7, 149, 7);
}
.main__item--amount--negative {
  font-size: 1.1rem;
  font-weight: bold;
  color: rgb(255, 36, 36);
}
</style>

<template>
  <section>
    <div class="q-pa-md" style="max-width: 350px">
      <q-toolbar class="bg-primary text-white shadow-2">
        <q-toolbar-title>Usuarios</q-toolbar-title>
      </q-toolbar>

      <q-list bordered>
        <q-item
          v-for="contact in userList"
          :key="contact.username"
          class="q-my-sm"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
              {{ contact.letter }}
            </q-avatar>
          </q-item-section>

          <q-tooltip>{{ contact.username }}</q-tooltip>

          <q-item-section>
            <q-item-label>{{ contact.name }}</q-item-label>
            <q-item-label caption lines="1">{{ contact.email }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </section>
  <q-inner-loading :showing="isLoading">
    <q-spinner-puff size="100px" color="primary" />
  </q-inner-loading>
</template>

<script lang="js">
import { defineComponent, PropType, onMounted, computed, watch, ref } from 'vue'
import { User } from '../models'
import { useStore } from 'src/store'
import useHttp from 'src/util/useHttp.js'

export default defineComponent({
  name: 'users-list',
  props: {},
  setup() {
    const store = useStore()
    const { get } = useHttp()
    const myWindow = ref({ width: 0, height: 0 })
    const listHeight = ref('0px')
    const isLoading = ref(false)
    const userList = ref([])

    // const users: Array<String> = computed(() => {
    const users = computed(() => {
      return store.state.rau.users
    })

    watch(users, () => {
      showData()
    })

    onMounted(() => {
      handleResize()
      loadData()
    })

    function handleResize() {
      myWindow.value.width = window.innerWidth
      myWindow.value.height = window.innerHeight
      listHeight.value = myWindow.value.height - 110 + 'px'
    }

    const loadData = async () => {
      try {
        isLoading.value = true
        const response = await get('/users', {})
        isLoading.value = false
        store.commit('rau/setUsers', response.data)
        console.log(response)
      } catch (err) {
        isLoading.value = false
        console.error(err)
      }
    }

    function showData() {
      userList.value.length = 0
      users.value.forEach((el) => {
        userList.value.push({
          ...el,
          letter: el.name[0]
        })
      })
    }

    return { isLoading, listHeight, userList }
  },
})
</script>

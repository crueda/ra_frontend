<template>
  <section>
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Usuarios activos</q-toolbar-title>
    </q-toolbar>

    <q-list bordered>
      <q-item
        v-for="element in userList"
        :key="element.username"
        class="q-my-sm"
        clickable
        v-ripple
        :active="element.selected"
        active-class="bg-blue-2 text-black"
        @click="onSelectUser(element)"
      >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ element.letter }}
          </q-avatar>
        </q-item-section>

        <q-tooltip>{{ element.username }}</q-tooltip>

        <q-item-section>
          <q-item-label>{{ element.name }}</q-item-label>
          <q-item-label caption lines="1">{{ element.email }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </section>
</template>

<script lang="js">
import { defineComponent, PropType, onMounted, computed, watch, ref } from 'vue'
import { User } from '../models'
import { useStore } from 'src/store'

export default defineComponent({
  name: 'users-list',
  emits: ['select-user'],
  props: {},
  setup(props, context) {
    const store = useStore()
    const myWindow = ref({ width: 0, height: 0 })
    const listHeight = ref('0px')
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
    })

    function handleResize() {
      myWindow.value.width = window.innerWidth
      myWindow.value.height = window.innerHeight
      listHeight.value = myWindow.value.height - 110 + 'px'
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

    function onSelectUser(user) {
      userList.value.forEach(el=>{
        if (user.username === el.username) {
          el.selected = true
        } else {
          el.selected = false
        }
      })
      context.emit('select-user', user)

    }

    return { listHeight, userList, onSelectUser }
  },
})
</script>

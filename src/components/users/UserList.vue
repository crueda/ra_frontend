<template>
  <section>
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Usuarios activos</q-toolbar-title>
    </q-toolbar>

    <q-list bordered>
      <UserListElement
        v-for="element in userList"
        :key="element.id"
        :data="element"
        @click-user="onSelectUser(element)"
      ></UserListElement>
    </q-list>
  </section>
</template>

<script lang="js">
import { defineComponent, onMounted, computed, watch, ref } from 'vue'
import { useStore } from 'src/store'
import UserListElement from '@/components/users/UserListElement.vue'

export default defineComponent({
  name: 'users-list',
  emits: ['select-user'],
  components: {
    UserListElement
  },
  props: {},
  setup(props, context) {
    const store = useStore()
    const myWindow = ref({ width: 0, height: 0 })
    const listHeight = ref('0px')
    const userList = ref([])

    const users = computed(() => {
      return store.state.rau.users
    })

    watch(users, () => {
      showData()
    })

    onMounted(() => {
      handleResize()
      showData()
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
          ...el
        })
      })
    }

    function onSelectUser(user) {
      userList.value.forEach(el=>{
        if (user.id === el.id) {
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

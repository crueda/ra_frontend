import { defineComponent, onMounted, watch, computed, ref } from 'vue'

export default defineComponent({
  name: 'users-list',
  emits: ['select-user'],
  props: {},
  setup(props, context) {
    const myWindow = ref({ width: 0, height: 0 })
    const listHeight = ref('0px')
    const userList = ref([])

    // const users: Array<String> = computed(() => {
    const users = computed(() => {
      return []
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
          ...el,
          letter: el.name[0],
        })
      })
      userList.value.sort((a, b) => (a.username > b.username ? 1 : -1))
    }

    function onSelectUser(user) {
      userList.value.forEach((el) => {
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

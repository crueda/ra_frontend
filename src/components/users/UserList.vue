<template>
  <div>users</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, watch, ref } from 'vue'
// import { Todo, Meta } from '../models'
import { useStore } from 'src/store'

export default defineComponent({
  name: 'users-list',
  props: {},
  setup() {
    const store = useStore()
    const myWindow = ref({ width: 0, height: 0 })
    const listHeight = ref('0px')

    const users = computed(() => {
      return store.state.example.users
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

    function loadData() {
      let users = ['a', 'b']
      console.log(store)
      store.commit('example/setUsers', users)
    }

    function showData() {
      console.log('show data')
    }

    return { listHeight }
  },
})
</script>

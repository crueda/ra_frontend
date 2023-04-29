<template>
  <div class="main">
    <section class="main__buttons">
      <au-btn
        size="md"
        icon="add"
        color="primary"
        label="Añadir"
        @on-click="onAddUser"
      />
      <q-btn
        v-if="userSelected !== null"
        size="md"
        icon="edit"
        color="secondary"
        label="Editar"
        @click="onEditUser"
      />
      <q-btn
        v-if="userSelected !== null"
        size="md"
        outline
        icon="delete"
        color="negative"
        label="Eliminar"
        @click="onDeleteUser"
      />
    </section>
    <section class="main__list">
      <UserList @select-user="onSelectUser" />
    </section>
  </div>

  <q-inner-loading :showing="isLoading">
    <q-spinner-puff size="100px" color="primary" />
  </q-inner-loading>
</template>

<script lang="js">
import { defineComponent, onMounted, computed, ref } from 'vue'
import UserList from '@/components/users/UserList.vue'
import AuBtn from '@/components/ui/AuBtn.vue'
import { useStore } from 'src/store'
import useHttp from 'src/util/useHttp.js'
import useToast from 'src/util/useToast.js'

export default defineComponent({
  name: 'admin-users',
  components: {
    UserList,
    AuBtn,
  },
  props: {},
  setup() {
    const store = useStore()
    const { get } = useHttp()
    const { showToast } = useToast()
    const isLoading = ref(false)
    const userSelected = ref(null)

    onMounted(() => {
      loadData()
    })

    const loadData = async () => {
      try {
        isLoading.value = true
        const response = await get('/users', {})
        isLoading.value = false
        store.commit('rau/setUsers', response.data)
        showToast('positive', 'Usuarios cargados con éxito', 100)
      } catch (err) {
        showToast('negative', 'Error leyendo los usuarios')
        isLoading.value = false
        console.error(err)
      }
    }

    function onSelectUser(user) {
      userSelected.value = user
    }

    function onAddUser() {
      console.log("on add user")
    }

    return {isLoading, userSelected, onSelectUser, onAddUser}
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
</style>

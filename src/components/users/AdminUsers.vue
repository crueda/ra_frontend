<template>
  <div class="main">
    <section class="main__buttons">
      <au-btn
        size="md"
        icon="add"
        color="primary"
        label="Añadir"
        @on-click="showAddPanel()"
      />
      <au-btn
        v-if="userSelected.username !== ''"
        size="md"
        icon="edit"
        color="secondary"
        label="Editar"
        @on-click="showEditPanel()"
      />
      <au-btn
        v-if="userSelected.username !== ''"
        size="md"
        outline
        icon="delete"
        color="negative"
        label="Eliminar"
        @on-click="confirmDelete = true"
      />
    </section>
    <section class="main__list">
      <UserList @select-user="onSelectUser" />
    </section>
  </div>

  <q-dialog v-model="isAddPanelOpen" persistent>
    <q-card style="width: 400px" class="q-px-sm q-pb-md">
      <q-card-section class="main__panel--title">
        <div class="text-h6">Nuevo usuario</div>
      </q-card-section>

      <q-card-section>
        <q-input
          v-model="userSelected.username"
          label="Identificador del usuario"
          stack-label
        />
        <q-input
          v-model="userSelected.name"
          label="Nombre del usuario"
          stack-label
        />
        <q-input
          v-model="userSelected.email"
          label="correo electrónico"
          stack-label
        />
      </q-card-section>

      <q-card-actions align="center" class="text-primary">
        <q-btn
          color="secondary"
          outline
          label="Cancelar"
          v-close-popup
          @click="isAddPanelOpen = false"
        />
        <q-btn color="primary" label="Dar de alta" @click="onNewUser()" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="isEditPanelOpen" persistent>
    <q-card style="width: 400px" class="q-px-sm q-pb-md">
      <q-card-section class="main__panel--title">
        <div class="text-h6">Editar usuario</div>
        <div class="text-h7">{{ userSelected.username }}</div>
      </q-card-section>

      <q-card-section>
        <q-input
          v-model="userSelected.name"
          label="Nombre del usuario"
          stack-label
        />
        <q-input
          v-model="userSelected.email"
          label="correo electrónico"
          stack-label
        />
      </q-card-section>

      <q-card-actions align="center" class="text-primary">
        <q-btn
          color="secondary"
          outline
          label="Cancelar"
          v-close-popup
          @click="isEditPanelOpen = false"
        />
        <q-btn color="primary" label="Guardar" @click="onEditUser()" />
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
        ¿Esta seguro desea eliminar este usuario?</q-card-section
      >
      <q-card-section class="q-pt-none">
        ESTA ACCIÓN NO SE PUEDE DESHACER, LOS DATOS DEL USUARIO SERÁN ELIMINADOS
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
          @click="onDeleteUser()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-inner-loading :showing="isLoading">
    <q-spinner-puff size="100px" color="primary" />
  </q-inner-loading>
</template>

<script lang="js">
import { defineComponent, onMounted, ref } from 'vue'
import UserList from '@/components/users/UserList.vue'
import AuBtn from '@/components/ui/AuBtn.vue'
import { useStore } from 'src/store'
import useHttp from 'src/util/useHttp.js'
import useToast from 'src/util/useToast.js'

export default defineComponent({
  name: 'admin-users',
  components: {
    UserList,
    AuBtn
  },
  props: {},
  setup() {
    const store = useStore()
    const { get, post, put, remove } = useHttp()
    const { showToast } = useToast()
    const isLoading = ref(false)
    const userSelected = ref({
      username: '',
      name: '',
      email: '',
    })
    const isAddPanelOpen = ref(false)
    const isEditPanelOpen = ref(false)
    const confirmDelete = ref(false)

    onMounted(() => {
      loadData()
    })

    function initUserSelected() {
      userSelected.value.username = ''
      userSelected.value.name = ''
      userSelected.value.email = ''
    }

    const loadData = async () => {
      try {
        isLoading.value = true
        const response = await get('/users', {})
        isLoading.value = false
        store.commit('rau/setUsers', response.data)
      } catch (err) {
        showToast('negative', 'Error leyendo los usuarios')
        isLoading.value = false
        console.error(err)
      }
    }

    function onSelectUser(user) {
      userSelected.value = { ...user }
    }

    function existUsername() {
      //TODO
      return false
    }

    function isValidLengthUsername(username) {
      if (username.length < 4 || username.length > 20) {
        return false
      }
      return true
    }

    const onNewUser = async () => {
      if (existUsername()) {
        showToast('warning', 'El identificador de usuario ya existe en el sistema')
        return
      }
      if (!isValidLengthUsername(userSelected.value.username)) {
        showToast('warning', 'El identificador de usuario tiene que tener entre 4 y 20 caracteres')
        return
      }
      try {
        isLoading.value = true
        delete userSelected.value.id
        await post('/user', {...userSelected.value })
        isLoading.value = false
        showToast('positive', 'Usuario añadido al sistema')
        isAddPanelOpen.value = false
        loadData()
      } catch (err) {
        showToast('negative', 'Error añadiendo el usuario')
        isLoading.value = false
        console.error(err)
      }
    }

    const onEditUser = async () => {
      try {
        isLoading.value = true
        await put('/user', {...userSelected.value })
        isLoading.value = false
        showToast('positive', 'Usuario editado')
        isEditPanelOpen.value = false
        loadData()
      } catch (err) {
        showToast('negative', 'Error editado el usuario')
        isLoading.value = false
        console.error(err)
      }
    }

    const onDeleteUser = async () => {
      try {
        isLoading.value = true
        await remove('/user', {
          data: {
            id: userSelected.value.id,
          }
        })
        isLoading.value = false
        showToast('positive', 'Usuario eliminado del sistema')
        loadData()
      } catch (err) {
        showToast('negative', 'Error eliminando el usuario')
        isLoading.value = false
        console.error(err)
      }
    }


    function showAddPanel() {
      initUserSelected()
      isAddPanelOpen.value = true
    }

    function showEditPanel() {
      isEditPanelOpen.value = true
    }

    return {isLoading, userSelected, onSelectUser, isAddPanelOpen, isEditPanelOpen, confirmDelete, onNewUser, onEditUser, onDeleteUser, showAddPanel, showEditPanel}
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

<template>
  <q-item
    class="q-my-sm"
    data-cy="qitem"
    clickable
    v-ripple
    :active="data.selected"
    active-class="bg-blue-2 text-black"
    @click="onClickUser()"
  >
    <q-item-section avatar>
      <q-avatar color="primary" text-color="white">
        {{ letter }}
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ data.username }} - {{ data.name }}</q-item-label>
      <q-item-label caption lines="1">{{ data.email }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import { User } from 'src/domain/entities/user'

export default defineComponent({
  name: 'users-list-element',
  emits: ['click-user'],
  props: {
    data: {
      type: Object as PropType<User>,
      required: true,
    },
  },
  setup(props, context) {
    const userData = ref(props.data)
    const letter = ref(props.data.name[0])

    function onClickUser() {
      context.emit('click-user', userData)
    }

    return { onClickUser, userData, letter }
  },
})
</script>

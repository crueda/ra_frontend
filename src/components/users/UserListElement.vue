<template>
  <q-item
    class="q-my-sm"
    data-cy="qitem"
    clickable
    v-ripple
    :active="data.selected"
    active-class="bg-blue-2 text-black"
    @click="onSelectUser()"
  >
    <q-item-section avatar>
      <q-avatar color="primary" text-color="white">
        {{ data.letter }}
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
import { User } from 'src/models/user'

export default defineComponent({
  name: 'users-list-element',
  emits: ['select-user'],
  props: {
    data: {
      type: Object as PropType<User>,
      required: true,
    },
  },
  setup(props, context) {
    const userData = ref(props.data)

    function onSelectUser() {
      context.emit('select-user', userData)
    }

    return { onSelectUser, userData }
  },
})
</script>

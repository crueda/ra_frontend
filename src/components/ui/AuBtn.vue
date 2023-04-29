<template>
  <q-btn
    size="md"
    icon="add"
    color="secondary"
    label="label"
    @click="onClick"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'au-btn',
  emits: ['on-click'],
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  setup(props, context) {
    function onClick(): void {
      context.emit('on-click')
    }
    return { onClick }
  },
})
</script>

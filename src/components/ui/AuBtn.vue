<template>
  <q-btn
    :size="size"
    :icon="icon"
    :color="color"
    :label="label"
    @click="onClick"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'au-btn',
  emits: ['on-click'],
  props: {
    size: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    color: {
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

<template>
  <q-btn
    data-cy="button"
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
      required: false,
      default: 'md',
    },
    icon: {
      type: String,
      required: false,
      default: 'info',
    },
    label: {
      type: String,
      required: false,
      default: 'button',
    },
    color: {
      type: String,
      required: false,
      default: 'primary',
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

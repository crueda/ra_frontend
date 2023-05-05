<template>
  <q-tooltip
    v-model="showTooltip"
    data-cy="tooltip"
    class="bg-secondary"
    :offset="[10, 10]"
  >
    {{ label }}
  </q-tooltip>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'au-tooltip',
  props: {
    label: {
      type: String,
      required: false,
      default: 'tooltip text',
    },
  },
  setup() {
    const showTooltip = ref(true)

    return {
      showTooltip,
    }
  },
})
</script>

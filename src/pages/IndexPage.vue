<template>
  <q-page class="items-center justify-evenly">
    <main-component></main-component>
  </q-page>
</template>

<script lang="ts">
import MainComponent from 'src/components/MainComponent.vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  components: { MainComponent },
  setup() {
    return {}
  },
})
</script>

<template>
  <div class="main">
    <div class="main__tabs">
      <q-tabs
        v-model="mainTab"
        dense
        inline-label
        outside-arrows
        mobile-arrows
        class="bg-white text-black main__tabs"
      >
        <q-tab name="users" icon="person" label="Usuarios"></q-tab>
        <q-tab name="info" icon="info" label="Aplicación"></q-tab>
      </q-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, toRef, Ref } from 'vue'
import { Todo, Meta } from './models'

export default defineComponent({
  name: 'MainComponent',
  props: {},
  setup(props) {
    const mainTab = ref('users')

    return {
      mainTab,
    }
  },
})
</script>

<style scoped>
.main {
  padding: 1rem;
  background-color: white;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.main__tabs {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1rem;
}
</style>

<template>
  <div class="main">
    <section class="main__list">
      <UserList />
    </section>
    <section class="main__form"></section>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, toRef, Ref } from 'vue'
import { Todo, Meta } from '../models'
import UserList from '@/components/users/UserList.vue'

export default defineComponent({
  name: 'admin-users',
  components: {
    UserList,
  },
  props: {},
  setup() {
    return {}
  },
})
</script>

<style scoped>
.main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 1em 1em;
  grid-auto-flow: row;
  grid-template-areas: 'main__list main__form';
}

.main__list {
  grid-area: main__list;
}

.main__form {
  grid-area: main__form;
}
</style>

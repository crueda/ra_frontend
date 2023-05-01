<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Reto Autentia </q-toolbar-title>

        <!-- <q-toggle
          v-model="darkMode"
          checked-icon="dark_mode"
          color="grey"
          label=""
          unchecked-icon="light_mode"
        /> -->
        <div>Versión {{ version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Documentación </q-item-label>

        <DocMenuElement
          v-for="link in docsLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue'
import DocMenuElement from 'src/components/DocMenuElement.vue'

const docsList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework',
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev',
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev',
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev',
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev',
  },
  {
    title: 'About',
    caption: 'Acerca de mi',
    icon: 'person',
    link: 'https://about.me/crueda',
  },
]

import { useQuasar } from 'quasar'
export default defineComponent({
  name: 'MainLayout',

  components: {
    DocMenuElement,
  },

  setup() {
    const $q = useQuasar()
    const leftDrawerOpen = ref(false)
    const darkMode = ref(false)
    const version = ref(process.env.VUE_APP_VERSION)

    watch(darkMode, (val) => {
      $q.dark.set(val)
    })

    onMounted(() => {
      $q.dark.set(false)
    })

    return {
      version,
      docsLinks: docsList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      darkMode,
    }
  },
})
</script>

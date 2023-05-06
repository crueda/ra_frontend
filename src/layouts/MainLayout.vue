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

        <q-toolbar-title> Gastos compartidos </q-toolbar-title>

        <div>Versión {{ version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Reto Autentia </q-item-label>

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
    title: 'Backend',
    caption: 'github.com/crueda/ra_backend',
    icon: 'fas fa-code',
    link: 'https://github.com/crueda/ra_backend',
  },
  {
    title: 'Frontend',
    caption: 'github.com/crueda/ra_frontend',
    icon: 'fas fa-code',
    link: 'https://github.com/crueda/ra_frontend',
  },
  {
    title: 'Api doc',
    caption: 'Backend api doc',
    icon: 'fa-regular fa-file-lines',
    // link: 'http://localhost:8888/v3/api-docs/',
    link: 'http://localhost:8888/swagger-ui/index.html#/',
  },
  {
    title: 'Docker',
    caption: 'docker-componse.yml',
    icon: 'fab fa-docker',
    link: 'https://raw.githubusercontent.com/crueda/ra_docker/main/docker-compose.yml',
  },
  {
    title: 'Sonarqube',
    caption: 'Acceder a Sonarqube GUI',
    icon: 'fa-solid fa-list-check',
    link: 'http://localhost:9000/projects/favorite',
  },

  {
    title: 'About',
    caption: 'Acerca de mi',
    icon: 'fas fa-address-card',
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

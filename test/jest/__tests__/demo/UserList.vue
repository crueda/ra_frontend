<script lang="js"></script>
<template>
  <section>
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Usuarios activos</q-toolbar-title>
    </q-toolbar>

    <q-list bordered>
      <q-item
        v-for="element in userList"
        :key="element.username"
        class="q-my-sm"
        clickable
        v-ripple
        :active="element.selected"
        active-class="bg-blue-2 text-black"
        @click="onSelectUser(element)"
      >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ element.letter }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label
            >{{ element.username }} - {{ element.name }}</q-item-label
          >
          <q-item-label caption lines="1">{{ element.email }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </section>
</template>

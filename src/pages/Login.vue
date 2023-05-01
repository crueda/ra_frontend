<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card
          v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '30%' }"
        >
          <q-card-section>
            <q-avatar size="110px" class="absolute-center shadow-10">
              <img class="logo" src="@/statics/n.jpg" alt="logo" />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg"></div>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="main__text">Reto Autentia</div>
            </div>
          </q-card-section>

          <q-card-section>
            <q-form class="q-gutter-md">
              <div class="main__btn">
                <q-btn
                  label="Entrar"
                  @click="doLogin"
                  type="button"
                  color="primary"
                />
              </div>
            </q-form>

            <div class="last-row">
              <div class="main__version">v. {{ version }}</div>
            </div>
          </q-card-section>

          <q-inner-loading :showing="isLoading">
            <q-spinner-puff size="100px" color="primary" />
          </q-inner-loading>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useStore } from 'src/store'

export default defineComponent({
  name: 'login-page',
  setup() {
    const store = useStore()
    const isLoading = ref(false)
    const username = ref('')
    const password = ref('')
    const version = ref(process.env.VUE_APP_VERSION)

    function doLogin() {
      store.$router.push({ name: 'app' })
    }
    return { isLoading, username, password, version, doLogin }
  },
})
</script>

<style scoped>
.bg-image {
  background-image: linear-gradient(135deg, #0f437f 0%, #ffffff 100%);
}

.main__btns {
  padding-top: 1rem;
  display: flex;
  justify-content: space-around;
}

.main__btn {
  display: flex;
  justify-content: center;
}

.main__controls {
  padding-top: 2rem;
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.logo {
  border: 5px solid white;
}

.logo--wrapper {
  display: flex;
  justify-content: center;
}

.logo--img {
  width: 250px;
}

.main__text {
  font-size: 1.5rem;
}
.last-row {
  padding-top: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.main__version {
  font-size: 0.8rem;
  color: #ccc;
  text-align: left;
  display: flex;
  justify-content: center;
  padding-top: 2rem;
  width: 100%;
  padding-left: 1rem;
}
</style>

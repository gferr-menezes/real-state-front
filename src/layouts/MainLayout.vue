<template>
  <q-layout view="lHh Lpr lFf">

    <q-header bordered class="bg-primary text-white" v-if="showComponents">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer"
          v-if="authStore.checkLevelAccess(LEVEL_ACCESS.ADMIN)" />

        <q-toolbar-title>
          <q-avatar>
            <img src="~/assets/logo.png">
          </q-avatar>
        </q-toolbar-title>

        <q-btn flat round dense icon="fas fa-user-circle" size="lg">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-separator />
              <q-item clickable v-close-popup @click="logout">
                <q-item-section>Sair do sistema</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

      </q-toolbar>
    </q-header>

    <MenuLeft :mini="miniState" v-if="showComponents" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { LocalStorage } from 'quasar';
import { useRoute } from 'vue-router';
import MenuLeft from './MenuLeft.vue';
import { useAuthStore } from 'src/stores/auth';
import { LEVEL_ACCESS } from 'src/modules/register/contracts';
import { AuthService } from 'src/modules/auth/services/auth.service';

const authStore = useAuthStore();
const route = useRoute();
const authService = new AuthService();

const miniState = ref(true)
const showComponents = ref(false)

const toggleLeftDrawer = () => {
  miniState.value = !miniState.value
}

const logout = () => {
  authService.logout();
}

onBeforeMount(async () => {

  const loginData = LocalStorage.getItem('loginData');

  if (!loginData) {
    return
  }

  await authStore.getUserDataLogged();

  const routeName = route.name as string;

  if (routeName === "auth") {
    showComponents.value = false
  } else {
    showComponents.value = true
  }
})
</script>

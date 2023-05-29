<template>
  <q-layout view="hhh lpR lfr">

    <q-header bordered class="bg-primary text-white" v-if="showComponents">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer"
          v-if="authStore.checkLevelAccess(LEVEL_ACCESS.ADMIN)" />

        <q-toolbar-title>
          <q-avatar>
            <img src="~/assets/logo.png">
          </q-avatar>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above side="left" bordered :mini="miniState" :width="280" v-if="showComponents">
      <q-list>
        <q-item-label header>
          Menu de acesso
        </q-item-label>

        <MenuLeft />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view class="q-pl-xs q-pr-sm" style="padding-top: 5px;" />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import MenuLeft from './MenuLeft.vue';
import { useAuthStore } from 'src/stores/auth';
import { LEVEL_ACCESS } from 'src/modules/register/contracts';



const authStore = useAuthStore();
const route = useRoute();

const miniState = ref(true)
const showComponents = ref(false)

function toggleLeftDrawer() {
  miniState.value = !miniState.value
}

onBeforeMount(async () => {

  await authStore.getUserDataLogged();

  const routeName = route.name as string;
  if (routeName === "auth") {
    showComponents.value = false
  } else {
    showComponents.value = true
  }
})
</script>

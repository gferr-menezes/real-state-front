<template>
  <q-layout>
    <q-page-container>
      <div class="bg-grey-9 full-width text-white" style="min-height: 40px; position: absolute; z-index: 999;">

        <div class="flex">
          <div>
            <img src="~/assets/logo.png" style="height: 40px; width: 40px; margin: 10px;" />
            <span style="position: absolute; top: 20px;">LOGO</span>
          </div>

          <div style="padding-left: 200px">
            <q-btn color="primary" label="Como funciona" flat class="text-white full-height" />
          </div>
          <div style="padding-left: 10px">
            <q-btn color="primary" label="Incorporador" flat class="text-white full-height" />
          </div>
          <div style="padding-left: 10px">
            <q-btn color="primary" label="Imobiliária" flat class="text-white full-height" />
          </div>
          <div style="position: absolute; right: 80px; height: 66px;">
            <q-btn color="primary" label="CADASTRE - SE" flat class="text-white full-height" square
              @click="goToPage('webRegister')" />
          </div>
          <div style="position: absolute; right: 0px; height: 66px;">
            <q-btn color="primary" label="LOGIN" flat class="text-white full-height bg-green" square
              @click="goToPage('auth')" />
          </div>

        </div>

      </div>
      <MainBanner class="q-pb-md" />
      <div style="max-width: 80vw; margin: 0 auto;">
        <router-view class="q-px-md" />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import MainBanner from 'src/components/MainBanner.vue';

const router = useRouter();

const goToPage = (page: string) => {
  if (page === 'auth') {
    window.location.href = 'adm/auth';
    return;
  }
  router.push({ name: page });
};
</script>

<style scoped></style>

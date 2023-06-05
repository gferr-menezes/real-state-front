<template>
  <q-page class="q-pa-sm">
    <q-card class="my-card" flat bordered>
      <q-card-section>
        <FormRegister />
      </q-card-section>
    </q-card>

    <q-card class="q-mt-sm text-center">
      <q-card-section>
        <div>
          Você não possui projetos e nem imoveis cadastrados.
        </div>
        <div>
          <span class="text-blue cursor-pointer" @click="goToPage('projectCreate')">Clique aqui</span> para cadastrar
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

import FormRegister from '../components/FormRegister.vue';

const goToPage = (pageName: string) => {
  router.push({ name: pageName });
};


</script>

<style lang="scss" scoped></style>

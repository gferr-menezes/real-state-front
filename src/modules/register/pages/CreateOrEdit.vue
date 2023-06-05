<template>
  <q-page class="q-pa-sm">
    <q-card class="my-card" flat bordered>
      <q-card-section>
        <FormRegister />
      </q-card-section>
    </q-card>
    <CardListProject />
  </q-page>
</template>

<script setup lang="ts">

import FormRegister from '../components/FormRegister.vue';
import CardListProject from 'src/modules/project/components/CardListProject.vue';

</script>

<style lang="scss" scoped></style>

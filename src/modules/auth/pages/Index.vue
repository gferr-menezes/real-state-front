<template>
  <q-page class="row flex flex-center bg-grey-3">
    <div class="col-12 col-md-11 col-lg-4 col-xl-4"
      :class="$q.screen.width >= 1920 && $q.screen.width < 2000 ? 'col-xl-6' : 'col-xl-4'">
      <q-card class="q-pa-none shadow-19 login-card">
        <div class="row justify-between">
          <div class="col-8" style="height: 500px;">
            <img src="~/assets/bg-login.jpeg"
              style="height: 500px; width: 100%; opacity: 0.9; border-top-left-radius: 5px; border-bottom-left-radius: 5px;">
          </div>
          <div class="col-4  q-pt-sm">
            <FormAuth />
          </div>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import FormAuth from '../components/FormAuth.vue';
</script>

<style scoped>
.login-card {
  border-radius: 5px;
}
</style>


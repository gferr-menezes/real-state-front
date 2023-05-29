<template>
  <div>
    <q-item @click="goToPage('register')" :clickable="checkIsAdmin">
      <q-item-section avatar class="q-pr-none">
        <q-icon name="fas fa-file-alt" :color="checkIsAdmin ? 'grey-7' : 'grey-4'" />
      </q-item-section>
      <q-item-section :class="checkIsAdmin ? '' : 'text-grey-5'">
        <q-item-label>Cadastros</q-item-label>
        <q-item-label caption>
          <div class="ellipsis">
            Cadastro empresas, clientes, etc ...
          </div>
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-item class="q-mt-sm" :clickable="checkIsAdmin">
      <q-item-section avatar class="q-pr-none">
        <q-icon name="fas fa-archive" :color="checkIsAdmin ? 'grey-7' : 'grey-4'" />
      </q-item-section>
      <q-item-section :class="checkIsAdmin ? '' : 'text-grey-5'">
        <q-item-label>Projetos</q-item-label>
        <q-item-label caption>
          <div class="ellipsis">
            Cadastro projetos, etc ...
          </div>
        </q-item-label>
      </q-item-section>
    </q-item>

  </div>
</template>

<script setup lang="ts">

import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/auth';
import { LEVEL_ACCESS } from 'src/modules/register/contracts';

const router = useRouter();
const authStore = useAuthStore();

const checkIsAdmin = authStore.checkLevelAccess(LEVEL_ACCESS.ADMIN);

const goToPage = (pageName: string) => {
  if (!checkIsAdmin) return;
  router.replace({ name: pageName });
}

</script>

<style scoped>
.q-item__section--avatar {
  min-width: 30px;
}
</style>

<template>
  <div>
    <q-card class="q-mt-sm text-center" v-if="!projects.length">
      <q-card-section>
        <div>
          Você não possui projetos e nem imoveis cadastrados.
        </div>
        <div>
          <span class="text-blue cursor-pointer" @click="goToPage('projectCreate')">Clique aqui</span> para cadastrar
        </div>
      </q-card-section>

      <q-inner-loading :showing="loading">
        <q-spinner size="30px" color="primary" />
      </q-inner-loading>
    </q-card>

    <div class="row q-pt-md q-pl-xs" v-if="projects.length">
      <div class="col-2">
        <q-btn type="button" outline label="Cadastrar novo projeto ou imóvel" color="primary" unelevated
          :class="$q.screen.lt.md ? 'full-width' : null" :size="$q.screen.gt.sm ? '11px' : ''"
          @click="goToPage('projectCreate')" />
      </div>
    </div>

    <div class="row q-mt-md" v-for="list in projects" v-if="projects.length">
      <q-card class="full-width">
        <q-card-section horizontal>
          <q-img class="col-5" src="https://cdn.quasar.dev/img/parallax1.jpg" height="200px" width="300px" />
          <div class="row q-pt-md q-pl-md">
            <div>
              <b>Tipo de registro</b>: {{ list.type_register.toUpperCase() }}
            </div>
            <q-separator vertical style="height: 20px; " class="q-mx-md" />
            <div>
              <b>Nome produto</b>: {{ list.product_name.toUpperCase() }}
            </div>
            <q-separator vertical style="height: 20px; " class="q-mx-md" />
            <div>
              <b>Valor</b>: {{ formatMoneyBr(list.value_area ?? 0) }}
            </div>
            <div style="position: absolute; top: 50px">
              <b>Localização</b>: {{ !list.localization ? 'Sem localização informada' : list.localization }}
            </div>
            <div style="position: absolute; top: 100px">
              <b>Observação</b>
            </div>
            <div style="position: absolute; top: 120px">
              {{ !list.observations ? 'Sem observações informadas' : list.observations }}
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions class="q-pa-sm">
          <q-icon :name="list.is_active ? 'check' : 'cancel'" />
          <span class="q-pl-sm">
            {{ list.is_active ? 'Ativo' : 'Inativo' }}
          </span>
          <q-btn flat round icon="edit" style="position: absolute; right: 10px;"
            @click="goToPage('projectEdit', list.id)" />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ProjectService } from 'src/modules/project/services/project.service';
import { OutputProject } from '../contracts';
import { formatMoneyBr } from 'src/common/utils';
import { useAuthStore } from 'src/stores/auth';

/**
 * data
 */
const loading = ref(true);
const router = useRouter();
const projectService = new ProjectService();
const projects = ref<OutputProject[]>([]);
const authStore = useAuthStore();


/**
 * methods
 */
const getData = async (id?: number) => {
  try {
    loading.value = true;
    const result = await projectService.findAllByUserId(id);
    projects.value = result.data;
  } finally {
    hideLoading();
  }
};

const goToPage = (pageName: string, id?: number) => {
  router.push({ name: pageName, params: { id } });
};

const hideLoading = () => {
  setTimeout(() => {
    loading.value = false;
  }, 300);
};

onBeforeMount(async () => {

  const isAdmin = authStore.isAdmin;
  const routeData = router.currentRoute.value;
  const paramsRoute = routeData.params;

  if (isAdmin && routeData.name === 'registerEdit' && paramsRoute.id) {
    await getData(paramsRoute.id as unknown as number);
    return;
  }



  await getData();
});

</script>

<style scoped></style>

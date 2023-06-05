<template>
  <div>
    <q-table title="" :rows="rows" :columns="columns" row-key="name" v-model:pagination="pagination">
      <template v-slot:top>
        <q-btn color="primary" label="Novo cadastro" @click="goTo('projectCreate')" size="10px" />
        <q-space />
        <q-input borderless dense debounce="300" color="primary" v-model="filter">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
          <q-th> - </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props" class="animated fadeIn">
          <q-td v-for="col in props.cols" :key="col.name" :props="props" class="ellipsis">
            <div>
              {{ col.value }}
            </div>
          </q-td>
          <q-td auto-width>
            <div class="cursor-pointer" style="min-width: 50px" @click="edit(props.row)">
              <q-icon name="fas fa-pencil-alt" />
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <dialog-loading v-if="loading" />
  </div>
</template>

<script setup lang="ts">

import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import DialogLoading from 'src/components/DialogLoading.vue';
import { ProjectService } from '../services/project.service';


const router = useRouter();
const filter = ref('');
const projectService = new ProjectService();
const loading = ref(true);
const pagination = ref({
  page: 1,
  rowsPerPage: 20
})

const columns: any = [
  {
    name: 'type_register',
    required: true,
    label: 'Tipo de registro',
    align: 'left',
    field: (row: any) => row.type_register,
    format: (val: any) => val.toUpperCase(),
    sortable: true
  },
  {
    name: 'product_name',
    required: true,
    label: 'Nome do produto',
    align: 'left',
    field: (row: any) => row.product_name,
    format: (val: any) => !val ? ' - ' : val.toUpperCase(),
    sortable: true
  },
  {
    name: 'value_area',
    required: true,
    label: 'Valor da área',
    align: 'left',
    field: (row: any) => row.value_area,
    format: (val: any) => !val ? ' - ' : val,
    sortable: true
  },
  {
    name: 'value_project',
    required: true,
    label: 'Valor do projeto',
    align: 'left',
    field: (row: any) => row.value_project,
    format: (val: any) => !val ? ' - ' : val,
    sortable: true
  },
  {
    name: 'responsible_name',
    required: true,
    label: 'Responsável',
    align: 'left',
    field: (row: any) => row.responsible?.name ?? null,
    format: (val: any) => !val ? ' - ' : val.toUpperCase(),
    sortable: true
  },
  {
    name: 'responsible_email',
    required: true,
    label: 'Email responsável',
    align: 'left',
    field: (row: any) => row.responsible?.email ?? null,
    format: (val: any) => !val ? ' - ' : val,
    sortable: true
  },
  {
    name: 'is_active',
    required: true,
    label: 'Ativo ?',
    align: 'left',
    field: (row: any) => row.is_active,
    format: (val: any) => !val ? 'Não' : 'Sim',
    sortable: true
  },

]

let rows: any = ref([]);

const getData = async () => {

  try {

    const result = await projectService.findAll();
    const projects = result.data;
    rows.value = projects;

  } catch (error) {

  } finally {
    hideLoading();
  }

}

const edit = (row: any) => {
  router.push({ name: 'projectEdit', params: { id: row.id } });
};

const goTo = (routeName: string) => {
  router.push({ name: routeName });
};

const hideLoading = () => {
  setTimeout(() => {
    loading.value = false;
  }, 100);
};

onBeforeMount(() => {

  getData();

});

</script>

<style scoped></style>

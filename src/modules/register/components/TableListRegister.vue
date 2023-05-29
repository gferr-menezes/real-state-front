<template>
  <div>
    <q-table title="" :rows="rows" :columns="columns" row-key="name" v-model:pagination="pagination">
      <template v-slot:top>
        <q-btn color="primary" label="Novo cadastro" @click="goTo('registerCreate')" size="10px" />
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
import { RegisterService } from 'src/modules/register/services/register.service';
import DialogLoading from 'src/components/DialogLoading.vue';


const router = useRouter();
const filter = ref('');
const registerService = new RegisterService();
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
    name: 'corporate_name',
    required: true,
    label: 'Empresa',
    align: 'left',
    field: (row: any) => row.corporate_name,
    format: (val: any) => !val ? ' - ' : val.toUpperCase(),
    sortable: true
  },
  {
    name: 'corporate_document',
    required: true,
    label: 'CNPJ',
    align: 'left',
    field: (row: any) => row.corporate_document,
    format: (val: any) => !val ? ' - ' : val,
    sortable: true
  },
  {
    name: 'name',
    required: true,
    label: 'Responsável',
    align: 'left',
    field: (row: any) => row.name,
    format: (val: any) => val.toUpperCase(),
    sortable: true
  },
  {
    name: 'email',
    required: true,
    label: 'Email',
    align: 'left',
    field: (row: any) => row.email,
    format: (val: any) => !val ? ' - ' : val,
    sortable: true
  },
  {
    name: 'phone',
    required: true,
    label: 'Telefone fixo',
    align: 'left',
    field: (row: any) => row.phone,
    format: (val: any) => !val ? ' - ' : val,
    sortable: true
  },

]

let rows: any = ref([]);

const getData = async () => {

  try {

    const result = await registerService.findAll();
    const users = result.data;
    rows.value = users;

  } catch (error) {

  } finally {
    hideLoading();
  }

}

const edit = (row: any) => {
  router.push({ name: 'registerEdit', params: { id: row.id } });
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

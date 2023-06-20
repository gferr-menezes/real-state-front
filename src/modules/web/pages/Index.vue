<template>
  <div>
    <!-- <div class="row">
      <div class="col-12 col-md-4 col-lg-5 col-xl-3">
        <q-select v-model="form.states" :options="selected" label="Informe o estado" filled />
      </div>
      <div class="col-12 col-md-4 col-lg-3 col-xl-2 q-pl-sm">
        <q-btn color="secondary" icon="search" label="Pesquisar" class="full-height full-width" />
      </div>
    </div> -->

    <div class="row q-mt-md" v-if="immobilesData.lenght">
      <div class="col-12 col-md-4 col-lg-4 q-pr-sm" :class="$q.screen.width > 2600 ? 'col-xl-2' : 'col-xl-3'"
        v-for="immobile in immobilesData">
        <q-card class="my-card">
          <img :src="base64ImageCover" height="300">
          <q-card-section>
            <div class="text-h6 text-uppercase">{{ immobile.product_name }}</div>
            <div class="text-subtitle2">
              <div class="flex">
                <div>R$ {{ formatMoneyBr(immobile.value_project ?? 0) }}</div>
                <div class="q-px-sm">
                  -
                </div>
                <div>Itaim - São Paulo</div>
              </div>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-btn color="primary" icon="check" label="Tenho interesse" />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="row" v-else>
      <div class="col-12">
        <h4>Nenhum registro encontrado</h4>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, ref } from 'vue';
import { api } from 'src/boot/axios';
import { formatMoneyBr } from 'src/common/utils';


const form = reactive({
  states: []
})

const selected = [{
  value: 'mg',
  label: 'Minas Gerais'
}, {
  value: 'sp',
  label: 'São Paulo'
}, {
  value: 'rj',
  label: 'Rio de Janeiro'
}, {
  value: 'es',
  label: 'Espírito Santo'
}]

const immobilesData = ref<any>([]);
let base64ImageCover = ref<any>(null);

/**
 * methods
 */
const getImmobileReleases = async () => {

  try {
    const results = await api.get('/project/show/immobilie-releases');

    const immobiles = results.data.data;

    immobiles.forEach((immobile: any) => {
      const attachments = immobile.attachments;

      attachments.forEach((attachment: any) => {
        if (attachment.cover_image_64) {
          base64ImageCover.value = `data:image/${attachment.extension};base64,${attachment.cover_image_64}`
        }
      });
    });
    immobilesData.value = immobiles;
  } catch (error) {

  }

}

onBeforeMount(() => {
  getImmobileReleases();
})

</script>

<style scoped></style>

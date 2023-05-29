<template>
  <div>
    <div class="row">
      <div class="col-12 col-md-4 col-lg-5 col-xl-3">
        <q-select v-model="form.states" :options="selected" label="Informe o estado" filled />
      </div>
      <div class="col-12 col-md-4 col-lg-3 col-xl-2 q-pl-sm">
        <q-btn color="secondary" icon="search" label="Pesquisar" class="full-height full-width" />
      </div>
    </div>

    <div class="row q-mt-md">
      <div class="col-12 col-md-4 col-lg-4 q-pr-sm" :class="$q.screen.width > 2600 ? 'col-xl-2' : 'col-xl-3'">
        <q-card class="my-card">
          <img
            src="https://decoracaobrasil.com/wp-content/uploads/2023/01/Fotos-de-manso%CC%83es-de-tirar-o-fo%CC%82lego.jpg"
            height="300">

          <q-card-section>
            <div class="text-h6">186 Aptos - Padrão HIS</div>
            <div class="text-subtitle2">
              <div class="flex">
                <div>R$ 36.000,00</div>
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
      <div class="col-12 col-md-4 col-lg-4 q-pr-sm" :class="$q.screen.width > 2600 ? 'col-xl-2' : 'col-xl-3'">

        <q-card class="my-card">
          <img
            src="https://decoracaobrasil.com/wp-content/uploads/2023/01/fotos-de-manso%CC%83es-de-tirar-o-fo%CC%82lego-1-768x512.jpg.webp"
            height="300">

          <q-card-section>
            <div class="text-h6">186 Aptos - Alto Padrão VGV</div>
            <div class="text-subtitle2">
              <div class="flex">
                <div>R$ 2.326.000,00</div>
                <div class="q-px-sm">
                  -
                </div>
                <div>Nova Pretropolis - São Paulo</div>
              </div>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-btn color="primary" icon="check" label="Tenho interesse" />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-4 col-lg-4 q-pr-sm" :class="$q.screen.width > 2600 ? 'col-xl-2' : 'col-xl-3'">
        <q-card class="my-card">
          <img src="https://decoracaobrasil.com/wp-content/uploads/2023/01/mansao-com-cores-claras.jpg.webp" height="300">

          <q-card-section>
            <div class="text-h6">186 Aptos - Alto Padrão VGV</div>
            <div class="text-subtitle2">
              <div class="flex">
                <div>R$ 2.326.000,00</div>
                <div class="q-px-sm">
                  -
                </div>
                <div>Nova Pretropolis - São Paulo</div>
              </div>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-btn color="primary" icon="check" label="Tenho interesse" />
          </q-card-section>
        </q-card>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';


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

</script>

<style scoped></style>

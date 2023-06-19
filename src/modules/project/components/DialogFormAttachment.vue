<template>
  <q-dialog v-model="openDialog" position="top" transition-duration="100" transition-show="jump-up"
    transition-hide="jump-down" no-backdrop-dismiss>
    <q-card style=" margin-top: 10vh" :style="getWidth()">

      <q-card-section class="q-pa-none">

        <FormAttachment :dataComponent="dataComponentFormAttachment" />

      </q-card-section>

      <q-separator />
      <q-card-actions vertical align="right">
        <q-btn outline color="primary" size="sm" label="Cancelar" @click="openDialog = false" />
      </q-card-actions>
    </q-card>

  </q-dialog>
</template>

<script setup lang="ts">

import { ref, watch, reactive } from 'vue'
import { useQuasar } from 'quasar';
import FormAttachment, { FormAttachmentProps } from './FormAttachment.vue';

const openDialog = ref(false);
const $q = useQuasar();

const props = defineProps({
  dataDialog: {
    type: Object,
    required: true,
  }
});

const dataComponentFormAttachment: FormAttachmentProps = reactive({
  args: {
    preventUpload: false,
    idField: 0
  }
});

const getWidth = () => {
  if (!$q.screen.gt.md) {
    return 'min-width: 90vw;'
  }
  return 'min-width: 25vw;'
}

watch(props.dataDialog, async (value) => {
  if (value.args.openDialog) {
    dataComponentFormAttachment.args = {
      preventUpload: false,
      idField: value.args.idField
    }
    openDialog.value = value.args.openDialog
  }
});

</script>

<style scoped></style>

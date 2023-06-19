<template>
  <q-uploader url="" flat square multiple style="width: 100%" @added="(addFiles as any)"
    @removed="removeFile($event as any)" @rejected="onReject" max-file-size="9000000000">
    <!-- HEADER -->
    <template v-slot:header="scope">
      <div class="row no-wrap items-center q-py-xs q-pr-md bg-grey-3 text-grey-9">
        <q-btn v-if="scope.queuedFiles.length > 0" icon="delete" @click="removeAllFiles(scope)" round dense
          class="q-ml-md" color="red" size="md">
          <q-tooltip>
            Remover todos os arquivos
          </q-tooltip>
        </q-btn>
        <q-btn v-if="scope.uploadedFiles.length > 0" icon="done_all" @click="scope.removeUploadedFiles" round dense flat>
          <q-tooltip>Remove Uploaded Files </q-tooltip>
        </q-btn>
        <q-spinner v-if="scope.isUploading" class="q-uploader__spinner" />
        <div class="col q-ml-sm">
          <div class="q-uploader__title text-uppercase q-ml-sm">Enviar arquivos</div>
          <div class="q-uploader__subtitle q-ml-sm">Total a ser enviado {{ scope.uploadSizeLabel }}</div>
        </div>
        <q-btn v-if="scope.canAddFiles" type="a" icon="add_box" @click="scope.pickFiles" color="primary"
          label="Selecionar arquivos" size="sm">
          <q-uploader-add-trigger />
        </q-btn>
        <q-btn v-if="scope.canUpload" @click="doUpload(scope)" color="accent" size="sm"
          :label="preventUpload ? 'Anexar arquivos' : 'Enviar'" class="q-ml-sm q-mr-xs">
        </q-btn>

        <q-btn v-if="scope.isUploading" icon="clear" @click="scope.abort" round dense flat>
          <q-tooltip>Abort Upload</q-tooltip>
        </q-btn>
      </div>
    </template>
    <!-- / HEADER -->

    <template v-slot:list="scope">

      <!-- BOX MESSAGE -->
      <div class="row q-px-md" v-if="!files.length">
        <div class="col-12 box" :style="getHeightBox">
          <div class="row text-center" style="margin-top: 5%">
            <div class="col-12 q-pt-sm">
              <q-icon name="upload" size="sm" />
            </div>

            <div class="col-12">
              Arraste e solte os arquivos aqui
            </div>

            <div class="col-12 q-pt-xs">ou</div>

            <div class="col-12 q-pt-xs text-blue-8 cursor-pointer" @click="scope.pickFiles">
              Selecione os arquivos
            </div>
          </div>
        </div>
      </div>
      <!-- /BOX MESSAGE -->

      <q-list separator>
        <q-item v-for="(file, index) in files" :key="file.__key" dense :class="index > 0 ? 'q-pt-xs' : null">
          <q-item-section>
            <q-item-label class="full-width ellipsis">
              {{ file.name }}
            </q-item-label>

            <q-item-label caption :style="files_manipulate[index].__status === 'error' ? 'color: red' : files_manipulate[index].__status === 'finish' ? 'green' : null
              ">
              Status: {{ files_manipulate[index].__status }}
            </q-item-label>

            <q-item-label caption> {{ file.__sizeLabel }} / {{ files_manipulate[index].__progressLabel }}
            </q-item-label>
          </q-item-section>

          <q-item-section top side>
            <q-btn class="gt-xs" size="12px" flat dense round icon="delete" @click="scope.removeFile(file)"
              :disabled="files_manipulate[index].__status === 'finish'" />
          </q-item-section>
        </q-item>
      </q-list>
    </template>
  </q-uploader>

  <div class="q-px-lg" v-for="attachment in attachments">
    <q-list bordered class="rounded-borders">
      <q-item clickable>
        <q-item-section avatar>
          <div class="flex">
            <div>
              <q-icon color="red" name="delete" size="25px" @click="deleteAttachment(attachment.id)" />
            </div>
            <div class="q-pl-md">
              <q-icon color="primary" name="download" size="25px"
                @click="downloadAttachment(attachment.id, attachment)" />
            </div>
          </div>
        </q-item-section>
        <q-item-section>{{ attachment.file_name }}</q-item-section>
        <q-item-section>
          <q-radio v-model="coverImage" :val="attachment.id" label="Imagem de capa"
            :disable="disabledRadioCover(attachment.file_extension)" @update:model-value="changeCover(attachment.id)" />
        </q-item-section>
      </q-item>
    </q-list>
    <q-separator spaced inset vertical dark />
  </div>

  <DialogLoading v-if="loadingAttachments" />
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import notification from 'src/common/notification';
import { OutputAttachment } from '../contracts'
import DialogLoading from 'src/components/DialogLoading.vue';
import { AxiosResponse } from 'axios';

export type FormAttachmentProps = {
  args: {
    preventUpload: boolean;
    idField: number;
  }
}

const props = defineProps<{
  dataComponent: FormAttachmentProps
}>();

/**
 * data
 */
const $q = useQuasar();
const preventUpload = ref(false);
const files = ref<Array<any>>([]);
const files_manipulate = ref<Array<any>>([]);
const idField = ref<number>(0);
const attachments = ref<OutputAttachment[]>([]);
const coverImage = ref<string>('');
const loadingAttachments = ref<boolean>(false);

const addFiles = (files_data: Array<any>) => {
  files_data.forEach((file) => {
    files.value.push(file);

    const files_to_manipulate = { ...file };

    files_to_manipulate.__status = 'queue';
    files_manipulate.value.push(files_to_manipulate);
  });
};

const removeFile = (file: Array<any>) => {
  const files_to_compare_2 = JSON.parse(JSON.stringify(file.shift()));

  const index = files.value.findIndex((value) => {
    const files_to_compare = JSON.parse(JSON.stringify(value));
    return files_to_compare.__key === files_to_compare_2.__key;
  });

  files.value.splice(index, 1);
};

const removeAllFiles = (scope: any) => {
  scope.removeQueuedFiles();

  files.value = [];
  files_manipulate.value = [];
};

const doUpload = async (scope: any) => {
  try {

    loadingAttachments.value = true;

    const files: Array<File> = scope.files;

    if (preventUpload.value) {
      return;
    }

    for await (const [index, file] of files.entries()) {
      const formData = new FormData();

      formData.append(
        'formData',
        JSON.stringify({
          idField: idField.value,
        }),
      );

      formData.append('file', file);
      files_manipulate.value[index].__status = 'em progresso';

      const config = {
        onUploadProgress: (progressEvent: any) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          files_manipulate.value[index].__progressLabel = `${percent} %`;
        },
      };

      await api.post('project/attachment', formData, config);
      files_manipulate.value[index].__status = 'finalizado';
    }

    removeAllFiles(scope);
    notification.success();
  } catch (error) {
    notification.error();
  } finally {
    getAttachments();
    hideLoading();
  }
};

const hideLoading = () => {
  setTimeout(() => {
    loadingAttachments.value = false;
  }, 300);
};

const getAttachments = async () => {
  try {
    const response = await api.get(`project/attachment/${idField.value}`);
    console.log(response.data);
    coverImage.value = response.data.find((value: any) => value.project_cover === true)?.id ?? '';
    attachments.value = response.data ?? [];
  } catch (error) {
    notification.error();
  }
};

const deleteAttachment = async (id: number) => {
  try {
    await api.delete(`project/attachment/${id}`);
    notification.success();
    getAttachments();
  } catch (error) {
    notification.error();
  }
};

const downloadAttachment = async (id: number, attachament: OutputAttachment) => {

  try {
    loadingAttachments.value = true;
    const result = await api.get(`project/attachment/download/${id}`, {
      responseType: 'blob',
    })

    const fileNameWithExtension = `${attachament.file_name}.${attachament.file_extension}`;
    forceFileDownload(result, fileNameWithExtension);
  } catch (error) {
    notification.error();
  } finally {
    hideLoading();
  }

}

const forceFileDownload = (response: AxiosResponse, fileName: string) => {
  const url = window.URL.createObjectURL(new Blob([response.data], { type: response.data.type }));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
}



const disabledRadioCover = (extension: string) => {
  if (extension === 'png' || extension === 'jpg' || extension === 'jpeg') {
    return false;
  }
  return true;
};

const changeCover = (id: number) => {
  if (id) {
    try {
      loadingAttachments.value = true;
      updateAttachment(id as unknown as number);
    } catch (error) {
      notification.error();
    } finally {
      hideLoading();
    }
  }
};

const updateAttachment = async (id: number) => {
  try {

    const attachament = attachments.value.find((value) => value.id === id);
    attachament!.project_cover = true;
    await api.put(`project/attachment/${attachament?.id}`, attachament);
    notification.success();
  } catch (error) {
    // notification.error();
  }
};

const getWidth = computed(() => {
  const screen = $q.screen;

  if (screen.gt.md) {
    return 'min-width: 50vw';
  }

  if (screen.md) {
    return 'min-width: 90vw';
  }
});

const getHeight = computed(() => {
  const screen = $q.screen;

  if (screen.gt.md) {
    return {
      'max-height': '89.5vh',
    };
  }

  if (screen.md) {
    return {
      'max-height': '83vh',
    };
  }
});

const getHeightBox = computed(() => {
  const screen = $q.screen;

  if (screen.gt.md) {
    return 'height: 18vh';
  }

  return 'height: 28vh';
});

const onReject = () => {
  //notification.error(`${t('invalidFile')}`);
};

onMounted(() => {
  files.value = [];
  preventUpload.value = props.dataComponent?.args?.preventUpload ?? false;
  idField.value = props.dataComponent?.args?.idField ?? 0;
  getAttachments();
});

</script>

<style scoped lang="sass">
.title
  font-size: 14px

.message
  font-size: 15px

.box
  border: 2px
  border-style: dashed
  border-color: $grey-5
</style>


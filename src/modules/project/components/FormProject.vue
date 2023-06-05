<template>
  <div>
    <q-form @submit.prevent ref="myForm">
      <div class="row">
        <div class="col-12 col-md-5 col-lg-3 col-xl-2 q-pr-sm">
          <label class="label-input">
            Tipo de cadastro
            <span class="required">*</span>
          </label>
          <q-select transition-show="jump-up" transition-hide="jump-up" emit-value map-options
            v-model="form.type_register" :options="select.typeRegister" outlined class="full-width" :rules="[required]"
            :option-label="(val: any) => firstCapitalize(val.label)" dense>
            <template v-slot:selected-item="scope">
              <div class="ellipsis">{{ firstCapitalize(scope.opt.label) }}</div>
            </template>
          </q-select>
        </div>
        <div class="col-12 col-md-6 col-lg-4 col-xl-4 q-pr-sm q-pt-md">
          <q-checkbox right-label v-model="form.is_active" label="Cadastro liberado no sistema"
            :disable="!authStore.isAdmin" />
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <div>
            <span class="q-pl-sm text-bold">DADOS DO CADASTRO</span>
          </div>
          <q-separator style="margin-bottom: 0px" />
        </div>
      </div>

      <div class="row q-mt-md">
        <div class="col-12 col-md-6 col-lg-4 col-xl-2 q-pr-sm">
          <label class="label-input">
            Nome do produto
            <span class="required">*</span>
          </label>
          <q-input v-model="form.product_name" outlined class="full-width" :rules="[required]" dense />
        </div>
        <div class="col-12 col-md-3 col-lg-2 col-xl-2 q-pr-sm">
          <label class="label-input">
            Area do terreno
          </label>
          <q-input v-model="form.land_area" outlined class="full-width" hint="" dense />
        </div>
        <div class="col-12 col-md-3 col-lg-2 col-xl-2 q-pr-sm">
          <label class="label-input">
            Valor do terreno
          </label>
          <QCurrencyInput v-model="form.value_area" />
        </div>
        <div class="col-12 col-md-8 col-lg-4 col-xl-2 q-pr-sm">
          <label class="label-input">
            Localização
          </label>
          <q-input v-model="form.localization" outlined class="full-width" hint="" dense />
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <div>
            <span class="q-pl-sm text-bold">DADOS DO PROJETO</span>
          </div>
          <q-separator style="margin-bottom: 0px" />
        </div>
      </div>

      <div class="row q-pt-sm">
        <div class="col-12 col-md-6 col-lg-4 col-xl-4 q-pr-sm">
          <q-checkbox right-label v-model="form.exists_project" label="Existe projeto?" />
        </div>
      </div>
      <div class="row q-mt-md">
        <div class="col-12 col-md-5 col-lg-3 col-xl-2 q-pr-sm">
          <label class="label-input">
            Situação do projeto
          </label>
          <q-select transition-show="jump-up" transition-hide="jump-up" emit-value map-options
            v-model="form.situation_project" :options="select.situationProject" outlined class="full-width"
            :option-label="(val: any) => firstCapitalize(val.label)" dense>
            <template v-slot:selected-item="scope">
              <div class="ellipsis">{{ firstCapitalize(scope.opt.label) }}</div>
            </template>
          </q-select>
        </div>
        <div class="col-12 col-md-5 col-lg-4 col-xl-2 q-pr-sm">
          <label class="label-input">
            Valor do projeto
          </label>
          <QCurrencyInput v-model="form.value_project" />
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-md-3 col-lg-2 col-xl-1">
          <q-checkbox right-label v-model="form.houses" label="Casa" />
        </div>
        <div class="col-12 col-md-3 col-lg-2 col-xl-1">
          <q-checkbox right-label v-model="form.apartments" label="Apartamentos" />
        </div>
        <div class="col-12 col-md-3 col-lg-2 col-xl-1">
          <q-checkbox right-label v-model="form.mixed" label="Misto" />
        </div>
        <div class="col-12 col-md-3 col-lg-2 col-xl-1">
          <q-checkbox right-label v-model="form.commercial" label="Galpões" />
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-md-3 col-lg-2 col-xl-1 q-pt-md">
          <q-checkbox right-label v-model="form.exist_incorporation_registry" label="Registro de incorporação?" />
        </div>
      </div>

      <div class="row q-mt-md">
        <div class="col-12 col-md-5 col-lg-3 col-xl-2 q-pr-sm">
          <label class="label-input">
            Situação do registro
          </label>
          <q-select transition-show="jump-up" transition-hide="jump-up" emit-value map-options
            v-model="form.register_situations" :options="select.registerSituation" outlined class="full-width"
            :option-label="(val: any) => firstCapitalize(val.label)" dense>
            <template v-slot:selected-item="scope">
              <div class="ellipsis">{{ firstCapitalize(scope.opt.label) }}</div>
            </template>
          </q-select>
        </div>
        <div class="col-12 col-md-5 col-lg-4 col-xl-2 q-pr-sm">
          <label class="label-input">
            Valor do registro
          </label>
          <QCurrencyInput v-model="form.value_register" />
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-md-5 col-lg-4 col-xl-2 q-pr-sm">
          <label class="label-input">
            Obra executada
          </label>
          <QCurrencyInput v-model="form.value_work_executed" />
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-md-10 col-lg-8 col-xl-6 q-pr-sm">
          <label class="label-input">
            O que foi feito
          </label>
          <q-editor v-model="form.what_was_done" min-height="5rem" />
        </div>
      </div>

      <div class="row q-pt-lg">
        <div class="col-12 col-md-5 col-lg-4 col-xl-2 q-pr-sm">
          <label class="label-input">
            Valor total
          </label>
          <QCurrencyInput v-model="form.value_work_to_be_done" />
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-md-10 col-lg-8 col-xl-6 q-pr-sm">
          <label class="label-input">
            Condições de pagamento e negociação
          </label>
          <q-editor v-model="form.trading_conditions" min-height="5rem" />
        </div>
      </div>

      <div class="row q-pt-md">
        <div class="col-12 col-md-3 col-lg-2 col-xl-1">
          <q-checkbox right-label v-model="form.exists_debit" label="Existe dividas?" />
        </div>
      </div>

      <div class="row q-pt-sm">
        <div class="col-12 col-md-10 col-lg-8 col-xl-6 q-pr-sm">
          <label class="label-input">
            Informe os débitos
          </label>
          <q-editor v-model="form.observations_debit" min-height="5rem" />
        </div>
      </div>

      <div class="row q-pt-md">
        <div class="col-12 col-md-10 col-lg-8 col-xl-6 q-pr-sm">
          <label class="label-input">
            Observações gerais
          </label>
          <q-editor v-model="form.observations" min-height="5rem" />
        </div>
      </div>


      <div class="row q-mt-md">
        <div class="col-12 col-md-12">
          <q-btn type="button" label="Salvar dados" color="primary" unelevated
            :class="$q.screen.lt.md ? 'full-width' : null" :size="$q.screen.gt.sm ? '11px' : ''" @click="submitForm" />
          <q-btn type="button" label="Cancelar" outline color="grey-8" class="q-ml-sm"
            :class="$q.screen.lt.md ? 'full-width q-mt-md' : null" :size="$q.screen.gt.sm ? '11px' : ''"
            @click="cancelData" />
        </div>
      </div>
    </q-form>
    <DialogLoading v-if="loading" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onBeforeMount } from 'vue';
import { firstCapitalize, getUserLogged } from 'src/common/utils';
import { required } from 'src/common/rules-validaton';
import DialogLoading from 'src/components/DialogLoading.vue';
import { useRoute, useRouter } from 'vue-router';
import { InputProject, TYPE_REGISTER } from '../contracts';
import { ProjectService } from '../services/project.service';
import QCurrencyInput from 'src/components/QCurrencyInput.vue';
import notification from 'src/common/notification';
import { useAuthStore } from 'src/stores/auth';

const route = useRoute();
const router = useRouter();
const projectService = new ProjectService();
const authStore = useAuthStore();

/**
 * data
 */
const loading = ref(false);

const myForm: any = ref();

const select = {
  typeRegister: [
    { label: 'Imovel', value: 'imovel' },
    { label: 'Projeto', value: 'projeto' },
  ],
  situationProject: [
    { label: 'Aprovado', value: 'aprovado' },
    { label: 'Em aprovação', value: 'em_aprovacao' },
    { label: 'Sem aprovação', value: 'sem_aprovacao' },
  ],
  registerSituation: [
    { label: 'Aprovado', value: 'aprovado' },
    { label: 'Em aprovação', value: 'em_aprovacao' },
    { label: 'Sem aprovação', value: 'sem_aprovacao' },
  ],
}

const form = reactive<InputProject & { id?: number }>({
  type_register: TYPE_REGISTER.IMOVEL,
  product_name: '',
  exist_incorporation_registry: false,
  exists_debit: false,
  exists_project: false,
  is_active: false,
  land_area: '',
  localization: '',
  observations: '',
  register_situations: '',
  situation_project: '',
  value_project: 0,
  houses: false,
  apartments: false,
  mixed: false,
  commercial: false,
  trading_conditions: '',
  type_project: '',
  value_area: 0,
  value_register: 0,
  value_work_executed: 0,
  value_work_to_be_done: 0,
  what_was_done: '',
  observations_debit: '',
});

/**
 * methods
 */
const submitForm = async () => {
  const isValidForm = await myForm.value?.validate();
  if (!isValidForm) return;
  if (!form.id) {
    save();
  } else {
    update();
  }
};

const save = async () => {
  loading.value = true;
  try {

    const userLogged = getUserLogged();
    const dataSave = { ...form };
    dataSave.user_id = userLogged.userId;

    await projectService.create(dataSave);
    resetForm();

  } catch (error) {

  } finally {
    hideLoading();
  }
};

const update = async () => {
  try {
    loading.value = true;


    const dataUpdate = { ...form };
    dataUpdate.id = form.id as unknown as number;

    await projectService.update(dataUpdate as unknown as InputProject & { id: number, user_id: number });

    notification.success('Cadastro atualizado com sucesso');

  } catch (error) {
  } finally {
    hideLoading();
  }
};

const edit = async (id: number) => {
  try {

    const result = await projectService.findOneById(id);
    if (!result) {
      throw new Error("Não foi possível encontrar o cadastro");
    }

    form.id = result.id;
    form.is_active = result.is_active;
    form.product_name = result.product_name;
    form.type_register = result.type_register;
    form.exist_incorporation_registry = result.exist_incorporation_registry;
    form.exists_debit = result.exists_debit;
    form.exists_project = result.exists_project;
    form.land_area = result.land_area;
    form.localization = result.localization;
    form.observations = result.observations ?? '';
    form.register_situations = result.register_situations;
    form.situation_project = result.situation_project;
    form.trading_conditions = result.trading_conditions ?? '';
    form.type_project = result.type_project;
    form.value_area = result.value_area;
    form.value_project = result.value_project;
    form.value_register = result.value_register;
    form.value_work_executed = result.value_work_executed;
    form.value_work_to_be_done = result.value_work_to_be_done;
    form.what_was_done = result.what_was_done ?? '';
    form.observations_debit = result.observations_debit ?? '';
    form.houses = result.houses;
    form.apartments = result.apartments;
    form.mixed = result.mixed;
    form.commercial = result.commercial;


  } catch (error: any) {
    if (error && error.message === "Não foi possível encontrar o cadastro") {
      notification.error(error.message);
    } else {
      notification.error();
    }
  } finally {
    hideLoading();
  }
};

const resetForm = () => {

  form.is_active = false;
  form.product_name = '';
  form.type_register = TYPE_REGISTER.IMOVEL;
  form.exist_incorporation_registry = false;
  form.exists_debit = false;
  form.exists_project = false;
  form.land_area = '';
  form.localization = '';
  form.observations = '';
  form.register_situations = '';
  form.situation_project = '';
  form.trading_conditions = '';
  form.type_project = '';
  form.value_area = 0;
  form.value_project = 0;
  form.value_register = 0;
  form.value_work_executed = 0;
  form.value_work_to_be_done = 0;
  form.what_was_done = '';
  form.observations_debit = '';
  form.houses = false;
  form.apartments = false;
  form.mixed = false;
  form.commercial = false;

  setTimeout(() => {
    myForm.value?.resetValidation();
  }, 100);
}

const cancelData = () => {
  resetForm();
  if (form.id) {
    router.push({ name: 'register' });
  } else {
    resetForm();
  }

};

const hideLoading = () => {
  setTimeout(() => {
    loading.value = false;
  }, 300);
};

onBeforeMount(() => {
  resetForm();

  const routeName = route.name as string;

  if (routeName === "projectEdit") {
    loading.value = true;
    const { id } = route.params;
    edit(id as unknown as number);
  }
});

</script>

<style scoped></style>

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
      </div>

      <div class="row">
        <div class="col-6">
          <div>
            <span class="q-pl-sm text-bold">DADOS DA EMPRESA</span>
          </div>
          <q-separator style="margin-bottom: 0px" />
        </div>
      </div>

      <div class="row q-mt-md">
        <div class="col-12 col-md-5 col-lg-4 col-xl-2 q-pr-sm">
          <label class="label-input">
            Razão social
          </label>
          <q-input v-model="form.corporate_name" outlined class="full-width" dense />
        </div>
        <div class="col-12 col-md-5 col-lg-4 col-xl-2 q-pr-sm">
          <label class="label-input">
            Nome fantasia
          </label>
          <q-input v-model="form.fantasy_name" outlined class="full-width" hint="" dense />
        </div>
        <div class="col-12 col-md-3 col-lg-2 col-xl-1 q-pr-sm">
          <label class="label-input">
            Documento
          </label>
          <q-input v-model="form.corporate_document" outlined class="full-width" :rules="[isValidCPFCNPJ]"
            mask="##.###.###/####-##" clearable dense />
        </div>
        <div class="col-12 col-md-3 col-lg-2 col-xl-1 q-pr-sm">
          <label class="label-input">
            CEP
          </label>
          <q-input v-model="form.zip_code" outlined class="full-width" mask="#####-###" hint="" dense />
        </div>
        <div class="col-12 col-md-5 col-lg-4 col-xl-2 q-pr-sm">
          <label class="label-input">
            Endereço
          </label>
          <q-input v-model="form.address" outlined class="full-width" hint="" dense />
        </div>
        <div class="col-12 col-md-5 col-lg-4 col-xl-2 q-pr-sm">
          <label class="label-input">
            Estado
          </label>
          <q-input v-model="form.state" outlined class="full-width" hint="" dense />
        </div>
        <div class="col-12 col-md-5 col-lg-4 col-xl-2 q-pr-sm">
          <label class="label-input">
            Cidade
          </label>
          <q-input v-model="form.city" outlined class="full-width" hint="" dense />
        </div>
      </div>

      <div class="row q-mt-sm">
        <div class="col-6">
          <div>
            <span class="q-pl-sm text-bold">
              DADOS DO {{ form.type_register === TYPE_REGISTER.PROPRIETARIO ? 'PROPRIETÁRIO' : 'RESPONSÁVEL' }}
            </span>
          </div>
          <q-separator style="margin-bottom: 0px" />
        </div>
      </div>

      <div class="row q-mt-md">
        <div class="col-12 col-md-5 col-lg-6 col-xl-2 q-pr-sm">
          <label class="label-input">
            {{ form.type_register === TYPE_REGISTER.PROPRIETARIO ? 'Proprietário' : 'Responsável' }}
            <span class="required">*</span>
          </label>
          <q-input v-model="form.name" outlined class="full-width" :rules="[required]" dense />
        </div>
        <div class="col-12 col-md-5 col-lg-3 col-xl-2 q-pr-sm">
          <label class="label-input">
            Documento
            <span class="required">*</span>
          </label>
          <q-input v-model="form.document" outlined class="full-width" :rules="[required]" mask="###.###.###-##" dense />
        </div>
        <div class="col-12 col-md-5 col-lg-3 col-xl-2 q-pr-sm" v-if="form.type_register !== TYPE_REGISTER.PROPRIETARIO">
          <label class="label-input">
            Cargo
          </label>
          <q-input v-model="form.occupation" outlined class="full-width" dense hint="" />
        </div>
        <div class="col-12 col-md-5 col-lg-2 col-xl-2 q-pr-sm">
          <label class="label-input">
            Telefone fixo
          </label>
          <q-input v-model="form.phone" outlined class="full-width" v-maska data-maska="['(##) ####-####']" dense
            hint="" />
        </div>
        <div class="col-12 col-md-5 col-lg-2 col-xl-2 q-pr-sm">
          <label class="label-input">
            Telefone celular
          </label>
          <q-input v-model="form.cell_phone" outlined class="full-width" v-maska data-maska="['(##) #####-####']" dense
            hint="" />
        </div>
      </div>

      <div class="row q-mt-xs">
        <div class="col-12 col-md-5 col-lg-4 col-xl-2 q-pr-sm">
          <label class="label-input">
            Email
            <span class="required">*</span>
          </label>
          <q-input v-model="form.email" outlined class="full-width" :rules="[required, isEmail]" dense />
        </div>
        <div class="col-12 col-md-3 col-lg-2 col-xl-1 q-pr-sm">
          <label class="label-input">
            Senha
            <span class="required">*</span>
          </label>
          <q-input v-model="form.password" type="password" outlined class="full-width" :rules="[required]" dense />
        </div>
        <div class="col-12 col-md-3 col-lg-2 col-xl-1 q-pr-sm">
          <label class="label-input">
            Confirme a senha
            <span class="required">*</span>
          </label>
          <q-input v-model="form.password_confirmation" type="password" outlined class="full-width"
            :rules="[required, checkPassword]" dense />
        </div>
      </div>

      <div class="row q-mt-sm">
        <div class="col-12">
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
import { firstCapitalize } from 'src/common/utils';
import { isEmail, isValidCPFCNPJ, required } from 'src/common/rules-validaton';
import { vMaska } from "maska";
import { InputUser, LEVEL_ACCESS, TYPE_REGISTER } from '../contracts';
import DialogLoading from 'src/components/DialogLoading.vue';
import { RegisterService } from '../services/register.service';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const registerService = new RegisterService();

/**
 * data
 */
const loading = ref(false);

const myForm: any = ref();

const select = {
  typeRegister: [
    { label: 'Imobiliária', value: 'imobiliaria' },
    { label: 'Incorporadora', value: 'incorporadora' },
    { label: 'Proprietario', value: 'proprietario' },
  ]
}

const form = reactive<InputUser & { id?: number }>({
  type_register: TYPE_REGISTER.IMOBILIARIA,
  corporate_name: '',
  corporate_document: '',
  zip_code: '',
  address: '',
  state: '',
  city: '',
  name: '',
  document: '',
  phone: '',
  cell_phone: '',
  occupation: '',
  email: '',
  password: '',
  password_confirmation: '',
  level_access: LEVEL_ACCESS.DEFAULT,
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

    await registerService.create(form);
    resetForm();

  } catch (error) {

  } finally {
    hideLoading();
  }
};

const update = async () => {
  try {
    loading.value = true;
    await registerService.update(form);
  } catch (error) {
  } finally {
    hideLoading();
  }
};

const checkPassword = () => {
  if (form.password !== form.password_confirmation) return 'senhas não conferem';
};

const edit = async (id: number) => {
  try {
    loading.value = true;
    const data = await registerService.findOneById(id);
    if (!data) return;
    form.id = data.id;
    form.type_register = data.type_register;
    form.corporate_name = data.corporate_name;
    form.fantasy_name = data.fantasy_name;
    form.corporate_document = data.corporate_document;
    form.zip_code = data.zip_code;
    form.address = data.address;
    form.state = data.state;
    form.city = data.city;
    form.name = data.name;
    form.document = data.document;
    form.phone = data.phone;
    form.cell_phone = data.cell_phone;
    form.occupation = data.occupation;
    form.email = data.email;
    form.password = 'NO_CHANGE_PASSWORD';
    form.password_confirmation = 'NO_CHANGE_PASSWORD';
    form.level_access = data.level_access;


  } catch (error) {

  } finally {
    hideLoading();
  }
};

const resetForm = () => {
  form.type_register = TYPE_REGISTER.IMOBILIARIA;
  form.corporate_name = '';
  form.corporate_document = '';
  form.zip_code = '';
  form.address = '';
  form.state = '';
  form.city = '';
  form.name = '';
  form.document = '';
  form.phone = '';
  form.cell_phone = '';
  form.occupation = '';
  form.email = '';
  form.password = '';
  form.password_confirmation = '';
  form.level_access = LEVEL_ACCESS.DEFAULT;

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
  if (routeName === "registerEdit") {
    const { id } = route.params;
    edit(id as unknown as number);
  }
});

</script>

<style scoped></style>

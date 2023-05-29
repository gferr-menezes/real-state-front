<template>
  <q-form ref="myForm" @submit.prevent>
    <q-card-section class="q-mb-none q-pb-none q-mt-lg">
      <label class="label-input-login">
        Informe seu email
        <span class="required">*</span>
      </label>
      <q-input v-model="form.email" outlined class="full-width" :rules="[required, isEmail]" dense>
        <template v-slot:prepend>
          <q-icon name="email" />
        </template>
      </q-input>
    </q-card-section>

    <q-card-section class="q-mb-none q-pb-none q-mt-none q-pt-sm">
      <div class="col-12 col-md-3 col-lg-3 col-xl-3">
        <label class="label-input-login">
          Infome sua senha
          <span class="required">*</span>
        </label>
        <q-input v-model="form.password" type="password" outlined class="full-width" :rules="[required]"
          @keypress.enter="submitForm" dense>
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
        </q-input>
      </div>
    </q-card-section>

    <q-card-section class="q-pb-none q-pt-sm">
      <q-btn color="primary" label="Efetuar login" class="full-width" @click="submitForm" />
    </q-card-section>
    <q-card-section class="q-pt-none">
      <div class="errors-message">
        <span>{{ errorsMessage }}</span>
      </div>
    </q-card-section>
  </q-form>
  <DialogLoading v-if="loading" />
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { required, isEmail } from 'src/common/rules-validaton';
import { AuthService } from '../services/auth.service';
import DialogLoading from 'src/components/DialogLoading.vue';

/**
 * data
 */
const loading = ref(false);
const form = reactive<{
  email: string;
  password: string;
}>({
  email: '',
  password: '',
});

const myForm: any = ref(null);
const errorsMessage = ref('');
const authService = new AuthService();

/**
 * methods
 */
const submitForm = async () => {
  const validadeForm = await myForm.value.validate();
  if (!validadeForm) return;
  callLogin();
};

const callLogin = async () => {
  try {
    loading.value = true;
    await authService.doLogin(form.email, form.password);
  } catch (error: any) {
    hideLoading();
    const status = error?.status;
    if (status === 401) {
      errorsMessage.value = 'Usuário ou senha inválidos';
    } else {
      errorsMessage.value = 'Ocorreu um erro ao efetuar o login';
    }
  }
};

const hideLoading = () => {
  setTimeout(() => {
    loading.value = false;
  }, 300);
};


</script>

<style scoped lang="scss">
.fill-color {
  background-color: white !important;
  padding-bottom: 0px;
  margin-bottom: 15px;
  border-radius: 5px;
}

.label-input-login {
  font-weight: 500;
  font-size: 0.8rem;
  color: $grey-8;
}

.errors-message {
  margin-left: 2px;
  font-size: 0.8rem;
  color: $red-5;
  margin-top: 5px;
}
</style>

<template>
  <div class="loading-dialog"></div>
  <div id="spinner">
    <div class="spinner"></div>
    <div class="message text-portal">{{ props.message }} ...</div>
  </div>
</template>

<script setup lang="ts">

/**
 * @props
 */
const props = defineProps({
  message: {
    type: String,
    default: 'carregando',
  },
});

</script>

<style lang="scss" scoped>
.loading-dialog {
  // display: block;
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

#spinner {
  z-index: 9999;
  // display: none;
  position: fixed;
  z-index: 9999;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  background-color: white;
  border-radius: 3px;
  padding: 20px;
  width: 200px;
  height: 70px;
}

#spinner .spinner {
  border: 2px solid #f3f3f3;
  border-top: 2px solid $grey-8;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 0.7s linear infinite;
  margin-left: 40%;
  margin-top: -10px
}

#spinner .message {
  font-size: 12px;
  color: #000;
  margin-top: 10px;
  text-align: center;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>

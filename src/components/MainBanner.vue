<template>
  <div class="row">
    <div style="position: absolute; font-size: 2em; z-index: 9999; top: 90px; left: 5%">
      <div class="text-grey-10 text-bold " style="font-family: Arial, Helvetica, sans-serif;">
        <span>
          UNINDO O
        </span>
        <span class="q-pl-sm"> MERCADO IMOBILIARIO</span>
      </div>
    </div>
    <div class="col-12 main-banner"></div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.main-banner {
  height: 50vh;
  background-image: url('src/assets/image.jpeg');
  background-size: contain;
  opacity: 0.8;
}

@keyframes scale {
  100% {
    transform: scale(1);
  }
}

span {
  display: inline-block;
  opacity: 0;
  filter: blur(4px);
}

span:nth-child(1) {
  animation: fade-in 0.8s 0.1s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(2) {
  animation: fade-in 0.8s 0.2s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

@keyframes fade-in {
  100% {
    opacity: 1;
    filter: blur(0);
  }
}
</style>

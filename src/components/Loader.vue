<script lang="ts">
export default {
  name: 'LoaderComponent',
};
</script>

<template>
  <div class="is-flex is-justify-content-center is-align-items-center py-6">
    <span class="icon is-large has-text-primary">
      <i class="fas fa-spinner fa-pulse fa-2x"></i>
    </span>
  </div>
</template>

<style>
.lds-ring {
  display: inline-block;
  width: 64px;
  height: 64px;
}

.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 48px;
  height: 48px;
  margin: 8px;
  border: 6px solid #485fc7;
  border-radius: 50%;
  animation: lds-ring 1.2s linear infinite;
  border-color: #485fc7 transparent transparent transparent;
}

.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}

@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>

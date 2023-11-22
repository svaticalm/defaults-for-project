<template>
  <transition name="fade-notify">
    <div v-if="toaster.toastMessage" class="toast">
      <svg-icon :name="'ok'" :width="24" :height="24" :class="'c-green'"></svg-icon>
      {{ toaster.toastMessage }}
    </div>
  </transition>
</template>

<script lang="ts" setup>
import useToasterStore from '@/stores/toaster';

const toaster = useToasterStore();
</script>

<style scoped>
.fade-notify-enter-active, .fade-notify-leave-active {
  transition: all 0.5s;
}
.fade-notify-enter-from, .fade-notify-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
.toast {
  position: fixed;
  bottom: 48px;
  left: 32px;
  transform: translateY(0);
  padding: 16px 12px 16px 8px;
  background-color: var(--c-white);
  text-align: center;
  color: var(--c-gray);
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
  z-index: 10;
  box-shadow: var(--shadow-notify);
  border-radius: 4px;
}
</style>

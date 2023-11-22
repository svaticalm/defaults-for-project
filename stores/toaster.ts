import { defineStore } from 'pinia';
import { ref } from 'vue';

export default defineStore('toaster', () => {
  const toastMessage = ref('');

  function showToast(message: string) {
    toastMessage.value = message;

    setTimeout(() => {
      toastMessage.value = '';
    }, 2500);
  };
  return {
    // state
    toastMessage,
    // actions
    showToast,
  };
});

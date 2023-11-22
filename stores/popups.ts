import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { IPopup } from '@/types/popup';

export default defineStore('popup', () => {
  function createItems(names: string[]): Record<string, IPopup> {
    const items: Record<string, IPopup> = {};
    names.forEach((name) => {
      items[name] = {
        name,
        show: false,
      };
    });
    return items;
  }

  const itemNames = ['your-popup-name', 'your-popup-name2'];
  const items = ref<Record<string, IPopup>>(createItems(itemNames));

  function close(data: string) {
    if (data && items.value[data]) {
      items.value[data].show = false;
      document.getElementsByTagName('body')[0].classList.remove('noscroll');
    }
  }
  function open(data: string) {
    if (data && items.value[data]) {
      items.value[data].show = true;
    }
  }
  return {
    // state
    items,
    // action
    open,
    close,
  };
});

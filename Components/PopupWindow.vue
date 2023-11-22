<script lang="ts" setup>
import { ref, onMounted, onUnmounted, defineProps, nextTick } from 'vue';
import usePopupsStore from '@/stores/popups';

interface Props {
  width?: number;
  addClass?: string;
  show: boolean;
  isBtnClose?: boolean;
  isCloseOutSize?: boolean;
  name: string;
}

const props = withDefaults(defineProps<Props>(), {
  width: 640,
  addClass: '',
  show: false,
  isBtnClose: true,
  isCloseOutSize: true,
  name: '',
});

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const popups = usePopupsStore();
const top = ref(24);
const overlayPopup = ref<HTMLElement | null>(null);

const getViewportSize = () => {
  const html = document.querySelector('html');
  return { w: html!.clientWidth, h: html!.clientHeight };
};

const updateViewportSize = () => {
  nextTick(() => {
    if (overlayPopup.value) {
      let topValue = getViewportSize().h - overlayPopup.value.clientHeight;
      if (topValue < 1) {
        topValue = 1;
      }
      if (topValue / 2 < 33) {
        top.value = 0;
      } else {
        top.value = topValue / 2;
      }
    }
  });
};

const close = () => {
  emit('close');
  nextTick(() => {
    if (props.show && props.name) {
      popups.close(props.name);
      document.body.classList.remove('noscroll');
    } else {
      popups.close(props.name);
      document.body.classList.remove('noscroll');
    }
  });
};
const closeOutSize = () => {
  if (props.isCloseOutSize) {
    close();
  }
};
onMounted(() => {
  updateViewportSize();
  window.addEventListener('resize', updateViewportSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateViewportSize);
});
</script>

<template>
  <transition name="fade-popup">
    <div class="popup-wrapper" v-if="show">
      <div class="popup-scroll-block">
        <div class="overlay" @mousedown="closeOutSize"></div>
        <div
          class="popup"
          ref="overlayPopup"
          :class="[addClass]"
          :style="{ top: `${top - 0}px`, width: `${width}px` }"
        >
          <div class="popup__wrap">
            <div class="popup__close" @click="close" v-if="isBtnClose">
              <svg-icon :name="'close'" :width="32" :height="32"></svg-icon>
            </div>
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped lang="scss">
.fade-popup-enter-active,
.fade-popup-leave-active {
  transition: opacity 0.15s;
}
.fade-popup-enter,
.fade-popup-leave-to {
  opacity: 0;
}
.popup-wrapper {
  position: fixed;
  bottom: 0;
  right: 0;
  top: 0;
  left: 0;
  z-index: 8010;
  display: block;
  width: auto;
  height: auto;

  .noscroll & {
    overflow-y: scroll;
  }
}
.popup {
  width: 100vw;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  height: auto;
  margin: 0 auto;
  margin-bottom: 32px;
  margin-top: 32px;
  background: transparent;
  position: relative;
  text-shadow: none;
  border-radius: 0;
  background-color: #fff;
  border-radius: 4px;

  &__footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 32px;
    width: 100%;
    position: absolute;
    bottom: 16px;
    right: 0;
    padding: 0 16px;
  }

  &__close {
    position: absolute;
    top: 16px;
    right: 16px;
    cursor: pointer;
    transition: all 0.15s ease;
    z-index: 1;
    background-color: #fff;
    border-radius: 32px;
    color: var(--c-gray50);
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    &:hover {
      color: var(--c-gray);
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__wrap {
    position: relative;
    padding: 48px 0;

    * {
      word-break: break-word;
    }

    .footer {
      margin-top: 0;

      .bottom {
        display: none;
      }
    }
  }
}
.noscroll:not(.scroll-mac-os) #app {
  padding-right: 16px;
}
.popup-scroll-block {
  width: 100%;
  position: absolute;
  left: 0;
  height: auto !important;
  z-index: 1;
}
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(#242424, 0.93);
}
</style>

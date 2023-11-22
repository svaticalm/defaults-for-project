<script lang="ts" setup>
import { ref, reactive } from 'vue';
import vClickOutside from '@/directives/clickOutside';
// Props
interface ITooltip {
  direction?: string;
  isBtnClose?: boolean;
  width?: number;
}
const props = withDefaults(defineProps<ITooltip>(), {
  direction: 'left',
  isBtnClose: true,
  width: 320,
});
// eslint-disable-next-line
const mobileStyles = reactive({
  width: `${props.width}px`,
});
// Emits
const emit = defineEmits<{
  (e: 'tooltipClose'): void;
  (e: 'tooltipShow'): void;
}>();

const show = ref(false);
const tooltipWrapper = ref(null);
const tooltipBtn = ref(null);
const tooltipContent = ref(null);

// Methods
const tooltipClose = () => {
  show.value = false;
  if (show.value) {
    emit('tooltipClose');
  }
  setTimeout(() => {
    emit('tooltipClose');
  }, 100);
};
const tooltipCloseBtn = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();
  show.value = false;
};
const tooltipShow = () => {
  show.value = true;
  emit('tooltipShow');
};

const btnClick = () => {
  if (show.value) {
    tooltipClose();
  } else {
    tooltipShow();
  }
};
</script>

<template>
  <div
    class="tooltip"
    v-click-outside="tooltipClose"
    ref="tooltipWrapper"
    :class="{ active: show }"
  >
    <span class="tooltip__btn exclude-panzoom" @click="btnClick" ref="tooltipBtn">
      <slot name="tooltipBtn" />
    </span>
    <transition name="fade-popup">
      <div
        class="tooltip__content"
        :style="mobileStyles"
        :class="props.direction"
        ref="tooltipContent"
        v-show="show"
      >
        <div v-if="isBtnClose" class="tooltip__close exclude-panzoom" @click="tooltipCloseBtn">
          <svg-icon :name="'close'"></svg-icon>
        </div>
        <slot name="tooltipContent" />
      </div>
    </transition>
  </div>
</template>

<style lang="scss">
.fade-popup-enter-active,
.fade-popup-leave-active {
  transition: opacity 0.15s;
}

.fade-popup-enter,
.fade-popup-leave-to {
  opacity: 0;
  z-index: 0;
}
.product-tooltip {
  .tooltip__content {
    padding: 12px 12px 20px 16px;
    &.center {
      margin-right: none;
      right: unset;
      transform: translateX(calc(-50% + 20px));
      &:after {
        right: calc(50% - 5px);
      }
    }
    &.right-center {
      margin-right: none;
      right: unset;
      top: unset;
      transform: translateX(calc(-100% - 12px)) translateY(calc(-50% - 20px));
      &:after {
        right: -6px;
        top: calc(50% - 6px);
        border-width: 6px 0 6px 6px;
        border-color: transparent transparent transparent $white;
      }
    }
  }
}
.tooltip {
  position: relative;
  display: inline-block;
  .svg-icon {
    & + .tooltip__ttl {
      margin-top: 20px;
    }
  }
  &.active {
    z-index: 1;
  }
  &__ttl {
    text-align: left;
    & + .tooltip__txt {
      margin-top: 8px;
    }
  }
  &__txt {
    text-align: left;
  }
  &__content {
    position: absolute;
    padding: 8px 16px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 0px 12px 0px rgba(36, 99, 184, 0.30);
    right: 50%;
    margin-right: -22px;
    top: calc(100% + 10px);
    color: $black2;
    z-index: 1;
    &:after {
      content: '';
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 6px 6px 6px;
      border-color: transparent transparent #fff transparent;
      position: absolute;
      top: -6px;
      right: 16px;
    }

    &.right {
      margin-right: 0;
      margin-left: -22px;
      right: unset;
      left: 50%;
      &:after {
        right: unset;
        left: 16px;
      }
    }
    &.top {
      margin-right: 0;
      margin-left: -22px;
      right: unset;
      left: 50%;
      top: unset;
      bottom: calc(100% + 10px);
      &:after {
        right: unset;
        left: 16px;
        top: unset;
        bottom: -6px;
        transform: rotate(180deg);
      }
    }
  }

  &__close {
    position: absolute;
    right: 12px;
    top: 12px;
    cursor: pointer;
  }
}
</style>

<script lang="ts" setup>
import { computed } from 'vue';
import type { BtnComp } from '@/types/ui';

const props = defineProps<BtnComp>();

const btnClass = computed(() => {
  return {
    'btn--loading': props.isLoad,
    'btn--mini': props.mini,
    'btn--blue': props.blue,
    'btn--round': props.round,
    'btn--trans': props.trans,
    'btn--green': props.green,
    'btn--red': props.red,
  };
});
</script>

<template>
  <button type="button" class="btn" :class="btnClass" v-if="!props.link">
    <slot></slot>
  </button>
  <router-link class="btn" :to="props.link" :class="btnClass" v-else>
    <slot></slot>
  </router-link>
</template>

<style scoped lang="scss">
.btn {
  padding: 10px 16px;
  font-size: 14px;
  font-weight: bold;
  line-height: 20px;
  text-transform: uppercase;
  color: var(--c-gray);
  background-color: var(--c-yellow);
  transition: all 0.15s ease;
  border-radius: 4px;
  text-decoration: none;
  position: relative;
  display: flex;
  align-items: center;
  &:hover {
    background-color: var(--c-yellow70);
  }
  &:active {
    background-color: var(--c-yellow-hover);
  }
  &:disabled {
    color: var(--c-yellow100);
    background-color: var(--c-yellow);
  }
  &--loading {
    color: var(--c-dark-yellow);
    pointer-events: none;
    &:after {
      content: '';
      width: 16px;
      height: 16px;
      display: block;
      position: absolute;
      left: 50%;
      background-size: contain;
      transform: translateX(-50%) translateY(-50%);
      top: 50%;
      background-image: url('@/assets/img/loader.svg');
      animation: preloader-rotate 1.5s linear infinite;
    }
  }
  &--mini {
    padding: 8px 16px;
    font-size: 12px;
    line-height: 16px;
  }
  &--blue {
    background-color: var(--c-blue);
    color: var(--c-white);
    &:hover {
      background-color: var(--c-blue70);
    }
    &:active {
      background-color: var(--c-blue100);
    }
    &.btn--trans {
      background-color: transparent;
      border: 1px solid var(--c-blue);
      color: var(--c-blue);
      &:hover {
        border-color: var(--c-dark-blue);
        color: var(--c-dark-blue);
      }
      &:active {
        border-color: var(--c-blue100);
        color: var(--c-blue100);
      }
    }
  }
  &--green {
    background-color: var(--c-green);
    color: var(--c-white);
    &:hover {
      background-color: var(--c-green-hover);
    }
    &:active {
      background-color: var(--c-green-hover);
    }
    &.btn--loading {
      color: rgba(#fff,0.2);
      &:after {
        background-image: url('@/assets/img/loader-white.svg') ;
      }
    }
  }
  &--round {
    border-radius: 64px;
  }
  &--red {
    background-color: var(--c-red);
    color: var(--c-white);
    &:hover {
      background-color: var(--c-red-hover);
    }
    &:active {
      background-color: var(--c-red-hover);
    }
    &.btn--trans {
      background-color: transparent;
      border: 1px solid var(--c-red);
      color: var(--c-red);
      &:hover {
        background-color: var(--c-red10);
      }
    }
    &.btn--loading {
      color: rgba(#fff,0.2);
      &:after {
        background-image: url('@/assets/img/loader-white.svg') ;
      }
    }
  }
}
</style>
@/types/ui

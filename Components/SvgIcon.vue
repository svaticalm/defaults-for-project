<script lang="ts" setup>
import spriteUrl from '@/assets/img/calm-sprite.svg';

interface ISvgIcon {
  name?: string;
  width?: number;
  height?: number;
}
const props = withDefaults(defineProps<ISvgIcon>(), {
  name: '',
  width: 24,
  height: 24,
});
</script>

<template>
  <svg
    :style="{ width: `${props.width}px`, height: `${props.height}px` }"
    :viewBox="`0 0 ${props.width} ${props.height}`"
    class="svg-icon"
  >
    <use v-bind="{ 'xlink:href': `${spriteUrl}#${props.name}` }" />
  </svg>
</template>

<style lang="scss" scoped>
.svg-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

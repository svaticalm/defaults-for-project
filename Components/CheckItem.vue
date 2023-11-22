<script lang="ts" setup>
import type { InputFieldProps } from '@/types/ui';
import { removeError } from '@/utils';

const props = withDefaults(defineProps<InputFieldProps>(), {
  name: '',
});

// Emits
const emit = defineEmits<{
  (e: 'focus'): void;
  (e: 'blur'): void;
  (e: 'enter'): void;
  (e: 'update:modelValue', payload: boolean): boolean;
  (e: 'removeError', name: string): string;
}>();

// Variables
// Methods
const updateValue = (event: Event) => {
  const value = (event.target as HTMLInputElement)?.checked;
  emit('update:modelValue', value);
  emit('removeError', props.name ?? '');
  removeError(props.location as InputFieldProps);
};
</script>

<template>
  <div class="check-item">
    <input
      :type="type"
      :id="name"
      :name="name"
      value="true"
      :class="{ '--error': isError, '--repeat-error': isError && isRepeatError }"
      :checked="modelValue === 'true' || modelValue === true"
      @change="updateValue"
    />
    <label :for="name">
      <span v-if="label?.length">{{ label }}</span>
      <slot></slot>
    </label>
  </div>
</template>

<style scoped lang="scss">
.check-item {
  input {
    & + label {
      padding-left: 24px;
      position: relative;
      cursor: pointer;
      font-size: 14px;
      line-height: 1.4;
      &:after {
        content: '';
        width: 16px;
        height: 16px;
        position: absolute;
        left: 0;
        top: calc(50% - 8px);
        border-radius: 4px;
        border: 1px solid var(--c-gray50);
        cursor: pointer;
        transition: all 0.15s ease;
      }
      &:before {
        content: '';
        width: 12px;
        height: 12px;
        background-size: contain;
        background-repeat: no-repeat;
        background-image: url(@/assets/img/check.svg);
        position: absolute;
        left: 2px;
        top: calc(50% - 6px);
        opacity: 0;
        transition: all 0.15s ease;
        cursor: pointer;
        z-index: 1;
      }
      &:hover {
        &:after {
          color: var(--c-gray60);
        }
      }
    }
    &:checked + label {
      &:after {
        background-color: var(--c-gray);
        border-color: var(--c-gray);
      }
      &:before {
        opacity: 1;
      }
    }
    &.--error + label {
      color: $red;
      &:after {
        border-color: $red;
      }
    }
    &.--repeat-error + label {
      &:after {
        animation: anim-checkbox-border 0.8s linear;
      }
    }
  }
}
</style>

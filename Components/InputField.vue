<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import type { InputFieldProps } from '@/types/ui';
import vMask from '@/directives/mask';
import { removeError } from '@/utils';

const props = withDefaults(defineProps<InputFieldProps>(), {
  type: 'text',
  name: '',
  isMulti: false,
});

// Emits
const emit = defineEmits<{
  (e: 'input'): void;
  (e: 'focus'): void;
  (e: 'blur'): void;
  (e: 'enter'): void;
  (e: 'update:modelValue', payload: string): string;
  (e: 'removeError', name: string): string;
}>();

// Variables
const isFocus = ref(false);
const field = ref<HTMLInputElement | null>(null);

// Computed
const inputIdComputed = computed<string>(
  () => props.inputId ?? Math.random().toString(36).substr(2, 5),
);

const isActive = computed(() => isFocus.value || (props.modelValue as string).length);
const inputParts = computed(() => (props.modelValue as string).split(' '));
const showLastNamePlaceholder = computed(
  () => inputParts.value.length === 0 || inputParts.value[0] === '',
);
const showFirstNamePlaceholder = computed(
  () => inputParts.value.length < 2 || inputParts.value[1] === '',
);
const showMiddleNamePlaceholder = computed(
  () => inputParts.value.length < 3 || inputParts.value[2] === '',
);

// Methods
const updateValue = (event: Event) => {
  const { value } = event.target as HTMLInputElement;
  let multiValue;
  if (props.isMulti) {
    multiValue = value.replace(/^\s+/, '').replace(/\s+/g, ' ');
    // eslint-disable-next-line no-param-reassign
    (event.target as HTMLInputElement).value = multiValue;
  }
  emit('update:modelValue', multiValue || value);
  emit('removeError', props.name ?? '');
  removeError(props.location as InputFieldProps);
};
const onEnterListener = () => {
  emit('enter');
};
const setFocus = (val: boolean) => {
  removeError(props.location as InputFieldProps);
  isFocus.value = val;
  if (val) {
    emit('focus');
  } else {
    emit('blur');
  }
  emit('removeError', props.name ?? '');
};

const inputFocus = async () => {
  field.value?.focus();
};

// Lifecycle Hooks
onMounted(() => {
  if (props.autoFocus) {
    inputFocus();
  }
});
onUnmounted(() => {
  removeError(props.location as InputFieldProps);
});
</script>

<template>
  <div
    class="inp full"
    :class="{
      '--error': isError,
      '--active': isActive,
      '--repeat-error': isError && isRepeatError,
    }"
  >
    <label class="inp__label" :for="inputIdComputed">{{ label }}</label>
    <input
      class="inp__field"
      :type="type"
      :name="name"
      :id="inputIdComputed"
      @keyup.enter="onEnterListener()"
      :disabled="isDisabled"
      :value="modelValue"
      @input="updateValue($event)"
      @change="updateValue($event)"
      @keyup="updateValue($event)"
      @keydown="updateValue($event)"
      @focus="setFocus(true)"
      @blur="setFocus(false)"
      :placeholder="placeholder"
      :maxlength="maxLength"
      v-mask="mask"
      ref="field"
      :inputmode="inputmode"
    />
    <div class="inp__error-text" v-if="isError && errorText">{{ errorText }}</div>
    <div class="inp__error-icon" v-if="isError">
      <svg-icon :name="'info'" :width="16" :height="16"></svg-icon>
    </div>
    <div class="inp__multi-placeholder" v-if="isMulti">
      <span class="hidden-value">{{ (modelValue as string).trim() }}</span>
      <span v-show="showLastNamePlaceholder"> Фамилия</span>
      <span v-show="showFirstNamePlaceholder"> Имя</span>
      <span v-show="showMiddleNamePlaceholder"> Отчество</span>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>

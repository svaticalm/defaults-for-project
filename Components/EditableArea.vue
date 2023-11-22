<script setup lang="ts">
// imports
import { ref, watch, computed, onMounted } from 'vue';
import type { IEditableArea } from '@/types/ui';
import { removeError } from '@/helpers';

const props = defineProps<IEditableArea>();

const emit = defineEmits<{
  (e: 'input'): void;
  (e: 'focus'): void;
  (e: 'blur'): void;
  (e: 'update:modelValue', payload: string): string;
  (e: 'removeError', name: string): string;
  (e: 'check'): void;
  (e: 'edit'): void;
}>();

// data
const focus = ref(false);
const repeatError = ref(false);
const titleUpdated = ref(false);
const divInput = ref<HTMLInputElement | null>(null);

const classTextareaField = computed(() => {
  return { error: props.isError, 'repeat-error': repeatError.value, 'disabled': !props.isEditable };
});

// methods
function paste(e: ClipboardEvent) {
  e.preventDefault();
  const pastedData = e.clipboardData!.getData('text');
  document.execCommand('inserttext', false, pastedData);
}

function updateValue(e: Event) {
  if ((e.target as HTMLInputElement).innerHTML.trim() === '<br>') {
    (e.target as HTMLInputElement).innerHTML = '';
  }
  emit('update:modelValue', (e.target as HTMLElement)!.innerText);
}

function placeCaretAtEnd() {
  const el = divInput.value!;
  if (typeof window.getSelection !== 'undefined' && typeof document.createRange !== 'undefined') {
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const sel = window.getSelection();
    sel!.removeAllRanges();
    sel!.addRange(range);
  } else if (typeof el.selectionStart === 'number') {
    el.selectionStart = el.value.length;
    el.selectionEnd = el.value.length;
  }
}

function setFocus(val: boolean) {
  removeError(props.location as IEditableArea);
  const value = val || false;
  repeatError.value = false;
  focus.value = value;
  if (value) {
    emit('focus');
  } else {
    emit('blur');
  }
}
watch(
  () => props.modelValue,
  async (newVal: any) => {
    divInput.value!.innerText = newVal;
    titleUpdated.value = true;
    placeCaretAtEnd();
  },
);

onMounted(() => {
  divInput.value!.innerText = props.modelValue as string;
});
</script>

<template>
  <div
    class="editable-area"
    :contenteditable="isEditable"
    :class="classTextareaField"
    ref="divInput"
    :placeholder="placeholder"
    @focus="setFocus(true)"
    @paste="paste"
    @blur="setFocus(false)"
    @input="updateValue"
  ></div>
</template>

<style lang="scss">
.editable-area {
  width: 100%;
  min-height: 66px;
  background-color: #fff;
  height: auto;
  display: block;
  resize: none;
  padding: 16px 40px;
  width: 656px;
  margin-left: 24px;
  line-height: 32px;
  border-radius: 4px;
  border: 1px solid transparent;
  transition: all 0.15s ease;
  font-weight: bold;
  cursor: text;
  color: var(--c-black);
  @extend .font-size-28;

  &[placeholder]:empty::before {
    content: attr(placeholder);
    color: var(--c-gray50);
    font-weight: normal;
    text-overflow: ellipsis;
    transition: color ease 0.3s;
    opacity: 1;
    font-weight: bold;
  }

  &[placeholder]:empty:focus::before {
    content: '';
  }

  &.isEditable:hover {
    border-color: var(--c-blue);
  }

  &:focus {
    border-color: var(--c-blue);

    &::-webkit-input-placeholder {
      color: var(--c-gray50);
      font-weight: normal;
      text-overflow: ellipsis;
      transition: color ease 0.3s;
    }

    &:-moz-placeholder {
      color: var(--c-gray50);
      font-weight: normal;
      text-overflow: ellipsis;
      transition: color ease 0.3s;
    }

    &::-moz-placeholder {
      color: var(--c-gray50);
      font-weight: normal;
      text-overflow: ellipsis;
      transition: color ease 0.3s;
    }

    &:-ms-input-placeholder {
      color: var(--c-gray50);
      font-weight: normal;
      text-overflow: ellipsis;
      transition: color ease 0.3s;
    }
  }

  &.error {
    color: var(--c-red);

    &[placeholder]:empty::before {
      color: var(--c-red) !important;
    }
  }
  &.disabled {
    cursor: default;
  }
}
</style>

<template>
    <div class="inp-s-wrap full"
        :class="{ '--icon': isEdit || isValidate || isClearBtn, active: showLabel,
            'inp-disabled': disabled, '--error': isError, 'repeat-error':  repeatError}">
        <input class="inp-s"
               :class="{ error: isError, disabled: disabled, 'repeat-error': repeatError }"
               type="text"
               ref="field"
               @keyup.enter="enter()"
               @keyup.delete="deleteInput($event)"
               @focus="setFocus(true,$event)"
               @blur="setFocus(false,$event)"
               :disabled="disabled"
               :value="modelValue"
               :name="nameInput"
               :placeholder="placeholderInput"
               v-mask="mask"
               :autocomplete="fieldAutocomplete"
               @input="updateValue($event.target)"
        >
        <span :style="stylePlaceholderComplex"
            v-show="showLabel" class="inp-s-placeholder" :class="{ error: isError }">{{ placeholderComplex }}</span>
        <span class="inp-s-error" v-if="isError">{{ errorText }}</span>

        <span class="field-clear__btn" v-if="isClearBtn" @click="clear" >
            <span class="i i-close2"></span>
        </span>

        <span ref="fieldBuffer" class="inp-buffer" v-html="valueBuffer"></span>

        <span class="inp-s-icon">
            <span class="i i-pencil2 --edit" v-if="isEdit" @click="edit"></span>
            <span class="i i-ok2" v-if="isValidate" @click="check"></span>
            <svg-icon :name="'info'" :width="16" :height="16" v-if="isError && isErrorIcon" class="text-color-red"></svg-icon>
        </span>

    </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon.vue';

export default {
    name: 'InputMulti',
    components: {
        SvgIcon,
    },
    props: {
        placeholder: { default: '' },
        placeholderInput: { default: '' },
        inputId: { default: '' },
        modelValue: { default: '' },
        disabled: { default: false },
        isError: { default: false },
        isErrorIcon: { default: false },
        isEdit: { default: false },
        isValidate: { default: false },
        clearSpecial: { default: true },
        name: { default: 'name' },
        errorText: { default: '' },
        mask: { default: '' },
        fieldAutocomplete: { default: 'nope' },
        isClearBtn: { default: false },
        fields: {
            default() {
                return {
                    text: {
                        name: 'text',
                        value: '',
                        delimiter: '',
                        placeholder: 'text',
                    },
                };
            },
        },
    },

    data() {
        return {
            type: 'text',
            focus: false,
            stylePlaceholderComplex: { left: 0 },
            nameInput: '',
            valueBuffer: '',
            showPlaceholder: false,
            repeatError: false,
        };
    },
    watch: {
        isError(val, oldVal) {
            if (oldVal) {
                this.repeatError = true;
            }
        },
    },
    computed: {
        showLabel() {
            let value = '';
            Object.keys(this.fields).forEach((f) => {
                value += this.fields[f].value;
            });
            return this.focus || value.toString().length > 0;
        },
        placeholderComplex() {
            let value = '';
            Object.keys(this.fields).forEach((f) => {
                if (this.fields[f].value.length === 0) {
                    let { placeholder } = this.fields[f];
                    if (this.modelValue.trim().substr(-1, 1) === ',' && this.fields[f].placeholder.substr(0, 1) === ',') {
                        placeholder = placeholder.split(',').join('');
                    }
                    value += placeholder;
                    value += this.fields[f].delimiter;
                }
            });
            return value.trim();
        },
    },
    emits: ['input', 'enter', 'check', 'focus', 'blur', 'edit', 'update:modelValue', 'chunk'],
    mounted() {
        this.valueBuffer = this.modelValue;
        this.$nextTick(() => {
            if (this.$refs.fieldBuffer) {
                let width = this.$refs.fieldBuffer.offsetWidth;
                if (this.modelValue > 0) {
                    width = +width + 7;
                }
                this.stylePlaceholderComplex = { left: `${width + 6}px` };
            }
        });
        if (this.name !== 'name') {
            this.nameInput = this.name;
        } else {
            this.nameInput = Math.random().toString(36).substr(2, 5);
        }
    },
    methods: {
        deleteInput(event) {
            if (event.target.selectionStart === 0) {
                this.prev(event.target);
            }
        },
        updateValue(target) {
            let value = target.value.replace(/\s+/g, ' ').replace(/^\s+/, '');
            if (this.clearSpecial) {
                const spec = [];
                Object.keys(this.fields).forEach((f) => {
                    if (this.fields[f].postfix) {
                        spec.push(this.fields[f].postfix);
                    }
                });
                const reg = new RegExp(`[^a-zа-яё0-9\\s-${spec.join('\\')}]`, 'i');
                value = value.replace(reg, '');
            }
            this.valueBuffer = value;
            let count = 0;
            Object.keys(this.fields).forEach(() => {
                count += 1;
            });
            const split = value.split(' ');
            const fields = [];
            Object.keys(split).forEach((f) => {
                if (f < count - 1) {
                    fields.push(split[f]);
                }
            });
            split.splice(0, count - 1);
            if (split.length > 0) {
                fields.push(split.join(' '));
            }

            let field;
            let i = 0;
            Object.keys(this.fields).forEach((f) => {
                if (fields[i]) {
                    this.$emit('chunk', { value: fields[i].trim().split(this.fields[f].postfix).join(''), name: this.fields[f].name });
                } else {
                    this.$emit('chunk', { value: '', name: this.fields[f].name });
                }
                i += 1;
                if (i === fields.length) {
                    field = this.fields[f];
                }
            });
            if (value.substr(-1, 1) === field.postfix && this.modelValue.substr(-1, 1) !== ' ') {
                value += ' ';
            }
            if (field && field.postfix && value.substr(-1, 1) === ' ' && value.trim().substr(-1, 1) !== field.postfix && this.modelValue.substr(-1, 1) !== field.postfix && field.value.trim().length === 0) {
                value = `${value.trim() + field.postfix} `;
                this.valueBuffer = value;
            }
            this.$nextTick(() => {
                let width = this.$refs.fieldBuffer.offsetWidth;
                if (value.length > 0 && this.placeholderComplex.substr(0, 1) !== ',') {
                    width = +width + 7;
                }
                this.stylePlaceholderComplex = { left: `${width + 5}px` };
            });
            this.$emit('update:modelValue', value);
        },
        enter() {
            this.$emit('enter');
        },
        check() {
            this.$emit('check');
        },
        clear() {
            this.$refs.field.focus();
            this.$emit('update:modelValue', '');
        },
        next(target) {
            if (target.nextElementSibling) {
                target.nextElementSibling.focus();
            }
        },
        prev(target) {
            if (target.previousElementSibling) {
                target.previousElementSibling.focus();
            }
        },
        setFocus(val, event) {
            const value = val || false;
            this.focus = value;
            this.repeatError = false;
            if (value) {
                this.$emit('focus');
                if (event.target.previousElementSibling && event.target.previousElementSibling.value) {
                    if (event.target.previousElementSibling.value.length === 0) {
                        event.target.previousElementSibling.focus();
                    }
                }
            } else {
                this.$emit('blur');
            }
        },
        edit() {
            this.$emit('edit');
        },

    },
};
</script>

<style scoped>
    .inp-s-placeholder {
        color: rgba(84, 84, 84, 0.15);
        font-weight: normal;
        min-width: 3px;
        position: absolute;
        top: 0px;
        left: 0px;
        font-size: 14px;
        height: 40px;
        line-height: 17px;
        display: flex;
        align-items: center;
        z-index: 1
    }
    .inp-buffer {
        min-width: 3px;
        position: absolute;
        top: -500px;
        left: -500px;
        opacity: 0;
        font-size: 14px;
        font-weight: normal;
    }
</style>

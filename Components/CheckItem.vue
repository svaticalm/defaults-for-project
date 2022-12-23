<template>
    <div class="check-item">
        <input :type="type" :id="inputId"
        :name="name"
        :disabled="disabled"
        :class="{'error': isError}"
        :checked="checked"
        :value="value ? value : modelValue"
        @change="updateValue(type === 'checkbox' ? $event.target.checked : value)">
        <label :for="inputId" :style="{'padding-left': $slots.default ? '24px' : 0 }">
            <svg-icon :name="'check3'" :width="12" :height="12" v-if="type === 'checkbox'"></svg-icon>
            <slot></slot>
        </label>
    </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon.vue';

export default {
    name: 'CheckItem',
    props: {
        modelValue: { default: false },
        inputId: { default: '' },
        disabled: { default: false },
        isError: { default: false },
        name: { default: 'name' },
        type: { default: 'checkbox' },
        value: { default: false },
    },
    setup(props, { slots }) {
        const hasSlot = (name) => !!slots[name];
        return { hasSlot };
    },
    computed: {
        checked() {
            if (this.type === 'checkbox') {
                return this.value ? this.value : this.modelValue;
            }
            return this.value;
        },
    },
    components: {
        SvgIcon,
    },
    data() {
        return {
            focus: false,
            showPlaceholder: false,
            nameInput: '',
            repeatError: false,
            inputValue: '',
        };
    },
    emits: ['update:modelValue'],
    methods: {
        updateValue(value) {
            this.$emit('update:modelValue', value);
        },
    },
};
</script>

<style lang="sass" scoped>
[type="checkbox"]
    width: 0
    height: 0
    position: absolute
    opacity: 0
    overflow: hidden
    -moz-appearance: none
    -webkit-appearance: none

    &:not(:checked)
        &:not(:disabled)
            + label
                &:hover
                    color: $text-color
                    &:before
                        border-color: $text-color

    &:checked
        + label
            color: $text-color
            &:before
                border-color: #545454
                background-color: #545454
            svg
                opacity: 1
    &.error
        + label
            color: $error-color
            animation: anim-inp-txt 0.7s ease
            &:before
                border-color: $error-color
                animation: anim-inp-error 0.7s ease
    &:disabled
        + label
            cursor: default
            color: $gray50 !important
            &:before
                border-color: $gray50 !important

        &:checked
            + label
                &:after
                    border-color: $gray50 !important
                    background-color: $gray50 !important
    + label
        min-height: 16px
        min-width: 16px
        display: flex
        align-items: center
        vertical-align: middle
        position: relative
        font-size: 14px
        line-height: 16px
        display: flex
        align-items: center
        font-weight: normal
        color: $text-color
        padding-left: 24px
        cursor: pointer
        transition: all .15s ease
        svg
            opacity: 0
            transition: all .15s ease
            color: #fff
            position: absolute
            left: 2px
            top: 2px
        &:before
            width: 16px
            height: 16px
            top: 0px
            left: 0
            transition: none
            will-change: opacity
            box-sizing: border-box
            background: transparent
            border: 1px solid rgba($text-color, 0.5)
            border-radius: 4px
            opacity: 1

        &:before
            content: ""
            position: absolute
            transition: all 0.1s ease

        & > *
            line-height: inherit
[type="radio"]
    width: 10px
    height: 10px
    position: absolute
    z-index: -9999
    opacity: 0
    overflow: hidden
    -moz-appearance: none
    -webkit-appearance: none

    &:not(:checked)
        + label
            &:hover
                &:before
                    border-color: $text-color

    &:checked
        + label
            &:before
                border-color:  $text-color
            &:after
                opacity: 1

    &:disabled
        + label
            cursor: default
            color: $gray50 !important
            &:before
                border-color: $gray50 !important

        &:checked
            + label
                &:after
                    border-color: $gray50 !important
                    background-color: $gray50 !important

    &.error
        + label
            color: $error-color

            &:before
                border-color: $error-color

            &:after
                display: none

    + label
        min-height: 16px
        display: flex
        align-items: center
        vertical-align: top
        position: relative
        font-size: 14px
        line-height: 17px
        min-width: 16px
        color: $text-color
        padding-left: 24px
        cursor: pointer

        &:before, &:after
            content: ""
            background: #fff
            width: 16px
            height: 16px
            display: block
            position: absolute
            left: 0
            top: 0
            border-radius: 50%
            box-sizing: border-box
            transition: all 0.2s ease

        &:before
            border: 1px solid rgba($text-color, 0.5)
            opacity: 1

        &:after
            width: 8px
            height: 8px
            top: 4px
            left: 4px
            background: $text-color
            opacity: 0

        &.--vertical-middle

            &:before
                top: calc(50% - 8px)

            &:after
                top: calc(50% - 4px)
</style>

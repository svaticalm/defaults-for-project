<template>
    <div class="inp-s-wrap inp-select full"
        :class="[{ opened: focused, disabled: disabled, active: showLabel, error: isError, 'repeat-error':  repeatError }, addClass]"
         v-clickoutside="selectClose">
        <div class="select-overlay" @click="selectToggle"></div>

        <input :class="[{error:isError, 'repeat-error':  repeatError, 'text-bold': isBold, 'text-uppercase': isUppercase}, classInput]"
            type="text" v-model="keywords" name="" class="inp-s" :disabled="disabled" :placeholder="placeholder">
        <svg-icon class="lock" :name="'lock2'" :width="16" :height="16" v-if="isLock && disabled"></svg-icon>
        <div class="select-arrow"></div>
        <div class="select-list" :style="listStyle">
            <ul v-if="focus">
                <li v-for="(res,index) in options" :key="index" class="fs-item"
                    @click="change(index, res.name)"
                    :class="{active: index === choosen, disabled: index > currentMonth, 'text-uppercase': isUppercase}">
                    <span v-html="res.name"></span>
                    <svg-icon :name="'check3'" :width="16" :height="16" v-if="keywords === res.name"></svg-icon>
                </li>
            </ul>
            <ul class="select-list --ghost" v-show="false">
                <li>
                    <div></div>
                </li>
                <li>
                    <div></div>
                </li>
                <li>
                    <div></div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon.vue';

export default {
    name: 'InputSelectNew',
    components: {
        SvgIcon,
    },
    props: {
        addClass: { default: '' },
        isError: { default: false },
        listStyle: { default: '' },
        options: {
            default() {
                return [];
            },
        },
        modelValue: { default: '' },
        placeholder: { default: '' },
        valueIndex: { default: '' },
        modelId: { default: null },
        disabled: { default: false },
        isLock: { default: false },
        classInput: { default: '' },
        isBold: { default: false },
        isUppercase: { default: false },
    },
    model: {
        prop: 'modelId',
        event: 'change',
    },
    data() {
        return {
            keywords: '', // Слежение за инпутом
            resopened: false, // Отвечает за видимость списка результатов быстрого поиска
            choosen: null,
            focus: false,
            repeatError: false,
            currentYear: false,
            currentMonth: 13,
        };
    },
    mounted() {
        if (this.modelValue !== '') {
            const option = this.options.find((opt) => opt.id === this.modelValue);
            this.keywords = option ? option.name : '';
        }
        if (this.modelId !== null) {
            const optionIndex = this.options.findIndex((opt) => opt.id === this.modelId);
            const option = this.options[optionIndex];
            this.choosen = optionIndex;
            this.keywords = option ? option.name : '';
        }
        if (this.valueIndex !== '') {
            this.change(this.valueIndex * 1);
        }
    },
    emits: ['input', 'update:modelValue', 'open', 'change'],
    watch: {
        keywords() {
            this.$emit('update:modelValue', this.keywords);
        },
        modelValue() {
            this.keywords = this.modelValue;
        },
        valueIndex() {
            if (this.valueIndex !== '') {
                this.change(this.valueIndex * 1);
            } else {
                this.keywords = '';
                this.choosen = null;
            }
        },
        isError(val, oldVal) {
            if (oldVal) {
                this.repeatError = true;
            }
        },
        modelId(after) {
            const option = this.options.find((opt) => opt.id === after);
            this.keywords = option ? option.name : '';
        },
    },
    computed: {
        focused() {
            return this.focus;
        },
        showLabel() {
            return this.keywords.toString().length > 0;
        },
    },
    methods: {
        selectToggle() {
            if (!this.disabled) {
                this.focus = !this.focus;
                this.$emit('open', this.focus);
            }
        },
        change(index, name) {
            // this.keywords = this.options[index].name;
            this.focus = false;
            this.repeatError = false;
            this.choosen = index;
            this.keywords = name;
            this.$emit('change', this.options[index].id);
        },
        selectClose() {
            this.focus = false;
        },
    },
    directives: {
        clickoutside: {
            /* eslint no-underscore-dangle: ["error", { "allow": ["__vueClickOutside__"] }] */
            mounted(element, binding) {
                const el = element;
                const { bubble } = binding.modifiers;
                const handler = (e) => {
                    if (bubble || (!el.contains(e.target) && el !== e.target)) {
                        binding.value(e);
                    }
                };
                el.__vueClickOutside__ = handler;
                document.addEventListener('click', handler);
            },

            unmounted(element) {
                const el = element;
                document.removeEventListener('click', el.__vueClickOutside__);
                el.__vueClickOutside__ = null;
            },
        },
    },
};
</script>

<style lang="sass">
.inp-select
    position: relative
    .lock
        position: absolute
        right: 8px
        top: 12px
        z-index: 3
        color: $gray50
    &.error
        .select-arrow
            border-top-color: $red
    &:hover
        .inp-s
            border-color: $accent
    &.disabled
        .select-arrow
            display: none
        .inp-s
            color: $gray50
            opacity: 1
        &:hover
            .inp-s
                border-color: $gray20 !important
    &.opened
        .inp-s
            border-color: $accent
        .select-arrow
            border: 4px solid transparent
            border-bottom: 4px solid rgba($text-color,0.5)
            top: 13px
    .select-overlay
          position: absolute
          display: block
          width: 100%
          height: 100%
          top: 0
          left: 0
          z-index: 5
          cursor: pointer
    .select-arrow
        width: 8px
        border: 4px solid transparent
        border-top: 4px solid $gray50
        position: absolute
        right: 13px
        z-index: 4
        top: 18px
        pointer-events: none
    .clear-btn
        position: absolute
        z-index: 4
        top: 15px
        right: 8px
        opacity: 0.5
        transition: all .15s ease
        cursor: pointer
        &:hover
            opacity: 0.75
    .select-list
        padding-left: 0
        position: absolute
        z-index: 5
        background-color: #fff
        top: calc(100% + 8px)
        width: 100%
        color: #000
        box-shadow: 0px 4px 16px rgba(36, 99, 184, 0.5)
        border-radius: 0px 0px 4px 4px
        max-height: 144px
        overflow: hidden
        margin: 0
        overflow-y: auto

        & > ul
            margin: 0

        &.--ghost
            li
                div
                    height: 18px
                    width: 140px
                    background-color: #E7ECF0
                &:hover
                    background-color: #fff !important
        &::-webkit-scrollbar-track
            border-radius: 4px
            right: 8px

        &::-webkit-scrollbar
            width: 4px
            right: 8px

        &::-webkit-scrollbar-thumb:hover
            background: #B6B6B6

        &::-webkit-scrollbar-thumb
            border-radius: 4px
            background: #c9c9c9
            right: 8px
        li
            list-style: none
            height: 40px
            color: $text-color
            display: flex
            align-items: center
            box-sizing: border-box
            margin: 0
            cursor: pointer
            font-size: 14px
            transition: all .15s
            font-weight: normal
            padding: 0 16px
            justify-content: space-between
            box-sizing: border-box
            border-bottom: 1px solid $blue10
            &:before
                display: none
            &:hover
                background-color: $blue10
            &.active
                font-weight: bold
                &:hover
                    color: $text-color
            &.current
                .i
                    display: inline

            &:last-child
                border-bottom-left-radius: 4px
                border-bottom-right-radius: 4px
                border-bottom: 0
    .inp-s
        background-color: #fff
        height: 40px
        font-size: 14px
        line-height: 17px
        position: relative
        z-index: 3
        box-sizing: border-box
    &.active
        .inp-s-label
            display: none
</style>

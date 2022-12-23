<template>
    <transition name="fade-popup">
        <div class="popup-wrapper" v-if="show">
            <div class="overlay" @mousedown="close"></div>

            <div class="popup-scroll-block">
              <div class="popup"
                   ref="overlayPopup"
                   :class="[addClass]"
                   :style="{top: (top - 0) +'px', width: width+'px'}">
                  <div class="popup__wrap" v-clickoutside="close">
                      <div class="popup__close" @click="close" @keydown="close" v-if="isBtnClose">
                      </div>

                      <slot></slot>

                      <footer-block></footer-block>
                  </div>
              </div>
            </div>
        </div>
    </transition>
</template>

<script>
import FooterBlock from '@/components/FooterBlock.vue';

export default {
    name: 'PopupWindow',
    props: {
        width: {
            default() {
                return 720;
            },
        },
        addClass: { default: '' },
        show: {
            default() {
                return false;
            },
        },
        isSetTop: {
            default() {
                return true;
            },
        },
        isBtnClose: {
            default() {
                return true;
            },
        },
        isSetBlank: {
            default() {
                return false;
            },
        },
        isResize: {
            default() {
                return false;
            },
        },
        isCloseOutSize: {
            default() {
                return true;
            },
        },
        name: {
            default() {
                return '';
            },
        },
    },
    components: {
        FooterBlock,
    },
    watch: {
        show() {
            if (this.show) {
                if (this.isSetTop) {
                    this.updateViewportSize();
                }
            }
        },
        isResize(newV, oldQV) {
            if (this.isSetTop && (newV !== oldQV)) {
                this.updateViewportSize();
            }
        },
        top(newV) {
            if (newV < 1) {
                this.$refs.overlayPopup.style.marginTop = '32px';
            } else {
                this.$refs.overlayPopup.style.marginTop = '0px';
            }
        },
    },
    data() {
        return {
            top: 24,
        };
    },
    mounted() {
        if (this.isSetTop) {
            this.topListener();
        }
    },
    methods: {
        updateViewportSize() {
            this.$nextTick(() => {
                if (typeof (this.$refs.overlayPopup) !== 'undefined' && this.$refs.overlayPopup !== null) {
                    let top = this.getViewportSize().h - this.$refs.overlayPopup.clientHeight;
                    if (top < 1) {
                        top = 1;
                    }
                    if ((top / 2) < 33) {
                        this.top = 0;
                    } else {
                        this.top = (top / 2);
                    }
                }
            });
        },
        topListener() {
            const self = this;
            this.$nextTick(() => {
                self.updateViewportSize();
                window.addEventListener('resize', self.updateViewportSize);
            });
        },

        getViewportSize() {
            const d = window.document.querySelector('html');
            return { w: d.clientWidth, h: d.clientHeight };
        },
        closeOutSize() {
            if (this.isCloseOutSize) {
                this.close();
            }
        },
        close() {
            this.$nextTick(() => {
                if (this.show && this.name) {
                    this.$store.commit('popups/close', { name: this.name });
                    this.$emit('close');
                    document.getElementsByTagName('body')[0].classList.remove('noscroll');
                } else {
                    this.$emit('close');
                    document.getElementsByTagName('body')[0].classList.remove('noscroll');
                }
            });
        },
    },
    emits: ['close'],
    directives: {
        clickoutside: {
            mounted(el, binding) {
                const bubble = binding.modifiers.bubble;
                const handler = (e) => {
                    if (bubble
                        || ((!el.contains(e.target) && el !== e.target)
                        && (!e.target.classList.contains('click-outside-tooltip')))
                    ) {
                        binding.value(e);
                    }
                };
                /* eslint no-underscore-dangle: 0 */
                el.__vueClickOutside__ = handler;
                document.addEventListener('mousedown', handler);
            },

            unmounted(el) {
                document.removeEventListener('mousedown', el.__vueClickOutside__);
                el.__vueClickOutside__ = null;
            },
        },
    },
};
</script>

<style lang="sass">
.fade-popup-enter-active, .fade-popup-leave-active
    transition: opacity .15s
.fade-popup-enter, .fade-popup-leave-to
    opacity: 0
.popup-wrapper
    position: fixed
    bottom: 0
    right: 0
    top: 0
    left: 0
    z-index: 8010
    display: block
    width: auto
    height: auto

    .noscroll &
        overflow-y: scroll

.popup
    width: 100vw
    box-shadow: 0 10px 25px rgba(0,0,0,0.5)
    height: auto
    margin: 0 auto
    margin-bottom: 32px
    margin-top: 32px
    background: #fff
    color: $black
    position: relative
    text-shadow: none
    border-radius: 0
    +for-size(992)
        overflow: hidden
        border-radius: 12px
    &__footer
        display: flex
        justify-content: flex-end
        align-items: center
        height: 32px
        width: 100%
        position: absolute
        bottom: 16px
        right: 0
        padding: 0 16px
    &__close
        position: fixed
        top: 8px
        right: 8px
        cursor: pointer
        transition: $transition
        z-index: 1
        background-color: $gray-light
        border-radius: 32px
        color: $gray50
        width: 32px
        height: 32px
        display: flex
        align-items: center
        justify-content: center
        & + *
            margin-top: 0 !important
        &:after
            content: ''
            width: 24px
            height: 24px
            background-image: url(../assets/img/for-sprite/close.svg)
            background-size: contain
            display: block
            background-repeat: no-repeat
        +for-size(992)
            position: absolute
            top: 16px
            right: 16px
            width: 40px
            height: 40px
            transition: all .15s ease
            &:after
                width: 32px
                height: 32px
            &:hover
                background-color: $gray-light !important
    &__content
        display: flex
        flex-direction: column
        align-items: center
    &__wrap
        position: relative
        padding: 0
        .footer
            margin-top: 120px
    &__text
        padding: 24px 12px 0
        +for-size(992)
            padding: 32px 64px 0
        h2
            font-weight: 600
            font-size: 16px
            line-height: 19px
            margin: 0 0 12px
            +for-size(992)
                font-size: 40px
                line-height: 48px
                margin: 0 0 32px
        p
            font-size: 14px
            line-height: 18px
            +for-size(992)
                font-size: 20px
                line-height: 24px
                color: $gray2
        .offer-detail__presents
            padding: 0
            margin-top: 24px
            +for-size(992)
                margin-top: 40px
                margin-bottom: 40px
            li
                color: $red
                .svg-icon
                    color: $red
        .btn
            width: 100%
            height: 48px
            border-radius: 8px
            +for-size(992)
                display: inline-flex
                height: 64px
                font-size: 16px
                line-height: 24px
                border-radius: 12px
                padding: 0 32px
    &__header
        height: 220px
        width: 100%
        background-size: contain
        background-repeat: no-repeat
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        +for-size(992)
            height: 280px
        h2
            font-size: 24px
            line-height: 30px
            font-weight: 700
            color: #fff
            +for-size(992)
                font-size: 32px
                line-height: 40px
        &.--garantee
            background-image: url(../assets/img/garanteeModal.webp)
            +for-size(992)
                background-image: url(../assets/img/garanteeModal-desktop.webp)
        &.--how-works
            background-image: url(../assets/img/howItWorksModal.webp)
            +for-size(992)
                background-image: url(../assets/img/howItWorksModal-desktop.webp)
        &.--contractor-modal
            height: auto
            padding: 65px 0
            background: radial-gradient(41.77% 69.3% at 50% 52.97%, #292723 0%, rgba(41, 39, 35, 0) 100%), #0C0C15
            +for-size(992)
                padding: 84px 0
            .svg-icon
                margin-bottom: 12px
                color: #fff
                opacity: 0.8
                +for-size(992)
                    margin-bottom: 16px
        &.--attention-modal
            padding: 55px 0
            height: auto
            background-color: $red
            +for-size(992)
                padding: 48px 0
    .popup-info
        text-align: center
        .info-text
            font-size: 14px
            line-height: 17px
    .mobile-device &
        width: 320px !important
        margin: 0 !important
        margin-bottom: 0 !important
.noscroll:not(.scroll-mac-os) #app
    padding-right: 16px
.popup-scroll-block
    width: 100%
    position: absolute
    left: 0
    height: auto !important
    z-index: 1
.overlay
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    background: rgba(0,0,0,0.93)
</style>

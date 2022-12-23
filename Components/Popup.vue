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
                      <div class="popup__close" @click="close" v-if="isBtnClose">
                          <svg-icon :name="'close'" :width="32" :height="32"></svg-icon>
                      </div>

                      <slot></slot>
                  </div>
              </div>
            </div>
        </div>
    </transition>
</template>

<script>
import SvgIcon from '@/components/SvgIcon.vue';

export default {
    name: 'Popup',
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
        SvgIcon,
    },
    watch: {
        show() {
            if (this.show) {
                if (this.isSetTop) {
                    this.updateViewportSize();
                }
                document.getElementsByTagName('body')[0].classList.add('noscroll');
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
    width: 488px
    box-shadow: 0 10px 25px rgba(0,0,0,0.5)
    height: auto
    margin: 0 auto
    margin-bottom: 32px
    background: #fff
    color: #545454
    position: relative
    text-shadow: none
    border-radius: 5px
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
        position: absolute
        top: 16px
        right: 16px
        cursor: pointer
        transition: $transition
        z-index: 1
        color: $gray50
        &:hover
            color: $gray
        & + *
            margin-top: 0 !important
    &__content
        display: flex
        flex-direction: column
        align-items: center
    &__wrap
        position: relative
        padding: 48px 32px 48px
    &__header
        padding: 20px 32px
        margin-bottom: 0
        background: #282828
        color: #fff
        border-radius: 4px 4px 0 0
    .popup-info
        text-align: center
        .info-text
            font-size: 14px
            line-height: 17px

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

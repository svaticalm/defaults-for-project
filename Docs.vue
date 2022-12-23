<template>
    <div class="content">
        <div class="text-size-32 text-bold mb48 mt48">ИКОНКИ</div>
        <div class="icons">
            <div class="icon-block" @click="copy(icon)" @keydown="copy(icon)" v-for="icon in iconsList" :key="icon">
                <div class="copy">
                    <svg-icon class="text-color-link" :name="`copy`" :width="14" :height="14"></svg-icon>
                </div>
                <div class="icon">
                    <svg-icon :name="`${icon}`" :width="30" :height="30"></svg-icon>
                </div>
                <div class="text-size-10 text-color-gray50 icon-name mt8">{{icon}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import SvgIcon from '@/components/SvgIcon.vue';
import { copyTextToClipboard } from '@/helpers/util/helper';
import icons from '@/assets/icons';

export default {
    name: 'DocsPage',
    components: {
        SvgIcon,
    },
    props: {
    },
    data() {
        return {
            iconsList: [],
        };
    },
    mounted() {
        this.iconsList = icons.sort();
    },
    computed: {
        ...mapState({
            popups: (state) => state.popups.items,
            switches: (state) => state.switches.items,
        }),
    },
    methods: {
        copy(name) {
            copyTextToClipboard(name);
        },
    },
};
</script>

<style lang="sass">
.icons
    display: flex
    flex-wrap: wrap
    width: 100%
    .icon-block
        margin-right: 16px
        margin-bottom: 16px
        width: 64px
        height: 70px
        border: 1px solid $gray20
        border-radius: 4px
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center
        box-shadow: 0px 0px 5px rgba(#000, 0.05)
        transition: all .25s ease
        cursor: pointer
        position: relative
        &:hover
            transform: scale(1.05)
            .copy
                opacity: 1
        .icon
            width: 30px
            height: 30px
            display: flex
            align-items: center
            justify-content: center
            svg
                width: 100%
                height: 100%
        .icon-name
            margin-bottom: -10px
        .copy
            position: absolute
            opacity: 0
            width: 100%
            height: 100%
            top: 0
            left: 0
            display: flex
            transition: all .25s ease
            align-items: center
            justify-content: center
            background-color: rgba(#fff, 0.85)
            border-radius: 4px

</style>

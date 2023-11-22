<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';

interface IAsideSticky {
  marginTop?: number;
  marginBottom?: number;
  width?: string;
}

const props = withDefaults(defineProps<IAsideSticky>(), {
  marginTop: 24,
  marginBottom: 24,
  width: '312px',
});

const aside = ref<HTMLElement | null>(null);
const asideWrapper = ref<HTMLElement | null>(null);
const newBlock = ref<HTMLElement | null>(null);
const fixedMargin = ref<number | null>(null);
const z = ref<number | null>(null);

function createNewBlock(style: string, width: number): HTMLDivElement {
  const block = document.createElement('div');
  block.style.cssText = `${style} box-sizing: border-box; width: ${width}px`;
  return block;
}

function getStyleProperties(style: CSSStyleDeclaration): string {
  const styleProperties = ['overflow', 'padding', 'border', 'outline', 'box-shadow', 'background'];
  let result = '';

  for (let i = 0; i < style.length; i += 1) {
    if (styleProperties.some((prop) => style[i].startsWith(prop))) {
      result += `${style[i]}: ${style.getPropertyValue(style[i])}; `;
    }
  }

  return result;
}

function initAsideScroll() {
  if (!aside.value) return;

  const Ra = aside.value.getBoundingClientRect();
  const containerScroll = asideWrapper.value?.parentElement as HTMLElement | null;
  const R1bottom = containerScroll?.getBoundingClientRect().bottom || 0;

  if (Ra.bottom < R1bottom) {
    if (newBlock.value === null) {
      const Sa = getComputedStyle(aside.value, '');
      const s = getStyleProperties(Sa);

      newBlock.value = createNewBlock(s, (aside.value as HTMLElement).offsetWidth);
      aside.value.insertBefore(newBlock.value, aside.value.firstChild);

      for (let i = 1; i < aside.value.childNodes.length; i += 1) {
        newBlock.value.appendChild(aside.value.childNodes[1]);
      }
    }

    const Rb = newBlock.value.getBoundingClientRect();
    const Rh = Ra.top + Rb.height;
    const W = window.innerHeight;
    const R1 = Math.round(Rh - R1bottom);
    const R2 = Math.round(Rh - W);

    if (Rb.height > W) {
      if (Ra.top < fixedMargin.value!) {
        if (R2 + props.marginBottom > R1) {
          if (Math.floor(Rb.bottom - W + props.marginBottom) <= 0) {
            newBlock.value.className = 'sticky';
            newBlock.value.style.top = `${W - Rb.height - props.marginBottom}px`;
            z.value = props.marginBottom + Ra.top + Rb.height - W;
          } else {
            newBlock.value.className = 'stop';
            newBlock.value.style.top = `${-z.value!}px`;
          }
        } else {
          newBlock.value.className = 'stop';
          newBlock.value.style.top = `${-R1}px`;
          z.value = R1;
        }
      } else if (Ra.top - props.marginTop < 0) {
        if (Rb.top - props.marginTop >= 0) {
          newBlock.value.className = 'sticky';
          newBlock.value.style.top = `${props.marginTop}px`;
          z.value = Ra.top - props.marginTop;
        } else {
          newBlock.value.className = 'stop';
          newBlock.value.style.top = `${-z.value!}px`;
        }
      } else {
        newBlock.value.className = '';
        newBlock.value.style.top = '';
        z.value = 0;
      }
      fixedMargin.value = Ra.top;
    } else if (Ra.top - props.marginTop <= 0) {
      if (Ra.top - props.marginTop <= R1) {
        newBlock.value.className = 'stop';
        newBlock.value.style.top = `${-R1}px`;
      } else {
        newBlock.value.className = 'sticky';
        newBlock.value.style.top = `${props.marginTop}px`;
      }
    } else {
      newBlock.value.className = '';
      newBlock.value.style.top = '';
    }
  }
}

onMounted(() => {
  setTimeout(() => {
    const containerScroll = asideWrapper.value?.parentElement as HTMLElement | null;
    if (containerScroll) {
      containerScroll.style.minHeight = `${Math.floor(
        (aside.value?.getBoundingClientRect().height  || 0) + 40,
      )}px`;
    }
    window.addEventListener('scroll', initAsideScroll, false);
    window.addEventListener('resize', initAsideScroll, false);
  }, 100);
});
onUnmounted(() => {
  window.removeEventListener('scroll', initAsideScroll, false);
  window.removeEventListener('resize', initAsideScroll, false);
});
</script>
<template>
  <div class="aside-sticky-block" ref="asideWrapper">
    <div class="aside" ref="aside">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
.aside-sticky-block {
  width: v-bind(width);
  flex-shrink: 0;
  .aside {
    width: 100%;
    flex: 0 1 auto;
    position: relative;
    z-index: 3;
    .sticky {
      position: fixed;
      z-index: 4;
    }
    .stop {
      position: absolute;
    }
  }
}
</style>

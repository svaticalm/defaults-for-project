import type { Directive } from 'vue';

const clickOutsideDirective: Directive = {
  mounted(el, binding) {
    // eslint-disable-next-line
    el.clickOutsideEvent = function (event: Event) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event, el);
      }
    };
    document.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent);
  },
};

export default clickOutsideDirective;

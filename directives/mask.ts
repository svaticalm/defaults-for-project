import type { Directive } from 'vue';
import Inputmask from 'inputmask';

const maskDirective: Directive = {
  mounted(el, binding) {
    Inputmask(binding.value).mask(el);
  },
};

export default maskDirective;

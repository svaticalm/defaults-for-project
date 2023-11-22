import type { Mask } from '@/types/ui';

type MaskList = Record<string, Mask>;

const maskList: MaskList = {
  area: {
    mask: '9{1,3}',
    showMaskOnFocus: false,
    showMaskOnHover: false,
    rightAlign: true,
    placeholder: '',
  },
  date: {
    alias: 'datetime',
    inputFormat: 'dd.mm.yyyy',
    showMaskOnFocus: false,
    showMaskOnHover: false,
    placeholder: '__.__.____',
  },
  phone: { mask: '+7(999)999-99-99', showMaskOnHover: false, placeholder: '+7(___)___-__-__' },
  inn: { mask: '9{10}', showMaskOnFocus: false, showMaskOnHover: false, placeholder: '' },
  code: { mask: '9{4}', showMaskOnFocus: false, showMaskOnHover: false, placeholder: '' },
};

export default maskList;

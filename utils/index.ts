import type { InputFieldProps } from '@/types/ui';

export function formatDate(date: Date): string | boolean {
  const format = date
    ? `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date
        .getDate()
        .toString()
        .padStart(2, '0')}`
    : false;
  return format;
}

export function scrollTo(elementId: string, offset = 0) {
  if (elementId === 'up') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // You can use 'auto' for instant scrolling
    });
    return;
  }
  const element = document.querySelector(elementId);

  if (element) {
    const elementRect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Calculate the target scroll position
    const targetScrollTop = elementRect.top + scrollTop - offset;

    // Scroll to the target position
    window.scrollTo({
      top: targetScrollTop,
      behavior: 'smooth', // You can use 'auto' for instant scrolling
    });
  }
}

export const createInputField = (obj: InputFieldProps): InputFieldProps => ({
  name: obj.name,
  type: obj.type || 'text',
  isDisabled: obj.isDisabled || false,
  placeholder: obj.placeholder || '',
  label: obj.label || '',
  isError: obj.isError || false,
  isRepeatError: obj.isRepeatError || false,
  errorText: obj.errorText || '',
  mask: obj.mask || undefined,
  maxLength: obj.maxLength || undefined,
  autoFocus: obj.autoFocus || false,
  modelValue: obj.modelValue || '',
  inputmode: obj.inputmode || undefined,
  require: obj.require || undefined,
  options: obj.options || undefined,
  location: obj.location || undefined,
  inputId: obj.inputId || undefined,
});

export const removeError = (field: InputFieldProps | IEditableArea) => {
  // eslint-disable-next-line
  field.isError = false;
  // eslint-disable-next-line
  field.isRepeatError = false;
};

export function numberFormat(
  number: number,
  decimals: number,
  decPoint?: string,
  thousandsSep?: string,
): string {
  let num: number = number;
  let decPointParse: string | undefined = decPoint;
  let thousandsSepParse: string | undefined = thousandsSep;
  let decimalsParse: number = decimals;
  let j: number;
  let resp: string;

  const minus: boolean = num < 0;
  if (minus) {
    num *= -1;
  }

  // input sanitation & defaults
  decimalsParse = Math.abs(decimalsParse);
  if (Number.isNaN(decimalsParse)) {
    decimalsParse = 2;
  }
  if (decPointParse === undefined) {
    decPointParse = ',';
  }
  if (thousandsSepParse === undefined) {
    thousandsSepParse = '.';
  }

  const numFixed: string = (+num || 0).toFixed(decimalsParse);
  const i: string = `${parseInt(numFixed, 10)}`;
  j = i.length;
  if (j > 3) {
    j %= 3;
  } else {
    j = 0;
  }

  const km: string = j ? i.substr(0, j) + thousandsSepParse : '';
  const kw: string = i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${thousandsSepParse}`);
  const kd: string = decimalsParse
    ? decPointParse +
      Math.abs(parseFloat(numFixed) - parseInt(i, 10))
        .toFixed(decimalsParse)
        .replace(/-/, '0')
        .slice(2)
    : '';

  resp = km + kw + kd;

  if (minus) {
    resp = `-${resp}`;
  }

  return resp;
}

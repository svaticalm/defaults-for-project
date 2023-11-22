import type { InputFieldProps } from '@/types/ui';

export function isDate(date: string): boolean {
  const datePattern = /^\d{2}\.\d{2}\.\d{4}$/;
  return datePattern.test(date);
}
export function isLink(str: string): boolean {
  const urlPattern = /^(https?|ftp|http):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlPattern.test(str);
}
export function isEmail(email: string): boolean {
  const emailPattern = /^[a-zA-Z0-9.%+-_]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}
export function isPhone(phone: string): boolean {
  const re = /\+7\(9\d{2}\)\d{3}-\d{2}-\d{2}/;
  return re.test(phone);
}
export function isFio(fio: string): boolean {
  const val = fio.trim().split(' ');
  return val.length >= 3 && val[0].length <= 50 && val[1].length <= 50 && val[2].length <= 50;
}

export function isValidate(field: InputFieldProps): boolean {
  let error = false;
  const fieldValue = field.modelValue;
  if (
    typeof fieldValue === 'string' ||
    (typeof fieldValue === 'boolean' && field.type === 'checkbox')
  ) {
    if (field.type === 'text' && !(fieldValue as string)?.length) {
      error = true;
    }
    if (field.name === 'developerInn' && (fieldValue as string).length < 10) {
      error = true;
    }
    if (field.name === 'contractDate' && !isDate(fieldValue as string)) {
      error = true;
    }
    if (field.type === 'checkbox' && field.require && !fieldValue) {
      error = true;
    }
    if (field.type === 'tel' && !isPhone(fieldValue as string)) {
      error = true;
    }
    if (field.type === 'email' && !isEmail(fieldValue as string)) {
      error = true;
    }
    if (field.isMulti && !isFio(fieldValue as string)) {
      error = true;
    }
  }
  return !error;
}

export function scrollToError() {
  setTimeout(() => {
    const errorInputs: HTMLCollectionOf<Element> = document.getElementsByClassName('--error');
    const scrollOptions: ScrollToOptions = {
      behavior: 'smooth',
    };
    const headerHeight: number = 48;

    if (errorInputs.length > 0) {
      window.scrollTo({
        top: (errorInputs[0] as HTMLElement).offsetTop - headerHeight,
        ...scrollOptions,
      });
    }
  });
}
export function setError(field: InputFieldProps) {
  if (field.isError) {
    // eslint-disable-next-line no-param-reassign
    field.isRepeatError = false;
    setTimeout(() => {
      // eslint-disable-next-line no-param-reassign
      field.isRepeatError = true;
    });
  } else {
    // eslint-disable-next-line no-param-reassign
    field.isError = true;
  }
}

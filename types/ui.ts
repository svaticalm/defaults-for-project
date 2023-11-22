export interface Mask {
  mask?: string;
  showMaskOnFocus?: boolean;
  showMaskOnHover?: boolean;
  rightAlign?: boolean;
  placeholder?: string;
  alias?: string;
  inputFormat?: string;
}
export interface InputFieldProps {
  modelValue?: string | boolean;
  placeholder?: string;
  label?: string;
  isDisabled?: boolean;
  isError?: boolean;
  name: string;
  type?: 'text' | 'number' | 'password' | 'tel' | 'email' | 'checkbox' | 'radio';
  maxLength?: number;
  inputmode?:
    | 'text'
    | 'none'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal'
    | 'search'
    | undefined;
  inputId?: string;
  autoFocus?: boolean;
  errorText?: string;
  mask?: Mask;
  isRepeatError?: boolean;
  location?: InputFieldProps | undefined;
  require?: boolean;
  options?: string[];
  isMulti?: boolean;
}

export interface BtnComp {
  btnStyle?: string;
  isLoad?: boolean;
  mini?: boolean;
  link?: string;
  blue?: boolean;
  green?: boolean;
  trans?: boolean;
  round?: boolean;
  red?: boolean;
}

export interface IEditableArea extends InputFieldProps {
  isEditable?: boolean;
}

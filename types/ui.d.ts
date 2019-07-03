export interface Breadcrumb {
  id: string;
  label: string;
  to?: string;
}

export interface CheckboxO {
  checked?: boolean;
  disabled?: boolean;
  label: string;
  value: string;
}

export interface HandlerProps {
  breadcrumbs: { label: string; link: string }[];
  icon: string;
  submenu?: string;
  title: string;
}

export interface RadioO {
  disabled?: boolean;
  label: string;
  value: string;
}

// UI CASCADER =============================================================================================================================

export interface UiCascaderO {
  children?: UiCascaderO[];
  disabled?: boolean;
  label: string;
  value: string;
}

export interface UiCascaderP {
  disabled: boolean;
  loading: boolean;
  options: N.UiCascaderO[];
  placeholder: string;
}

// UI SELECT ===============================================================================================================================

export interface UiSelectO<T extends string = string, D = undefined> {
  data?: D;
  disabled?: boolean;
  label: string;
  value: T;
}

export interface UiSelectP<T extends string = string, D = undefined> {
  disabled: boolean;
  loading: boolean;
  options: N.UiSelectO<T, D>[];
  placeholder: string;
}

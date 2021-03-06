import * as React from 'react';

interface FormRowPropTypes extends
  Omit<React.HTMLAttributes<HTMLInputElement>, 'id'>{
  children?: React.ReactNode;
  label?: React.ReactNode;
  labelSize?: string;
  hint?: string;
  feedback?: any;
  id?: string;
  required?: boolean;
  rowClassName?: string;
  type?: any;
  inline?: boolean;
  stacked?: boolean;
  size?: string;
  validFeedback?: React.ReactNode;
  width?: {
    size?: boolean | number | string
    push?: string | number
    pull?: string | number
    offset?: string | number
  }
}

declare class FormRow extends React.Component<FormRowPropTypes, {}> { }
export default FormRow;

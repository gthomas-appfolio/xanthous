import Omit from '../util/Omit';

interface FormChoicePropTypes extends Omit<HTMLOptionElement, 'disabled'> {
  inline?: boolean;
  color?: string;
  state?: string;
  disabled?: boolean;
  checked?: boolean;
  type: 'checkbox' | 'radio';
  value: string;
}
declare const FormChoice: React.StatelessComponent<FormChoicePropTypes>;
export default FormChoice;
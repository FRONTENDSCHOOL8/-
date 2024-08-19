import { string, number, oneOfType, func } from 'prop-types';
import Label from '../../atoms/Label/Label';
import TextInput from '../../atoms/TextInput/TextInput';
import { memo } from 'react';

const TextInputBox = memo(function TextInputBox({
  id,
  label,
  name,
  value,
  placeholder = '',
  onChange,
}) {
  return (
    <li className="flex flex-col justify-center gap-2">
      <Label htmlFor={id}>{label}</Label>
      <TextInput
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </li>
  );
});

TextInputBox.propTypes = {
  id: string.isRequired,
  label: string.isRequired,
  name: string.isRequired,
  value: oneOfType([string, number]),
  placeholder: string,
  onChange: func,
};

export default TextInputBox;
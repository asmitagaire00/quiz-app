import React from 'react';

import './button.css';

interface Props {
  rest?: any;
  text: string;
  disabled?: boolean;
  handleClick: CallableFunction;
}

function Button({ handleClick, text, disabled, rest }: Props) {
  return (
    <button type="button" disabled={disabled} onClick={handleClick} {...rest}>
      {text}
    </button>
  );
}

export default Button;

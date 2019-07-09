import React from 'react';
import './Button.scss';

const Button = ({ onPress, type, text, className, selected, clicked }) => (
  <button
    onClick={onPress}
    className={clicked ? `btn btn-clicked ${className}` : `btn ${className}`}
    type={type}
    >
    {typeof selected === 'number' ? `${text}: ${selected}` : text}
  </button>
)

export default Button;

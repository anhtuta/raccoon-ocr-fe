import React from 'react';

const Button = (props) => {
  const { text, onClick, disabled = false, className = '' } = props;
  const classes = `btn ${className}`;

  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;

import React from 'react';
import './RadioButton.scss';

/**
 * Ref: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_custom_radio
 */
const RadioButton = (props) => {
  const {
    label,
    name,
    value,
    className = '',
    labelClassName = '',
    checked = false,
    disabled = false
  } = props;
  const classes =
    `custom-radio-wrapper ${className}` + (disabled ? ' custom-radio-disabled' : '');
  const labelClasses = `custom-radio-container ${labelClassName}`;

  const onChange = (e) => {
    props.onChange(e.target.name, e.target.value);
  };

  return (
    <div className={classes}>
      <label className={labelClasses}>
        {label}
        <input
          type="radio"
          name={name}
          value={value}
          onChange={onChange}
          checked={checked}
          disabled={disabled}
        />
        <span className="checkmark"></span>
      </label>
    </div>
  );
};

/**
 * Note: HTML thì ko cần onChange, nếu click vào checkbox thì nó tự thay đổi
 * (chuyển từ chưa check sang check và ngược lại). Nhưng với React thì ko có
 * thì lúc click sẽ ko thay đổi gì!
 * Note2: class cha dùng component này phải truyền props checked = true/false,
 * nếu ko sẽ ko hoạt động!
 */
export default RadioButton;

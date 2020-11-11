import React from 'react';

const renderSelect = ({
  input,
  label,
  isLabel,
  className,
  labelClass,
  meta: {touched, error},
  children
}) => (
<div>
  {isLabel==true && 
  <label className = {labelClass?labelClass:""}>{label}</label>
  }
  <div>
    <div className={'select ' + (touched ? (error ? 'is-danger' : 'is-success') : '')}>
<div className="selectDropDown">
    <select 
      {...input} 
      className={className}
    >
      {children}
    </select>
</div>
    {touched && (error && <p className="help is-danger errorMsg">{error}</p>)}
    </div>
  </div>
</div>
);
export default renderSelect
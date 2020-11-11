import React from 'react';

const renderSelect = ({
  input,
  className,
  meta: {touched, error},
  children
}) => (

    <div className={'form-group ' + (touched ? (error ? 'is-danger' : 'is-success') : '')}>
<div className="selectDropDown">
    <select 
      {...input} 
      className={className}
    >
      {children}
    </select>
</div>
    {touched && (error && <p className="help is-danger errorMsg" style={{color:"red"}}>{error}</p>)}
    </div>
 
);
export default renderSelect 
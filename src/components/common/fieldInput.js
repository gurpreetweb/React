import React from "react";
const renderField = ({
  input,
  type,
  label,
  isLabel,
  placeholder,
  className,
  required,
  containerClass,
  labelClass,
  title,
  pattern,
  meta: { touched, error, warning },
}) => (
  <React.Fragment>
    {isLabel == true && (
      <label className={labelClass ? labelClass : ""}>{label}</label>
    )}
    <div className={containerClass}>
      <input
        {...input}
        type={type}
        className={className}
        placeholder={placeholder}
        required={required}
        title= {title}
        pattern={pattern}
      />
      {touched &&
        ((error && <span className="errorMsg">{error}</span>) ||
          (warning && <span className="errorMsg">{warning}</span>))}
    </div>
  </React.Fragment>
);

export default renderField;

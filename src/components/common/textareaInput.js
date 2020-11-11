import React from'react'
const textareaField = ({
    input,
    rows,
    label,
    isLabel,
    placeholder,
    className,
    required,
    id,
    containerClass,
    meta: { touched, error, warning }
  }) => (
    <React.Fragment>
      {isLabel==true && 
      <label>{label}</label>
      }
      <div
        className={containerClass}
      >
        <textarea 
          {...input} 
          id={id}
          rows={rows}
          className={className}
          placeholder={placeholder} 
          required={required}
        />
        {touched &&
          ((error && <span className="errorMsg">{error}</span>) ||
            (warning && <span className="errorMsg">{warning}</span>))}
      </div>
    </React.Fragment>
  );

  export default textareaField
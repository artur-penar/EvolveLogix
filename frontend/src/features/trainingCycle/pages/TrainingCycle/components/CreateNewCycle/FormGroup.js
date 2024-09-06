import React from "react";

const FormGroup = ({
  id,
  label,
  type,
  value,
  options,
  handleChange,
  inputRef = null,
  warning,
  disabled = false,
}) => {
  return (
    <div className="cnc-form-group">
      <div className="cnc-form-group-row">
        <label htmlFor={id}>{label}</label>
        {type === "select" ? (
          <select
            id={id}
            className="form-control"
            value={value}
            onChange={handleChange}
          >
            {options.map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={id}
            type={type}
            className="form-control"
            value={value}
            onChange={handleChange}
            ref={inputRef}
            disabled={disabled}
          ></input>
        )}
      </div>
      {warning && <p className="warning-message">{warning}</p>}
    </div>
  );
};

export default FormGroup;

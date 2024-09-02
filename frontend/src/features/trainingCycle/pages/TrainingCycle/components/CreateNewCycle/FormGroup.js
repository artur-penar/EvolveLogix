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
                {id === "duration" ? option + 1 : option}
              </option>
            ))}
          </select>
        ) : (
          <input
            id="id"
            type={type}
            className="form-control"
            value={value}
            onChange={handleChange}
            ref={inputRef}
          ></input>
        )}
      </div>
      {warning && <p className="warning-message">{warning}</p>}
    </div>
  );
};

export default FormGroup;

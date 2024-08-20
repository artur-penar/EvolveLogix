import React from "react";

const SelectInput = ({
  name,
  label,
  value,
  options,
  handleChange,
  disabled,
}) => (
  <div className="tcf-select-group">
    <label className="tcf-select-label">{label}:</label>
    <select
      className="tcf-select-control form-control"
      name={name}
      value={value}
      onChange={handleChange}
      disabled={disabled}
    >
      {options.map((opt, i) => (
        <option key={i} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default SelectInput;

import React from "react";

const DateInput = ({ label, value, enable }) => (
  <div className="tcf-select-group">
    <label className="tcf-select-label">{label}</label>
    <input
      className="form-control"
      type="date"
      value={value}
      style={{ textAlign: "center" }}
      readOnly={!enable}
    />
  </div>
);

export default DateInput;

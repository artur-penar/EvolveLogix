import React from "react";

const DateInput = ({ label, value }) => (
  <div className="tcf-select-group">
    <label className="tcf-select-label">{label}</label>
    <input
      className="form-control"
      type="date"
      value={value}
      style={{ textAlign: "center" }}
      readOnly
    />
  </div>
);

export default DateInput;

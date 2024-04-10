import React from "react";

const DateField = ({ date, setDate }) => {
  return (
    <div className="form-group">
      <label className="form-label" htmlFor="date">
        Date
        <input
          className="form-control"
          value={date}
          type="date"
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
    </div>
  );
};

export default DateField;

import React, { useEffect } from "react";
import "./DescriptionField.css";

const DescriptionField = ({ description, setDescription }) => {
  return (
    <div className="form-group">
      <label className="description-form-label" htmlFor="name">
        Description:
        <textarea
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
    </div>
  );
};

export default DescriptionField;

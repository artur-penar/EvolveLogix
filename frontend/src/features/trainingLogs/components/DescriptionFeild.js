import React, { useEffect } from "react";

const DescriptionFiedl = ({ description, setDescription }) => {
  return (
    <div className="form-group">
      <label className="form-label" htmlFor="name">
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

export default DescriptionFiedl;

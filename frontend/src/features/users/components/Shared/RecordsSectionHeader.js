import React from "react";

const RecordsSectionHeader = ({ simple, isPowerlifts }) => {
  return (
    <>
      {!simple && (
        <h4 className="header-container">
          {isPowerlifts ? "Powerlifts" : "Others"}
        </h4>
      )}
      <div className="simple-header-container">
        {simple && <h5>{isPowerlifts ? "Powerlifts" : "Others"}</h5>}
      </div>
    </>
  );
};

export default RecordsSectionHeader;

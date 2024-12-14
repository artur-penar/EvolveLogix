import React from "react";

const RecordsSectionHeader = ({ isSimpleView, isPowerlifts }) => {
  return (
    <>
      {!isSimpleView && (
        <h4 className="header-container">
          {isPowerlifts ? "Powerlifts" : "Others"}
        </h4>
      )}
      <div className="simple-header-container">
        {isSimpleView && <h5>{isPowerlifts ? "Powerlifts" : "Others"}</h5>}
      </div>
    </>
  );
};

export default RecordsSectionHeader;

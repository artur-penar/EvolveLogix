import React from "react";
import ContainerHeader from "shared/components/ContainerHeader";

const StrengthRecordsSectionHeader = ({ isSimpleView, isPowerlifts }) => {
  return (
    <>
      {!isSimpleView && (
        <ContainerHeader
          headerContent={isPowerlifts ? "Powerlifts" : "Others"}
        />
      )}
      <div className="simple-header-container">
        {isSimpleView && <h5>{isPowerlifts ? "Powerlifts" : "Others"}</h5>}
      </div>
    </>
  );
};

export default StrengthRecordsSectionHeader;

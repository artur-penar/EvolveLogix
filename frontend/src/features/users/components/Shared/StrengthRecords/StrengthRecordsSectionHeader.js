import React from "react";
import ContainerHeader from "shared/components/ContainerHeader";
import SimpleHeader from "shared/components/SimpleHeader";

const StrengthRecordsSectionHeader = ({ isSimpleView, isPowerlifts }) => {
  return (
    <>
      {!isSimpleView && (
        <ContainerHeader
          headerContent={isPowerlifts ? "Powerlifts" : "Others"}
        />
      )}
      <div>
        {isSimpleView && (
          <SimpleHeader
            headerContent={isPowerlifts ? "Powerlifts" : "Others"}
          />
        )}
      </div>
    </>
  );
};

export default StrengthRecordsSectionHeader;

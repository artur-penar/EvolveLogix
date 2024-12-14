import React from "react";

/**
 * RecordsSectionLabels component renders a set of labels for a records section.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isSimpleView - Determines if the simple version of the labels should be displayed.
 * @param {boolean} props.isCycleVersion - Determines if the cycle version of the labels should be displayed.
 * @returns {JSX.Element} The rendered labels.
 */
const StrengthRecordsSectionLabels = ({
  isSimpleView,
  isCycleVersion,
  justifyContentStyle,
}) => {
  return (
    <div className={`record-container-labels ${justifyContentStyle}`}>
      <label className="record-label" style={{ textAlign: "left" }}>
        Exercise:
      </label>
      <label className="record-label">Weight:</label>
      {!isCycleVersion && <label className="record-label">Increase:</label>}
      {!isSimpleView && <label className="record-label">Record Date:</label>}
      {!isSimpleView && <label className="record-label">Prev/Next:</label>}
    </div>
  );
};

export default StrengthRecordsSectionLabels;

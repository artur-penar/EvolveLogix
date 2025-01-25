import React from "react";
import Button from '@mui/material/Button';

/**
 * UserDetailsNavigation component renders navigation buttons and updated date information.
 *
 * @param {Object} props - The component props.
 * @param {Date} props.updatedAtData - The date when the user details were last updated.
 * @param {Function} props.handleNext - Function to handle the next button click.
 * @param {Function} props.handlePrev - Function to handle the previous button click.
 * @param {number} props.currentIndex - The current index of the user details being viewed.
 * @param {Array} props.userDetails - Array of user details.
 * @returns {JSX.Element} The rendered component.
 */
const UserDetailsNavigation = ({
  updatedAtData,
  handleNext,
  handlePrev,
  currentIndex,
  userDetails,
}) => {
  return (
    <div className="user-details-navigation">
      <p
        style={{ fontWeight: "bold", fontSize: "1.1rem" }}
      >{`Updated at: ${updatedAtData.toLocaleDateString()}`}</p>
      <div>
        <Button onClick={handlePrev} disabled={currentIndex === 0}>
          {"< "}
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentIndex === userDetails.length - 1}
        >
          {">"}
        </Button>
      </div>
    </div>
  );
};

export default UserDetailsNavigation;

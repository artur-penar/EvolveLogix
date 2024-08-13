import React from "react";

const CycleSelectGroupOptions = ({ options }) => {
  console.log("CycleeSelectGroupOptions");
  console.log(options);
  return (
    <div
      style={{
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        marginBottom: "1rem",
        width: "100%",
      }}
    >
      <div
        style={{
          textAlign: "center",
          borderBottom: "1px solid rgb(0, 0, 0, 0.1",
          padding: "0.5rem",
        }}
      >
        <h4>Options</h4>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          padding: "1rem",
        }}
      >
        {options.map((option) => {
          return (
            <label key={option.id}>
              <input
                type="checkbox"
                checked={option.checked}
                onChange={(e) => option.onChange(e.target.checked)}
                style={{ marginRight: "0.5rem" }}
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default CycleSelectGroupOptions;

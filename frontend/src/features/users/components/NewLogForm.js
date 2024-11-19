import React from "react";

const NewLogForm = ({ newLogName, setNewLogName, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <label>
      Create new log:
      <input
        type="text"
        placeholder="Enter log name"
        value={newLogName}
        onChange={(e) => setNewLogName(e.target.value)}
      />
    </label>
    <button type="submit">Create log</button>
  </form>
);

export default NewLogForm;

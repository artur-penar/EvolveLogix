import React from 'react';

const NewLogForm = ({ newLogName, setNewLogName, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <label>
      New log name:
      <input
        type="text"
        value={newLogName}
        onChange={(e) => setNewLogName(e.target.value)}
      />
    </label>
    <button type="submit">Create log</button>
  </form>
);

export default NewLogForm;
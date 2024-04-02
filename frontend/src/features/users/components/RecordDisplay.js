const RecordDisplay = ({ formData, handleEdit, simple }) => (
    <div className="body-measurements">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <label>Exercise:</label>
        <label>Weight:</label>
        {!simple && <label>Record Date:</label>}
      </div>
      {Object.entries(formData).map(([key, { weight, record_date }]) => (
        <div
          key={key}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <input
            className="centered-input"
            type="text"
            name={key}
            value={key}
            disabled
          />
          <input
            className="centered-input"
            type="number"
            name={key}
            value={weight}
            disabled
            min="0"
          />
          {!simple && (
            <input
              className="centered-input"
              type="text"
              name={`${key}_date`}
              value={new Date(record_date).toLocaleDateString()}
              disabled
            />
          )}
        </div>
      ))}
      {!simple && (
        <button className="dashboard-button" onClick={handleEdit}>
          Edit
        </button>
      )}
    </div>
  );
  
  export default RecordDisplay;
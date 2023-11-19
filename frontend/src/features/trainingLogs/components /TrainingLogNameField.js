import React from "react";

const TrainingLogNameField = ({ logName, setLogName, logNames }) => {
    return (
        <div className="form-group">
            <label className="form-label" htmlFor="name">
                Name:
                <select
                    className="form-control"
                    value={logName}
                    onChange={(e) => setLogName(e.target.value)}
                >
                    {logNames.map((logNameItem, index) => (
                        <option key={index} value={logNameItem}>
                            {logNameItem}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
};

export default TrainingLogNameField;

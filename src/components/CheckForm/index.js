import React from "react";

function CheckForm({ results, handleInputChange }) {
    return (
    <div className="card p-2 pb-0">
        <div className="pt-1">
        <label>
            <input type="checkbox" class="filled-in checkbox-blue"/>
            <span>Yes</span>
        </label>
        </div>
        <div>
        <label className="mb-0">
            <input type="checkbox" class="filled-in checkbox-blue" />
            <span>No</span>
        </label>
        </div>
    </div>
    )
}

export default CheckForm;  
import React from "react";

function CheckForm({ handleAmendChange }) {
    return (
    <div className="card p-2 pb-0">
        <div className="pt-1">
        <label>
            <input type="checkbox" className="filled-in checkbox-blue" value="Yes" onChange={handleAmendChange}/>
            <span>Yes</span>
        </label>
        </div>
        <div>
        <label className="mb-0">
            <input type="checkbox" className="filled-in checkbox-blue" value="No" onChange={handleAmendChange}/> 
            <span>No</span>
        </label>
        </div>
    </div>
    )
}

export default CheckForm;  
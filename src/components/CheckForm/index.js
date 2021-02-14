import React from "react";

function CheckForm({ amended, handleAmendChange }) {
    return (
    <div className="card p-2 pb-0">
        <div className="pt-1">
        <label>
            <input type="checkbox" className="filled-in checkbox-blue" value="yes" defaultChecked={amended.yes} onChange={handleAmendChange}/>
            <span>Yes</span>
        </label> 
        </div>
        <div>
        <label className="mb-0">
            <input type="checkbox" className="filled-in checkbox-blue" value="no" defaultChecked={amended.no} onChange={handleAmendChange}/> 
            <span>No</span>
        </label>
        </div>
    </div>
    )
}

export default CheckForm;  
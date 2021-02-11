import React from "react";

function AppointmentForm({ results, handleInputChange }) {
    return (
        <div className="card p-2 pb-0">
        <div className="pt-1">
        <label>
            <input type="checkbox" class="filled-in"/>
            <span>Both</span>
        </label>
        </div>
        <div>
        <label>
            <input type="checkbox" class="filled-in" />
            <span>Walk-in Only</span>
        </label>
        </div>
        <div>
        <label className="mb-0">
            <input type="checkbox" class="filled-in" />
            <span>Appointment Only</span>
        </label>
        </div>
    </div>
    )
}

export default AppointmentForm; 
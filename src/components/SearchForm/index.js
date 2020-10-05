import React from "react";

function SearchForm({ results, handleInputChange }) {
    return (
        <div className="input-group mb-2">
            <select className="custom-select" id="inputGroupSelect01" onChange={handleInputChange}>
                {results.map((ele, i) => (
                    <option key={i + "-el"} value={ele}>{ele}</option> 
                ))}
            </select>
        </div>
    )
}

export default SearchForm; 
import React from "react";
import Map from "./../Map/index";


function MapBox(props) {

    const lat = props.results.reduce((t, r) => t + parseFloat(r.latitude), 0) / props.results.length;

    const lon = props.results.reduce((t, r) => t + parseFloat(r.longitude), 0) / props.results.length;
    

    return (
        <>
            <Map lat={lat} lon={lon} pins={props.results} />
        </>
    )
}

export default MapBox;
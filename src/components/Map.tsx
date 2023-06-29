import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';

// Import the house icon SVG or use a suitable icon library
import { HomeIcon } from '@heroicons/react/24/solid'

function Map({ coord }: { coord: [number, number] }) {

    console.log(coord);

    const coordinates = [{ longitude: coord[0], latitude: coord[1] }];
    const center = getCenter(coordinates);

    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11
    });

    return (
        <ReactMapGL
            mapStyle='mapbox://styles/guillaume-mbl/cle4iupcj000101qt4f3w5inl'
            mapboxAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
            <Marker latitude={coord[1]} longitude={coord[0]}>
                📍
            </Marker>
        </ReactMapGL>
    );
}

export default Map;

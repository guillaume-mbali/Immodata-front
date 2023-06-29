import React, { useState, useEffect } from 'react';
import Map, { Marker } from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';

// Import the house icon SVG or use a suitable icon library
import { HomeIcon } from '@heroicons/react/24/solid'

function MapManagement({ coord }: { coord: [number, number] }) {

    console.log(coord);

    const coordinates = [{ longitude: coord[0], latitude: coord[1] }];
    const center = getCenter(coordinates);

    const [viewport, setViewport] = useState({
        zoom: 15,
        latitude: center.latitude,
        longitude: center.longitude,
    });

    return (
        <Map
            mapStyle='mapbox://styles/guillaume-mbl/cle4iupcj000101qt4f3w5inl'
            mapboxAccessToken='pk.eyJ1IjoiZ3VpbGxhdW1lLW1ibCIsImEiOiJjbGU0aW9qbW0wM2RuM29tc21mZDhhNHllIn0.Hl9mBMjMf3lKOCYGsjOKkg'
            {...viewport}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
            <Marker latitude={coord[1]} longitude={coord[0]} draggable={true}>
                📍
            </Marker>
        </Map>
    );
}

export default MapManagement;

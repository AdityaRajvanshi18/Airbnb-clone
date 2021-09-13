import { useState } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';
import { LocationMarkerIcon } from '@heroicons/react/solid';

function Map({ searchResults }) {
    const [selectedLocation, setSelectedLocation] = useState({});

    const coordinates = searchResults.map(result => ({
        longitude: result.long,
        latitude: result.lat,
    }))

    const center= getCenter(coordinates);

    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11,
    })

    return (
        <ReactMapGL
           mapStyle='mapbox://styles/adityarajvanshi/cktj0172l6psg17rvy5h6ur1t'
           mapboxApiAccessToken={process.env.mapbox_key}
           {...viewport}
           onViewportChange={(nextViewport)=> setViewport(nextViewport)}
        >
            {searchResults.map(result =>(
                <div key={result.long}>
                    <Marker 
                    longitude={result.long}
                        latitude={result.lat}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <LocationMarkerIcon 
                            onClick={()=> setSelectedLocation(result)} 
                            className="h-7 text-red-400 cursor-pointer"
                            aria-label="push-pin"    
                        />
                    </Marker>

                {selectedLocation.long === result.long ? (
                    <Popup
                    onClose={()=> setSelectedLocation({})}
                        closeOnClick={true}
                        latitude={result.lat}
                        longitude={result.long}
                    >
                        {result.title}
                    </Popup>    
                ) : (
                    false
                )}
                </div>
            ))}
        </ReactMapGL>
    )
}

export default Map;

// GoogleMap.js
import React from 'react';
import GoogleMapReact from 'google-map-react';

const GoogleMaps = ({ apiKey, center, zoom }) => {
  return (
    <div style={{ height: '400px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {/* Your map markers or other components */}
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMaps;

import React from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends React.Component {
  renderMarkers = () => {
    const { data } = this.props;
    return data.map(d => (
      <Marker

        position={{ lat: d.lat, lng: d.lon }}
      />
    ))
  }

  render() {
    const { google, data } = this.props;
    return (
      <Map
      google={google}
      zoom={14}
      initialCenter={{
        lat: data[0].lat,
        lng: data[0].lon
      }}>
        {this.renderMarkers()}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.MAP_API_KEY
})(MapContainer)

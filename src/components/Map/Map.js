import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Listing from 'components/Property/Listing';
import './Map.scss';

class Map extends Component {
  constructor() {
    super();
    this.state = ({
      center: {
        lat: 59.95,
        lng: 30.33
      },
      markerActive: false
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ markerActive: nextProps.showInfoWindow });
  }

  getMapBounds = (map, maps, locations) => {
    const bounds = new maps.LatLngBounds();

    locations.forEach((location) => {
      bounds.extend(
        new maps.LatLng(location.lat, location.lon),
      );
    });
    return bounds;
  };

  bindResizeListener = (map, maps, bounds) => {
    maps.event.addDomListenerOnce(map, 'idle', () => {
      maps.event.addDomListener(window, 'resize', () => {
        map.fitBounds(bounds);
      });
    });
  };

  apiIsLoaded = (map, maps, locations) => {
    if (map) {
      const bounds = this.getMapBounds(map, maps, locations);
      map.fitBounds(bounds);
      this.bindResizeListener(map, maps, bounds);
    }
  };

  renderMarkers = () => {
    const { data, loadModal } = this.props;
    const { markerActive } = this.state;
    return data.map((d) => (
        <div
        className={ markerActive === d ? `circle circle-hover circle-${d.type} circle-hover-${d.type}` : `circle z-index-low circle-${d.type}` }
        lat={d.lat}
        lng={d.lon}
        data={d}
        role="presentation"
        onClick={() => loadModal(d)}
        onMouseOver={() => this.onMarkerHover(d)}
        onFocus={() => this.onMarkerHover(d)}
        onMouseLeave={this.onMarkerLeave}
      >
        { markerActive === d ? <Listing details={markerActive} className="map-listing" />  : null }
      </div>
    ));
  }

  onMarkerHover = (markerActive) => {
    this.setState({ markerActive })
  }

  onMarkerLeave = () => {
    this.setState({ markerActive: false });
  }

  render() {
    const { center } = this.state;
    const { data } = this.props;
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          zoom={16}
          center={center}
          yesIWantToUseGoogleMapApiInternals
          className="map"
          onGoogleApiLoaded={({ map, maps }) => this.apiIsLoaded(map, maps, data)}
          bootstrapURLKeys={{ key: process.env.MAP_API_KEY }}
        >
          {this.renderMarkers()}
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;

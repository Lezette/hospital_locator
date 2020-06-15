import React, { FC, useState, useRef, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import '@reach/combobox/styles.css';
import Navbar from '../Navbar';
import Search from '../Search';
import SearchHistory from '../SearchHistory';
import Error from '../Error';
import Logout from '../Logout';

const libraries = ['places'];
const mapContainerStyle = {
  height: '100vh',
  width: '100%',
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
  types: ['hospital', 'health', 'pharmacy', 'doctor', 'drugstore'],
};
interface Iprop {}

interface IpanTo {
  lat: number | string;
  lng: number | string;
}

const Map: FC<Iprop> = ({ children }): any => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [windowGlobal] = useState<any>(window);
  const [google, setGoogle] = useState<any>(null);
  const [markers, setMarkers] = React.useState<any>([]);
  const [selected, setSelected] = React.useState<any>(null);
  const [searchReselt, setSearchReselt] = React.useState<[]>([]);
  const [currentPosition, setCurrentPosition] = useState<IpanTo | null>(null);
  const [radius, setRadius] = useState(4000);
  const [user, setUser] = useState(localStorage.user);
  const [loadHistory, setLoadHistory] = useState<Boolean>(false);
  const history = useHistory();

  const success = (position: any) => {
    const currentPos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCurrentPosition(currentPos);
  };

  useEffect(() => {
    if (!user) {
      history.push('/');
    }
  }, [user]);
  useEffect(() => {
    navigator.geolocation && navigator.geolocation.getCurrentPosition(success);
  }, []);

  const mapRef = useRef<any>();
  const onMapLoad = useCallback((map) => {
    setGoogle(windowGlobal.google);
    mapRef.current = map;
  }, []);

  useEffect(() => {
    if (google && currentPosition && radius) {
      const appMap = {
        center: currentPosition,
        zoom: 17,
      };
      const Map = new google.maps.Map(document.getElementById('fake'), appMap);
      const service = new google.maps.places.PlacesService(Map);
      service.nearbySearch(
        {
          location: currentPosition,
          radius,
          type: ['hospital'],
        },
        function (results: any, status: any) {
          if (status !== 'OK') return;
          setSearchReselt(results);
        }
      );
    }
  }, [google, currentPosition, radius]);

  useEffect(() => {
    if (searchReselt) {
      const Places = searchReselt.map((place: any) => {
        place.lat = place.geometry.location.lat();
        place.lng = place.geometry.location.lng();
        return place;
      });
      setMarkers(Places);
    }
  }, [searchReselt]);

  useEffect(() => {}, [markers]);

  const panTo = useCallback((latLng: IpanTo) => {
    mapRef.current.panTo({ lat: latLng.lat, lng: latLng.lng });
    mapRef.current.setZoom(14);
  }, []);

  interface IradiusLatLng {
    radius: number;
    lat: number;
    lng: number;
  }
  const getRadiusAndCurrentLatLng = (radiusLatLng: IradiusLatLng) => {
    const currentPos = {
      lat: radiusLatLng.lat,
      lng: radiusLatLng.lng,
    };
    setCurrentPosition(currentPos);
    setRadius(+radiusLatLng.radius);
  };

  const hasAddedSearch = (value: Boolean) => {
    setLoadHistory(value);
    setLoadHistory(false);
  };

  if (loadError) {
    return (
      <div>
        <Error />
      </div>
    );
  }
  if (!isLoaded) return 'Loading...';

  return (
    <div>
      <Navbar />

      {currentPosition && (
        <SearchHistory
          panTo={panTo}
          currentPosition={currentPosition as IpanTo}
          radiusAndCurrentLatLng={getRadiusAndCurrentLatLng}
          reloadHistory={loadHistory}
        />
      )}

      {currentPosition && (
        <Search
          panTo={panTo}
          currentPosition={currentPosition as IpanTo}
          radiusAndCurrentLatLng={getRadiusAndCurrentLatLng}
          hasAddedSearch={hasAddedSearch}
        />
      )}

      <Logout />
      {currentPosition && (
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          zoom={14}
          center={currentPosition}
          options={options}
          onLoad={onMapLoad}
        >
          {markers &&
            markers.map((marker: any) => (
              <Marker
                key={`${marker.lat}-${marker.lng}`}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => {
                  setSelected(marker);
                }}
              />
            ))}
          {selected ? (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => {
                setSelected(null);
              }}
            >
              <div>
                <h2>{selected.name}</h2>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      )}
      <div id="fake"></div>
    </div>
  );
};

export default Map;

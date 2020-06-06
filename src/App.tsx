import React, { FC, useState, useRef, useCallback, useEffect } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';

import '@reach/combobox/styles.css';
import Navbar from './Navbar';

const libraries = ['places'];
const mapContainerStyle = {
  height: '100vh',
  width: '100vw',
};

const inputInput = {
  padding: '1px 1px 1px 0',
  // vertical padding + font size from searchIcon
  paddingLeft: `calc(1em + ${4}px)`,
  transition: 'width',
  width: '100%',
};
const searchStyle = {
  borderRadius: '5px',
  backgroundColor: 'rgba(225, 225, 225, 0.15)',
  '&:hover': {
    backgroundColor: 'rgba(225, 225, 225, 0.25)',
  },
  marginRight: '2px',
  marginLeft: 0,
  width: '100%',
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
  types: ['hospital', 'health'],
};

interface Iprop {}

interface IpanTo {
  lat: number | string;
  lng: number | string;
}

const App: FC<Iprop> = ({ children }): any => {
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

  const success = (position: any) => {
    const currentPos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCurrentPosition(currentPos);
  };

  useEffect(() => {
    navigator.geolocation && navigator.geolocation.getCurrentPosition(success);
  }, []);

  const mapRef = useRef<any>();
  const onMapLoad = useCallback((map) => {
    setGoogle(windowGlobal.google);
    mapRef.current = map;
  }, []);

  useEffect(() => {
    if (google && currentPosition) {
      const appMap = {
        center: currentPosition,
        zoom: 17,
      };
      const Map = new google.maps.Map(document.getElementById('fake'), appMap);
      const service = new google.maps.places.PlacesService(Map);
      service.nearbySearch(
        {
          location: currentPosition,
          radius: 4000,
          type: ['hospital'],
        },
        function (results: any, status: any) {
          if (status !== 'OK') return;
          setSearchReselt(results);
        }
      );
    }
  }, [google, currentPosition]);

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

  if (loadError) return 'Error';
  if (!isLoaded) return 'Loading...';

  return (
    <div>
      <Navbar />

      {currentPosition && (
        <Search panTo={panTo} currentPosition={currentPosition as IpanTo} />
      )}

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

export default App;

interface IsearchProp {
  panTo: (obj: IpanTo) => void;
  currentPosition: IpanTo;
}

const Search: FC<IsearchProp> = ({ panTo, currentPosition }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: {
        lat: () => currentPosition.lat,
        lng: () => currentPosition.lng,
      } as any,
      radius: 100 * 1000,
    },
  });

  const handleInput = (e: any) => {
    setValue(e?.target?.value);
  };

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log('😱 Error: ', error);
    }
  };

  return (
    <div style={searchStyle}>
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          style={inputInput}
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search your location"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === 'OK' &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

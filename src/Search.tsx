import React, { FC, useState, useEffect } from 'react';
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
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';

import '@reach/combobox/styles.css';
import './searchStyles.css';

interface IpanTo {
  lat: number | string;
  lng: number | string;
}

interface IsearchProp {
  panTo: (obj: IpanTo) => void;
  currentPosition: IpanTo;
  radiusAndCurrentLatLng: (data: any) => void;
}

const Search: FC<IsearchProp> = ({
  panTo,
  currentPosition,
  radiusAndCurrentLatLng,
}) => {
  const [radius, setRadius] = useState('5000');
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
      radius: +radius,
    },
  });
  useEffect(() => {}, [radius]);

  const handleInput = (e: any) => {
    setValue(e?.target?.value);
  };
  const handleChange = (e: any) => {
    setRadius(e?.target?.value);
  };

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      radiusAndCurrentLatLng({ radius, lat, lng });
      panTo({ lat, lng });
    } catch (error) {
      console.log('😱 Error: ', error);
    }
  };

  return (
    <div className="container">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          className="input"
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

        <FormControl variant="outlined" className="select">
          <Select
            labelId="radius-select-outlined-label"
            className="selectSelect"
            id="radius-select-outlined"
            value={radius}
            onChange={handleChange}
            label="Radius"
          >
            <MenuItem value={1000 * 5}>5KM</MenuItem>
            <MenuItem value={1000 * 10}>10KM</MenuItem>
            <MenuItem value={1000 * 20}>20KM</MenuItem>
            <MenuItem value={1000 * 50}>50KM</MenuItem>
          </Select>
          <FormHelperText>Select Radius</FormHelperText>
        </FormControl>
      </Combobox>
    </div>
  );
};

export default Search;

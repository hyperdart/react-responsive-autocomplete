import logo from './logo.svg';
import './App.css';
import ResponsiveAutocomplete from 'react-autocomplete'
import React, { useState } from "react";
import {
  TextField,
  Box,
  Typography,
  CircularProgress,
  ThemeProvider,
  CssBaseline
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { makeTheme } from './theme';
// import axios from 'axios';

function App() {

  const [cityName, setCityName] = useState("Jaipur");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [checkIn, setCheckIn] = useState(getTomorrow());
  // const [checkOut, setCheckOut] = useState(getDayAfterTomorrow());
  const theme = makeTheme('light');

  const fetchDestinations = async (query) => {
    setLoading(true);
    try {
      
      const response = await fetch(`${window.parent.location.origin}/nodeapi/hotels/autoSuggestCity?cityName=${query}`);
      const data = await response.json();
      const cities = data.data && data.data.topCities ? data.data.topCities : [];
      setOptions(cities);
    } catch (error) {
      console.error("Error fetching destinations:", error);
      setOptions([]);
    }
    setLoading(false);
  };

  const handleInputChange = (event, newValue, reason) => {
    if (reason === "clear") {
      setCityName("");
      setOptions([]);
      return;
    }

    if (reason === "input") {
      setCityName(newValue);
      if (newValue.length >= 2) {
        fetchDestinations(newValue);
      } else {
        setOptions([]);
      }
    }
  };
  const handleInputChangeMobile = ( newValue) => {
    if (newValue.length >= 2) {
      fetchDestinations(newValue);
    } else {
      setOptions([]);
    }
  };
  return (
    <ThemeProvider theme={theme}>
   <ResponsiveAutocomplete
   freeSolo={true}
   style={{width:'100%',borderRadius:'4px'}}
  options={options}
  getOptionLabel={(option) => {
    const parts = [option.wikiLabel, option.state, option.geonameCountry].filter(Boolean);
    console.log("parts",parts)
    return parts.join(", ");
  }}
  inputValue={cityName}
  onInputChange={handleInputChange}
  onInputChangeMobile={handleInputChangeMobile}
  onChange={(event, newValue) => {
    if (newValue) {
      console.log("newValue",newValue)
      const parts = [newValue.wikiLabel, newValue.state, newValue.geonameCountry].filter(Boolean);
      setCityName(parts.join(", "));
      setOptions([]);
    }
  }}
  loading={loading}
  renderOption={(option) => (
    <React.Fragment>
      <LocationOnIcon style={{ color: "gray", marginRight: 8 }} />
      <Box>
        <Typography variant="body1" >
          {option.wikiLabel}
        </Typography>
        {(option.state || option.geonameCountry) && (
          <Typography variant="body2" color="textPrimary">
            {[option.state, option.geonameCountry].filter(Boolean).join(", ")}
          </Typography>
        )}
      </Box>
    </React.Fragment>
  )}
  
  label="Search for Location"
  renderInput={(params) => (
    <TextField
      {...params}
      label="Search for Destination"
      variant="outlined"
      InputProps={{
        ...params.InputProps,
        endAdornment: (
          <span>
    {loading && <CircularProgress color="inherit" size={20} />}
    {params.InputProps.endAdornment}
  </span>
        ),
      }}
    />
  )}
/>
</ThemeProvider>
  );
 
}

export default App;

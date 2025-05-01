import React, { useEffect, useState } from 'react';
import {
  Grid,
  TextField,
  Button,
  Paper,
  Typography,
  CircularProgress,
  Box,
  // Autocomplete
} from '@mui/material';
import Autocomplete from 'react-autocomplete';
import { LocationOn } from '@mui/icons-material';

const allCities = [
  "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia",
  "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville",
  "Fort Worth", "Columbus", "Charlotte", "San Francisco", "Indianapolis",
  "Seattle", "Denver", "Washington", "Boston", "El Paso", "Nashville",
  "Detroit", "Oklahoma City", "Portland", "Las Vegas", "Memphis", "Louisville",
  "Baltimore", "Milwaukee", "Albuquerque", "Tucson", "Fresno", "Mesa",
  "Sacramento", "Atlanta", "Kansas City", "Colorado Springs", "Miami", "Raleigh",
  "Omaha", "Long Beach", "Virginia Beach", "Oakland", "Minneapolis", "Tulsa",
  "Arlington", "Tampa", "New Orleans", "Wichita", "Cleveland", "Bakersfield",
  "Aurora", "Anaheim", "Honolulu", "Santa Ana", "Riverside", "Corpus Christi",
  "Lexington", "Henderson", "Stockton", "Saint Paul", "Cincinnati", "St. Louis",
  "Pittsburgh", "Greensboro", "Lincoln", "Anchorage", "Plano", "Orlando",
  "Irvine", "Newark", "Toledo", "Durham", "Chula Vista", "Fort Wayne",
  "Jersey City", "St. Petersburg", "Laredo", "Madison", "Chandler", "Buffalo",
  "Lubbock", "Scottsdale", "Reno", "Glendale", "Gilbert", "Winston–Salem",
  "North Las Vegas", "Norfolk", "Chesapeake", "Garland", "Irving", "Hialeah",
  "Fremont", "Boise", "Richmond", "Baton Rouge"
];

const SimpleForm = () => {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: ''
  });
  const [cityName, setCityName] = useState('');
  const [cityOptions, setCityOptions] = useState(allCities.slice(0, 5));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cityName !== '') setLoading(true);

    const timeout = setTimeout(() => {
      const filtered = cityName
        ? allCities.filter(city =>
            city.toLowerCase().includes(cityName.toLowerCase())
          )
        : allCities.slice(0, 5);
      setCityOptions(filtered);
      setLoading(false);
    }, 400);

    return () => clearTimeout(timeout);
  }, [cityName]);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, address } = formValues;

    if (!firstName || !lastName || !email || !address || !cityName) {
      alert("Please fill all the details before submitting the form.");
      return;
    }

    alert("Form Submitted Successfully");

    setFormValues({
      firstName: '',
      lastName: '',
      email: '',
      address: ''
    });
    setCityName('');
  };

  return (
    <Paper sx={{ p: 2, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        User Info Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="firstName"
              label="First Name"
              fullWidth
              value={formValues.firstName}
              onChange={handleChange}
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="lastName"
              label="Last Name"
              fullWidth
              value={formValues.lastName}
              onChange={handleChange}
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="email"
              label="Email ID"
              type="email"
              fullWidth
              value={formValues.email}
              onChange={handleChange}
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              fullWidth
              options={cityOptions}
              value={cityName}
              loading={loading}
              freeSolo
              onInputChange={(e, value) => setCityName(value)}
              onChange={(e, value) => setCityName(value || '')}
              getOptionLabel={(option) => option}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  <LocationOn sx={{ color: "gray", mr: 1 }} />
                  <Typography variant="body1">{option}</Typography>
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="City"
                  variant="outlined"
                  size="small"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loading && <CircularProgress color="inherit" size={20} />}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="address"
              label="Address"
              fullWidth
              value={formValues.address}
              onChange={handleChange}
              variant="outlined"
              size="small"
              multiline
              minRows={2}
            />
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default SimpleForm;

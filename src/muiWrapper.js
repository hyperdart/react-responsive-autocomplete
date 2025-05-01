let Autocomplete, Popper, TextField, IconButton, Paper, useMediaQuery,useTheme, ArrowBack, grey;

try {
  // Try MUI v5/v6
  Autocomplete = require('@mui/material/Autocomplete').default;
  Popper = require('@mui/material/Popper').default;
  TextField = require('@mui/material/TextField').default;
  IconButton = require('@mui/material/IconButton').default;
  Paper = require('@mui/material/Paper').default;
  useMediaQuery=require('@mui/material/useMediaQuery').default;
  useTheme = require('@mui/material/styles').useTheme;
  ArrowBack = require('@mui/icons-material/ArrowBack').default;
  grey = require('@mui/material/colors').grey;
} catch {
  // Fallback to MUI v4
  console.log("in catch block")
  Autocomplete = require('@material-ui/lab/Autocomplete').default;
  Popper = require('@material-ui/core/Popper').default;
  TextField = require('@material-ui/core/TextField').default;
  IconButton = require('@material-ui/core/IconButton').default;
  Paper = require('@material-ui/core/Paper').default;
  useMediaQuery=require('@material-ui/core/useMediaQuery').default;
  useTheme = require('@material-ui/core/styles').useTheme;
  ArrowBack = require('@material-ui/icons/ArrowBack').default;
  grey = require('@material-ui/core/colors').grey;
}

export {
  Autocomplete,
  Popper,
  TextField,
  IconButton,
  Paper,
  useMediaQuery,
  useTheme,
  ArrowBack,
  grey,
};
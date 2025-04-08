import React, { useState } from "react";
import { Autocomplete } from "@material-ui/lab";
import {
  TextField,
  Dialog,
  useMediaQuery,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import SmallScreenAutoComplete from "./mobileAutocomplete";

const ResponsiveAutocomplete = (
 { options,
  getOptionLabel,
  inputValue,
  onInputChange,
  onChange,
  loading,
  renderOption,
  renderInput,
  onInputChangeMobile,
  style,
  classes,
  freeSolo,
  label,
}
) => {
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const handleDialogOpen = () => setOpen(true);
  const handleDialogClose = () => setOpen(false);
  const handleBack = () => {
    handleDialogClose();
  };
  const handleItemSelect = (event, value) => {
    handleDialogClose();
    onChange(event, value);
  };
  
  // Desktop view: use default MUI Autocomplete
  if (!isMobile) {
    return (
        <Autocomplete
        style={style}
        classes={classes}
          freeSolo={freeSolo}
          options={options}
          getOptionLabel={getOptionLabel}
          inputValue={inputValue}
          onInputChange={onInputChange}
          onChange={onChange}
          loading={loading}
          renderOption={renderOption}
          renderInput={renderInput}
        />
    );
  }

  return (
    <div>
      <TextField
        label={label}
        variant="outlined"
        value={inputValue}
        onClick={handleDialogOpen}
        style={style}
        classes={classes}
        InputProps={{
          readOnly: true, 
        }}
      />
      <Dialog open={open} onClose={handleDialogClose} fullScreen>
        <SmallScreenAutoComplete
        options={options}
          handleBack={handleBack}
          handleItemSelect={handleItemSelect}
          initialDisplayValue={inputValue}
          renderOption={renderOption}
          onInputChangeMobile={onInputChangeMobile}
        />
      </Dialog>
    </div>
  );
};

export default ResponsiveAutocomplete;
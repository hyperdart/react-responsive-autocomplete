import React, { useState } from "react";
import { Autocomplete } from "@material-ui/lab";
import {
  TextField,
  Dialog,
  useMediaQuery,
  Box,
  IconButton,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { ArrowBack } from "@material-ui/icons";

const ResponsiveAutocomplete = (props) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const handleDialogOpen = () => setOpen(true);
  const handleDialogClose = () => setOpen(false);
  
  const handleOptionClicked = (event, value) => {
    handleDialogClose();
    props.onChange(event, value);
  };

  // Desktop view: use default MUI Autocomplete
  if (!isMobile) {
    return <Autocomplete {...props} />;
  }

  return (
    <div>
      <TextField
        label={props.label}
        variant="outlined"
        value={props.inputValue}
        onClick={handleDialogOpen}
        style={props.style}
        classes={props.classes}
        InputProps={{
          readOnly: true,
        }}
      />
      <Dialog open={open} onClose={handleDialogClose} fullScreen>
        <Box
          display="flex"
          alignItems="center"
          style={{ padding: "5px 5px 0px 0px" }}
        >
          <IconButton onClick={handleDialogClose}>
            <ArrowBack fontSize="small" />
          </IconButton>
          <Box flex={1}>
            <Autocomplete {...props} onChange={handleOptionClicked} />
          </Box>
        </Box>
      </Dialog>
    </div>
  );
};

export default ResponsiveAutocomplete;

import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  IconButton,
  TextField,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { grey } from "@mui/material/colors";

const ResponsiveAutocomplete = (props) => {
  const [isFocused, setIsFocused] = useState(false);

  const {
    mobileBackgroundSx,
    mobileBackgroundClassName,
    backButtonSx,
    backButtonClassName,
    renderInput,
    onFocus,
    onClose,
    slotProps = {},
    blurOnSelect,
    ...autocompleteProps
  } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobileFocused = isFocused && isMobile;

  // Lock page scroll when mobile input is focused
  useEffect(() => {
    const bodyStyle = document.body.style;
    const htmlStyle = document.documentElement.style;

    if (isMobileFocused) {
      bodyStyle.overflow = "hidden";
      htmlStyle.overflow = "hidden";
      bodyStyle.position = "fixed";
      bodyStyle.width = "100%";
    } else {
      bodyStyle.overflow = "";
      htmlStyle.overflow = "";
      bodyStyle.position = "";
      bodyStyle.width = "";
    }
  }, [isFocused,isMobile]);

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleClose = (event,reason) => {
    if(reason!='toggleInput')
    setIsFocused(false);
    onClose?.(event,reason);
  };

  const wrappedRenderInput = (params) => {
    const inputElement = renderInput ? (
      renderInput(params)
    ) : (
      <TextField {...params} label="Search" variant="outlined" />
    );

    return React.cloneElement(inputElement, {
      ...inputElement.props,
      autoFocus: isFocused,
    });
  };

  const containerSx = isMobileFocused
    ? {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        padding: "16px 12px 16px 0px",
        background: theme.palette.background.paper,
        zIndex: 1300,
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        height: "100vh",
        maxWidth: "-webkit-fill-available",
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "row",
        ...mobileBackgroundSx,
      }
    : {
        position: "relative",
      };

  const paperSx = isMobileFocused
    ? {
        boxShadow: "none",
        width: "100vw",
        left: 0,
        borderTop: `1.5px solid ${grey[400]}`,
        borderRadius: 0,
        mt: 1,
      }
    : {};

  const popperSx = isMobileFocused
    ? {
        width: "101vw !important",
        left: "0 !important",
        right: "0 !important",
        overflow: "hidden",
      }
    : {};

  return (
    <Box
      className={isMobileFocused ? mobileBackgroundClassName : undefined}
      sx={containerSx}
    >
      {isMobileFocused && (
        <IconButton
          className={backButtonClassName}
          sx={{
            alignSelf: "flex-start",
            marginBottom: "18px",
            ...backButtonSx,
          }}
          onClick={handleClose}
        >
          <ArrowBackIcon />
        </IconButton>
      )}

      <Autocomplete
        {...autocompleteProps}
        onFocus={handleFocus}
        onClose={handleClose}
        renderInput={isMobile ? wrappedRenderInput : renderInput}
        openOnFocus
        blurOnSelect={isMobile ? true : blurOnSelect}
        slotProps={{
          paper: {
            ...slotProps.paper,
            sx: { ...paperSx, ...(slotProps.paper?.sx || {}) },
          },
          popper: {
            ...slotProps.popper,
            sx: { ...popperSx, ...(slotProps.popper?.sx || {}) },
          },
          ...slotProps,
        }}
      />
    </Box>
  );
};

export default ResponsiveAutocomplete;

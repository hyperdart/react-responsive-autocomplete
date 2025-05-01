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
    mobileFocusedSx,
    mobileBackgroundClassName,
    backButtonSx,
    backButtonClassName,
    renderInput,
    onFocus,
    onClose,
    slotProps = {},
    ...autocompleteProps
  } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobileFocused = isFocused && isMobile;

  useEffect(() => {
    if (isMobileFocused) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }
  }, [isMobileFocused]);

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus && onFocus(e);
  };

  const handleClose = (...args) => {
    setIsFocused(false);
    onClose && onClose(...args);
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

  return (
    <Box
      className={isMobileFocused ? mobileBackgroundClassName : undefined}
      sx={{
        ...(isMobileFocused
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
            }
          : {
              position: "relative",
            }),
        ...(mobileFocusedSx || {}),
      }}
    >
      {isMobileFocused && (
        <IconButton
          className={backButtonClassName}
          sx={{
            alignSelf: "flex-start",
            marginBottom: "18px",
            ...(backButtonSx || {}),
          }}
          onClick={handleClose}
        >
          <ArrowBackIcon />
        </IconButton>
      )}

      <Autocomplete
        {...autocompleteProps}
        onFocus= {handleFocus}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              ...(isMobileFocused
                ? {
                    boxShadow: "none",
                    width: "100vw",
                    left: 0,
                    borderTop: `1.5px solid ${grey[400]}`,
                    borderRadius: 0,
                    mt: 1,
                  }
                : {}),
              ...(slotProps?.paper?.sx || {}),
            },
            ...slotProps?.paper,
          },
          popper: {
            sx: {
              ...(isMobileFocused
                ? {
                    width: "101vw !important",
                    left: "0 !important",
                    right: "0 !important",
                    overflow: "hidden",
                  }
                : {}),
              ...(slotProps?.popper?.sx || {}),
            },
            ...slotProps?.popper,
          },
          ...slotProps,
        }}
        openOnFocus
        blurOnSelect={isMobile ? true : props.blurOnSelect}
        renderInput={isMobile ? wrappedRenderInput : renderInput}
      />
    </Box>
  );
};

export default ResponsiveAutocomplete;

import React, { useEffect, useState } from "react";
import { Autocomplete } from "@material-ui/lab";
import { IconButton, TextField, useMediaQuery } from "@material-ui/core";
import { useTheme, withStyles } from "@material-ui/core/styles";
import { ArrowBack } from "@material-ui/icons";
import { grey } from "@material-ui/core/colors";

const styles = (theme) => ({
  wrapper: {
    position: "relative",
  },
  focused: {
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
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: "18px",
  },
  paper: {
    boxShadow: "none",
    width: "100vw !important",
    left: "0 !important",
    borderTop: `1.5px solid ${grey[400]}`,
    borderRadius: 0,
    marginTop: theme.spacing(1),
  },
  popper: {
    width: "101vw !important",
    left: "0 !important",
    right: "0 !important",
    overflow: "hidden",
  },
});

const ResponsiveAutocomplete = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const {
    classes,
    mobileBackgroundClassName,
    backButtonClassName,
    renderInput,
    onFocus,
    onClose,
    blurOnSelect,
    ...autocompleteProps
  } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isMobileFocused = isFocused && isMobile;

  // Lock page scroll when mobile input is focused
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
  }, [isFocused, isMobile]);

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus && onFocus(e);
  };

  const handleClose = (event,reason) => {
    if(reason!='toggleInput')
    setIsFocused(false);
    onClose && onClose(event,reason);
  };

  const wrappedRenderInput = (params) => {
    const inputElement = props.renderInput ? (
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
    <div
      className={
        isMobileFocused
          ? `${classes.focused} ${mobileBackgroundClassName || ""}`
          : classes.wrapper
      }
    >
      {isMobileFocused && (
        <IconButton
          className={`${classes.backButton} ${backButtonClassName || ""}`}
        >
          <ArrowBack />
        </IconButton>
      )}
      <Autocomplete
        {...autocompleteProps}
        onFocus={handleFocus}
        onClose={handleClose}
        openOnFocus
        classes={{
          ...(autocompleteProps.classes || {}),
          ...(isMobileFocused
            ? {
                paper: `${autocompleteProps.classes?.paper || ""} ${
                  classes.paper
                }`.trim(),
                popper: `${autocompleteProps.classes?.popper || ""} ${
                  classes.popper
                }`.trim(),
              }
            : {}),
        }}
        blurOnSelect={isMobile ? true : blurOnSelect}
        renderInput={isMobile ? wrappedRenderInput : renderInput}
      />
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(ResponsiveAutocomplete);

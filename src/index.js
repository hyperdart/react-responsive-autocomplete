import React, { useEffect, useState } from "react";
import { Autocomplete } from "@material-ui/lab";
import {
  IconButton,
  Paper,
  Popper,
  TextField,
  useMediaQuery,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { ArrowBack } from "@material-ui/icons";
import { grey } from "@material-ui/core/colors";

const ResponsiveAutocomplete = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const {
    mobileDivClassName,
    backButtonClassName,
    className,
    PaperComponent,
    PopperComponent,
    ...autocompleteProps
  } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  useEffect(() => {
    if (isFocused && isMobile) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.position = 'fixed';            
      document.body.style.width = '100%';                 
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
  }, [isFocused, isMobile]);

  const handleFocus = (e) => {
    setIsFocused(true);
    props.onFocus && props.onFocus(e);
  };

  const handleClose = (...args) => {
    setIsFocused(false);
    props.onClose && props.onClose(...args);
  };

  const wrappedRenderInput = (params) => {
    const inputElement = props.renderInput ? (
      props.renderInput(params)
    ) : (
      <TextField {...params} label="Search" variant="outlined" />
    );

    return React.cloneElement(inputElement, {
      ...inputElement.props,
      autoFocus: isFocused,
    });
  };

  const focusedWrapperStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    padding: '16px 12px 16px 0px',
    background: theme.palette.background.paper,
    zIndex: 1300,
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    height: "100vh",
    maxWidth: "100%",
    display: "flex",
    justifyContent: "flex-start",
  };

  const backButtonStyle = {
    alignSelf: "flex-start",
    marginBottom: '18px',
  };

  const paperStyle = {
    boxShadow: 'none',
    width: '100vw',
    left: 0,
    borderTop: `1.5px solid ${grey[400]}`,
    borderRadius: 0,
    marginTop: theme.spacing(1),
  };

  const popperStyle = {
    width: '101vw',
    left: 0,
    right: 0,
    overflow: 'hidden',
  };

  return (
    <div
      style={isFocused && isMobile ? focusedWrapperStyle : {}}

    >
      {isFocused && isMobile && (
        <IconButton
          className={backButtonClassName || ""}
          style={backButtonStyle}
          onClick={() => setIsFocused(false)}
        >
          <ArrowBack />
        </IconButton>
      )}
      <Autocomplete
        {...autocompleteProps}
        onFocus={handleFocus}
        onClose={handleClose}
        openOnFocus
        PaperComponent={isMobile && !PaperComponent ? (props) => (
          <Paper {...props} style={{ ...props.style, ...paperStyle }} />
        ) : PaperComponent}
        PopperComponent={isMobile && !PopperComponent ? (props) => (
          <Popper {...props} style={{ ...props.style, ...popperStyle }} />
        ) : PopperComponent}
        blurOnSelect={isMobile ? true : props.blurOnSelect}
        renderInput={isMobile ? wrappedRenderInput : props.renderInput}
      />
    </div>
  );
};

export default ResponsiveAutocomplete;

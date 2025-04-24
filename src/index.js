import React, { useState, useRef } from "react";
import { Autocomplete } from "@material-ui/lab";
import {
  IconButton,
  TextField,
  useMediaQuery,
  Popper,
} from "@material-ui/core";
import { useTheme, withStyles } from "@material-ui/core/styles";
import { ArrowBack } from "@material-ui/icons";
import { grey } from "@material-ui/core/colors";

const styles = {
  wrapper: {
    position: "relative",
  },
  focused: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    padding: '16px 12px 16px 0px',
    background: "white",
    zIndex: 1300,
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    height: "100vh",
    maxWidth: "-webkit-fill-available",
    display: "flex",
    justifyContent: "flex-start",
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: '18px',
  },
  fullScreenPopper: {
    zIndex: 1350,
    position: "fixed !important",
    top: "60px !important", // Adjust this based on your input height
    left: "0 !important",
    width: "100vw !important",
    height: "calc(100vh - 60px)", // Leave space for the input
    // overflowY: "auto",
    "& .MuiAutocomplete-paper": {
      boxShadow: "none",
      borderRadius: 0,
      height: "100%",
      borderTop: `1.5px solid ${grey[400]}`,
      marginTop: 0,
      width:'102vw'
      // overflowY: "auto",
    },
    "& .MuiAutocomplete-listbox": {
      maxHeight: "100%",
      height: "100%",
      // overflowY: "auto",
    },
  }
};

const ResponsiveAutocomplete = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const { classes,mobileDivClassName,backButtonClassName, ...autocompleteProps } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const handleFocus = (e) => {
    setIsFocused(true);
    props.onFocus && props.onFocus(e);
  };

  const handleClose = (...args) => {
    setIsFocused(false);
    if (inputRef.current) {
      inputRef.current.blur(); //Keyboard closes after selecting a value
    }
    props.onClose && props.onClose(...args);
  };

  const handleBackClick = () => {
    setIsFocused(false);
    if (inputRef.current) {
      inputRef.current.blur();
    }
    inputRef.current.blur();
  };
  
  const wrappedRenderInput = (params) => {
    const inputElement = props.renderInput ? (
      props.renderInput(params)
    ) : (
      <TextField {...params} label="Search" variant="outlined" />
    );

    return React.cloneElement(inputElement, {
      ...inputElement.props,
      inputRef,
      autoFocus: isFocused,
    });
  };

  const FullScreenPopper = (popperProps) => {
    return <Popper {...popperProps} className={classes.fullScreenPopper} />;
  };

  return (
    <div className={isFocused && isMobile ? `${classes.focused} ${mobileDivClassName || ''}` : classes.wrapper}>
      {isFocused && isMobile && (
        <IconButton onClick={handleBackClick} className={`${classes.backButton} ${backButtonClassName || ''}`}>
          <ArrowBack />
        </IconButton>
      )}
      <Autocomplete
        {...autocompleteProps}
        onFocus={handleFocus}
        onClose={handleClose}
        openOnFocus
        PopperComponent={
          props.PopperComponent
            ? props.PopperComponent
            : isMobile&&isFocused
            ? FullScreenPopper
            : undefined
        }
        renderInput={isMobile ? wrappedRenderInput : props.renderInput}
      />
    </div>
  );
};

export default withStyles(styles)(ResponsiveAutocomplete);

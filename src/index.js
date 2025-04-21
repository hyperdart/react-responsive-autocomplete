import React, { useState, useRef } from "react";
import { Autocomplete } from "@material-ui/lab";
import {
  IconButton,
  TextField,
  useMediaQuery,
} from "@material-ui/core";
import { useTheme, withStyles } from "@material-ui/core/styles";
import { ArrowBack } from "@material-ui/icons";

const styles = {
  wrapper: {
    position: 'relative',
  },
  focused: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    padding: 16,
    paddingLeft:2,
    background: 'white',
    zIndex: 1300,
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    height: '100vh',
    maxWidth:'-webkit-fill-available',
    display:'flex',
    justifyContent: 'flex-start'
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
};

const ResponsiveAutocomplete = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null); // 🔑 Input ref
  const { classes, ...autocompleteProps } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const handleFocus = (e) => {
    setIsFocused(true);
    props.onFocus && props.onFocus(e);
  };

  const handleClose = (...args) => {
    setIsFocused(false);
    if (inputRef.current) {
      inputRef.current.blur();
    }
    props.onClose && props.onClose(...args);
 
  };
  const wrappedRenderInput = (params) => {
    const inputElement = props.renderInput
      ? props.renderInput(params)
      : <TextField {...params} label="Search" variant="outlined" />;

    return React.cloneElement(inputElement, {
      ...inputElement.props,
      inputRef,
      autoFocus: isFocused,
    });
  };

  if (!isMobile) {
    return <Autocomplete {...autocompleteProps} />;
  }

  return (
    <div className={isFocused ? classes.focused : classes.wrapper}>
       {isFocused && (
      <IconButton onClick={() => {
        setIsFocused(false);
        if (inputRef.current) inputRef.current.blur();
      }} className={classes.backButton}>
        <ArrowBack />
      </IconButton>
    )}
      <Autocomplete
        {...autocompleteProps}
        onFocus={handleFocus}
        onClose={handleClose}
        openOnFocus
        renderInput={wrappedRenderInput}
      />
    </div>
  );
};

export default withStyles(styles)(ResponsiveAutocomplete);

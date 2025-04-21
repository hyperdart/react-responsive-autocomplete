import React, { useState, useRef } from "react";
import { Autocomplete } from "@material-ui/lab";
import {
  TextField,
  useMediaQuery,
} from "@material-ui/core";
import { useTheme, withStyles } from "@material-ui/core/styles";

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
    background: 'white',
    zIndex: 1300,
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    height: '100vh',
    maxWidth:'-webkit-fill-available'
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
    props.onClose && props.onClose(...args);
  };

  const handleChange = (...args) => {
    setIsFocused(false);

    // 🔑 This closes the mobile keyboard
    if (inputRef.current) {
      inputRef.current.blur();
    }

    props.onChange && props.onChange(...args);
  };

  const wrappedRenderInput = (params) => {
    const inputElement = props.renderInput
      ? props.renderInput(params)
      : <TextField {...params} label="Search" variant="outlined" />;

    return React.cloneElement(inputElement, {
      ...inputElement.props,
      inputRef, // Pass ref to input
      autoFocus: isFocused,
      onFocus: handleFocus,
    });
  };

  if (!isMobile) {
    return <Autocomplete {...autocompleteProps} />;
  }

  return (
    <div className={isFocused ? classes.focused : classes.wrapper}>
      <Autocomplete
        {...autocompleteProps}
        onFocus={handleFocus}
        onClose={handleClose}
        onChange={handleChange}
        openOnFocus
        renderInput={wrappedRenderInput}
      />
    </div>
  );
};

export default withStyles(styles)(ResponsiveAutocomplete);

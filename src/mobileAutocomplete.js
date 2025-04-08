import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Input,
  List,
  ListItem,
  Chip,
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

// Styles for mobile autocomplete UI
const styles = (theme) => ({
  appBar: {
    position: "static",
    backgroundColor: theme.palette.primary.main,
  },
  toolbar: {
    textAlign: "center",
  },
  locationInput: {
    color: theme.palette.primary.contrastText,
    flex: 1,
  },
  chip: {
    borderRadius: 2,
    backgroundColor: grey[200],
    marginRight: theme.spacing(1),
  },
  listContainer: {
    maxHeight: "50vh",
    overflowY: "auto",
  },
});

const MobileAutoComplete = ({
  options,
  initialDisplayValue,
  classes,
  handleItemSelect,
  handleBack,
  renderOption,
  onInputChangeMobile,
}) => {
  const [selectedValue, setSelectedValue] = useState(initialDisplayValue || "");
  const [textValue, setTextValue] = useState("");

  const handleTextValueChange = (event) => {
    const value = event.target.value;
    setTextValue(value);
    onInputChangeMobile(value);
    setSelectedValue("");
  };

  return (
    <React.Fragment>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton edge="start" color="inherit" onClick={handleBack}>
            <ArrowBack />
          </IconButton>

          {/* Show chip when a value is selected and input is empty */}
          {selectedValue && textValue === "" && (
            <Chip
              size="small"
              className={classes.chip}
              label={selectedValue}
            />
          )}

          <Input
            value={textValue}
            className={classes.locationInput}
            onChange={handleTextValueChange}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Backspace" && textValue === "" && selectedValue) {
                setSelectedValue("");
              }
            }}
          />
        </Toolbar>
      </AppBar>

      <List className={classes.listContainer}>
        {options.map((option, index) => (
          <ListItem
            key={index}
            role="option"
            button
            onClick={(event) => handleItemSelect(event, option)}
          >
            {renderOption(option)}
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
};

export default withStyles(styles)(MobileAutoComplete);

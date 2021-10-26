import React from "react";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useSelector } from "react-redux";

// Import Style
import "./searchField.scss";

function SearchField() {
  const DIR = useSelector((state) => state.dir);

  return (
    <TextField
      variant="outlined"
      placeholder={DIR.direction === "rtl" ? "جستجو ..." : "Search ..."}
      type="text"
      className="outlined-search-field"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton aria-label="toggle password visibility" edge="end">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default SearchField;

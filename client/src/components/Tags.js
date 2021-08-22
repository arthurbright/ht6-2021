/* eslint-disable no-use-before-define */
import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
}));

export default function Tags() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={activities}
        getOptionLabel={(option) => option.val}
        defaultValue={[activities[0]]}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Select activities"
            placeholder="val"
          />
        )}
      />
    </div>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const activities = [
  { val: "amusement_park", title: "Amusement Park"},
  { val: "aquarium" },
  { val: "art_gallery" },
  { val: "bakery" },
  { val: "bar" },
  { val: "beauty_salon" },
  { val: "bicycle_store" },
  { val: "book_store" },
  { val: "bowling_alley" },
  { val: "cafe" },
  { val: "casino" },
  { val: "church" },
  { val: "clothing_store" },
  { val: "convenience_store" },
  { val: "department_store" },
  { val: "electronics_store" },
  { val: "florist" },
  { val: "furniture_store" },
  { val: "gas_station" },
  { val: "gym" },
  { val: "hair_care" },
  { val: "hardware_store" },
  { val: "home_goods_store" },
  { val: "jewelry_store" },
  { val: "library" },
  { val: "liquor_store" },
  { val: "lodging" },
  { val: "meal_delivery" },
  { val: "meal_takeaway" },
  { val: "movie_theater" },
  { val: "museum" },
  { val: "night_club" },
  { val: "park" },
  { val: "restaurant" },
  { val: "shoe_store" },
  { val: "shopping_mall" },
  { val: "spa" },
  { val: "stadium" },
  { val: "store" },
  { val: "supermarket" },
  { val: "tourist_attraction" },
  { val: "zoo" },
];

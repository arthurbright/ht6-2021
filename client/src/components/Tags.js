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
  { val: "aquarium", title: "Aquarium"},
  { val: "art_gallery", title: "Art Gallery" },
  { val: "bakery", title: "Bakery" },
  { val: "bar", title: "Bar" },
  { val: "beauty_salon", title: "Beauty Salon" },
  { val: "bicycle_store", title: "Bicycle Store" },
  { val: "book_store", title: "Book Store" },
  { val: "bowling_alley", title: "Bowling Alley"},
  { val: "cafe", title: "Cafe" },
  { val: "casino", title: "Casino" },
  { val: "church", title: "Church" },
  { val: "clothing_store", title: "Clothing Store" },
  { val: "convenience_store", title: "Convenience Store" },
  { val: "department_store", title: "Department Store" },
  { val: "electronics_store", title: "Electronic Store" },
  { val: "florist", title: "Florist" },
  { val: "furniture_store", title: "Furniture Store" },
  { val: "gas_station", title: "Gas Station" },
  { val: "gym", title: "Gym" },
  { val: "hair_care", title: "Hair Care" },
  { val: "hardware_store", title: "Hardware Store"},
  { val: "home_goods_store", title: "Home Goods Store" },
  { val: "jewelry_store", title: "Jewelry Store" },
  { val: "library", title: "Library" },
  { val: "liquor_store", title: "Liquor Store" },
  { val: "lodging", title: "Lodging" },
  { val: "meal_delivery", title: "Meal Delivery" },
  { val: "meal_takeaway", title: "Meal Takeaway" },
  { val: "movie_theater", title: "Movie Theater" },
  { val: "museum", title: "Museum" },
  { val: "night_club", title: "Night Club" },
  { val: "park", title: "Park" },
  { val: "restaurant", title: "Restaurant" },
  { val: "shoe_store", title: "Shoe Store" },
  { val: "shopping_mall", title: "Shopping Mall" },
  { val: "spa", title: "Spa" },
  { val: "stadium" , title: "Stadium"},
  { val: "store", title: "Store" },
  { val: "supermarket", title: "Supermarket" },
  { val: "tourist_attraction", title: "Tourist Attraction" },
  { val: "zoo", title: "Zoo" },
];

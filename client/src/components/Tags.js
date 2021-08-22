/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

export default function Tags(props) {
  return (
    <div className="selectActivities">
      <Autocomplete
        onChange={(event, newValue) => {
          props.setValue(newValue);
        }}
        limitTags={1}
        multiple
        id="tags-standard"
        options={activities}
        getOptionLabel={(option) => option.title}
        renderInput={(params) => (
          <TextField
            className="selectActivitiesText"
            {...params}
            variant="outlined"
            label="Select activities"
            placeholder="activity"
          />
        )}
      />
    </div>
  );
}

const activities = [
  { title: "Amusement Park", val: "amusement_park" },
  { title: "Aquarium", val: "aquarium" },
  { title: "Art Gallery", val: "art_gallery" },
  { title: "Bakery", val: "bakery" },
  { title: "Bar", val: "bar" },
  { title: "Beauty Salon", val: "beauty_salon" },
  { title: "Bicycle Store", val: "bicycle_store" },
  { title: "Book Store", val: "book_store" },
  { title: "Bowling Alley", val: "bowling_alley" },
  { title: "Cafe", val: "cafe" },
  { title: "Casino", val: "casino" },
  { title: "Church", val: "church" },
  { title: "Clothing Store", val: "clothing_store" },
  { title: "Convenience Store", val: "convenience_store" },
  { title: "Department Store", val: "department_store" },
  { title: "Electronic Store", val: "electronics_store" },
  { title: "Florist", val: "florist" },
  { title: "Furniture Store", val: "furniture_store" },
  { title: "Gas Station", val: "gas_station" },
  { title: "Gym", val: "gym" },
  { title: "Hair Care", val: "hair_care" },
  { title: "Hardware Store", val: "hardware_store" },
  { title: "Home Goods Store", val: "home_goods_store" },
  { title: "Jewelry Store", val: "jewelry_store" },
  { title: "Library", val: "library" },
  { title: "Liquor Store", val: "liquor_store" },
  { title: "Lodging", val: "lodging" },
  { title: "Meal Delivery", val: "meal_delivery" },
  { title: "Meal Takeaway", val: "meal_takeaway" },
  { title: "Movie Theater", val: "movie_theater" },
  { title: "Museum", val: "museum" },
  { title: "Night Club", val: "night_club" },
  { title: "Park", val: "park" },
  { title: "Restaurant", val: "restaurant" },
  { title: "Shoe Store", val: "shoe_store" },
  { title: "Shopping Mall", val: "shopping_mall" },
  { title: "Spa", val: "spa" },
  { title: "Stadium", val: "stadium" },
  { title: "Store", val: "store" },
  { title: "Supermarket", val: "supermarket" },
  { title: "Tourist Attraction", val: "tourist_attraction" },
  { title: "Zoo", val: "zoo" },
];

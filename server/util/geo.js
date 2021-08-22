const axios = require("axios");
require("dotenv").config();

async function getDestinations(lat, long, radius, type) {
  let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=${radius}&type=${type}&key=${process.env.GOOGLEKEY}`;
  let query = {
    method: "get",
    url: url,
    headers: {},
  };
  let data = await axios(query);
  //console.log(data.data.results);
  return data.data.results;
}

async function getReviews(lat, long, name) {
  //Part 1: find business id from location and name
  let url = `https://api.yelp.com/v3/businesses/search?term=${name}&latitude=${lat}&longitude=${long}&sort_by=distance&radius=700`;
  let query = {
    method: "get",
    url: url,
    headers: { Authorization: "Bearer " + process.env.YELPKEY },
  };

  let data = await axios(query);
  //data.data.businesses[] contains array of nearby destinations that fit description; the first entry is most accurate
  /*
    minDistance = 10000;
    minIndex = 0;
    for(let i = 0; i < data.data.businesses.length; i ++){
        if(data.data.businesses[i].distance < minDistance){
            minDistance = data.data.businesses[i].distance;
            minIndex = i;
        }
    }
    */
   if(data.data.businesses.length == 0){
     return [];
   }
  let id = data.data.businesses[0].alias;

  //Part 2: fetch reviews using business id
  let url2 = `https://api.yelp.com/v3/businesses/${id}/reviews`;

  let query2 = {
    method: "get",
    url: url2,
    headers: { Authorization: "Bearer " + process.env.YELPKEY },
  };

  let data2 = await axios(query2);
  //console.log(data2.data.reviews);

  return data2.data.reviews;
}

async function getList(lat, long, radius, types, numResults){
    const result = [];
    const resultIds = [];
    for(let i = 0; i < types.length; i ++){
        let type = types[i];
        let data = await getDestinations(lat, long, radius, type);

        for(let j = 0; j < Math.min(numResults, data.length); j ++){
            if(resultIds.includes(data[j].place_id)){
                continue;
            }

            let entry = {};
            entry.name = data[j].name;
            entry.address = data[j].vicinity;
            entry.latitude = data[j].geometry.location.lat;
            entry.longitude = data[j].geometry.location.lng;
            entry.rating = data[j].rating;
            entry.numRatings = data[j].user_ratings_total;
            entry.tags = data[j].types;

            //priceLevels
            entry.priceLevel = null;
            if(data[j].price_level){
                entry.priceLevel = data[j].price_level;
            }

            //photos
            entry.photo = null; //TODO
            if(data[j].photos.length > 0){
                let photoUrl = await getPhoto(data[j].photos[0].photo_reference)
                //set photo data
                entry.photo = {
                    url: photoUrl,
                    width: data[j].photos[0].width,
                    height: data[j].photos[0].height
                }
            }


            //reviews
            entry.reviews = [];   
            
            //do yelp reviews if type is yelp-friendly
            let yelpable = ["amusement_park", "art_gallery", "aquarium", "beauty_salon", "book_store", "casino", "department_store", "electronics_store", "florist", "furniture_store", "gym", "hair_care", "hardware_store", "home_goods_store", "jewelry_store", "laundry", "library", "liquor_store", "lodging", "meal_delivery", "meal_takeaway", "movie_rental", "movie_theater", "museum", "pet_store", "restaurant", "shopping_mall", "shoe_store", "spa", "stadium", "store", "supermarket", "tourist_attraction", "zoo"];
            if(yelpable.includes(type)){
                let yelpReviews = await getReviews(entry.latitude, entry.longitude, escape(entry.name));
                entry.reviews = yelpReviews;
                
            }

            result.push(entry);
            resultIds.push(data[j].place_id);
        }
    }
  

  return result;
}

async function getPhoto(reference){
    let url = `https://maps.googleapis.com/maps/api/place/photo?photo_reference=${reference}&maxwidth=1000&key=${process.env.GOOGLEKEY}`;
    let query = {
        method: 'get',
        url: url,
        headers: {}
    }
    let p =  new Promise(resp =>{
        axios(query).then(res=>{
            resp(res.request._redirectable._options.href);
        });
    })

    let imgUrl = await p;
    return imgUrl;
    

}

module.exports.getDestinations = getDestinations;
module.exports.getReviews = getReviews;
module.exports.getList = getList;
module.exports.getPhoto = getPhoto;

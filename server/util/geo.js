const axios = require('axios');
require('dotenv').config();


async function getDestinations(lat, long, radius, type){
    let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=${radius}&type=${type}&key=${process.env.GOOGLEKEY}`;
    let query = {
        method: 'get',
        url: url,
        headers: {}
    }
    let data = await axios(query);
    console.log(data.data.results);
    return data.data.results;
}

async function getReviews(lat, long, name){
    //Part 1: find business id from location and name
    let url = `https://api.yelp.com/v3/businesses/search?term=${name}&latitude=${lat}&longitude=${long}&sort_by=distance&radius=700`;
    let query = {
        method: 'get',
        url: url,
        headers:{Authorization: "Bearer " + process.env.YELPKEY}
    }

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
    let id = data.data.businesses[0].alias;



    //Part 2: fetch reviews using business id
    let url2 = `https://api.yelp.com/v3/businesses/${id}/reviews`

    let query2 = {
        method: 'get',
        url: url2,
        headers: {Authorization: "Bearer " + process.env.YELPKEY}
    }

    let data2 = await axios(query2);
    //console.log(data2.data.reviews);


    return data2.data.reviews;
}

async function getList(lat, long, radius, types, numResults){
    const result = [];
    for(let i = 0; i < types.length; i ++){
        let type = types[i];
        let data = await getDestinations(lat, long, radius, type);

        for(let j = 0; j < Math.min(numResults, data.length); j ++){
            let entry = {};
            entry.name = data[j].name;
            entry.address = data[j].vicinity;
            entry.latitude = data[j].geometry.location.latitude;
            entry.longitude = data[j].geometry.location.longitude;
            entry.rating = data[j].rating;
            entry.numRatings = data[j].user_ratings_total;
            entry.tags = data[j].types;

            entry.priceLevel = null;

            entry.photos = null;

            
        }
    }

}



module.exports.getDestinations = getDestinations;
module.exports.getReviews = getReviews;
module.exports.getList = getList;




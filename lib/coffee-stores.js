import { createApi } from "unsplash-js";


const getUrlForIndexingCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`
}

const getUrlForShowingACoffeeStore = (fsq_id) => {
  return `https://api.foursquare.com/v3/places/${fsq_id}`
}

const getImages = (fsq_id, limit) => {
  return `https://api.foursquare.com/v3/places/${fsq_id}/photos?limit=${limit}`
}

const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    Authorization: process.env.FOURSQUARE_API_KEY
  }
};

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

// the code inside this function, used to be embedded into index.js, but we changed it here as some sort of a partial. Therefore we created the 'lib' folder in which i't's contained now.
// all this code does is get the api response from foursquare
export const fetchCoffeeStores = async (number) => {
  const photos = await unsplash.search.getPhotos({
    query: 'coffee shop',
    page: 1,
    perPage: 30,
  });

  const unSplashResults = photos.response.results.map(
    (result) => result.urls["small"]
  )

  console.log(unSplashResults)

  const fourSquareResponseAllCoffeeStores = await fetch(getUrlForIndexingCoffeeStores('36.5101,-4.8824', 'coffee', number), options)
    .then(response => response.json())
    .catch(err => console.error(err));
  var results = fourSquareResponseAllCoffeeStores.results
  return (results);
}

export const fetchIndividualCoffeeStore = async (fsq_id) => {
  const fourSquareResponseIndividualCoffeeStore = await fetch(getUrlForShowingACoffeeStore(fsq_id), options)
    .then(response => response.json())
    .catch(err => console.error(err));
    var result = fourSquareResponseIndividualCoffeeStore
    return (result);
}

export const fetchImageForFoursquareId = async (fsq_id, limit) => {
  const coffeeShopImage = await fetch (getImages(fsq_id, limit), options)
    .then(response => response.json())
    .catch(err => console.error(err));
    const imageUrl = coffeeShopImage[0].prefix + 'original' + coffeeShopImage[0].suffix
    return (imageUrl)
}

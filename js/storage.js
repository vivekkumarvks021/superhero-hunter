const FAVOURITES_KEY = "favouriteSuperheroes";

// Get all favourite superheroes from localStorage
function getFavouriteHeroes() {
  const favourites = localStorage.getItem(FAVOURITES_KEY);

  // If no favourites are saved yet, return an empty array
  if (!favourites) {
    return [];
  }

  return JSON.parse(favourites);
}

// Save the updated favourites array to localStorage
function saveFavouriteHeroes(heroes) {
  localStorage.setItem(FAVOURITES_KEY, JSON.stringify(heroes));
}

// Check whether a superhero is already present in favourites
function isHeroFavourite(heroId) {
  const favourites = getFavouriteHeroes();

  return favourites.some((hero) => hero.id === heroId);
}

// Add a superhero to favourites if not already present
function addHeroToFavourites(heroData) {
  const favourites = getFavouriteHeroes();

  // Prevent duplicate favourite entries
  if (isHeroFavourite(heroData.id)) {
    return false;
  }

  favourites.push(heroData);
  saveFavouriteHeroes(favourites);
  return true;
}

// Remove a superhero from favourites using hero id
function removeHeroFromFavourites(heroId) {
  const favourites = getFavouriteHeroes();

  const updatedFavourites = favourites.filter((hero) => hero.id !== heroId);

  saveFavouriteHeroes(updatedFavourites);
}

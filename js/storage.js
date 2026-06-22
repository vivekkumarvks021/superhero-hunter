const FAVOURITES_KEY = "favouriteSuperheroes";

function getFavouriteHeroes() {
  const favourites = localStorage.getItem(FAVOURITES_KEY);

  if (!favourites) {
    return [];
  }

  return JSON.parse(favourites);
}

function saveFavouriteHeroes(heroes) {
  localStorage.setItem(FAVOURITES_KEY, JSON.stringify(heroes));
}

function isHeroFavourite(heroId) {
  const favourites = getFavouriteHeroes();

  return favourites.some((hero) => hero.id === heroId);
}

function addHeroToFavourites(heroData) {
  const favourites = getFavouriteHeroes();

  if (isHeroFavourite(heroData.id)) {
    return false;
  }

  favourites.push(heroData);
  saveFavouriteHeroes(favourites);
  return true;
}

function removeHeroFromFavourites(heroId) {
  const favourites = getFavouriteHeroes();

  const updatedFavourites = favourites.filter((hero) => hero.id !== heroId);

  saveFavouriteHeroes(updatedFavourites);
}

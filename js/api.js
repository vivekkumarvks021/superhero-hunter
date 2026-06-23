async function searchSuperheroes(query) {
  try {
    const trimmedQuery = query.trim();

    // Prevent empty API calls
    if (!trimmedQuery) {
      return null;
    }

    // Search superheroes by name
    const response = await fetch(
      `${BASE_URL}/search/${encodeURIComponent(trimmedQuery)}`,
    );

    const data = await response.json();
    return data;
  } catch (error) {
    // Log error if API request fails
    console.error("Error fetching superheroes:", error);
    return null;
  }
}

async function getSuperheroById(heroId) {
  try {
    // Fetch superhero details using superhero id
    const response = await fetch(`${BASE_URL}/${heroId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    // Log error if details API request fails
    console.error("Error fetching superhero details:", error);
    return null;
  }
}

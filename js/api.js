async function searchSuperheroes(query) {
  try {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return null;
    }

    const response = await fetch(
      `${BASE_URL}/search/${encodeURIComponent(trimmedQuery)}`,
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching superheroes:", error);
    return null;
  }
}

const heroDetailsContainer = document.getElementById("heroDetails");
const detailsLoading = document.getElementById("detailsLoading");

// Show loading text while superhero details are being fetched
function showDetailsLoading() {
  detailsLoading.classList.remove("hidden");
}

// Hide loading text after data is loaded
function hideDetailsLoading() {
  detailsLoading.classList.add("hidden");
}

// Read superhero id from URL query params
// Example: superhero.html?id=70  -> returns "70"
function getHeroIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// Render selected superhero details on the details page
function renderHeroDetails(hero) {
  heroDetailsContainer.innerHTML = `
    <div class="details-card">
      <div class="details-top">
        <img
          src="./assets/images/placeholder.jpg"
          alt="${hero.name}"
          class="details-image"
        />

        <div class="details-basic-info">
          <h2>${hero.name}</h2>
          <p><strong>Full Name:</strong> ${hero.biography["full-name"]}</p>
          <p><strong>Publisher:</strong> ${hero.biography.publisher}</p>
          <p><strong>Alignment:</strong> ${hero.biography.alignment}</p>
        </div>
      </div>

      <!-- Power related stats -->
      <div class="details-section">
        <h3>Powerstats</h3>
        <p><strong>Intelligence:</strong> ${hero.powerstats.intelligence}</p>
        <p><strong>Strength:</strong> ${hero.powerstats.strength}</p>
        <p><strong>Speed:</strong> ${hero.powerstats.speed}</p>
        <p><strong>Power:</strong> ${hero.powerstats.power}</p>
      </div>

      <!-- Physical appearance details -->
      <div class="details-section">
        <h3>Appearance</h3>
        <p><strong>Gender:</strong> ${hero.appearance.gender}</p>
        <p><strong>Race:</strong> ${hero.appearance.race}</p>
        <p><strong>Height:</strong> ${hero.appearance.height.join(" / ")}</p>
        <p><strong>Weight:</strong> ${hero.appearance.weight.join(" / ")}</p>
      </div>

      <!-- Work and team / relationship related details -->
      <div class="details-section">
        <h3>Work & Connections</h3>
        <p><strong>Occupation:</strong> ${hero.work.occupation}</p>
        <p><strong>Group Affiliation:</strong> ${hero.connections["group-affiliation"]}</p>
      </div>
    </div>
  `;
}

// Fetch hero details using hero id from URL and render them on page
async function loadHeroDetails() {
  const heroId = getHeroIdFromURL();

  // If no id is found in URL, show error message
  if (!heroId) {
    heroDetailsContainer.innerHTML = "<p>Superhero ID not found in URL.</p>";
    return;
  }

  showDetailsLoading();

  const heroData = await getSuperheroById(heroId);

  hideDetailsLoading();

  // If API response is invalid or hero is not found
  if (!heroData || heroData.response === "error") {
    heroDetailsContainer.innerHTML = "<p>Unable to load superhero details.</p>";
    return;
  }

  renderHeroDetails(heroData);
}

// Initial function call when page loads
loadHeroDetails();

const heroDetailsContainer = document.getElementById("heroDetails");
const detailsLoading = document.getElementById("detailsLoading");

function showDetailsLoading() {
  detailsLoading.classList.remove("hidden");
}

function hideDetailsLoading() {
  detailsLoading.classList.add("hidden");
}

function getHeroIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

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

      <div class="details-section">
        <h3>Powerstats</h3>
        <p><strong>Intelligence:</strong> ${hero.powerstats.intelligence}</p>
        <p><strong>Strength:</strong> ${hero.powerstats.strength}</p>
        <p><strong>Speed:</strong> ${hero.powerstats.speed}</p>
        <p><strong>Power:</strong> ${hero.powerstats.power}</p>
      </div>

      <div class="details-section">
        <h3>Appearance</h3>
        <p><strong>Gender:</strong> ${hero.appearance.gender}</p>
        <p><strong>Race:</strong> ${hero.appearance.race}</p>
        <p><strong>Height:</strong> ${hero.appearance.height.join(" / ")}</p>
        <p><strong>Weight:</strong> ${hero.appearance.weight.join(" / ")}</p>
      </div>

      <div class="details-section">
        <h3>Work & Connections</h3>
        <p><strong>Occupation:</strong> ${hero.work.occupation}</p>
        <p><strong>Group Affiliation:</strong> ${hero.connections["group-affiliation"]}</p>
      </div>
    </div>
  `;
}

async function loadHeroDetails() {
  const heroId = getHeroIdFromURL();

  if (!heroId) {
    heroDetailsContainer.innerHTML = "<p>Superhero ID not found in URL.</p>";
    return;
  }

  showDetailsLoading();

  const heroData = await getSuperheroById(heroId);

  hideDetailsLoading();

  if (!heroData || heroData.response === "error") {
    heroDetailsContainer.innerHTML = "<p>Unable to load superhero details.</p>";
    return;
  }

  renderHeroDetails(heroData);
}

loadHeroDetails();

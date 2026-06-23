const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const loading = document.getElementById("loading");
const heroResults = document.getElementById("heroResults");

// Show loading text while API request is in progress
function showLoading() {
  loading.classList.remove("hidden");
}

// Hide loading text after API response is received
function hideLoading() {
  loading.classList.add("hidden");
}

// Add click event on every hero card to open superhero details page
function addCardClickEvents() {
  const heroCards = document.querySelectorAll(".hero-card");

  heroCards.forEach((card) => {
    card.addEventListener("click", function () {
      const heroId = card.dataset.id;
      window.location.href = `superhero.html?id=${heroId}`;
    });
  });
}

// Render superhero cards after search result is received from API
function renderHeroes(data) {
  // If API returns no results or an error response
  if (!data || data.response === "error") {
    heroResults.innerHTML = "<p>No superhero found.</p>";
    return;
  }

  const heroes = data.results;

  // Create cards for each superhero result
  heroResults.innerHTML = heroes
    .map((hero) => {
      return `
        <div class="hero-card" data-id="${hero.id}" data-name="${hero.name}">
          <img
            src="./assets/images/placeholder.jpg"
            alt="${hero.name}"
            class="hero-image"
          />

          <div class="hero-info">
            <h3>${hero.name}</h3>
            <button class="fav-btn">Add to Favourites</button>
          </div>
        </div>
      `;
    })
    .join("");

  // After cards are rendered, attach card click and favourite button events
  addCardClickEvents();
  addFavouriteButtonEvents();
}

// Add click event on every "Add to Favourites" button
function addFavouriteButtonEvents() {
  const favouriteButtons = document.querySelectorAll(".fav-btn");

  favouriteButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      // Prevent card click event from firing when favourite button is clicked
      event.stopPropagation();

      const heroCard = button.closest(".hero-card");

      // Create hero object to store in localStorage
      const heroData = {
        id: heroCard.dataset.id,
        name: heroCard.dataset.name,
        image: "./assets/images/placeholder.jpg",
      };

      // Add hero to favourites if not already added
      const isAdded = addHeroToFavourites(heroData);

      if (isAdded) {
        alert(`${heroData.name} added to favourites!`);
      } else {
        alert(`${heroData.name} is already in favourites!`);
      }
    });
  });
}

// Handle superhero search
async function handleSearch() {
  const query = searchInput.value.trim();

  // Prevent empty search
  if (!query) {
    heroResults.innerHTML = "<p>Please enter a superhero name.</p>";
    return;
  }

  showLoading();

  // Fetch superheroes matching the search query
  const data = await searchSuperheroes(query);

  hideLoading();
  renderHeroes(data);
}

// Search on button click
searchBtn.addEventListener("click", handleSearch);

// Search on pressing Enter inside input field
searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    handleSearch();
  }
});

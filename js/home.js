const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const loading = document.getElementById("loading");
const heroResults = document.getElementById("heroResults");

function showLoading() {
  loading.classList.remove("hidden");
}

function hideLoading() {
  loading.classList.add("hidden");
}

function addCardClickEvents() {
  const heroCards = document.querySelectorAll(".hero-card");

  heroCards.forEach((card) => {
    card.addEventListener("click", function () {
      const heroId = card.dataset.id;
      window.location.href = `superhero.html?id=${heroId}`;
    });
  });
}

function renderHeroes(data) {
  if (!data || data.response === "error") {
    heroResults.innerHTML = "<p>No superhero found.</p>";
    return;
  }

  const heroes = data.results;

  heroResults.innerHTML = heroes
    .map((hero) => {
      return `
        <div class="hero-card" data-id="${hero.id}">
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

  addCardClickEvents();
  addFavouriteButtonEvents();
}

function addFavouriteButtonEvents() {
  const favouriteButtons = document.querySelectorAll(".fav-btn");

  favouriteButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.stopPropagation();

      const heroCard = button.closest(".hero-card");
      const heroId = heroCard.dataset.id;
      const heroName = heroCard.querySelector("h3").textContent;

      console.log("Favourite button clicked");
      console.log("Hero ID:", heroId);
      console.log("Hero Name:", heroName);
    });
  });
}

async function handleSearch() {
  const query = searchInput.value.trim();

  if (!query) {
    heroResults.innerHTML = "<p>Please enter a superhero name.</p>";
    return;
  }

  showLoading();

  const data = await searchSuperheroes(query);

  hideLoading();
  renderHeroes(data);
}

searchBtn.addEventListener("click", handleSearch);

searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    handleSearch();
  }
});

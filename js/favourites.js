const favouritesList = document.getElementById("favouritesList");

function renderFavouriteHeroes() {
  const favouriteHeroes = getFavouriteHeroes();

  if (favouriteHeroes.length === 0) {
    favouritesList.innerHTML = "<p>No favourite superheroes added yet.</p>";
    return;
  }

  favouritesList.innerHTML = favouriteHeroes
    .map((hero) => {
      return `
        <div class="hero-card" data-id="${hero.id}">
          <img
            src="${hero.image}"
            alt="${hero.name}"
            class="hero-image"
          />

          <div class="hero-info">
            <h3>${hero.name}</h3>
            <button class="remove-btn">Remove from Favourites</button>
          </div>
        </div>
      `;
    })
    .join("");

  addRemoveButtonEvents();
  addFavouriteCardClickEvents();
}

function addRemoveButtonEvents() {
  const removeButtons = document.querySelectorAll(".remove-btn");

  removeButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.stopPropagation();

      const heroCard = button.closest(".hero-card");
      const heroId = heroCard.dataset.id;

      removeHeroFromFavourites(heroId);
      renderFavouriteHeroes();
    });
  });
}

function addFavouriteCardClickEvents() {
  const heroCards = document.querySelectorAll(".hero-card");

  heroCards.forEach((card) => {
    card.addEventListener("click", function () {
      const heroId = card.dataset.id;
      window.location.href = `./superhero.html?id=${heroId}`;
    });
  });
}

renderFavouriteHeroes();

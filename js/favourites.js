const favouritesList = document.getElementById("favouritesList");

// Get favourite heroes from localStorage and render them on favourites page
function renderFavouriteHeroes() {
  const favouriteHeroes = getFavouriteHeroes();

  // If no heroes are saved in favourites
  if (favouriteHeroes.length === 0) {
    favouritesList.innerHTML = "<p>No favourite superheroes added yet.</p>";
    return;
  }

  // Create a card for each favourite superhero
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

  // After rendering cards, attach remove button and card click events
  addRemoveButtonEvents();
  addFavouriteCardClickEvents();
}

// Add click event on every remove button
function addRemoveButtonEvents() {
  const removeButtons = document.querySelectorAll(".remove-btn");

  removeButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      // Prevent card click event from firing when remove button is clicked
      event.stopPropagation();

      const heroCard = button.closest(".hero-card");
      const heroId = heroCard.dataset.id;

      // Remove hero from favourites and re-render the updated list
      removeHeroFromFavourites(heroId);
      renderFavouriteHeroes();
    });
  });
}

// Add click event on favourite hero card to open details page
function addFavouriteCardClickEvents() {
  const heroCards = document.querySelectorAll(".hero-card");

  heroCards.forEach((card) => {
    card.addEventListener("click", function () {
      const heroId = card.dataset.id;
      window.location.href = `./superhero.html?id=${heroId}`;
    });
  });
}

// Initial render when favourites page loads
renderFavouriteHeroes();

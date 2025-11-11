// поиск через кнопку "лупа" и enter
function searchProducts(event) {
  event.preventDefault();

  const searchInput = document.getElementById("searchInput");
  const query = searchInput.value.trim().toLowerCase();
  const cards = document.querySelectorAll(".card");
  const noResultsMessage = document.getElementById("noResultsMessage");

  let found = false;

  cards.forEach((card) => {
    const title = card.querySelector(".card-title").textContent.toLowerCase();

    if (title.includes(query) || query === "") {
      card.style.display = "block";
      found = true;
    } else {
      card.style.display = "none";
    }
  });

  if (!found) {
    noResultsMessage.style.display = "block";
  } else {
    noResultsMessage.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.querySelector(".search");

  searchForm.addEventListener("submit", (event) => {
    searchProducts(event);
  });
});

// кнопка избранного
document.addEventListener("DOMContentLoaded", () => {
  const favoriteButtons = document.querySelectorAll(".favorite-btn");

  favoriteButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
    });
  });
});

function searchProducts() {
  const searchInput = document.getElementById("searchInput");
  const cardsContainer = document.getElementById("cardsContainer");
  const cards = cardsContainer.querySelectorAll(".card");

  const noResults =
    document.getElementById("noResultsMessage") ||
    createNoResults(cardsContainer);

  const searchText = searchInput.value.toLowerCase().trim();
  let found = false;

  cards.forEach((card) => {
    const title = card.querySelector(".card-title").textContent.toLowerCase();
    if (title.includes(searchText)) {
      card.style.display = "block";
      found = true;
    } else {
      card.style.display = "none";
    }
  });

  noResults.style.display = found ? "none" : "block";
}

function createNoResults(container) {
  const noResults = document.createElement("p");
  noResults.id = "noResultsMessage";
  noResults.textContent = "Ничего не найдено";
  noResults.style.textAlign = "center";
  noResults.style.fontWeight = "500";
  noResults.style.display = "none";
  container.appendChild(noResults);
  return noResults;
}

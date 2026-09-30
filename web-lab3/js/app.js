(function () {
  "use strict";

  let currentData = [...airplanes];
  let sortByFuelDesc = false;
  let searchQuery = "";

  const cardsGrid = document.getElementById("cardsGrid");
  const searchInput = document.getElementById("searchInput");
  const btnSearch = document.getElementById("btnSearch");
  const btnClear = document.getElementById("btnClear");
  const sortToggle = document.getElementById("sortToggle");
  const btnCount = document.getElementById("btnCount");
  const totalBox = document.getElementById("totalBox");
  const totalValue = document.getElementById("totalValue");

  function formatNumber(num) {
    return num.toLocaleString("uk-UA");
  }

  function createCard(plane) {
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.id = plane.id;

    card.innerHTML = `
      <img class="card-image" src="${plane.image}" alt="${plane.name}" loading="lazy">
      <div class="card-body">
        <h3 class="card-title">${plane.name}</h3>
        <p class="card-desc">${plane.description}</p>
        <div class="card-stats">
          <div class="stat">
            <span class="stat-label">Паливо (л)</span>
            <span class="stat-value">${formatNumber(plane.fuelVolume)}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Пасажири</span>
            <span class="stat-value">${formatNumber(plane.passengers)}</span>
          </div>
        </div>
        <p class="card-meta">Оновлено: ${plane.lastUpdated}</p>
        <div class="card-actions">
          <button class="btn btn-edit btn-sm" data-action="edit" data-id="${plane.id}">Edit</button>
          <button class="btn btn-remove btn-sm" data-action="remove" data-id="${plane.id}">Remove</button>
        </div>
      </div>
    `;
    return card;
  }

  function render(list) {
    cardsGrid.innerHTML = "";
    if (list.length === 0) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.textContent = "Нічого не знайдено. Спробуйте змінити пошук.";
      cardsGrid.appendChild(empty);
      return;
    }
    list.map(createCard).forEach((card) => cardsGrid.appendChild(card));
  }

  function applyFiltersAndSort() {
    let result = [...airplanes];
    if (searchQuery.trim() !== "") {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    if (sortByFuelDesc) {
      result = result.sort((a, b) => b.fuelVolume - a.fuelVolume);
    }
    currentData = result;
    render(currentData);
  }

  function countTotalFuel() {
    const total = currentData.reduce((sum, p) => sum + p.fuelVolume, 0);
    totalValue.textContent = formatNumber(total) + " л";
    totalBox.hidden = false;
  }

  function onSearch() {
    searchQuery = searchInput.value;
    applyFiltersAndSort();
    totalBox.hidden = true;
  }

  function onClear() {
    searchInput.value = "";
    searchQuery = "";
    applyFiltersAndSort();
    totalBox.hidden = true;
  }

  function onSortToggle() {
    sortByFuelDesc = sortToggle.checked;
    applyFiltersAndSort();
    totalBox.hidden = true;
  }

  function onCardClick(e) {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const action = btn.dataset.action;
    const id = Number(btn.dataset.id);
    const plane = airplanes.find((p) => p.id === id);
    if (action === "edit") {
      alert("Edit: " + (plane ? plane.name : id));
    } else if (action === "remove") {
      if (confirm("Видалити «" + (plane ? plane.name : id) + "»?")) {
        const idx = airplanes.findIndex((p) => p.id === id);
        if (idx !== -1) airplanes.splice(idx, 1);
        applyFiltersAndSort();
        totalBox.hidden = true;
      }
    }
  }

  function init() {
    btnSearch.addEventListener("click", onSearch);
    btnClear.addEventListener("click", onClear);
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") onSearch();
    });
    sortToggle.addEventListener("change", onSortToggle);
    btnCount.addEventListener("click", countTotalFuel);
    cardsGrid.addEventListener("click", onCardClick);
    applyFiltersAndSort();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

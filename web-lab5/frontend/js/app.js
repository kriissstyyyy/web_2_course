(function () {
  "use strict";

  let sourceData = [];
  let currentData = [];
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
    return Number(num || 0).toLocaleString("uk-UA");
  }

  function createCard(plane) {
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.id = plane.id;
    const img = plane.image || "assets/plane1.jpg";
    const desc = plane.description || "";
    const updated = plane.lastUpdated || "recently";
    card.innerHTML =
      '<img class="card-image" src="' + img + '" alt="' + (plane.name || "") + '" loading="lazy" onerror="this.onerror=null;this.src=\'assets/plane1.jpg\'">' +
      '<div class="card-body">' +
      '<h3 class="card-title">' + (plane.name || "—") + "</h3>" +
      '<p class="card-desc">' + desc + "</p>" +
      '<div class="card-stats">' +
      '<div class="stat"><span class="stat-label">Паливо (л)</span><span class="stat-value">' + formatNumber(plane.fuelVolume) + "</span></div>" +
      '<div class="stat"><span class="stat-label">Пасажири</span><span class="stat-value">' + formatNumber(plane.passengers) + "</span></div>" +
      "</div>" +
      '<p class="card-meta">Оновлено: ' + updated + "</p>" +
      '<div class="card-actions">' +
      '<a class="btn btn-edit btn-sm" href="edit.html?id=' + plane.id + '">Edit</a>' +
      '<button class="btn btn-remove btn-sm" data-action="remove" data-id="' + plane.id + '">Remove</button>' +
      "</div></div>";
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
    list.map(createCard).forEach(function (card) {
      cardsGrid.appendChild(card);
    });
  }

  async function applyFiltersAndSort() {
    try {
      sourceData = await loadAirplanes();
    } catch (err) {
      cardsGrid.innerHTML = "";
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.textContent = "Помилка API: " + err.message + ". Запустіть бекенд (npm start у backend/).";
      cardsGrid.appendChild(empty);
      return;
    }

    let result = sourceData.slice();
    if (searchQuery.trim() !== "") {
      const q = searchQuery.trim().toLowerCase();
     result = result.filter(function (p) {
      return (p.name || "").toLowerCase().includes(q);
     });
    }
    if (sortByFuelDesc) {
      result = result.sort(function (a, b) {
        return (b.fuelVolume || 0) - (a.fuelVolume || 0);
      });
    }
    currentData = result;
    render(currentData);
  }

  function countTotalFuel() {
    const total = currentData.reduce(function (sum, p) {
      return sum + (Number(p.fuelVolume) || 0);
    }, 0);
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

  async function onCardClick(e) {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    if (btn.dataset.action === "remove") {
      const id = Number(btn.dataset.id);
      const plane = sourceData.find(function (p) {
        return p.id === id;
      });
      if (!confirm("Видалити «" + (plane ? plane.name : id) + "»?")) return;
      try {
        await deleteAirplane(id);
        await applyFiltersAndSort();
        totalBox.hidden = true;
      } catch (err) {
        alert(err.message);
      }
    }
  }

  function init() {
    btnSearch.addEventListener("click", onSearch);
    btnClear.addEventListener("click", onClear);
    searchInput.addEventListener("keydown", function (e) {
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

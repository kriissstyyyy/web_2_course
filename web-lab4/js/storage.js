const STORAGE_KEY = "airplanes_data";

function normalizePlane(p, index) {
  const defaults = airplanes[index % airplanes.length] || airplanes[0];
  return {
    id: p.id != null ? p.id : index + 1,
    name: p.name || defaults.name,
    fuelVolume: p.fuelVolume != null ? Number(p.fuelVolume) : defaults.fuelVolume,
    passengers: p.passengers != null ? Number(p.passengers) : defaults.passengers,
    description: p.description || defaults.description || "",
    image: p.image && String(p.image).indexOf("assets/") === 0
      ? p.image
      : "assets/plane" + ((index % 8) + 1) + ".jpg",
    lastUpdated: p.lastUpdated || defaults.lastUpdated || "recently",
    type: p.type || defaults.type || "narrow-body"
  };
}

function loadAirplanes() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length) {
        return parsed.map(normalizePlane);
      }
    } catch (e) {}
  }
  const initial = airplanes.map(normalizePlane);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  return initial;
}

function saveAirplanes(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list.map(normalizePlane)));
}

function getNextId(list) {
  if (!list.length) return 1;
  return Math.max.apply(null, list.map(function (p) { return p.id; })) + 1;
}

function getAirplaneById(id) {
  return loadAirplanes().find(function (p) {
    return p.id === Number(id);
  });
}

function resetAirplanes() {
  localStorage.removeItem(STORAGE_KEY);
  return loadAirplanes();
}

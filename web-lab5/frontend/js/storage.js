async function loadAirplanes() {
  return apiGetAll();
}

async function getAirplaneById(id) {
  return apiGetById(id);
}

async function createAirplane(data) {
  return apiCreate(data);
}

async function updateAirplane(id, data) {
  return apiUpdate(id, data);
}

async function deleteAirplane(id) {
  return apiDelete(id);
}

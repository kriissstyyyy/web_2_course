function getFormData(form) {
  return {
    name: form.name.value.trim(),
    description: form.description.value.trim(),
    fuelVolume: Number(form.fuelVolume.value),
    passengers: Number(form.passengers.value),
    type: form.type.value
  };
}

function validateFormData(data) {
  const errors = [];
  if (!data.name || data.name.length < 2) {
    errors.push("Назва має містити мінімум 2 символи.");
  }
  if (!data.description || data.description.length < 10) {
    errors.push("Опис має містити мінімум 10 символів.");
  }
  if (!data.fuelVolume || data.fuelVolume < 1000 || data.fuelVolume > 500000) {
    errors.push("Об'єм палива має бути від 1000 до 500000 літрів.");
  }
  if (!data.passengers || data.passengers < 1 || data.passengers > 1000) {
    errors.push("Кількість пасажирів має бути від 1 до 1000.");
  }
  if (!data.type) {
    errors.push("Оберіть тип літака.");
  }
  return errors;
}

async function handleCreateSubmit(e) {
  e.preventDefault();
  const form = e.target;
  if (!form.checkValidity()) {
    form.reportValidity();
    showModal("Помилка валідації", "Заповніть усі поля правильно (HTML validation).", "error");
    return;
  }
  const data = getFormData(form);
  const errors = validateFormData(data);
  if (errors.length) {
    showModal("Помилка", errors.join(" "), "error");
    return;
  }
  try {
    const newPlane = await createAirplane(data);
    showModal("Успіх", "Літак «" + newPlane.name + "» успішно додано!", "success");
    form.reset();
    setTimeout(function () {
      window.location.href = "index.html";
    }, 1500);
  } catch (err) {
    showModal("Помилка", err.message, "error");
  }
}

async function handleEditSubmit(e) {
  e.preventDefault();
  const form = e.target;
  if (!form.checkValidity()) {
    form.reportValidity();
    showModal("Помилка валідації", "Заповніть усі поля правильно.", "error");
    return;
  }
  const data = getFormData(form);
  const errors = validateFormData(data);
  if (errors.length) {
    showModal("Помилка", errors.join(" "), "error");
    return;
  }
  const id = Number(form.dataset.id);
  try {
    await updateAirplane(id, data);
    showModal("Успіх", "Літак «" + data.name + "» оновлено!", "success");
    setTimeout(function () {
      window.location.href = "index.html";
    }, 1500);
  } catch (err) {
    showModal("Помилка", err.message, "error");
  }
}

function initCreateForm() {
  const form = document.getElementById("planeForm");
  if (form) form.addEventListener("submit", handleCreateSubmit);
}

async function initEditForm() {
  const form = document.getElementById("planeForm");
  if (!form) return;
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) {
    showModal("Помилка", "Не вказано ID літака.", "error");
    return;
  }
  try {
    const plane = await getAirplaneById(id);
    if (!plane) {
      showModal("Помилка", "Літак з id=" + id + " не знайдено.", "error");
      return;
    }
    form.dataset.id = plane.id;
    form.name.value = plane.name;
    form.description.value = plane.description;
    form.fuelVolume.value = plane.fuelVolume;
    form.passengers.value = plane.passengers;
    if (plane.type) form.type.value = plane.type;
    form.addEventListener("submit", handleEditSubmit);
  } catch (err) {
    showModal("Помилка", err.message, "error");
  }
}

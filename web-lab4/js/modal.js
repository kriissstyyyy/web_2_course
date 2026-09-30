function showModal(title, message, type) {
  const overlay = document.getElementById("modalOverlay");
  const titleEl = document.getElementById("modalTitle");
  const bodyEl = document.getElementById("modalBody");
  titleEl.textContent = title;
  titleEl.className = "modal-title " + (type || "");
  bodyEl.textContent = message;
  overlay.classList.add("open");
}

function hideModal() {
  document.getElementById("modalOverlay").classList.remove("open");
}

document.addEventListener("DOMContentLoaded", function () {
  const okBtn = document.getElementById("modalOk");
  const overlay = document.getElementById("modalOverlay");
  if (okBtn) okBtn.addEventListener("click", hideModal);
  if (overlay) {
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) hideModal();
    });
  }
});

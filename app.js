const STORAGE_KEY = "fintara.financingRequest";
const form = document.querySelector("#financing-form");
const message = document.querySelector("#form-message");

function showMessage(text, isError = false) {
  message.textContent = text;
  message.classList.toggle("form-message-error", isError);
  message.hidden = false;
}

function readSavedRequest() {
  try {
    const savedRequest = localStorage.getItem(STORAGE_KEY);
    return savedRequest ? JSON.parse(savedRequest) : null;
  } catch {
    showMessage(
      "No pudimos leer la solicitud guardada en este navegador. Puedes completar y enviar una nueva solicitud.",
      true
    );
    return null;
  }
}

const savedRequest = readSavedRequest();
if (savedRequest && typeof savedRequest === "object") {
  for (const [field, value] of Object.entries(savedRequest)) {
    const input = form.elements.namedItem(field);
    if (input && (typeof value === "string" || typeof value === "number")) {
      input.value = String(value);
    }
  }
  if (message.hidden) {
    showMessage("Encontramos tu solicitud anterior en este navegador. Puedes actualizarla y volver a registrarla.");
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) {
    return;
  }

  const formData = new FormData(form);
  const request = Object.fromEntries(formData.entries());
  request.amountMxn = Number(request.amountMxn);
  request.termMonths = Number(request.termMonths);

  try {
localStorage.setItem(STORAGE_KEY, JSON.stringify(request));
window.location.href = "business-summary.html";
  } catch {
    showMessage(
      "No pudimos guardar la solicitud en este navegador. Revisa el espacio disponible o la configuración de almacenamiento e inténtalo de nuevo.",
      true
    );
  }
});

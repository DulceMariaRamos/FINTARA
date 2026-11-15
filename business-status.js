const FINANCING_REQUEST_KEY = "fintara.financingRequest";

const statusMessage = document.querySelector("#status-message");
const continueFundingButton = document.querySelector("#continue-funding-button");

function formatCurrency(value) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0
  }).format(value);
}

function showStatusError(message) {
  statusMessage.textContent = message;
  statusMessage.hidden = false;
}

function loadProjectStatus() {
  const savedRequest = localStorage.getItem(FINANCING_REQUEST_KEY);

  if (!savedRequest) {
    showStatusError(
      "No encontramos una solicitud guardada. Regresa al formulario para completar una nueva."
    );

    continueFundingButton.disabled = true;
    return;
  }

  try {
    const request = JSON.parse(savedRequest);

    document.querySelector("#status-amount").textContent =
      request.amountMxn
        ? formatCurrency(request.amountMxn)
        : "—";

    document.querySelector("#status-term").textContent =
      request.termMonths
        ? `${request.termMonths} meses`
        : "—";

    document.querySelector("#status-purpose").textContent =
      request.purpose || "—";

  } catch {
    showStatusError(
      "No pudimos leer la información de tu solicitud."
    );

    continueFundingButton.disabled = true;
  }
}

continueFundingButton.addEventListener("click", () => {
  window.location.href = "business-funding.html";
});

window.addEventListener("DOMContentLoaded", loadProjectStatus);
const FINANCING_REQUEST_KEY = "fintara.financingRequest";

const summaryMessage = document.querySelector("#summary-message");
const confirmRequestButton = document.querySelector("#confirm-request-button");

function formatCurrency(value) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0
  }).format(value);
}

function showSummaryError(message) {
  summaryMessage.textContent = message;
  summaryMessage.hidden = false;
}

function loadFinancingRequest() {
  const savedRequest = localStorage.getItem(FINANCING_REQUEST_KEY);

  if (!savedRequest) {
    showSummaryError(
      "No encontramos una solicitud guardada. Regresa al formulario para completar una nueva."
    );

    confirmRequestButton.disabled = true;
    return;
  }

  try {
    const request = JSON.parse(savedRequest);

    document.querySelector("#summary-business-name").textContent =
      request.businessName || "—";

    document.querySelector("#summary-owner-name").textContent =
      request.ownerName || "—";

    document.querySelector("#summary-business-activity").textContent =
      request.businessActivity || "—";

    document.querySelector("#summary-location").textContent =
      request.location || "—";

    document.querySelector("#summary-amount").textContent =
      request.amountMxn
        ? formatCurrency(request.amountMxn)
        : "—";

    document.querySelector("#summary-term").textContent =
      request.termMonths
        ? `${request.termMonths} meses`
        : "—";

    document.querySelector("#summary-purpose").textContent =
      request.purpose || "—";

    document.querySelector("#summary-description").textContent =
      request.projectDescription || "—";

  } catch {
    showSummaryError(
      "No pudimos leer la solicitud guardada. Regresa al formulario e inténtalo de nuevo."
    );

    confirmRequestButton.disabled = true;
  }
}

confirmRequestButton.addEventListener("click", () => {
  window.location.href = "business-status.html";
});

window.addEventListener("DOMContentLoaded", loadFinancingRequest);
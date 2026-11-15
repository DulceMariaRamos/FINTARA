const FINANCING_REQUEST_KEY = "fintara.financingRequest";

const DEMO_INVESTMENT_AMOUNT = 2500;

const viewRepaymentButton = document.querySelector(
  "#view-repayment-button"
);

function formatCurrency(value) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0
  }).format(value);
}

function loadFundingCompletion() {
  const savedRequest = localStorage.getItem(FINANCING_REQUEST_KEY);

  if (!savedRequest) {
    window.location.href = "business.html";
    return;
  }

  try {
    const request = JSON.parse(savedRequest);

    const targetAmount = Number(request.amountMxn);

    const investorCount = Math.ceil(
      targetAmount / DEMO_INVESTMENT_AMOUNT
    );

    document.querySelector("#completed-funded-amount").textContent =
      formatCurrency(targetAmount);

    document.querySelector("#completed-target").textContent =
      formatCurrency(targetAmount);

    document.querySelector("#completed-investors").textContent =
      investorCount;

    document.querySelector("#completed-term").textContent =
      `${request.termMonths} meses`;

    document.querySelector("#completed-business-name").textContent =
      request.businessName || "Proyecto de financiamiento";

    document.querySelector("#completed-purpose").textContent =
      request.purpose || "—";

  } catch {
    window.location.href = "business.html";
  }
}

viewRepaymentButton.addEventListener("click", () => {
  window.location.href = "business-repayment.html";
});

window.addEventListener(
  "DOMContentLoaded",
  loadFundingCompletion
);
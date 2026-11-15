const FINANCING_REQUEST_KEY = "fintara.financingRequest";

const DEMO_FUNDED_AMOUNT = 65000;
const DEMO_INVESTOR_COUNT = 26;

const completeFundingButton = document.querySelector(
  "#complete-funding-button"
);

function formatCurrency(value) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0
  }).format(value);
}

function loadFundingProgress() {
  const savedRequest = localStorage.getItem(FINANCING_REQUEST_KEY);

  if (!savedRequest) {
    window.location.href = "business.html";
    return;
  }

  try {
    const request = JSON.parse(savedRequest);

    const targetAmount = Number(request.amountMxn);

    const fundedAmount = Math.min(
      DEMO_FUNDED_AMOUNT,
      targetAmount
    );

    const remainingAmount = Math.max(
      targetAmount - fundedAmount,
      0
    );

    const fundingPercentage =
      targetAmount > 0
        ? Math.round((fundedAmount / targetAmount) * 100)
        : 0;

    document.querySelector("#funded-amount").textContent =
      formatCurrency(fundedAmount);

    document.querySelector("#funding-target").textContent =
      formatCurrency(targetAmount);

    document.querySelector("#remaining-amount").textContent =
      formatCurrency(remainingAmount);

    document.querySelector("#funding-percentage").textContent =
      `${fundingPercentage}%`;

    document.querySelector("#investor-count").textContent =
      DEMO_INVESTOR_COUNT;

    document.querySelector("#funding-term").textContent =
      `${request.termMonths} meses`;

    document.querySelector("#funding-business-name").textContent =
      request.businessName || "Proyecto de financiamiento";

    document.querySelector("#funding-purpose").textContent =
      request.purpose || "—";

    document.querySelector("#funding-progress-fill").style.width =
      `${fundingPercentage}%`;

  } catch {
    window.location.href = "business.html";
  }
}

completeFundingButton.addEventListener("click", () => {
  window.location.href = "business-funded.html";
});

window.addEventListener(
  "DOMContentLoaded",
  loadFundingProgress
);
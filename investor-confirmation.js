const INVESTMENT_KEY = "fintara.investment";

const DEMO_AVAILABLE_BALANCE = 10000;
const DEMO_PROJECT_AMOUNT = 100000;
const DEMO_TOTAL_REPAYMENT = 110016;
const DEMO_INVESTOR_FEE_RATE = 0.01;

const viewPortfolioButton =
  document.querySelector("#view-portfolio-button");

function formatCurrency(value) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0
  }).format(value);
}

function loadInvestmentConfirmation() {
  const savedInvestment =
    localStorage.getItem(INVESTMENT_KEY);

  if (!savedInvestment) {
    window.location.href = "investor.html";
    return;
  }

  try {
    const investment =
      JSON.parse(savedInvestment);

    const investmentAmount =
      Number(investment.amountMxn);

    const ownershipShare =
      investmentAmount / DEMO_PROJECT_AMOUNT;

    const grossTotalReceived =
      DEMO_TOTAL_REPAYMENT * ownershipShare;

    const estimatedFee =
      grossTotalReceived * DEMO_INVESTOR_FEE_RATE;

    const netTotalReceived =
      grossTotalReceived - estimatedFee;

    const monthlyReceipt =
      netTotalReceived / 12;

    const estimatedGain =
      netTotalReceived - investmentAmount;

    const remainingBalance =
      DEMO_AVAILABLE_BALANCE - investmentAmount;


    document.querySelector(
      "#confirmation-investment-amount"
    ).textContent =
      formatCurrency(investmentAmount);


    document.querySelector(
      "#confirmation-monthly-receipt"
    ).textContent =
      formatCurrency(monthlyReceipt);


    document.querySelector(
      "#confirmation-total-receipt"
    ).textContent =
      formatCurrency(netTotalReceived);


    document.querySelector(
      "#confirmation-estimated-gain"
    ).textContent =
      formatCurrency(estimatedGain);


    document.querySelector(
      "#confirmation-remaining-balance"
    ).textContent =
      formatCurrency(remainingBalance);


    document.querySelector(
      "#confirmation-side-balance"
    ).textContent =
      formatCurrency(remainingBalance);

  } catch {
    window.location.href = "investor.html";
  }
}

viewPortfolioButton.addEventListener(
  "click",
  () => {
    window.location.href =
      "investor-portfolio.html";
  }
);

window.addEventListener(
  "DOMContentLoaded",
  loadInvestmentConfirmation
);
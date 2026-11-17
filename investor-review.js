const INVESTMENT_KEY = "fintara.investment";

const DEMO_AVAILABLE_BALANCE = 10000;
const DEMO_PROJECT_AMOUNT = 100000;
const DEMO_TOTAL_REPAYMENT = 110016;
const DEMO_INVESTOR_FEE_RATE = 0.01;

const confirmInvestmentButton =
  document.querySelector("#confirm-investment-button");

const reviewMessage =
  document.querySelector("#review-message");

function formatCurrency(value) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0
  }).format(value);
}

function loadInvestmentReview() {
  const savedInvestment =
    localStorage.getItem(INVESTMENT_KEY);

  if (!savedInvestment) {
    window.location.href = "investor-amount.html";
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
      "#review-investment-amount"
    ).textContent =
      formatCurrency(investmentAmount);


    document.querySelector(
      "#review-remaining-balance"
    ).textContent =
      formatCurrency(remainingBalance);


    document.querySelector(
      "#review-monthly-receipt"
    ).textContent =
      formatCurrency(monthlyReceipt);


    document.querySelector(
      "#review-total-receipt"
    ).textContent =
      formatCurrency(netTotalReceived);


    document.querySelector(
      "#review-estimated-gain"
    ).textContent =
      formatCurrency(estimatedGain);


    document.querySelector(
      "#review-estimated-fee"
    ).textContent =
      formatCurrency(estimatedFee);

  } catch {
    reviewMessage.hidden = false;
    reviewMessage.classList.add(
      "form-message-error"
    );

    reviewMessage.textContent =
      "No fue posible cargar la inversión demo.";

    confirmInvestmentButton.disabled = true;
  }
}

confirmInvestmentButton.addEventListener(
  "click",
  () => {

    const savedInvestment =
      localStorage.getItem(INVESTMENT_KEY);

    if (!savedInvestment) {
      return;
    }

    const investment =
      JSON.parse(savedInvestment);

    investment.status =
      "confirmed";

    localStorage.setItem(
      INVESTMENT_KEY,
      JSON.stringify(investment)
    );

    window.location.href =
      "investor-confirmation.html";
  }
);

window.addEventListener(
  "DOMContentLoaded",
  loadInvestmentReview
);
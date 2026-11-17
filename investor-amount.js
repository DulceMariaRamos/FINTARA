const INVESTMENT_KEY = "fintara.investment";

const DEMO_AVAILABLE_BALANCE = 10000;
const DEMO_PROJECT_AMOUNT = 100000;
const DEMO_TOTAL_REPAYMENT = 110016;
const DEMO_INVESTOR_FEE_RATE = 0.01;

const investmentAmountInput =
  document.querySelector("#investment-amount");

const continueInvestmentButton =
  document.querySelector("#continue-investment-button");

const investmentAmountMessage =
  document.querySelector("#investment-amount-message");

function formatCurrency(value) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0
  }).format(value);
}

function updateInvestmentEstimate() {
  const investmentAmount =
    Number(investmentAmountInput.value);

  if (
    investmentAmount < 500 ||
    investmentAmount > DEMO_AVAILABLE_BALANCE
  ) {
    investmentAmountMessage.hidden = false;
    investmentAmountMessage.classList.add(
      "form-message-error"
    );

    investmentAmountMessage.textContent =
      "Elige un monto entre $500 y $10,000 MXN.";

    continueInvestmentButton.disabled = true;

    return;
  }

  investmentAmountMessage.hidden = true;
  investmentAmountMessage.classList.remove(
    "form-message-error"
  );

  continueInvestmentButton.disabled = false;

  const ownershipShare =
    investmentAmount / DEMO_PROJECT_AMOUNT;

  const grossTotalReceived =
    DEMO_TOTAL_REPAYMENT * ownershipShare;

  const investorFee =
    grossTotalReceived * DEMO_INVESTOR_FEE_RATE;

  const netTotalReceived =
    grossTotalReceived - investorFee;

  const monthlyReceipt =
    netTotalReceived / 12;

  const remainingBalance =
    DEMO_AVAILABLE_BALANCE - investmentAmount;

  document.querySelector(
    "#selected-investment"
  ).textContent =
    formatCurrency(investmentAmount);

  document.querySelector(
    "#remaining-demo-balance"
  ).textContent =
    formatCurrency(remainingBalance);

  document.querySelector(
    "#estimated-monthly-receipt"
  ).textContent =
    formatCurrency(monthlyReceipt);

  document.querySelector(
    "#estimated-total-receipt"
  ).textContent =
    formatCurrency(netTotalReceived);
}

document.querySelectorAll(
  "[data-amount]"
).forEach((button) => {

  button.addEventListener(
    "click",
    () => {
      investmentAmountInput.value =
        button.dataset.amount;

      updateInvestmentEstimate();
    }
  );

});

investmentAmountInput.addEventListener(
  "input",
  updateInvestmentEstimate
);

continueInvestmentButton.addEventListener(
  "click",
  () => {

    const investmentAmount =
      Number(investmentAmountInput.value);

    const investment = {
      projectName:
        "Carpentry Supplies Demo Co.",
      amountMxn:
        investmentAmount,
      termMonths:
        12,
      financingRate:
        0.18,
      estimatedInvestorReturn:
        0.16,
      investorFeeRate:
        0.01,
      demoRiskGrade:
        "A4"
    };

    localStorage.setItem(
      INVESTMENT_KEY,
      JSON.stringify(investment)
    );

    window.location.href =
      "investor-review.html";
  }
);

window.addEventListener(
  "DOMContentLoaded",
  updateInvestmentEstimate
);
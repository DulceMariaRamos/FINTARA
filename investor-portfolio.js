const INVESTMENT_KEY = "fintara.investment";

const DEMO_AVAILABLE_BALANCE = 10000;
const DEMO_PROJECT_AMOUNT = 100000;
const DEMO_TOTAL_REPAYMENT = 110016;
const DEMO_INVESTOR_FEE_RATE = 0.01;

const DEMO_DISBURSEMENT_DATE =
  new Date(2026, 10, 16);

const finishInvestorFlowButton =
  document.querySelector("#finish-investor-flow-button");


function formatCurrency(value) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}


function formatDate(date) {
  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(date);
}


function loadInvestorPortfolio() {

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

    const investorFee =
      grossTotalReceived * DEMO_INVESTOR_FEE_RATE;

    const netTotalReceived =
      grossTotalReceived - investorFee;

    const monthlyReceipt =
      netTotalReceived / 12;

    const remainingBalance =
      DEMO_AVAILABLE_BALANCE - investmentAmount;


    document.querySelector(
      "#portfolio-invested-amount"
    ).textContent =
      formatCurrency(investmentAmount);


    document.querySelector(
      "#portfolio-available-balance"
    ).textContent =
      formatCurrency(remainingBalance);


    document.querySelector(
      "#portfolio-total-return"
    ).textContent =
      formatCurrency(netTotalReceived);


    document.querySelector(
      "#portfolio-project-investment"
    ).textContent =
      formatCurrency(investmentAmount);


    document.querySelector(
      "#portfolio-next-payment"
    ).textContent =
      formatCurrency(monthlyReceipt);


    const firstPaymentDate =
      new Date(DEMO_DISBURSEMENT_DATE);

    firstPaymentDate.setMonth(
      firstPaymentDate.getMonth() + 1
    );


    document.querySelector(
      "#portfolio-next-payment-date"
    ).textContent =
      formatDate(firstPaymentDate);


    createPaymentSchedule(
      monthlyReceipt
    );

  } catch {
    window.location.href = "investor.html";
  }
}


function createPaymentSchedule(monthlyReceipt) {

  const tableBody =
    document.querySelector("#portfolio-payment-table");

  tableBody.innerHTML = "";


  for (
    let paymentNumber = 1;
    paymentNumber <= 12;
    paymentNumber++
  ) {

    const paymentDate =
      new Date(DEMO_DISBURSEMENT_DATE);

    paymentDate.setMonth(
      paymentDate.getMonth() + paymentNumber
    );


    const row =
      document.createElement("tr");


    row.innerHTML = `
      <td>
        <strong>Pago ${paymentNumber}</strong>
      </td>

      <td>
        ${formatDate(paymentDate)}
      </td>

      <td>
        ${formatCurrency(monthlyReceipt)}
      </td>

      <td>
        <span class="payment-status">
          Pendiente
        </span>
      </td>
    `;


    tableBody.appendChild(row);
  }
}


finishInvestorFlowButton.addEventListener(
  "click",
  () => {
    window.location.href = "index.html";
  }
);


window.addEventListener(
  "DOMContentLoaded",
  loadInvestorPortfolio
);
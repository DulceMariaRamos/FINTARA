const FINANCING_REQUEST_KEY = "fintara.financingRequest";

const DEMO_ANNUAL_RATE = 0.18;
const DEMO_PLATFORM_FEE_RATE = 0.04;
const DEMO_DISBURSEMENT_DATE = new Date(
  2026,
  10,
  16
);
const finishBusinessFlowButton = document.querySelector(
  "#finish-business-flow-button"
);

function formatCurrency(value) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0
  }).format(value);
}
function formatDate(date) {
  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(date);
}

function loadRepaymentPlan() {
  const savedRequest = localStorage.getItem(FINANCING_REQUEST_KEY);

  if (!savedRequest) {
    window.location.href = "business.html";
    return;
  }

  try {
    const request = JSON.parse(savedRequest);

    const financedAmount = Number(request.amountMxn);
const termMonths = Number(request.termMonths);

const monthlyRate =
  DEMO_ANNUAL_RATE / 12;
  document.querySelector(
  "#repayment-annual-rate"
).textContent =
  `${(DEMO_ANNUAL_RATE * 100).toFixed(0)}%`;

const monthlyPayment =
  financedAmount *
  (
    monthlyRate /
    (
      1 -
      Math.pow(
        1 + monthlyRate,
        -termMonths
      )
    )
  );

const totalRepayment =
  monthlyPayment * termMonths;

const platformFee =
  financedAmount * DEMO_PLATFORM_FEE_RATE;
const firstPaymentDate =
  new Date(DEMO_DISBURSEMENT_DATE);

firstPaymentDate.setMonth(
  firstPaymentDate.getMonth() + 1
);
    document.querySelector(
      "#repayment-financed-amount"
    ).textContent = formatCurrency(financedAmount);

    document.querySelector(
      "#repayment-monthly-payment"
    ).textContent = formatCurrency(monthlyPayment);

    document.querySelector(
      "#repayment-term"
    ).textContent = `${termMonths} meses`;

    document.querySelector(
  "#repayment-total"
).textContent = formatCurrency(totalRepayment);
document.querySelector(
  "#repayment-platform-fee"
).textContent =
  `${formatCurrency(platformFee)} + IVA`;

    document.querySelector(
      "#next-payment-amount"
    ).textContent = formatCurrency(monthlyPayment);
document.querySelector(
  "#next-payment-date"
).textContent =
  formatDate(firstPaymentDate);
  document.querySelector(
  "#next-payment-number"
).textContent =
  `1 de ${termMonths}`;
  document.querySelector(
  "#repayment-total-payments"
).textContent =
  termMonths;
    document.querySelector(
      "#repayment-business-name"
    ).textContent =
      request.businessName || "Proyecto financiado";

    document.querySelector(
      "#repayment-purpose"
    ).textContent =
      request.purpose || "—";

    createRepaymentSchedule(
      termMonths,
      monthlyPayment
    );

  } catch {
    window.location.href = "business.html";
  }
}

function createRepaymentSchedule(
  termMonths,
  monthlyPayment
) {
  const tableBody = document.querySelector(
    "#repayment-table-body"
  );

  tableBody.innerHTML = "";

  for (
    let paymentNumber = 1;
    paymentNumber <= termMonths;
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
        ${formatCurrency(monthlyPayment)}
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

finishBusinessFlowButton.addEventListener(
  "click",
  () => {
    window.location.href = "index.html";
  }
);

window.addEventListener(
  "DOMContentLoaded",
  loadRepaymentPlan
);
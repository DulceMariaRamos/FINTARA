const SESSION_KEY = "fintara.session";

const DEMO_USERS = [
  {
    email: "empresa@fintara.demo",
    password: "Empresa123",
    role: "business",
    displayName: "SME Owner A"
  },
  {
    email: "inversionista@fintara.demo",
    password: "Investor123",
    role: "investor",
    displayName: "Investor A"
  }
];

const loginForm = document.querySelector("#login-form");
const loginMessage = document.querySelector("#login-message");

function showLoginError(message) {
  loginMessage.textContent = message;
  loginMessage.hidden = false;
}

function saveSession(user) {
  const session = {
    email: user.email,
    role: user.role,
    displayName: user.displayName
  };

  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function redirectUser(user) {
  if (user.role === "business") {
    window.location.href = "business.html";
    return;
  }

  if (user.role === "investor") {
    window.location.href = "investor.html";
  }
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(loginForm);

  const email = String(formData.get("email")).trim().toLowerCase();
  const password = String(formData.get("password"));

  const user = DEMO_USERS.find(
    (demoUser) =>
      demoUser.email === email &&
      demoUser.password === password
  );

  if (!user) {
    showLoginError("Correo o contraseña incorrectos.");
    return;
  }

  saveSession(user);
  redirectUser(user);
});
function getCurrentSession() {
  const savedSession = sessionStorage.getItem(SESSION_KEY);

  if (!savedSession) {
    return null;
  }

  try {
    return JSON.parse(savedSession);
  } catch {
    return null;
  }
}

function requireRole(requiredRole) {
  const session = getCurrentSession();

  if (!session) {
    window.location.href = "login.html";
    return;
  }

  if (session.role !== requiredRole) {
    if (session.role === "business") {
      window.location.href = "business.html";
      return;
    }

    if (session.role === "investor") {
      window.location.href = "investor.html";
      return;
    }

    window.location.href = "login.html";
  }
}
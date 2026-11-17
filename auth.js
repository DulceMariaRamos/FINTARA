const SESSION_KEY = "fintara.session";

const loginForm = document.querySelector("#login-form");
const loginMessage = document.querySelector("#login-message");

function showLoginError(message) {
  if (!loginMessage) {
    return;
  }

  loginMessage.textContent = message;
  loginMessage.hidden = false;
}

function saveSession(user) {
  const session = {
    role: user.role,
    displayName: user.displayName
  };

  sessionStorage.setItem(
    SESSION_KEY,
    JSON.stringify(session)
  );
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

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (loginMessage) {
      loginMessage.hidden = true;
    }

    const formData = new FormData(loginForm);

    const email = String(
      formData.get("email") || ""
    )
      .trim()
      .toLowerCase();

    const password = String(
      formData.get("password") || ""
    );

    try {
      const response = await fetch(
        "/.netlify/functions/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const result = await response.json();

      if (!response.ok) {
        showLoginError(
          result.message ||
            "Correo o contraseña incorrectos."
        );
        return;
      }

      saveSession(result);
      redirectUser(result);
    } catch {
      showLoginError(
        "No fue posible iniciar sesión. Intenta de nuevo."
      );
    }
  });
}

function getCurrentSession() {
  const savedSession =
    sessionStorage.getItem(SESSION_KEY);

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
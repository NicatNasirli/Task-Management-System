async function handleSignUp(event) {
  event.preventDefault();
  const username = document.querySelector("input[placeholder='Username']").value;
  const password = document.querySelector("input[placeholder='Password']").value;

  const response = await fetch("http://localhost:8080/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const message = await response.text();
  alert(message);
}

document.querySelector("form").addEventListener("submit", handleSignUp);
  
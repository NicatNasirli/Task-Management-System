document.getElementById('signUpForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch("http://localhost:8080/api/user", {
        method: 'POST',
        headers: {
            "Content-Type": "application/JSON",
        },
        body: JSON.stringify({
            username,
            email,
            password,
        })
    }
    )
        .then((response) => response.json())
        .then((data) => {
            console.log("Response from server:", data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
})



document.getElementById('signInForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch("http://localhost:8080/api/user", {
        method: 'POST',
        headers: {
            "Content-Type": "application/JSON",
        },
        body: JSON.stringify({
            username,
            email,
            password,
        })
    }
    )
        .then((response) => response.json())
        .then((data) => {
            console.log("Response from server:", data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
})
document.getElementById('signUpForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch("http://localhost:8080/api/user/signUp", {
        method: 'POST',
        headers: {
            "Content-Type": "application/JSON",
        },
        body: JSON.stringify({
            name,
            username,
            email,
            password,
        })
    })
        .then((data) => {
            console.log("Response from server:", data);
            alert("Signed Up!")

            window.location.href = './signin.html';
        })
        .catch((error) => {
            console.error("Error:", error);
        });
})




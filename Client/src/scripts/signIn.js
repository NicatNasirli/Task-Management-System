document.getElementById('signInForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch("http://localhost:8080/api/user/signIn", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email.trim(),
            password: password.trim(),
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log("Response from server:", data);
            alert("Sign-in successful!");
            
            localStorage.setItem('currentUserId', JSON.stringify(data.id));
            
            window.location.href = './dashboard.html';
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Sign-in failed. Please check your credentials.");
        });
});

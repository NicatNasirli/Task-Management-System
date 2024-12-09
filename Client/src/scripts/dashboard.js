function createDiv() {
    const data = retrieveTask();
    const [title, body] = data;

    const taskHolder = document.getElementById('taskHolder');

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.className = 'checkbox';

    const taskTitle = document.createElement('div');
    taskTitle.textContent = title;
    taskTitle.className = 'taskTitle';


    taskHolder.appendChild(input)
    taskHolder.appendChild(taskTitle);

}

function retrieveTask() {
    let task = ["Gym", "Go to the gym"];
    return task;
}

function getUserName() {
    return fetch("http://localhost:8080/api/user/8", {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        console.log("Response from server:", data);
        return data.name; 
    })
    .catch((error) => {
        console.error("Error:", error);
        throw error;
    });
}
async function updateGreeting() {
    try {
        const name = await getUserName(); 
        const welcomingElement = document.getElementById('welcoming');
        welcomingElement.textContent = `Hello, ${name}`; 
    } catch (error) {
        console.error("Failed to retrieve username:", error);
    }
}

updateGreeting();


createDiv();



function toggleAddTaskSection() {
    const addTaskSection = document.querySelector('.addTaskSection');
    addTaskSection.style.display = (addTaskSection.style.display === 'none' || addTaskSection.style.display === '') ? 'block' : 'none';
}


function createDivForTask(task) {
    const { title } = task;
    const tasksHolder = document.getElementById('tasks');
    const taskHolder = document.createElement('div');
    taskHolder.className = 'taskHolder';

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.className = 'checkbox';

    const taskTitle = document.createElement('div');
    taskTitle.textContent = title;
    taskTitle.className = 'taskTitle';

    taskHolder.appendChild(input);
    taskHolder.appendChild(taskTitle);
    tasksHolder.appendChild(taskHolder);
}


function updateGreeting(name) {
    const welcomingElement = document.getElementById('welcoming');
    welcomingElement.textContent = `Hello, ${name}!`;
}



async function loadUserData(currentUserId) {
    if (!currentUserId) {
        alert("No user ID found. Please log in again.");
        window.location.href = './signin.html';
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/api/user/${currentUserId}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        });
        const userData = await response.json();
        updateGreeting(userData.name);

        const tasks = userData.tasks || [];
        tasks.forEach(task => {
            createDivForTask(task);
        });

    } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Failed to load user data. Please try again.");
        window.location.href = './signin.html';
    }
}



async function submitTaskForm(event) {
    event.preventDefault();

    const currentUserId = localStorage.getItem('currentUserId');
    const taskTitle = document.getElementById('taskTitle').value.trim();
    const taskDescription = document.getElementById('taskDescription').value.trim();
    const dueDate = document.getElementById('dueDate').value.trim();
    const priority = document.getElementById('selectPriority').value;

    try {
        const response = await fetch('http://localhost:8080/api/task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: taskTitle,
                description: taskDescription,
                deadline: dueDate,
                status: "Undone",
                priority: priority,
                userId: JSON.parse(currentUserId),
            }),
        });
        
        alert('Task added successfully!');

        document.getElementById('addTaskForm').reset();


    } catch (error) {
        console.error('Error adding task:', error);
        alert('Failed to add task. Please try again.');
    }
}


async function deleteAll(event) {
    event.preventDefault();

    const currentUserId = localStorage.getItem('currentUserId');
    const userId = JSON.parse(currentUserId);

    try {
        const response = await fetch(`http://localhost:8080/api/task/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log("Tasks are deleted!");
        alert('Tasks are deleted successfully!');


    } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete task. Please try again.');
    }
}



const currentUserId = localStorage.getItem('currentUserId');

console.log(currentUserId);

document.addEventListener('DOMContentLoaded', loadUserData(JSON.parse(currentUserId)));
document.getElementById('addTaskForm').addEventListener('submit', submitTaskForm);
document.getElementById('addTask').addEventListener('click', toggleAddTaskSection);
document.getElementById('deleteAll').addEventListener('click', deleteAll);



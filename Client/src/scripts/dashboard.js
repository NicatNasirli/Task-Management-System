

function toggleAddTaskSection() {
    const addTaskSection = document.querySelector('.addTaskSection');
    addTaskSection.style.display = (addTaskSection.style.display === 'none' || addTaskSection.style.display === '') ? 'block' : 'none';
}


function createDivForTask(task) {
    console.log(task);
    
    const {title,id,status} = task;
    const tasksHolder = document.getElementById('tasks');

    const taskHolder = document.createElement('div');
    taskHolder.className = 'taskHolder';
    taskHolder.id = `taskHolder${id}`;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    checkbox.checked = status === "done"
    checkbox.id = `checkbox${id}`;

    checkbox.addEventListener('change', () => updateTaskStatus(id, checkbox.checked));


    const taskTitle = document.createElement('div');
    taskTitle.textContent = title;
    taskTitle.className = 'taskTitle';
    taskTitle.id = `title${id}`;


    taskHolder.appendChild(checkbox);
    taskHolder.appendChild(taskTitle);
    tasksHolder.appendChild(taskHolder);
}




async function updateTaskStatus(taskId, isDone) {
    const status = isDone ? "done" : "undone";

    try {
        await fetch(`http://localhost:8080/api/task/${taskId}?status=${status}`, {
            method: "PUT", 
        });


    } catch (error) {
        console.error(`Error updating task ${taskId}:`, error);
    }
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



async function addTaskForm(event) {
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


document.addEventListener('DOMContentLoaded', loadUserData(JSON.parse(currentUserId)));
document.getElementById('addTaskForm').addEventListener('submit', addTaskForm);
document.getElementById('addTask').addEventListener('click', toggleAddTaskSection);
document.getElementById('deleteAll').addEventListener('click', deleteAll);



const currentUserId = localStorage.getItem('currentUserId');



function toggleAddTaskSection() {
    const addTaskSection = document.querySelector('.addTaskSection');
    addTaskSection.style.display = (addTaskSection.style.display === 'none' || addTaskSection.style.display === '') ? 'block' : 'none';
}


function createDivForTask(task) {

    const { title, id, status } = task;
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

    taskTitle.addEventListener('click', () => openTaskDetails(id));

    taskHolder.appendChild(checkbox);
    taskHolder.appendChild(taskTitle);
    tasksHolder.appendChild(taskHolder);
}



async function openTaskDetails(id) {
    try {
        const response = await fetch(`http://localhost:8080/api/task/${id}`, {
            method: "GET",
        });

        const task = await response.json();

        const { title, description, status, deadline, priority } = task;

        const taskContent = document.createElement('div');
        taskContent.className = 'taskContent';

        taskContent.innerHTML = `
    <h3>Task Details</h3>
    <p><strong>Title:</strong></p>
    <input type="text" class="editTitle" value="${title}" />
    <p><strong>Description:</strong></p>
    <textarea class="editDescription">${description}</textarea>
    <p><strong>Status:</strong></p>
    <select class="editStatus">
        <option value="undone" ${status === "undone" ? "selected" : ""}>Undone</option>
        <option value="done" ${status === "done" ? "selected" : ""}>Done</option>
    </select>
    <p><strong>Deadline:</strong></p>
    <input type="date" class="editDeadline" value="${deadline}" />
    <p><strong>Priority:</strong></p>
    <select class="editPriority">
        <option value="URGENT" ${priority === "URGENT" ? "selected" : ""}>URGENT</option>
        <option value="HIGH" ${priority === "HIGH" ? "selected" : ""}>HIGH</option>
        <option value="MEDIUM" ${priority === "MEDIUM" ? "selected" : ""}>MEDIUM</option>
        <option value="LOW" ${priority === "LOW" ? "selected" : ""}>LOW</option>
    </select>
    <div class="buttons">
        <button class="saveButton">Save</button>
        <button class="deleteButton">Delete</button>
    </div>
`;

        const tasksHolder = document.getElementById('tasks');
        tasksHolder.appendChild(taskContent);

        const closeDetails = (event) => {
            if (!taskContent.contains(event.target)) {
                tasksHolder.removeChild(taskContent);
                document.removeEventListener('click', closeDetails);
            }
        };

        document.addEventListener('click', closeDetails);


        const saveButton = taskContent.querySelector('.saveButton');
        saveButton.addEventListener('click', async () => {
            const updatedTitle = taskContent.querySelector('.editTitle').value;
            const updatedDescription = taskContent.querySelector('.editDescription').value;
            const updatedStatus = taskContent.querySelector('.editStatus').value;
            const updatedDeadline = taskContent.querySelector('.editDeadline').value;
            const updatedPriority = taskContent.querySelector('.editPriority').value;

            const updatedTask = {
                id:id,
                title: updatedTitle,
                description: updatedDescription,
                status: updatedStatus,
                deadline: updatedDeadline,
                priority: parseInt(updatedPriority),
            };

            try {
                await fetch(`http://localhost:8080/api/task/update/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedTask),
                });
                alert('Task updated successfully!');
                tasksHolder.removeChild(taskContent);
            } catch (error) {
                console.error('Error updating task:', error);
                alert('Failed to update task. Please try again.');
            }
        });
        
        const deleteButton = taskContent.querySelector('.deleteButton');
        deleteButton.addEventListener('click', async () => {
            const confirmed = confirm('Are you sure you want to delete this task?');
            if (confirmed) {
                await fetch(`http://localhost:8080/api/task/${id}`, {
                    method: 'DELETE',
                });
                tasksHolder.removeChild(taskContent);
                alert('Task deleted successfully!');
            }
        });
    } catch (error) {
        console.error(`Error fetching task ${id}:`, error);
    }
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

function updateProgress() {
    const percentageComplete = document.getElementById('percentageComplete');
    const percentageActive = document.getElementById('percentageActive');

    const tasks = JSON.parse(localStorage.getItem('dashboardTasks')) || [];
    console.log(tasks);

    if (tasks.length === 0) {
        console.log("No tasks found in local storage.");
    } else {
        const totalTasks = tasks.length;
        const doneTasks = tasks.filter(task => task.status === "done").length;
        const undoneTasks = totalTasks - doneTasks;
        
        const donePercentage = Math.round((doneTasks / totalTasks) * 100);
        const undonePercentage = Math.round((undoneTasks / totalTasks) * 100);
    
        percentageComplete.textContent = `${donePercentage}%`;
        percentageActive.textContent = `${undonePercentage}%`;

    }
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
        return tasks;

    } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Failed to load user data. Please try again.");
        window.location.href = './signin.html';
    }
}

async function activeUserTasks(currentUserId) {
    const tasks = await loadUserData(currentUserId);
    const activeTasks = [];
    tasks.forEach(task => {
        if (task.status !== "done") {
            createDivForTask(task);
            activeTasks.push(task);
        }
    });
    localStorage.setItem('activeTasks', activeTasks);

}

async function completedTasks(currentUserId) {
    const tasks = await loadUserData(currentUserId);
    const completedTasks = [];
    tasks.forEach(task => {
        if (task.status === "done") {
            createDivForTask(task);
            completedTasks.push(task);
        }
    });
    localStorage.setItem('completeTasks', completedTasks);

}

async function dashboardTasks(currentUserId) {
    const tasks = await loadUserData(currentUserId);
    const dashboardTasks = [];
    tasks.forEach(task => {
        createDivForTask(task);
        dashboardTasks.push(task);
    });
    localStorage.setItem('dashboardTasks', JSON.stringify(dashboardTasks));

    updateProgress();
}

async function deleteTasks(status) {
    const currentUserId = localStorage.getItem('currentUserId');
    const userId = JSON.parse(currentUserId);

    const confirmation = confirm(`Are you sure you want to delete all?`);

    if (!confirmation) {
        return;
    }

    try {
        await fetch(`http://localhost:8080/api/task/deleteAllByStatus/${userId}?status=${status}`, {
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
                status: "undone",
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

    const confirmation = confirm(`Are you sure you want to delete all?`);

    if (!confirmation) {
        return;
    }


    try {
        await fetch(`http://localhost:8080/api/task/deleteAllByUserId/${userId}`, {
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




document.getElementById('addTaskForm').addEventListener('submit', addTaskForm);
document.getElementById('addTask').addEventListener('click', toggleAddTaskSection);

if (document.body.id === 'activeTasks') {
    document.addEventListener("DOMContentLoaded", () => activeUserTasks(currentUserId));
    document.getElementById('deleteAll').onclick = () => deleteTasks("undone");
} else if (document.body.id === 'completedTasks') {
    document.addEventListener("DOMContentLoaded", () => completedTasks(currentUserId));
    document.getElementById('deleteAll').onclick = () => deleteTasks("done");
} else {
    document.addEventListener("DOMContentLoaded", () => dashboardTasks(currentUserId));
    document.getElementById('deleteAll').addEventListener('click', deleteAll);
}




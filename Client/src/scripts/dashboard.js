
function toggleAddTaskSection() {
    const addTaskSection = document.querySelector('.addTaskSection');
    addTaskSection.style.display = (addTaskSection.style.display === 'none' || addTaskSection.style.display === '') ? 'block' : 'none';
  }
  
  document.getElementById('addTask').addEventListener('click', toggleAddTaskSection);
  


async function retrieveUserData() {
    try {
        const response = await fetch("http://localhost:8080/api/user/2", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        });

        const userData = await response.json();
        return userData;

    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
}



async function createDivForTask(task) {
    const { title } = task; 

    const tasksHolder = document.getElementById('tasks')

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


async function printUserData(){
    const userData = await retrieveUserData();
    const tasks = userData.tasks 

    updateGreeting(userData.name);

    tasks.forEach(task => {
        createDivForTask(task);
    });

    return userData.id;
}

async function updateGreeting(name) {
    try {
        const welcomingElement = document.getElementById('welcoming');
        welcomingElement.textContent = `Hello, ${name}!`; 
    } catch (error) {
        console.error("Failed to retrieve username:", error);
    }
}



const currentUserId = printUserData();
console.log(currentUserId)

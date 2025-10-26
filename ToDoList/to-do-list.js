// Get elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task on button click
addBtn.addEventListener('click', addTask);

// Add task on Enter key press
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// CREATE - Add new task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    // Save to localStorage
    saveTaskToLocalStorage(task);

    // Display task
    displayTask(task);

    // Clear input
    taskInput.value = '';
    taskInput.focus();
}

// READ - Display task in UI
function displayTask(task) {
    // Remove empty message if it exists
    const emptyMessage = taskList.querySelector('.empty-message');
    if (emptyMessage) {
        emptyMessage.remove();
    }

    const li = document.createElement('li');
    li.className = 'task-item';
    li.dataset.id = task.id;

    li.innerHTML = `
        <div class="task-content">
            <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
        </div>
        <div class="task-actions">
            <button class="complete-btn">${task.completed ? 'Undo' : 'Complete'}</button>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    // Complete button
    const completeBtn = li.querySelector('.complete-btn');
    completeBtn.addEventListener('click', () => toggleComplete(task.id));

    // Edit button
    const editBtn = li.querySelector('.edit-btn');
    editBtn.addEventListener('click', () => editTask(task.id));

    // Delete button
    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => deleteTask(task.id));

    taskList.appendChild(li);
}

// UPDATE - Toggle task completion
function toggleComplete(id) {
    const tasks = getTasksFromLocalStorage();
    const task = tasks.find(t => t.id === id);

    if (task) {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        refreshTaskList();
    }
}

// UPDATE - Edit task
function editTask(id) {
    const tasks = getTasksFromLocalStorage();
    const task = tasks.find(t => t.id === id);

    if (!task) return;

    const taskItem = document.querySelector(`[data-id="${id}"]`);
    const taskContent = taskItem.querySelector('.task-content');
    const taskActions = taskItem.querySelector('.task-actions');

    // Create edit input
    taskContent.innerHTML = `
        <input type="text" class="edit-input" value="${task.text}">
    `;

    // Create save and cancel buttons
    taskActions.innerHTML = `
        <button class="save-btn">Save</button>
        <button class="cancel-btn">Cancel</button>
    `;

    const editInput = taskContent.querySelector('.edit-input');
    const saveBtn = taskActions.querySelector('.save-btn');
    const cancelBtn = taskActions.querySelector('.cancel-btn');

    editInput.focus();
    editInput.select();

    // Save on button click
    saveBtn.addEventListener('click', () => {
        const newText = editInput.value.trim();
        if (newText === '') {
            alert('Task cannot be empty!');
            return;
        }
        task.text = newText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        refreshTaskList();
    });

    // Save on Enter key
    editInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            saveBtn.click();
        }
    });

    // Cancel editing
    cancelBtn.addEventListener('click', () => {
        refreshTaskList();
    });
}

// DELETE - Remove task
function deleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        let tasks = getTasksFromLocalStorage();
        tasks = tasks.filter(t => t.id !== id);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        refreshTaskList();
    }
}

// LocalStorage functions
function saveTaskToLocalStorage(task) {
    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => displayTask(task));

    if (tasks.length === 0) {
        showEmptyMessage();
    }
}

function refreshTaskList() {
    taskList.innerHTML = '';
    loadTasks();
}

function showEmptyMessage() {
    taskList.innerHTML = '<div class="empty-message">No tasks yet. Add one to get started!</div>';
}

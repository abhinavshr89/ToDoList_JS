const addButton = document.querySelector(".add-btn");
const taskContainer = document.querySelector(".task-container");
const taskInput = document.querySelector("#task-input");
const popupBox = document.querySelector(".popup-box");
let isEditing = false;

// Load tasks from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});

addButton.addEventListener("click", () => {
    let newTask = taskInput.value;
    if (newTask == "") {
        alert("Please enter a valid task!");
    } else {
        const taskLine = document.createElement("div");
        taskLine.classList.add("col-12", "p-3", "task-line");

        const inputField = document.createElement("input");
        inputField.classList.add("input");
        inputField.type = "text";
        inputField.value = newTask;
        inputField.setAttribute("readonly", true);

        const editButton = document.createElement("button");
        editButton.classList.add("edit-btn");
        editButton.textContent = "Edit";
        editButton.onclick = () => editTask(taskLine);

        const saveButton = document.createElement("button");
        saveButton.classList.add("save-btn");
        saveButton.textContent = "Save";
        saveButton.onclick = () => saveTask(taskLine);

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteTask(taskLine);

        taskLine.appendChild(inputField);
        taskLine.appendChild(editButton);
        taskLine.appendChild(saveButton);
        taskLine.appendChild(deleteButton);

        taskContainer.appendChild(taskLine);

        taskInput.value = "";
    }
});

function editTask(taskLine) {
    if (isEditing) {
        alert("Please finish editing the current task before editing another one.");
        return;
    }

    const inputField = taskLine.querySelector("input");
    const saveButton = taskLine.querySelector(".save-btn");

    // Toggle visibility of buttons
    taskLine.querySelector(".edit-btn").style.display = "none";
    saveButton.style.display = "block";

    // Enable input for editing
    inputField.removeAttribute("readonly");
    inputField.focus();

    isEditing = true;
}

function saveTask(taskLine) {
    const inputField = taskLine.querySelector("input");

    // Toggle visibility of buttons
    taskLine.querySelector(".edit-btn").style.display = "block";
    taskLine.querySelector(".save-btn").style.display = "none";
    popupBox.style.display = "block";
    setTimeout(() => {
        popupBox.style.display = "none";
    }, 500);

    // Disable input after saving
    inputField.setAttribute("readonly", true);

    isEditing = false;
}

function deleteTask(taskLine) {
    taskLine.remove();
    isEditing = false;
}

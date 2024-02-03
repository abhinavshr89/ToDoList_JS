const addButton = document.querySelector(".add-btn");
const taskContainer = document.querySelector(".task-container");
const taskInput = document.querySelector("#task-input");
const popupBox = document.querySelector(".popup-box");



// Load tasks from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});

addButton.addEventListener("click", () => {
    let newTask = taskInput.value;
    if (newTask == "") {
        alert("Please enter a valid task!");
    } else {
        taskContainer.innerHTML += `
            <div class="col-12 p-3 task-line">
                <input class="input" type="text" value="${newTask}" readonly>
                <button id="edit-btn" class="edit-btn" onclick="editTask(this)">Edit</button>
                <button class="save-btn">Save</button>
                <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
            </div>
        `;

        taskInput.value = "";
    }
});
var isEditing = false;

taskContainer.addEventListener("click", (e) => {
    const targetButton = e.target;
    const parentOfButton = targetButton.parentElement;

    const targetedInput = parentOfButton.querySelector("input");
    const saveButton = parentOfButton.querySelector(".save-btn");

    if (targetButton.classList.contains("edit-btn")) {
        if (isEditing) {
            alert("Please finish editing the current task before editing another one.");
            return;
        }

        // Toggle visibility of buttons
        targetButton.style.display = "none";
        saveButton.style.display = "block";

        // Enable input for editing
        targetedInput.removeAttribute("readonly");
        targetedInput.focus();

        isEditing = true;
    } else if (targetButton.classList.contains("save-btn")) {
        // Toggle visibility of buttons
        const editBtn = parentOfButton.querySelector(".edit-btn");
        editBtn.style.display = "block";
        saveButton.style.display = "none";
        popupBox.style.display="block";
        setTimeout(()=>{
            popupBox.style.display="none";
        },500);
        // Disable input after saving
        targetedInput.setAttribute("readonly", true);

        isEditing = false;
    } else if (targetButton.classList.contains("delete-btn")) {
        // Remove the task
        parentOfButton.remove();
        isEditing = false;
    }
});

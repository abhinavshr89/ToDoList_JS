const addButton = document.querySelector(".add-btn");
const taskContainer = document.querySelector(".task-container");
const taskInput = document.querySelector("#task-input");
const popupBox = document.querySelector(".popup-box");

let isEditing = false; // Flag to track whether an edit is in progress

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
                <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
            </div>
        `;

        taskInput.value = "";
    }
});

//editTask(this)-> here "this" is used to pass the reference of the button clicked to the function 
// using onclick function for edit and delete button
function editTask(button) {
    if (isEditing) {
        alert("Please save the current task before editing another one.");
        return;
    }

    isEditing = true;

    const parentOfButton = button.parentElement;
    const targetedInput = parentOfButton.querySelector("input");

    targetedInput.removeAttribute("readonly");
    targetedInput.focus();

    button.style.backgroundColor = "lightgreen";
    button.textContent = "Save";

    button.onclick = function () {
        targetedInput.setAttribute("readonly", true);
        isEditing = false; // Reset the flag
        button.style.backgroundColor = "lightblue";
        button.textContent = "Edit";
       
        console.log("Task updated:", targetedInput.value);

        popupBox.style.display = "block";
        setTimeout(() => {
            popupBox.style.display = "none";
        }, 1000);
    };
}

function deleteTask(button) {
    const parentOfButton = button.parentElement;
    parentOfButton.remove();
}

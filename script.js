const addButton = document.querySelector(".add-btn");
const taskContainer = document.querySelector(".task-container");
const taskInput = document.querySelector("#task-input");

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
                <input type="text" value="${newTask}" readonly>
                <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
       
        taskInput.value = ""; 

       
        saveTasks();
    }
});

// using event delegation here 
taskContainer.addEventListener("click", (e) => {
    const targetButton = e.target;
    const parent = targetButton.parentElement;

    if (targetButton.classList.contains("edit-btn")) {
        const targetInput = parent.querySelector("input");
        targetInput.removeAttribute("readonly");
        targetInput.focus();

        const handleEnterKey = (event) => {
            if (event.key === "Enter") {
                targetInput.setAttribute("readonly", true);
                targetInput.removeEventListener("keyup", handleEnterKey);
                // Save tasks to localStorage after editing
                saveTasks();
            }
        };

        targetInput.addEventListener("keyup", handleEnterKey);
    } else if (targetButton.classList.contains("delete-btn")) {
        parent.remove();
        // Save tasks to localStorage after deletion
        saveTasks();
    }
});








// Function to save tasks to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll(".task-line input").forEach((input) => {
        tasks.push(input.value);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        tasks.forEach((task) => {
            taskContainer.innerHTML += `
                <div class="col-12 p-3 task-line">
                    <input type="text" value="${task}" readonly>
                    <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;
        });
    }
}

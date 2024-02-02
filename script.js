const addButton = document.querySelector(".add-btn");
const taskContainer = document.querySelector(".task-container");
const taskInput = document.querySelector("#task-input");
const mainRow = document.querySelector(".mainrow")
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
                <button id="edit-btn" class="edit-btn">Edit</i></button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        taskInput.value = "";
    }
});

// using event delegation here
taskContainer.addEventListener('click', (e) => {
    const targetButton = e.target;
    const parentOfTarget = targetButton.parentElement;
    const mainParent = parentOfTarget.parentElement; // Fix: use parentElement instead of parent
    const targetedInput = parentOfTarget.querySelector("input");

    if (targetButton.classList.contains("edit-btn")) {
        targetedInput.removeAttribute("readonly");
        targetedInput.focus();

        const handleEnterKey = (event) => {
            if (event.key === "Enter") {
                targetedInput.setAttribute("readonly", true);
                targetedInput.removeEventListener("keyup", handleEnterKey);

                // Additional logic when Enter key is pressed (e.g., save to localStorage)
                console.log("Task updated:", targetedInput.value);

                popupBox.style.display ="block";
                setTimeout(() => {
                popupBox.style.display ="none";
                    
                }, 1000);
            }
        };

        targetedInput.addEventListener("keyup", handleEnterKey);
    }
    if(targetButton.classList.contains("delete-btn")){
        parentOfTarget.remove();
    }
});

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



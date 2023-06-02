let containerList = [];

function generateContainerId() {
    const timestamp = Date.now();
    return `container_${timestamp}`;
}

function createCalendar() {
    const calendarElement = document.getElementById("calendar");
    const currentDate = new Date().getDay();
    weekArray = new Array(
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    );

    const calendarHeader = document.getElementById("calendarHeader");
    calendarHeader.innerText = weekArray[currentDate];

    const calendarDate = document.getElementById("calendarDate");
    calendarDate.innerText = new Date().getDate();
}

function changeBackground(className) {
    const bodyClassList = document.body.classList;

    bodyClassList.forEach((name) => {
        bodyClassList.remove(name);
    });
    document.body.classList.add(className);
}

const colourButtons = document.querySelectorAll(".colours");

colourButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const className = button.id;
        changeBackground(className);
    });
});

function listItem(taskValue) {
    // Create a new list item
    const taskLi = document.createElement("li");
    taskLi.className = "taskLi";

    // Create span for checkbox and text for styling
    const span = document.createElement("span");
    span.className = "checkboxAndInputField";

    // Create checkbox element
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    // Create input element
    const input = document.createElement("input");
    input.type = "text";
    input.value = taskValue;
    input.className = "taskInputField";

    input.addEventListener("input", function () {
        task.value = input.value;
    });

    // Adding checkbox and input to span
    span.appendChild(checkbox);
    span.appendChild(input);
    taskLi.appendChild(span);

    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    const trashCan = document.createElement("span");
    trashCan.className = "material-symbols-rounded";
    trashCan.textContent = "delete";
    deleteButton.appendChild(trashCan);

    taskLi.appendChild(deleteButton);

    function attachDeleteListener() {
        deleteButton.addEventListener("click", function () {
            // Remove the parent <li> element from the DOM
            if (taskLi.parentNode.children.length > 1) {
                taskLi.parentNode.removeChild(taskLi);
            }
        });
    }

    attachDeleteListener();

    return taskLi;
}

function attachEventListenersToInputs() {
    const taskInputFields = document.querySelectorAll(".taskInputField");
    const deleteButtons = document.querySelectorAll(".delete");

    for (let i = 0; i < taskInputFields.length; i++) {
        taskInputFields[i].addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                addTask();
            }
        });
    }

    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", function () {
            const taskLi = deleteButtons[i].closest(".taskLi");
            // Check if it is the last item
            if (taskLi.parentNode.children.length > 1) {
                // Remove the parent <li> element from the DOM
                taskLi.parentNode.removeChild(taskLi);
            } else {
                const taskLi = deleteButtons[i].closest(".taskLi");
                const inputField = taskLi.querySelector(".taskInputField");
                inputField.value = "";
            }
        });
    }
}

function attachContainerDeleteListener(containerDiv) {
    const containerDeleteButton = containerDiv.querySelector(
        ".containerDeleteButton"
    );
    containerDeleteButton.addEventListener("click", function () {
        containerDiv.parentNode.removeChild(containerDiv);
    });
}

function addNewContainer() {
    const containerDiv = document.createElement("div");
    const containerId = generateContainerId();

    containerDiv.id = containerId;
    containerDiv.className = "container";

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "buttonContainer";

    const containerDeleteButton = document.createElement("button");
    containerDeleteButton.className = "containerDeleteButton";
    const x = document.createElement("span");
    x.className = "material-symbols-rounded";
    x.textContent = "close";

    containerDeleteButton.appendChild(x);
    buttonContainer.appendChild(containerDeleteButton);
    containerDiv.appendChild(buttonContainer);

    attachContainerDeleteListener(containerDiv);

    const h2 = document.createElement("h2");
    h2.textContent = "Enter Text";
    h2.contentEditable = "true";
    h2.className = "additionalContainer";

    containerDiv.appendChild(h2);

    const taskBoxDiv = document.createElement("div");
    taskBoxDiv.className = "taskBox";

    const ul = document.createElement("ul");
    ul.className = "taskList";

    // Create three list items using listItem function and add them to the ul
    for (let i = 0; i < 3; i++) {
        const taskLi = listItem("");
        ul.appendChild(taskLi);
    }

    taskBoxDiv.appendChild(ul);
    containerDiv.appendChild(taskBoxDiv);

    const notesContainer = document.getElementById("notesContainer");
    notesContainer.appendChild(containerDiv);

    const addNewContainerButton = document.getElementById("addNewContainer");
    notesContainer.insertBefore(containerDiv, addNewContainerButton);

    attachEventListenersToInputs();

    const container = {
        id: containerId,
        title: "Enter Text",
        tasks: [],
    };

    containerList.push(container);
}

function addTask() {
    const taskInputField = document.activeElement;
    const taskInputFieldValue = taskInputField.value.trim();

    if (taskInputFieldValue === "") {
        return;
    }

    const task = {
        value: taskInputFieldValue,
        completed: false,
    };

    const containerDiv = taskInputField.closest(".container");
    const containerIndex = Array.from(containerDiv.parentNode.children).indexOf(
        containerDiv
    );
    containerList[containerIndex].tasks.push(task);

    containerList(task);

    const taskLi = listItem(taskInputFieldValue);

    // Find the parent <ul> element of the active task input
    const ul = taskInputField.closest("ul");

    // Insert the new taskLi after the active task input's parent <li> element
    ul.insertBefore(taskLi, taskInputField.closest("li").nextSibling);

    // Clear the input field
    taskInputField.value = "";
    // Focus on the input field
    taskInputField.focus();
}

const newContainer = document.getElementById("addNewContainer");
newContainer.addEventListener("click", function () {
    console.log("you made it here");
    event.preventDefault();
    addNewContainer();
});

// Assign taskList variable after the DOM is loaded
window.addEventListener("DOMContentLoaded", function () {
    attachEventListenersToInputs(); // Attach event listeners to the existing inputs
    createCalendar();
});

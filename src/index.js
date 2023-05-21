import _ from "lodash";
import * as variables from "./modules/variables";
import * as taskManager from "./modules/taskManager";
import * as modal from "./modules/modal";
import * as eventHandlers from "./modules/eventHandlers";

// Perform initial setup when the window loads
window.addEventListener("load", () => {
  // Set up the task elements based on the initial tasks array
  taskManager.setupTaskElements(variables.tasks);
});

// Add event listeners for various UI elements and their corresponding event handlers

// Task button click event
variables.addTaskButton.addEventListener(
  "click",
  eventHandlers.handleTaskButtonClick
);

// Task title input keypress event
variables.taskTitleInput.addEventListener(
  "keypress",
  eventHandlers.handleTitleKeyPress
);

// Task date input click event
variables.taskDateInput.addEventListener(
  "click",
  eventHandlers.handleDateClick
);

// Task priority input click event
variables.taskPriorityInput.addEventListener(
  "click",
  eventHandlers.handlePriorityClick
);

// Task project input keypress event
variables.taskProjectInput.addEventListener(
  "keypress",
  eventHandlers.handleProjectKeyPress
);

// Close modal button click event
variables.closeModalButton.addEventListener("click", modal.closeModal);

// Create task button click event
variables.createTaskButton.addEventListener(
  "click",
  eventHandlers.handleCreateTaskClick
);

// All tasks button click event
variables.allTasksButton.addEventListener(
  "click",
  eventHandlers.handleAllTasksClick
);

// Today's tasks button click event
variables.todaysTasksButton.addEventListener(
  "click",
  eventHandlers.handleTodaysTasksClick
);

// Weekly tasks button click event
variables.weeklyTasksButton.addEventListener(
  "click",
  eventHandlers.handleWeeklyTasksClick
);

// Project tasks button click event
variables.projectTasksButton.addEventListener(
  "click",
  eventHandlers.handleProjectTasksClick
);

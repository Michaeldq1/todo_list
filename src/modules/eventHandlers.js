import * as variables from "./variables";
import { validateAllInputs } from "./validations";
import { toggleSelection, clearContainer } from "./domManager";
import * as taskManager from "./taskManager";
import * as dataStorage from "./dataStorage";
import { toggleModal, closeModal } from "./modal";

///Event handler for the task button click. Toggles the visibility of the task modal, updates the task modal title, and disables the create task button.
const handleTaskButtonClick = () => {
  toggleModal(
    variables.taskModal,
    variables.taskModalTitle,
    variables.taskModalDefaultTitle
  );
  variables.createTaskButton.classList.add("disabled");
  variables.createTaskButton.disabled = true;
};

//Event handlers for different actions triggering input validation.
const handleTitleKeyPress = () => {
  validateAllInputs();
};

const handleDateClick = () => {
  validateAllInputs();
};

const handlePriorityClick = () => {
  validateAllInputs();
};

const handleProjectKeyPress = () => {
  validateAllInputs();
};

//Event handler for creating or updating a task based on the current state. If isTaskEdit is false, a new task is saved locally, otherwise, the edited task is updated.
const handleCreateTaskClick = () => {
  if (!variables.isTaskEdit._value) {
    // Create a new task
    const newTask = taskManager.taskFactory(
      variables.taskTitleInput.value,
      variables.taskDateInput.value,
      variables.taskPriorityInput.value,
      variables.taskProjectInput.value,
      variables.taskNoteInput.value,
      false
    );
    variables.tasks.push(newTask);
    dataStorage.saveArrayToLocalStorage("tasks", variables.tasks);
  } else {
    // Update an existing task
    taskManager.updateTaskElement(
      variables.tasks,
      variables.taskTitleInput.value,
      variables.taskDateInput.value,
      variables.taskPriorityInput.value,
      variables.taskProjectInput.value,
      variables.taskNoteInput.value
    );
  }

  // Determine the appropriate action based on the current state
  if (variables.isToday._value) {
    taskManager.setupTaskElements(taskManager.getTodaysTasks(variables.tasks));
  } else if (variables.isWeekly._value) {
    taskManager.setupTaskElements(taskManager.getWeeklyTasks(variables.tasks));
  } else if (variables.isProject._value) {
    taskManager.generateProjectElements(variables.tasks);
  } else {
    taskManager.setupTaskElements(variables.tasks);
  }

  closeModal();
  variables.isTaskEdit.value = false;
};

//Event handler for clicking on the "All Tasks" button. When clicked, all tasks are displayed.
const handleAllTasksClick = () => {
  toggleSelection(variables.allTasksButton, [
    variables.allTasksButton,
    variables.todaysTasksButton,
    variables.weeklyTasksButton,
    variables.projectTasksButton,
  ]);
  variables.isToday.value = false;
  variables.isWeekly.value = false;
  variables.isProject.value = false;
  taskManager.setupTaskElements(variables.tasks);
};

//Event handler for clicking on the "Todays Tasks" button. When clicked, today's tasks are displayed.
const handleTodaysTasksClick = () => {
  toggleSelection(variables.todaysTasksButton, [
    variables.allTasksButton,
    variables.todaysTasksButton,
    variables.weeklyTasksButton,
    variables.projectTasksButton,
  ]);
  clearContainer(variables.taskContainer);
  const todaysTasks = taskManager.getTodaysTasks(
    dataStorage.getArrayFromLocalStorage("tasks")
  );
  variables.isToday.value = true;
  variables.isWeekly.value = false;
  variables.isProject.value = false;
  taskManager.setupTaskElements(todaysTasks);
};

//Event handler for clicking on the "Weekly Tasks" button. When clicked, the weekly tasks are displayed.
const handleWeeklyTasksClick = () => {
  toggleSelection(variables.weeklyTasksButton, [
    variables.allTasksButton,
    variables.todaysTasksButton,
    variables.weeklyTasksButton,
    variables.projectTasksButton,
  ]);
  const weeklyTasks = taskManager.getWeeklyTasks(
    dataStorage.getArrayFromLocalStorage("tasks")
  );
  variables.isToday.value = false;
  variables.isWeekly.value = true;
  variables.isProject.value = false;
  taskManager.setupTaskElements(weeklyTasks);
};

//Event handler for clicking on the "Project Tasks" button. When clicked, projects and their respective tasks are displayed.

const handleProjectTasksClick = () => {
  toggleSelection(variables.projectTasksButton, [
    variables.allTasksButton,
    variables.todaysTasksButton,
    variables.weeklyTasksButton,
    variables.projectTasksButton,
  ]);
  clearContainer(variables.taskContainer);
  variables.isToday.value = false;
  variables.isWeekly.value = false;
  variables.isProject.value = true;
  taskManager.generateProjectElements(variables.tasks, variables.isProject);
};

//Event handler for clicking on a task checkbox. It toggles a tasks completed property.
const handleTaskCheckboxClick = (event, array, isProject) => {
  taskManager.completeTask(event, array);
  if (isProject && isProject._value) {
    taskManager.generateProjectElements(variables.tasks, isProject);
  }
};

//Event handler for clicking on the edit icon. When the icon is clicked, the edit task modal will appear.
const handleEditTaskClick = (event, isTaskEdit, modal, modalTitle, item) => {
  isTaskEdit.value = true;
  const editButton = event.target;
  const taskElement = editButton.closest(".task");
  const taskTitle = taskElement.querySelector(".task-title").innerHTML;
  const taskDate = taskElement.querySelector(".task-date").innerHTML;
  variables.taskTitleInput.value = taskTitle;
  variables.taskDateInput.innerHTML = taskDate;
  variables.taskPriorityInput.value = item.priority;
  variables.taskNoteInput.value = item.note;
  variables.taskProjectInput.value = item.project;
  toggleModal(modal, modalTitle, taskTitle);
};

//Event handler for clicking on the delete icon.
const handleDeleteTaskClick = (
  event,
  array,
  tempArray,
  isToday,
  isWeekly,
  isProject,
  container,
  isTaskEdit
) => {
  // Check if tasks are filtered by today, weekly, or project
  if (isToday.value || isWeekly.value || isProject.value) {
    // Delete task from temporary array
    taskManager.deleteTask(event, tempArray);
    // Delete task from original array
    taskManager.deleteTask(event, array);
  } else {
    // Delete task from original array
    taskManager.deleteTask(event, array);
  }

  // Check if project filter is active
  if (isProject._value) {
    // Regenerate project-specific task elements
    taskManager.generateProjectElements(variables.tasks, isProject);
  } else {
    // Regenerate task elements based on current filters and arrays
    taskManager.generateTaskElements(
      array,
      tempArray,
      isToday,
      isWeekly,
      false,
      container,
      isTaskEdit,
      variables.taskModal,
      variables.taskModalTitle
    );
  }
};

export {
  handleAllTasksClick,
  handleCreateTaskClick,
  handleDateClick,
  handlePriorityClick,
  handleProjectKeyPress,
  handleProjectTasksClick,
  handleTaskButtonClick,
  handleTitleKeyPress,
  handleTodaysTasksClick,
  handleWeeklyTasksClick,
  handleTaskCheckboxClick,
  handleEditTaskClick,
  handleDeleteTaskClick,
};

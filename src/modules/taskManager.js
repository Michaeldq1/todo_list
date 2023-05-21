import { clearContainer, taskPriorityHighlight } from "./domManager";
import * as variables from "./variables";
import * as eventHandlers from "./eventHandlers";
import { saveArrayToLocalStorage } from "./dataStorage";

//Creates and returns a new task object with the given properties.
const taskFactory = (title, date, priority, project, note, completed) => {
  return { title, date, priority, project, note, completed };
};

//Creates and returns a new task element with the specified item.
const createTaskElement = (item) => {
  const taskElement = document.createElement("div");
  taskElement.className = "task";

  return taskElement;
};

//Creates and returns a new task checkbox element with the specified item, array, and project flag.
const createTaskCheckbox = (item, array, isProject) => {
  const taskCheckbox = document.createElement("input");
  taskCheckbox.className = "task-completed";
  taskCheckbox.type = "checkbox";
  taskCheckbox.checked = item.completed;
  taskCheckbox.onclick = () => {
    eventHandlers.handleTaskCheckboxClick(event, array, isProject);
  };

  return taskCheckbox;
};

//Creates and returns a new task title element with the specified item.
const createTaskTitle = (item) => {
  const taskTitle = document.createElement("div");
  taskTitle.className = "task-title";
  taskTitle.textContent = item.title;

  return taskTitle;
};

//Creates and returns a new task note element.
const createTaskNote = () => {
  const taskNote = document.createElement("span");
  taskNote.className = "material-symbols-outlined task-note";
  taskNote.textContent = "description";
  taskNote.onclick = displayNoteDrawer;

  return taskNote;
};

//Creates and returns a new task due date element with the specified item.
const createTaskDueDate = (item) => {
  const taskDueDate = document.createElement("div");
  taskDueDate.className = "task-date";
  taskDueDate.textContent = item.date;

  return taskDueDate;
};

//Creates and returns an edit task button for the specified item.
const createEditTaskButton = (item, isTaskEdit, modal, modalTitle) => {
  const editTask = document.createElement("span");
  editTask.className = "material-symbols-outlined task-edit";
  editTask.style.fontSize = "27px";
  editTask.textContent = "edit";
  editTask.addEventListener("click", (event) => {
    eventHandlers.handleEditTaskClick(
      event,
      isTaskEdit,
      modal,
      modalTitle,
      item
    );
  });

  return editTask;
};

//Creates and returns a delete task icon for the specified array.
const createDeleteTaskButton = (
  array,
  tempArray,
  isToday,
  isWeekly,
  isProject,
  container,
  isTaskEdit,
  modal,
  modalTitle
) => {
  const deleteTaskIcon = document.createElement("span");
  deleteTaskIcon.className = "material-symbols-outlined task-delete";
  deleteTaskIcon.textContent = "delete";
  deleteTaskIcon.addEventListener("click", () => {
    eventHandlers.handleDeleteTaskClick(
      event,
      array,
      tempArray,
      isToday,
      isWeekly,
      isProject,
      container,
      isTaskEdit,
      modal,
      modalTitle
    );
  });

  return deleteTaskIcon;
};

//Creates and returns a note drawer for the specified item.
const createNoteDrawer = (item) => {
  const noteDrawer = document.createElement("div");
  noteDrawer.classList.add("task-note-drawer");
  noteDrawer.innerHTML = item.note;

  return noteDrawer;
};

//Generates task elements and appends them to the container.
const generateTaskElements = (
  array,
  tempArray,
  isToday,
  isWeekly,
  isProject,
  container,
  isTaskEdit,
  modal,
  modalTitle
) => {
  // Clear the container before generating task elements
  clearContainer(container);

  // Generate task elements for each item in the tempArray
  tempArray.forEach((item) => {
    // Create task element
    const taskElement = createTaskElement(item);

    // Create task checkbox
    const taskCheckbox = createTaskCheckbox(item, array, isProject);

    // Create task title
    const taskTitle = createTaskTitle(item);

    // Create task note
    const taskNote = createTaskNote();

    // Create task due date
    const taskDueDate = createTaskDueDate(item);

    // Create edit task button
    const editTask = createEditTaskButton(item, isTaskEdit, modal, modalTitle);

    // Create delete task button
    const deleteTaskIcon = createDeleteTaskButton(
      array,
      tempArray,
      isToday,
      isWeekly,
      isProject,
      container,
      isTaskEdit,
      modal,
      modalTitle
    );

    // Create note drawer
    const noteDrawer = createNoteDrawer(item);

    // Apply priority highlight to task element
    taskPriorityHighlight(item, taskElement);

    // Toggle task-complete class based on task completion status
    taskElement.classList.toggle("task-complete", item.completed);

    // Append task elements to task element
    taskElement.append(
      taskCheckbox,
      taskTitle,
      taskNote,
      taskDueDate,
      editTask,
      deleteTaskIcon
    );

    // Append task element and note drawer to the container
    container.appendChild(taskElement);
    container.appendChild(noteDrawer);
  });
};

//Retrieves today's tasks from the given array.
const getTodaysTasks = (array) => {
  const today = new Date();
  return array.filter((item) => item.date === today.toISOString().slice(0, 10));
};

//Retrieves this week's tasks from the given array.
const getWeeklyTasks = (array) => {
  const today = new Date();
  const firstDayOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay()
  );
  const lastDayOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay() + 6
  );

  return array.filter((item) => {
    const taskDate = new Date(item.date);
    return taskDate >= firstDayOfWeek && taskDate <= lastDayOfWeek;
  });
};

//Marks a task as complete or incomplete and updates the task element and array accordingly.
const completeTask = (event, array) => {
  const completeButton = event.target;
  const taskElement = completeButton.closest(".task");
  const taskTitle = taskElement.querySelector(".task-title").innerHTML;
  const taskIndex = array.findIndex((task) => task.title === taskTitle);

  array[taskIndex].completed = !array[taskIndex].completed;
  taskElement.classList.toggle("task-complete");

  saveArrayToLocalStorage("tasks", array);
};

//Handles the editing of a task by extracting the task title and updating the provided element.
const editTask = (event, element) => {
  const editButton = event.target;
  const taskElement = editButton.closest(".task");
  const taskTitle = taskElement.querySelector(".task-title").textContent;
  element.textContent = taskTitle;

  return taskTitle;
};

//Deletes a task from the array and updates the local storage.
const deleteTask = (event, array) => {
  const deleteButton = event.target;
  const taskElement = deleteButton.closest(".task");
  const taskTitle = taskElement.querySelector(".task-title").innerHTML;
  const taskIndex = array.findIndex((task) => task.title === taskTitle);
  array.splice(taskIndex, 1);
  saveArrayToLocalStorage("tasks", array);
};

//Toggles the display of the note drawer for a task and applies corresponding CSS classes.
const displayNoteDrawer = (event) => {
  const noteButton = event.target;
  const taskElement = noteButton.closest(".task");
  const noteDrawer = taskElement.nextSibling;

  noteDrawer.style.display =
    noteDrawer.style.display !== "flex" ? "flex" : "none";

  noteDrawer.classList.toggle("open-task-note-drawer");
};

//Updates the properties of a task in the array and saves the updated array to local storage.
const updateTaskElement = (
  array,
  updatedTitle,
  updatedDate,
  updatedPriority,
  updatedProject,
  updatedNote
) => {
  const editedTask = document.querySelector(".task-modal h1").textContent;
  const taskIndex = array.findIndex((task) => task.title === editedTask);
  const isTaskCompleted = array[taskIndex].completed;
  array[taskIndex] = {
    title: updatedTitle,
    date: updatedDate,
    priority: updatedPriority,
    project: updatedProject,
    note: updatedNote,
    completed: isTaskCompleted,
  };
  saveArrayToLocalStorage("tasks", array);
};

//Retrieves an array of tasks belonging to a specific project.
const getProjectTasks = (array, project) => {
  return array.filter((item) => {
    return item.project === project;
  });
};

//Groups tasks in an array by project, returning an object with project names as keys and corresponding task arrays as values.
const groupTasksByProject = (array) => {
  return array.reduce((acc, item) => {
    acc[item.project] = acc[item.project] || [];
    acc[item.project].push(item);
    return acc;
  }, {});
};

//Creates a project element representing a project.
const createProjectElement = (project) => {
  const projectElement = document.createElement("div");
  projectElement.className = "project";
  return projectElement;
};

//Creates a container element for project tasks.
const createProjectTaskContainer = () => {
  const projectTaskContainer = document.createElement("div");
  return projectTaskContainer;
};

//Creates a container element for project tasks.
const createProjectTitle = (project) => {
  const projectTitle = document.createElement("div");
  projectTitle.innerHTML = project;
  projectTitle.className = "project-title";
  return projectTitle;
};

//Creates an element to display the percentage of completion for a project.
const createProjectPercentComplete = (percentage) => {
  const projectPercentComplete = document.createElement("div");
  projectPercentComplete.className = "project-percent-complete";
  projectPercentComplete.innerHTML = percentage;
  return projectPercentComplete;
};

//Creates an arrow element for indicating project task visibility.
const createProjectTaskArrow = () => {
  const projectTaskArrow = document.createElement("div");
  projectTaskArrow.innerHTML = "arrow_drop_down";
  projectTaskArrow.className = "material-symbols-outlined";
  return projectTaskArrow;
};

//Appends elements to the project container in the DOM.
const appendElementsToProject = (
  projectContainer,
  projectElement,
  projectTaskContainer,
  projectTitle,
  projectPercentComplete,
  projectTaskArrow
) => {
  projectElement.appendChild(projectTitle);
  projectElement.appendChild(projectPercentComplete);
  projectElement.appendChild(projectTaskArrow);

  projectContainer.appendChild(projectElement);
  projectElement.insertAdjacentElement("afterend", projectTaskContainer);
};

//Generates project elements based on the provided array of tasks and project flag.
const generateProjectElements = (array, isProject) => {
  // Get the project container element from the DOM
  const projectContainer = document.getElementById("task-container");

  // Clear the existing content in the project container
  clearContainer(projectContainer);

  // Group tasks by project
  const groups = groupTasksByProject(array);

  // Iterate through each project in the groups
  for (const project in groups) {
    // Calculate the percentage of completed tasks for the project
    const tasksCompletedPercentage = getProjectTasksPercentComplete(
      array,
      project
    );

    // Create project-related elements
    const projectElement = createProjectElement(project);
    const projectTaskContainer = createProjectTaskContainer();
    const projectTitle = createProjectTitle(project);
    const projectPercentComplete = createProjectPercentComplete(
      tasksCompletedPercentage
    );
    const projectTaskArrow = createProjectTaskArrow();

    // Get tasks associated with the current project
    const projectTasks = getProjectTasks(array, project);

    // Generate task elements for the project
    generateTaskElements(
      array,
      projectTasks,
      false,
      false,
      isProject,
      projectTaskContainer,
      variables.isTaskEdit,
      variables.taskModal,
      variables.taskModalTitle
    );

    // Create task elements within the project element
    groups[project].forEach(() => {
      const taskElement = createTaskElement();
      projectElement.appendChild(taskElement);
    });

    // Append project-related elements to the project container
    appendElementsToProject(
      projectContainer,
      projectElement,
      projectTaskContainer,
      projectTitle,
      projectPercentComplete,
      projectTaskArrow
    );
  }
};

//Calculates the percentage of completed tasks for a specific project.
const getProjectTasksPercentComplete = (tasks, project) => {
  const projectTasks = tasks.filter((task) => task.project === project);
  const numComplete = projectTasks.filter((task) => task.completed).length;
  const percentageComplete =
    projectTasks.length > 0
      ? ((numComplete / projectTasks.length) * 100).toFixed(2)
      : 0;
  return `${percentageComplete}%`;
};

//Sets up the task elements on the page using the provided array of tasks.
const setupTaskElements = (array) => {
  generateTaskElements(
    variables.tasks,
    array,
    variables.isToday,
    variables.isWeekly,
    variables.isProject,
    variables.taskContainer,
    variables.isTaskEdit,
    variables.taskModal,
    variables.taskModalTitle
  );
};

export {
  taskFactory,
  getTodaysTasks,
  getWeeklyTasks,
  generateTaskElements,
  completeTask,
  editTask,
  deleteTask,
  displayNoteDrawer,
  updateTaskElement,
  generateProjectElements,
  setupTaskElements,
};

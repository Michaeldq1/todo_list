import { getArrayFromLocalStorage } from "./dataStorage";

// UI Element Declarations and State Variables

// Exported UI element constants
export const addTaskButton = document.getElementById("add-task");
export const taskModal = document.querySelector(".task-modal");
export const taskModalTitle = document.querySelector(".task-modal h1");
export const taskModalDefaultTitle = "Create Task";
export const taskContainer = document.getElementById("task-container");
export const closeModalButton = document.querySelector(".close-button");
export const createTaskButton = document.getElementById("task-button");
export const taskTitleInput = document.getElementById("task-title");
export const taskDateInput = document.getElementById("task-date");
export const taskNoteInput = document.getElementById("task-note");
export const allTasksButton = document.getElementById("alltasks");
export const todaysTasksButton = document.getElementById("todaystasks");
export const weeklyTasksButton = document.getElementById("weeklytasks");
export const projectTasksButton = document.getElementById("projects");
export const taskPriorityInput = document.getElementById("task-priority");
export const taskProjectInput = document.getElementById("task-project");

// State variables
export let tasks = getArrayFromLocalStorage("tasks");
export let isTaskEdit = {
  _value: false,
  get value() {
    return this._value;
  },
  set value(val) {
    this._value = val;
  },
};
export let isToday = {
  _value: false,
  get value() {
    return this._value;
  },
  set value(val) {
    this._value = val;
  },
};
export let isWeekly = {
  _value: false,
  get value() {
    return this._value;
  },
  set value(val) {
    this._value = val;
  },
};
export let isProject = {
  _value: false,
  get value() {
    return this._value;
  },
  set value(val) {
    this._value = val;
  },
};

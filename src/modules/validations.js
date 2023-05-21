import {
  taskTitleInput,
  taskDateInput,
  taskPriorityInput,
  taskProjectInput,
  createTaskButton,
} from "./variables";

const validateText = (input) => {
  const text = input.value.trim();
  const isValid = !!text;

  input.classList.toggle("failed-input", !isValid);

  return isValid;
};

const validateAllInputs = () => {
  const isValidTitle = validateText(taskTitleInput);
  const isValidDate = validateText(taskDateInput);
  const isValidPriority = validateText(taskPriorityInput);
  const isValidProject = validateText(taskProjectInput);

  createTaskButton.disabled = !(
    isValidTitle &&
    isValidDate &&
    isValidPriority &&
    isValidProject
  );
  createTaskButton.classList.remove("disabled");
};

export { validateAllInputs };

import * as variables from "./variables";

//Clears the values of input elements and removes the "failed-input" class.
const clearInputs = (inputs) => {
  inputs.forEach((input) => {
    input.value = " ";
    input.classList.remove("failed-input");
  });
};

//Toggles the visibility of a modal element and updates the title.
const toggleModal = (modal, titleElement, title) => {
  modal.classList.toggle("show-modal");
  titleElement.innerHTML = title;
};

//Closes the task modal by clearing inputs, resetting the title, and updating the state.
const closeModal = () => {
  const inputsToClear = [
    variables.taskTitleInput,
    variables.taskDateInput,
    variables.taskPriorityInput,
    variables.taskNoteInput,
    variables.taskProjectInput,
  ];
  clearInputs(inputsToClear);
  toggleModal(
    variables.taskModal,
    variables.taskModalTitle,
    variables.taskModalDefaultTitle
  );
  variables.isTaskEdit.value = false;
};

export { closeModal, toggleModal, clearInputs };

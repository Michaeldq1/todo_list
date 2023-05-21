//Toggles the selection state of an element among a collection of elements. The selected element will have the "selected" class added, while the rest will have it removed.
const toggleSelection = (selectedElement, elements) => {
  elements.forEach((element) => {
    if (element === selectedElement) {
      element.classList.add("selected");
    } else {
      element.classList.remove("selected");
    }
  });
};

//Clears the content of a container element by removing all its child elements.
const clearContainer = (element) => {
  element.innerHTML = "";
};

//Applies a priority highlight to a task element based on its priority level. The highlight is determined by setting the background color of the element.
const taskPriorityHighlight = (task, element) => {
  element.style.backgroundColor = getPriorityColor(task.priority);
};

//Retrieves the corresponding color code based on the priority level of a task.
const getPriorityColor = (priority) => {
  switch (priority) {
    case "low":
      return "#ACDDDE";
    case "medium":
      return "#FEF8DD";
    case "high":
      return "#F7D8BA";
    default:
      return "white";
  }
};

export {
  clearContainer,
  toggleSelection,
  taskPriorityHighlight,
  getPriorityColor,
};

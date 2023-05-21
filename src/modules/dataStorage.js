// Saves an array to the browser's local storage using the specified key.
const saveArrayToLocalStorage = (key, array) => {
  localStorage.setItem(key, JSON.stringify(array));
};

// Retrieves an array from the browser's local storage using the specified key.
const getArrayFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key)) || [];
};

export { saveArrayToLocalStorage, getArrayFromLocalStorage };

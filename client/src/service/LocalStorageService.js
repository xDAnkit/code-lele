/**
 * Gets the value associated with the specified key from localStorage.
 * @param {string} key - The key to retrieve the value for.
 * @returns {string | null} The value associated with the key, or null if the key does not exist.
 */
export const getItem = (key) => localStorage.getItem(key);

/**
 * Sets a key-value pair in localStorage.
 * @param {string} key - The key to set.
 * @param {string} value - The value to associate with the key.
 */
export const setItem = (key, value) => localStorage.setItem(key, value);

/**
 * Sets a key-value pair in localStorage.
 * @param {string} key - The key to set.
 * @param {string} value - The value to associate with the key.
 */
export const setJSON = (key, value) => {
  setItem(key, JSON.stringify(value));
};

/**
 * Gets a key-value pair from localStorage.
 * @param {string} key - The key to get.
 */
export const getJSON = (key) => {
  try {
    const result = JSON.parse(getItem(key));
    return result;
  } catch (err) {
    return null;
  }
};

/**
 * Removes the item associated with the specified key from localStorage.
 * @param {string} key - The key to remove.
 */
export const removeItem = (key) => localStorage.removeItem(key);

/**
 * Clears all items from localStorage.
 */
export const clearLocalStorage = () => localStorage.clear();

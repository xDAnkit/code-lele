import { LANGUAGE_HISTORY } from "../Util/constants/localStorage";

/**
 * Gets the value associated with the specified key from localStorage.
 * @param {string} key - The key to retrieve the value for.
 * @returns {string | null} The value associated with the key, or null if the key does not exist.
 */
export const getLanguage = (key) => localStorage.getItem(key);

/**
 * Sets a key-value pair in localStorage.
 * @param {string} key - The key to set.
 * @param {string} value - The value to associate with the key.
 */
export const setLanguage = (key, value) => localStorage.setItem(key, value);

/**
 * Gets the value associated with the specified key from localStorage.
 * @param {string} key - The key to retrieve the value for.
 * @returns {string | null} The value associated with the key, or null if the key does not exist.
 */

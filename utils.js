/**
 * utils.js - A collection of useful JavaScript utility functions
 * @version 1.0.0
 * @author Your Name
 * @license MIT
 */

/**
 * Debounces a function, limiting how often it can run
 * @param {Function} func - Function to debounce
 * @param {number} wait - Milliseconds to wait before executing
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttles a function, ensuring it runs at most once in a specified period
 * @param {Function} func - Function to throttle
 * @param {number} limit - Minimum interval between executions (ms)
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Deep clones an object
 * @param {Object} obj - Object to clone
 * @returns {Object} Cloned object
 */
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(item => deepClone(item));
  const cloned = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}

/**
 * Formats a date to YYYY-MM-DD HH:MM:SS
 * @param {Date} date - Date object to format
 * @returns {string} Formatted date string
 */
function formatDate(date) {
  const pad = num => String(num).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

/**
 * Checks if a value is empty
 * @param {*} value - Value to check
 * @returns {boolean} True if value is empty
 */
function isEmpty(value) {
  if (value === null || value === undefined) return true;
  if (Array.isArray(value) || typeof value === 'string') return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/**
 * Generates a random string of specified length
 * @param {number} length - Length of the string
 * @returns {string} Random string
 */
function randomString(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Export for both browser and Node.js environments
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    debounce,
    throttle,
    deepClone,
    formatDate,
    isEmpty,
    randomString
  };
} else {
  window.utils = {
    debounce,
    throttle,
    deepClone,
    formatDate,
    isEmpty,
    randomString
  };
}

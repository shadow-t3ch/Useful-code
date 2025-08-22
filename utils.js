/**
 * utils.js - An extensive collection of JavaScript utility functions
 * @version 1.0.0
 * @author ShadowT3ch
 * @license MIT
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

function formatDate(date, format = 'YYYY-MM-DD HH:MM:SS') {
  const pad = num => String(num).padStart(2, '0');
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('MM', minutes)
    .replace('SS', seconds);
}

function isEmpty(value) {
  if (value === null || value === undefined) return true;
  if (Array.isArray(value) || typeof value === 'string') return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

function randomString(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function capitalize(str) {
  if (typeof str !== 'string') return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function truncate(str, maxLength, suffix = '...') {
  if (typeof str !== 'string' || str.length <= maxLength) return str;
  return str.slice(0, maxLength - suffix.length) + suffix;
}

function isEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function uniqueArray(arr) {
  return [...new Set(arr)];
}

function chunkArray(arr, size) {
  if (size <= 0) return [];
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

function flattenArray(arr) {
  return arr.reduce((flat, current) => flat.concat(Array.isArray(current) ? flattenArray(current) : current), []);
}

function shuffleArray(arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function parseQueryString(query) {
  const params = new URLSearchParams(query);
  const result = {};
  for (const [key, value] of params) {
    result[key] = value;
  }
  return result;
}

function toQueryString(obj) {
  return Object.entries(obj)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}

function removeDuplicatesByKey(arr, key) {
  return [...new Map(arr.map(item => [item[key], item])).values()];
}

function groupBy(arr, key) {
  return arr.reduce((result, item) => {
    const group = item[key];
    result[group] = result[group] || [];
    result[group].push(item);
    return result;
  }, {});
}

function memoize(func) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = func(...args);
    cache.set(key, result);
    return result;
  };
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function mergeObjects(...objects) {
  return objects.reduce((result, obj) => {
    if (!isObject(obj)) return result;
    return { ...result, ...obj };
  }, {});
}

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

function getNestedValue(obj, path, defaultValue = undefined) {
  return path.split('.').reduce((current, key) => {
    return current && hasOwnProperty(current, key) ? current[key] : defaultValue;
  }, obj);
}

function setNestedValue(obj, path, value) {
  const keys = path.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    current[key] = current[key] || {};
    current = current[key];
  }
  current[keys[keys.length - 1]] = value;
  return obj;
}

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function isNumeric(str) {
  if (typeof str !== 'string') return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function lerp(start, end, amount) {
  return start + (end - start) * amount;
}

function isValidUrl(str) {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

function stripHtml(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function unescapeHtml(safe) {
  return safe
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function setCookie(name, value, days) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value}${expires}; path=/`;
}

function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

function throttlePromise(func, limit) {
  let inThrottle;
  return async function(...args) {
    if (!inThrottle) {
      inThrottle = true;
      try {
        const result = await func(...args);
        setTimeout(() => (inThrottle = false), limit);
        return result;
      } catch (error) {
        inThrottle = false;
        throw error;
      }
    }
  };
}

function retry(fn, retries = 3, delay = 1000) {
  return new Promise((resolve, reject) => {
    const attempt = async (n) => {
      try {
        const result = await fn();
        resolve(result);
      } catch (error) {
        if (n === 0) return reject(error);
        setTimeout(() => attempt(n - 1), delay);
      }
    };
    attempt(retries);
  });
}

function parseJsonSafe(str) {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}

function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

function toCamelCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
      if (/\s+/.test(match)) return '';
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function scrollToTop(smooth = true) {
  window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
}

function getUrlParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function setUrlParam(key, value) {
  const url = new URL(window.location);
  url.searchParams.set(key, value);
  window.history.pushState({}, '', url);
}

function removeUrlParam(key) {
  const url = new URL(window.location);
  url.searchParams.delete(key);
  window.history.pushState({}, '', url);
}

function getBrowserInfo() {
  const ua = navigator.userAgent;
  let browser = 'Unknown';
  let version = 'Unknown';
  if (/chrome|crios/i.test(ua)) {
    browser = 'Chrome';
    version = ua.match(/(?:chrome|crios)\/(\d+)/i)?.[1] || 'Unknown';
  } else if (/firefox|fxios/i.test(ua)) {
    browser = 'Firefox';
    version = ua.match(/(?:firefox|fxios)\/(\d+)/i)?.[1] || 'Unknown';
  } else if (/safari/i.test(ua) && !/chrome|crios/i.test(ua)) {
    browser = 'Safari';
    version = ua.match(/version\/(\d+)/i)?.[1] || 'Unknown';
  }
  return { browser, version };
}

function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function copyToClipboard(text) {
  return navigator.clipboard.writeText(text);
}

function readFromClipboard() {
  return navigator.clipboard.readText();
}

function getElementOffset(element) {
  const rect = element.getBoundingClientRect();
  return {
    top: rect.top + window.pageYOffset,
    left: rect.left + window.pageXOffset
  };
}

function throttleScroll(callback, limit) {
  let wait = false;
  window.addEventListener('scroll', () => {
    if (!wait) {
      callback();
      wait = true;
      setTimeout(() => (wait = false), limit);
    }
  });
}

function getQuerySelectorAll(selector) {
  return Array.from(document.querySelectorAll(selector));
}

function toggleClass(element, className) {
  if (element.classList.contains(className)) {
    element.classList.remove(className);
  } else {
    element.classList.add(className);
  }
}

function hasClass(element, className) {
  return element.classList.contains(className);
}

function removeClassFromAll(className) {
  getQuerySelectorAll(`.${className}`).forEach(el => el.classList.remove(className));
}

function addClassToAll(selector, className) {
  getQuerySelectorAll(selector).forEach(el => el.classList.add(className));
}

function getSiblings(element) {
  return Array.from(element.parentNode.children).filter(child => child !== element);
}

function findParent(element, selector) {
  let parent = element.parentElement;
  while (parent && !parent.matches(selector)) {
    parent = parent.parentElement;
  }
  return parent;
}

function isValidJson(str) {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}

function formatNumber(num, decimals = 2) {
  return Number(num).toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function parseNumber(str) {
  return parseFloat(str.replace(/[^0-9.-]+/g, '')) || 0;
}

function getAverage(arr) {
  if (!arr.length) return 0;
  return arr.reduce((sum, num) => sum + Number(num), 0) / arr.length;
}

function getMedian(arr) {
  if (!arr.length) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function generateRange(start, end, step = 1) {
  const result = [];
  for (let i = start; i <= end; i += step) {
    result.push(i);
  }
  return result;
}

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function differenceInDays(date1, date2) {
  const diffTime = Math.abs(date2 - date1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function getFileExtension(filename) {
  return filename.split('.').pop().toLowerCase();
}

function isImageFile(filename) {
  const extensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
  return extensions.includes(getFileExtension(filename));
}

function bytesToSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

function generatePassword(length = 12) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
}

function isStrongPassword(password) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    debounce,
    throttle,
    deepClone,
    formatDate,
    isEmpty,
    randomString,
    capitalize,
    truncate,
    isEmail,
    uniqueArray,
    chunkArray,
    flattenArray,
    shuffleArray,
    getRandomInt,
    parseQueryString,
    toQueryString,
    removeDuplicatesByKey,
    groupBy,
    memoize,
    sleep,
    isObject,
    mergeObjects,
    hasOwnProperty,
    getNestedValue,
    setNestedValue,
    uuid,
    isNumeric,
    clamp,
    lerp,
    isValidUrl,
    stripHtml,
    escapeHtml,
    unescapeHtml,
    getCookie,
    setCookie,
    deleteCookie,
    throttlePromise,
    retry,
    parseJsonSafe,
    toKebabCase,
    toCamelCase,
    isInViewport,
    scrollToTop,
    getUrlParam,
    setUrlParam,
    removeUrlParam,
    getBrowserInfo,
    isMobileDevice,
    copyToClipboard,
    readFromClipboard,
    getElementOffset,
    throttleScroll,
    getQuerySelectorAll,
    toggleClass,
    hasClass,
    removeClassFromAll,
    addClassToAll,
    getSiblings,
    findParent,
    isValidJson,
    formatNumber,
    parseNumber,
    getAverage,
    getMedian,
    generateRange,
    isLeapYear,
    daysInMonth,
    addDays,
    differenceInDays,
    getFileExtension,
    isImageFile,
    bytesToSize,
    generatePassword,
    isStrongPassword
  };
} else {
  window.utils = {
    debounce,
    throttle,
    deepClone,
    formatDate,
    isEmpty,
    randomString,
    capitalize,
    truncate,
    isEmail,
    uniqueArray,
    chunkArray,
    flattenArray,
    shuffleArray,
    getRandomInt,
    parseQueryString,
    toQueryString,
    removeDuplicatesByKey,
    groupBy,
    memoize,
    sleep,
    isObject,
    mergeObjects,
    hasOwnProperty,
    getNestedValue,
    setNestedValue,
    uuid,
    isNumeric,
    clamp,
    lerp,
    isValidUrl,
    stripHtml,
    escapeHtml,
    unescapeHtml,
    getCookie,
    setCookie,
    deleteCookie,
    throttlePromise,
    retry,
    parseJsonSafe,
    toKebabCase,
    toCamelCase,
    isInViewport,
    scrollToTop,
    getUrlParam,
    setUrlParam,
    removeUrlParam,
    getBrowserInfo,
    isMobileDevice,
    copyToClipboard,
    readFromClipboard,
    getElementOffset,
    throttleScroll,
    getQuerySelectorAll,
    toggleClass,
    hasClass,
    removeClassFromAll,
    addClassToAll,
    getSiblings,
    findParent,
    isValidJson,
    formatNumber,
    parseNumber,
    getAverage,
    getMedian,
    generateRange,
    isLeapYear,
    daysInMonth,
    addDays,
    differenceInDays,
    getFileExtension,
    isImageFile,
    bytesToSize,
    generatePassword,
    isStrongPassword
  };
}

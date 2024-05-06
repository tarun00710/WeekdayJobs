export const debounce = (func, delay:number) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const throttledScroll = (func:any, delay:number) => {
  let timer;
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        func();
        timer = null;
      }, delay);
    }
  };
};

export const getSalaryRange = (minJdSalary?: number, maxJdSalary?: number) => {
  if (minJdSalary && maxJdSalary) {
    return `${minJdSalary}-${maxJdSalary}`;
  } else if (minJdSalary) {
    return `${minJdSalary}+`;
  } else if (maxJdSalary) {
    return `up to ${maxJdSalary}`;
  } else {
    return "N/A";
  }
};

export const toUpperCamelCase = (str: string | undefined | null) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const LIMIT = 10;

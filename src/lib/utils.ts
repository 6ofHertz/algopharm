// Utility function to join class names
export const cn = (...classes: string[]) => {
    return classes.filter(Boolean).join(" ");
  };
  
  // Utility function to debounce a function call (useful for search input handling, etc.)
  export const debounce = (func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };
  
  // Utility function to format dates (you can customize this as needed)
  export const formatDate = (date: string | Date) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  
  // Utility function for deep cloning objects or arrays
  export const deepClone = <T>(obj: T): T => {
    return JSON.parse(JSON.stringify(obj));
  };
  
  // Utility function to check if a value is an email
  export const isValidEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };
  
  // Utility function to capitalize the first letter of each word in a string
  export const capitalizeWords = (str: string) => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };
  
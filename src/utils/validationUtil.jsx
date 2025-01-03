// Validate Email
export const validateEmail = (email) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  };
  
  // Validate Password
  export const validatePassword = (password) => {
    return password.length >= 6;
  };
  
  // Validate Name
  export const validateName = (name) => {
    return name.trim().length > 0;
  };
  
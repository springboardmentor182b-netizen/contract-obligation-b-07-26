import { useState, useEffect } from 'react';

/**
 * Custom hook to verify password strength
 * @param {string} password - Password to validate
 * @returns {Object} - Password validation state
 */
export const useVerifyPassword = (password) => {
  const [passwordStrength, setPasswordStrength] = useState({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    isValid: false
  });

  useEffect(() => {
    const strength = {
      hasMinLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    strength.isValid = Object.values(strength).every(v => v);

    setPasswordStrength(strength);
  }, [password]);

  return passwordStrength;
};

/**
 * Validate password meets all requirements
 * @param {string} password - Password to validate
 * @returns {Object} - Validation result
 */
export const validatePassword = (password) => {
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const isValid = hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

  let errorMessage = '';
  if (!isValid) {
    if (!hasMinLength) errorMessage = 'Password must be at least 8 characters';
    else if (!hasUpperCase) errorMessage = 'Password must contain uppercase letter (A-Z)';
    else if (!hasLowerCase) errorMessage = 'Password must contain lowercase letter (a-z)';
    else if (!hasNumber) errorMessage = 'Password must contain number (0-9)';
    else if (!hasSpecialChar) errorMessage = 'Password must contain special character (!@#$%...)';
  }

  return {
    isValid,
    errorMessage,
    hasMinLength,
    hasUpperCase,
    hasLowerCase,
    hasNumber,
    hasSpecialChar
  };
};

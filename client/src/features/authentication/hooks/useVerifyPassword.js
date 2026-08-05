import { useState } from 'react';

const useVerifyPassword = () => {
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState([]);

  const verifyPassword = (password, confirmPassword) => {
    const newErrors = [];

    if (password.length < 8) {
      newErrors.push('Password must be at least 8 characters');
    }

    if (!/[A-Z]/.test(password)) {
      newErrors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
      newErrors.push('Password must contain at least one lowercase letter');
    }

    if (!/[0-9]/.test(password)) {
      newErrors.push('Password must contain at least one number');
    }

    if (password !== confirmPassword) {
      newErrors.push('Passwords do not match');
    }

    setErrors(newErrors);
    setIsValid(newErrors.length === 0);

    return newErrors.length === 0;
  };

  return { verifyPassword, isValid, errors };
};

export default useVerifyPassword;

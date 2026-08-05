export const formatDate = (dateString, options = {}) => {
  const date = new Date(dateString);
  
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };

  return date.toLocaleDateString('en-US', defaultOptions);
};

export const formatDateTime = (dateString) => {
  return formatDate(dateString, {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export default formatDate;

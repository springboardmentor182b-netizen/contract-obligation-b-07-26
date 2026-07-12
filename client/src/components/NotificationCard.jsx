
const NotificationCard = ({ type, message, timestamp }) => {
  const getBorderColor = (type) => {
    switch (type) {
      case 'alert': return 'border-red-500';
      case 'renewal': return 'border-yellow-500';
      default: return 'border-blue-500';
    }
  };

  return (
    <div className={`p-4 border-l-4 bg-white shadow-sm rounded-r-lg mb-3 ${getBorderColor(type)}`}>
      <p className="text-sm text-gray-800">{message}</p>
      <span className="text-xs text-gray-400 mt-1 block">{timestamp}</span>
    </div>
  );
};

export default NotificationCard;

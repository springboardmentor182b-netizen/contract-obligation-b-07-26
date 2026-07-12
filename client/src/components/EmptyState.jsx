
const EmptyState = ({ message, icon }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-400">
      <div className="text-4xl mb-2">{icon}</div>
      <p className="text-lg">{message}</p>
    </div>
  );
};

export default EmptyState;

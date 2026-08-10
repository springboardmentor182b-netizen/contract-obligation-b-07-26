const RoleCard = ({ role }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold">
        {role.name}
      </h2>

      <p className="mt-2 text-gray-600">
        {role.description}
      </p>
    </div>
  );
};

export default RoleCard;
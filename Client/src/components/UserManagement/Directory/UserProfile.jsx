import { useUsers } from "../../../context/UsersContext";

const UserProfile = () => {
  const { selectedUser } = useUsers();

  if (!selectedUser) return null;

  return (
    <div className="rounded-xl border bg-white p-6">
      <h2 className="text-xl font-bold">
        {selectedUser.name}
      </h2>

      <p>{selectedUser.email}</p>
    </div>
  );
};

export default UserProfile;
import {
  FaUserCircle,
  FaCircle,
} from "react-icons/fa";

function UserProfileCard() {
  return (
    <div
      className="card border-0 rounded-4"
      style={{
        background: "#1E293B",
      }}
    >
      <div className="card-body">

        <div className="d-flex align-items-center">

          <FaUserCircle
            size={55}
            color="#60A5FA"
          />

          <div className="ms-3">

            <h6
              className="mb-1 text-white"
            >
              Mahesh Ingale
            </h6>

            <small
              style={{
                color:"#94A3B8",
              }}
            >
              Legal Manager
            </small>

          </div>

        </div>

        <hr
          style={{
            borderColor:"#334155",
          }}
        />

        <div
          className="d-flex align-items-center"
        >

          <FaCircle
            size={10}
            color="#22C55E"
          />

          <small
            className="ms-2"
            style={{
              color:"#CBD5E1",
            }}
          >
            Online
          </small>

        </div>

      </div>

    </div>
  );
}

export default UserProfileCard;
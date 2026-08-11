import { useState } from "react";
import { FiCamera } from "react-icons/fi";

function ProfileForm() {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobTitle: "",
    department: "",
    timezone: "",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="profile-section">

      <h2 className="section-title">
        Profile Information
      </h2>

      <p className="section-subtitle">
        Update your personal information and account details.
      </p>

      <div className="profile-header">

        <div className="profile-avatar">

          <div className="avatar-circle">
            {profile.firstName
              ? profile.firstName.charAt(0).toUpperCase()
              : "U"}
          </div>

          <div className="avatar-info">

            <h4>
              {profile.firstName || profile.lastName
                ? `${profile.firstName} ${profile.lastName}`
                : "User"}
            </h4>

            <button className="change-photo-btn">
              <FiCamera />
              <span>Change Photo</span>
            </button>

          </div>

        </div>

      </div>

      <div className="profile-grid">

        <div className="form-group">
          <label>First Name</label>

          <input
            type="text"
            name="firstName"
            value={profile.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Last Name</label>

          <input
            type="text"
            name="lastName"
            value={profile.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>

          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>

          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Job Title</label>

          <input
            type="text"
            name="jobTitle"
            value={profile.jobTitle}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Department</label>

          <input
            type="text"
            name="department"
            value={profile.department}
            onChange={handleChange}
          />
        </div>

        <div className="form-group full-width">

          <label>Timezone</label>

          <select
            name="timezone"
            value={profile.timezone}
            onChange={handleChange}
          >
            <option value="">Select Timezone</option>
            <option value="Asia/Kolkata">
              Asia/Kolkata
            </option>
            <option value="UTC">
              UTC
            </option>
            <option value="GMT">
              GMT
            </option>
          </select>

        </div>

      </div>

      <div className="button-group">

        <button className="save-btn">
          Save Changes
        </button>

        <button className="cancel-btn">
          Cancel
        </button>

      </div>

    </div>
  );
}

export default ProfileForm;
import { useEffect, useState } from "react";
import { Camera } from "lucide-react";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/settings/profile`;

const ProfileSection = () => {
  const [profileId, setProfileId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobTitle: "",
    department: "",
    employeeId: "",
    bio: "",
    language: "",
    timezone: "",
    dateFormat: "",
    currency: "",
  });

  // GET PROFILE DATA
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();

      console.log("Profile Data:", data);

      /*
       * Backend returns an array.
       * Use the first profile record.
       */
      if (Array.isArray(data) && data.length > 0) {
        const user = data[0];

        setProfileId(user.id);

        setProfile({
          firstName: user.firstName ?? "",
          lastName: user.lastName ?? "",
          email: user.email ?? "",
          phone: user.phone ?? "",
          jobTitle: user.jobTitle ?? "",
          department: user.department ?? "",
          employeeId: user.employeeId ?? "",
          bio: user.bio ?? "",
          language: user.language ?? "",
          timezone: user.timezone ?? "",
          dateFormat: user.dateFormat ?? "",
          currency: user.currency ?? "",
        });
      }
    } catch (error) {
      console.error("Fetch Profile Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // HANDLE INPUT CHANGES
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // HANDLE PROFILE PHOTO
  const handlePhoto = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  // SAVE PROFILE DATA
  const handleSave = async () => {
    try {
      setLoading(true);

      const url = profileId
        ? `${API_URL}/${profileId}`
        : API_URL;

      const method = profileId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        const errorText = await response.text();

        console.error("Backend Error:", errorText);

        throw new Error("Profile save failed");
      }

      const result = await response.json();

      if (!profileId && result.id) {
        setProfileId(result.id);
      }

      alert("Profile saved successfully");
    } catch (error) {
      console.error("Save Profile Error:", error);
      alert("Unable to save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F2] p-8">

      {/* HEADER */}
      <div className="mb-8 flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-[#1F2937]">
            My Profile
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your profile information
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="rounded-xl bg-[#D4AF37] px-6 py-3 font-semibold text-[#1F2937] disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

      </div>

      {/* PROFILE CARD */}
      <div className="rounded-2xl bg-white p-8 shadow">

        {/* PROFILE HEADER */}
        <div className="mb-10 flex items-center gap-6">

          {photo ? (
            <img
              src={photo}
              alt="Profile"
              className="h-24 w-24 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#D4AF37] text-3xl font-bold text-white">
              {profile.firstName?.charAt(0)}
              {profile.lastName?.charAt(0)}
            </div>
          )}

          <div>

            <h2 className="text-2xl font-bold">
              {profile.firstName} {profile.lastName}
            </h2>

            <p className="text-gray-500">
              {profile.jobTitle}
            </p>

            <input
              id="photoUpload"
              type="file"
              hidden
              accept="image/*"
              onChange={handlePhoto}
            />

            <label
              htmlFor="photoUpload"
              className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100"
            >
              <Camera size={18} />
              Upload Photo
            </label>

          </div>

        </div>

        {/* PERSONAL INFORMATION */}
        <h2 className="mb-6 text-xl font-semibold">
          Personal Information
        </h2>

        <div className="space-y-5">

          {/* FIRST NAME */}
          <div className="flex items-center gap-6">
            <label className="w-44 font-medium">
              First Name
            </label>

            <input
              type="text"
              name="firstName"
              value={profile.firstName}
              onChange={handleChange}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* LAST NAME */}
          <div className="flex items-center gap-6">
            <label className="w-44 font-medium">
              Last Name
            </label>

            <input
              type="text"
              name="lastName"
              value={profile.lastName}
              onChange={handleChange}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* EMAIL */}
          <div className="flex items-center gap-6">
            <label className="w-44 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* PHONE */}
          <div className="flex items-center gap-6">
            <label className="w-44 font-medium">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* JOB TITLE */}
          <div className="flex items-center gap-6">
            <label className="w-44 font-medium">
              Job Title
            </label>

            <input
              type="text"
              name="jobTitle"
              value={profile.jobTitle}
              onChange={handleChange}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* DEPARTMENT */}
          <div className="flex items-center gap-6">
            <label className="w-44 font-medium">
              Department
            </label>

            <input
              type="text"
              name="department"
              value={profile.department}
              onChange={handleChange}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* EMPLOYEE ID */}
          <div className="flex items-center gap-6">
            <label className="w-44 font-medium">
              Employee ID
            </label>

            <input
              type="text"
              name="employeeId"
              value={profile.employeeId}
              onChange={handleChange}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* BIO */}
          <div className="flex items-start gap-6">
            <label className="w-44 pt-3 font-medium">
              Bio
            </label>

            <textarea
              rows="4"
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#D4AF37]"
            />
          </div>

        </div>

        {/* LOCALE & PREFERENCES */}
        <div className="mt-10">

          <h2 className="mb-6 text-xl font-semibold">
            Locale & Preferences
          </h2>

          <div className="space-y-5">

            {/* LANGUAGE */}
            <div className="flex items-center gap-6">

              <label className="w-44 font-medium">
                Language
              </label>

              <select
                name="language"
                value={profile.language}
                onChange={handleChange}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#D4AF37]"
              >
                <option value="">
                  Select Language
                </option>

                <option value="English">
                  English
                </option>

                <option value="French">
                  French
                </option>

                <option value="German">
                  German
                </option>

                <option value="Spanish">
                  Spanish
                </option>
              </select>

            </div>

            {/* TIMEZONE */}
            <div className="flex items-center gap-6">

              <label className="w-44 font-medium">
                Time Zone
              </label>

              <select
                name="timezone"
                value={profile.timezone}
                onChange={handleChange}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#D4AF37]"
              >
                <option value="">
                  Select Timezone
                </option>

                <option value="UTC-05:00">
                  UTC-05:00
                </option>

                <option value="UTC+00:00">
                  UTC+00:00
                </option>

                <option value="UTC+05:30">
                  UTC+05:30
                </option>

                <option value="UTC+08:00">
                  UTC+08:00
                </option>
              </select>

            </div>

            {/* DATE FORMAT */}
            <div className="flex items-center gap-6">

              <label className="w-44 font-medium">
                Date Format
              </label>

              <select
                name="dateFormat"
                value={profile.dateFormat}
                onChange={handleChange}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#D4AF37]"
              >
                <option value="">
                  Select Date Format
                </option>

                <option value="DD/MM/YYYY">
                  DD/MM/YYYY
                </option>

                <option value="MM/DD/YYYY">
                  MM/DD/YYYY
                </option>

                <option value="YYYY-MM-DD">
                  YYYY-MM-DD
                </option>
              </select>

            </div>

            {/* CURRENCY */}
            <div className="flex items-center gap-6">

              <label className="w-44 font-medium">
                Currency
              </label>

              <select
                name="currency"
                value={profile.currency}
                onChange={handleChange}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#D4AF37]"
              >
                <option value="">
                  Select Currency
                </option>

                <option value="USD">
                  USD
                </option>

                <option value="EUR">
                  EUR
                </option>

                <option value="GBP">
                  GBP
                </option>

                <option value="INR">
                  INR
                </option>
              </select>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProfileSection;
import { useState } from "react";
import SettingsSidebar from "./SettingsSidebar";
import ProfileSection from "./ProfileSection";
import SecuritySection from "./SecuritySection";


const Settings = () => {

  const [activeTab, setActiveTab] = useState("profile");


  return (

    <div className="flex min-h-screen bg-[#F8F7F2]">


      {/* LEFT SIDE */}

      <SettingsSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />



      {/* RIGHT SIDE */}

      <div className="flex-1 p-8">


        {activeTab === "profile" && (
          <ProfileSection />
        )}


        {activeTab === "security" && (
          <SecuritySection />
        )}


        {activeTab === "organization" && (
          <div className="bg-white rounded-2xl p-8 shadow">
            Organization
          </div>
        )}


        {activeTab === "notifications" && (
          <div className="bg-white rounded-2xl p-8 shadow">
            Notification Settings
          </div>
        )}


        {activeTab === "integrations" && (
          <div className="bg-white rounded-2xl p-8 shadow">
            Integrations
          </div>
        )}


        {activeTab === "contracts" && (
          <div className="bg-white rounded-2xl p-8 shadow">
            Contract Defaults
          </div>
        )}


        {activeTab === "compliance" && (
          <div className="bg-white rounded-2xl p-8 shadow">
            Compliance Settings
          </div>
        )}


        {activeTab === "appearance" && (
          <div className="bg-white rounded-2xl p-8 shadow">
            Appearance
          </div>
        )}


        {activeTab === "billing" && (
          <div className="bg-white rounded-2xl p-8 shadow">
            Billing & Plan
          </div>
        )}


        {activeTab === "danger" && (
          <div className="bg-white rounded-2xl p-8 shadow">
            Danger Zone
          </div>
        )}


      </div>


    </div>

  );

};


export default Settings;
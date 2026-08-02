import { useState } from "react";

import SettingsSidebar from "../components/Settings/SettingsSidebar";
import ProfileSection from "../components/Settings/ProfileSection";
import OrganizationSection from "../components/Settings/OrganizationSection";
import SecuritySection from "../components/Settings/SecuritySection";
import NotificationSection from "../components/Settings/NotificationSection";
import IntegrationSection from "../components/Settings/IntegrationSection";
import ContractDefaultsSection from "../components/Settings/ContractDefaultsSection";
import ComplianceSection from "../components/Settings/ComplianceSection";
import AppearanceSection from "../components/Settings/AppearanceSection";
import BillingSection from "../components/Settings/BillingSection";
import DangerZone from "../components/Settings/DangerZone";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderSection = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSection />;

      case "organization":
        return <OrganizationSection />;

      case "security":
        return <SecuritySection />;

      case "notifications":
        return <NotificationSection />;

      case "integrations":
        return <IntegrationSection />;

      case "contracts":
        return <ContractDefaultsSection />;

      case "compliance":
        return <ComplianceSection />;

      case "appearance":
        return <AppearanceSection />;

      case "billing":
        return <BillingSection />;

      case "danger":
        return <DangerZone />;

      default:
        return <ProfileSection />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8F7F2]">
      <SettingsSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="flex-1">
        {renderSection()}
      </div>
    </div>
  );
};

export default Settings;
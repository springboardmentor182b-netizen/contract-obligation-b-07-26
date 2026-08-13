import { useEffect, useState } from "react";
import { Building2 } from "lucide-react";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/settings/organization`;

const OrganizationSection = () => {
  const [organizationId, setOrganizationId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [organization, setOrganization] = useState({
    organization_name: "",
    legal_entity_name: "",
    industry: "",
    employees: "",
    headquarters: "",
    website: "",
    tax_id: "",
  });

  // GET ORGANIZATION DATA FROM BACKEND
  useEffect(() => {
    fetchOrganization();
  }, []);

  const fetchOrganization = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch organization");
      }

      const data = await response.json();

      // Backend returns an array
      if (Array.isArray(data) && data.length > 0) {
        const item = data[0];

        setOrganizationId(item.id);

        setOrganization({
          organization_name: item.organization_name ?? "",
          legal_entity_name: item.legal_entity_name ?? "",
          industry: item.industry ?? "",
          employees: item.employees ?? "",
          headquarters: item.headquarters ?? "",
          website: item.website ?? "",
          tax_id: item.tax_id ?? "",
        });
      }
    } catch (error) {
      console.error("Error fetching organization:", error);
    } finally {
      setLoading(false);
    }
  };

  // SAVE ORGANIZATION DATA TO BACKEND
  const handleSave = async () => {
    try {
      setLoading(true);

      const url = organizationId
        ? `${API_URL}/${organizationId}`
        : API_URL;

      const method = organizationId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(organization),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to save organization");
      }

      const result = await response.json();

      // If a new organization was created
      if (!organizationId && result.id) {
        setOrganizationId(result.id);
      }

      alert("Organization saved successfully!");
    } catch (error) {
      console.error("Error saving organization:", error);
      alert("Failed to save organization.");
    } finally {
      setLoading(false);
    }
  };

  // HANDLE INPUT CHANGES
  const handleChange = (e) => {
    const { name, value } = e.target;

    setOrganization((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const details = [
    {
      label: "Organization Name",
      key: "organization_name",
    },
    {
      label: "Legal Entity Name",
      key: "legal_entity_name",
    },
    {
      label: "Industry",
      key: "industry",
    },
    {
      label: "Employees",
      key: "employees",
    },
    {
      label: "Headquarters",
      key: "headquarters",
    },
    {
      label: "Website",
      key: "website",
    },
    {
      label: "Tax ID / VAT",
      key: "tax_id",
    },
  ];

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-[#1F2937]">
            Organization
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your organization information
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

      {/* ORGANIZATION DETAILS */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

        <div className="border-b border-gray-200 px-8 py-6">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-[#D4AF37]/10 p-3">
              <Building2 className="h-6 w-6 text-[#D4AF37]" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#1F2937]">
                Organization Details
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Company information shown across ContractIQ.
              </p>
            </div>

          </div>

        </div>

        <div>

          {details.map((item, index) => (

            <div
              key={item.key}
              className={`px-8 py-6 ${
                index !== details.length - 1
                  ? "border-b border-gray-200"
                  : ""
              }`}
            >

              <label className="block text-sm font-semibold text-[#1F2937]">
                {item.label}
              </label>

              <input
                type={item.key === "website" ? "text" : "text"}
                name={item.key}
                value={organization[item.key]}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 outline-none focus:border-[#D4AF37]"
              />

            </div>

          ))}

        </div>

      </div>

      {/* DEPARTMENTS */}

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

        <div className="border-b border-gray-200 px-8 py-6">

          <h2 className="text-2xl font-bold text-[#1F2937]">
            Departments
          </h2>

          <p className="mt-1 text-gray-500">
            Manage departments and contract ownership.
          </p>

        </div>

        <div className="px-8 py-8">

          <p className="text-gray-500">
            Department management is not configured yet.
          </p>

        </div>

      </div>

      {/* ADDITIONAL INFORMATION */}

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

        <div className="border-b border-gray-200 px-8 py-6">

          <h2 className="text-2xl font-bold text-[#1F2937]">
            Additional Information
          </h2>

          <p className="mt-1 text-gray-500">
            Organization details and configuration settings.
          </p>

        </div>

        <div className="px-8 py-6">

          <div className="rounded-xl bg-gray-50 p-5">

            <p className="text-sm text-gray-500">
              Organization ID
            </p>

            <p className="mt-1 text-lg font-semibold text-[#1F2937]">
              {organizationId || "Not created yet"}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default OrganizationSection;
import { useEffect, useState } from "react";
import { Building2, Plus } from "lucide-react";

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

  const [departments, setDepartments] = useState([
    { name: "Legal", contracts: 13 },
    { name: "IT", contracts: 22 },
    { name: "Finance", contracts: 18 },
    { name: "HR", contracts: 11 },
    { name: "Operations", contracts: 9 },
    { name: "Procurement", contracts: 14 },
    { name: "Sales", contracts: 8 },
    { name: "Marketing", contracts: 5 },
  ]);

  useEffect(() => {
    fetchOrganization();
  }, []);

  const fetchOrganization = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:8000/settings/organization"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch organization");
      }

      const data = await response.json();

      if (data.length > 0) {
        const item = data[0];

        setOrganizationId(item.id);

        setOrganization({
          organization_name: item.organization_name,
          legal_entity_name: item.legal_entity_name,
          industry: item.industry,
          employees: item.employees,
          headquarters: item.headquarters,
          website: item.website,
          tax_id: item.tax_id,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };  const handleSave = async () => {
    try {
      setLoading(true);

      const url = organizationId
        ? `http://127.0.0.1:8000/settings/organization/${organizationId}`
        : "http://127.0.0.1:8000/settings/organization";

      const method = organizationId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(organization),
      });

      if (!response.ok) {
        throw new Error("Failed to save organization");
      }

      const result = await response.json();

      if (!organizationId) {
        setOrganizationId(result.id);
      }

      alert("Organization saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save organization.");
    } finally {
      setLoading(false);
    }
  };

  const details = [
    {
      label: "Organization Name",
      key: "organization_name",
      value: organization.organization_name,
    },
    {
      label: "Legal Entity Name",
      key: "legal_entity_name",
      value: organization.legal_entity_name,
    },
    {
      label: "Industry",
      key: "industry",
      value: organization.industry,
    },
    {
      label: "Employees",
      key: "employees",
      value: organization.employees,
    },
    {
      label: "Headquarters",
      key: "headquarters",
      value: organization.headquarters,
    },
    {
      label: "Website",
      key: "website",
      value: organization.website,
      link: true,
    },
    {
      label: "Tax ID / VAT",
      key: "tax_id",
      value: organization.tax_id,
    },
  ];

  return (
    <div className="space-y-8">

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
          className="rounded-xl bg-[#D4AF37] px-6 py-3 font-semibold text-[#1F2937]"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

      </div>

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
          {details.map((item, index) => (            <div
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

              {item.link ? (
                <input
                  type="text"
                  value={item.value}
                  onChange={(e) =>
                    setOrganization({
                      ...organization,
                      [item.key]: e.target.value,
                    })
                  }
                  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 outline-none focus:border-[#D4AF37]"
                />
              ) : (
                <input
                  type="text"
                  value={item.value}
                  onChange={(e) =>
                    setOrganization({
                      ...organization,
                      [item.key]: e.target.value,
                    })
                  }
                  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 outline-none focus:border-[#D4AF37]"
                />
              )}

            </div>

          ))}

        </div>

      </div>


      {/* Departments Section */}

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

        <div className="flex items-center justify-between border-b border-gray-200 px-8 py-6">

          <div>

            <h2 className="text-2xl font-bold text-[#1F2937]">
              Departments
            </h2>

            <p className="mt-1 text-gray-500">
              Manage departments and contract ownership.
            </p>

          </div>


          <button
            className="flex items-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-3 font-semibold text-[#1F2937]"
          >
            <Plus className="h-5 w-5" />
            Add Department
          </button>

        </div>


        <div className="grid grid-cols-2 gap-6 px-8 py-6">

          {departments.map((department) => (

            <div
              key={department.name}
              className="rounded-xl border border-gray-200 p-5"
            >

              <div className="flex items-center justify-between">

                <h3 className="text-lg font-semibold text-[#1F2937]">
                  {department.name}
                </h3>

                <span className="rounded-full bg-[#D4AF37]/10 px-4 py-1 text-sm font-semibold text-[#D4AF37]">
                  {department.contracts}
                </span>

              </div>


              <p className="mt-2 text-sm text-gray-500">
                Active contracts
              </p>


            </div>

          ))}

        </div>

      </div>      {/* Additional Information */}

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
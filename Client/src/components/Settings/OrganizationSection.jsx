import { Building2, Plus } from "lucide-react";

const departments = [
  { name: "Legal", contracts: 13 },
  { name: "IT", contracts: 22 },
  { name: "Finance", contracts: 18 },
  { name: "HR", contracts: 11 },
  { name: "Operations", contracts: 9 },
  { name: "Procurement", contracts: 14 },
  { name: "Sales", contracts: 8 },
  { name: "Marketing", contracts: 5 },
];

const details = [
  {
    label: "Organization Name",
    value: "Nexora Group",
  },
  {
    label: "Legal Entity Name",
    value: "Nexora Group Holdings Ltd.",
  },
  {
    label: "Industry",
    value: "Enterprise Technology & Services",
  },
  {
    label: "Employees",
    value: "2,400+",
  },
  {
    label: "Headquarters",
    value: "New York, NY, United States",
  },
  {
    label: "Website",
    value: "https://nexoragroup.com",
    link: true,
  },
  {
    label: "Tax ID / VAT",
    value: "US-82-3456789",
  },
];

const OrganizationSection = () => {
  return (
    <div className="space-y-8">

      {/* Organization Details */}

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
              key={item.label}
              className={`flex items-center justify-between px-8 py-5 ${
                index !== details.length - 1
                  ? "border-b border-gray-100"
                  : ""
              }`}
            >
              <span className="text-sm font-medium text-gray-500">
                {item.label}
              </span>

              {item.link ? (
                <a
                  href={item.value}
                  className="font-semibold text-blue-600 hover:underline"
                >
                  {item.value}
                </a>
              ) : (
                <span className="font-semibold text-[#1F2937]">
                  {item.value}
                </span>
              )}
            </div>
          ))}

        </div>

      </div>

      {/* Departments */}

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

        <div className="border-b border-gray-200 px-8 py-6">

          <h2 className="text-2xl font-bold text-[#1F2937]">
            Departments
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage contract-owning departments in your organization.
          </p>

        </div>

        <div className="grid grid-cols-2 gap-4 p-8">

          {departments.map((dept) => (
            <div
              key={dept.name}
              className="flex items-center justify-between rounded-xl border border-gray-200 px-5 py-4 transition hover:border-[#D4AF37]"
            >
              <div>

                <h3 className="font-semibold text-[#1F2937]">
                  {dept.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {dept.contracts} contracts
                </p>

              </div>

            </div>
          ))}

        </div>

        <div className="border-t border-gray-200 px-8 py-6">

          <button className="flex items-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-3 font-semibold text-[#1F2937] transition hover:opacity-90">

            <Plus size={18} />

            Add Department

          </button>

        </div>

      </div>

    </div>
  );
};

export default OrganizationSection;
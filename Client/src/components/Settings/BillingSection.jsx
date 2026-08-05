import { useState, useEffect } from "react";

const BillingSection = () => {

  const [billingId, setBillingId] = useState(null);

  const [billing, setBilling] = useState({
    billingName: "",
    billingEmail: "",
    taxId: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBilling();
  }, []);

  const fetchBilling = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:8000/settings/billing"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch billing settings");
      }

      const data = await response.json();

      if (data.length > 0) {
        const item = data[0];

        setBillingId(item.id);

        setBilling({
          billingName: item.billingName,
          billingEmail: item.billingEmail,
          taxId: item.taxId,
          address: item.address,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const url = billingId
        ? `http://127.0.0.1:8000/settings/billing/${billingId}`
        : "http://127.0.0.1:8000/settings/billing";

      const method = billingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(billing),
      });

      if (!response.ok) {
        throw new Error("Failed to save billing settings");
      }

      const result = await response.json();

      if (!billingId) {
        setBillingId(result.id);
      }

      alert("Billing settings saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save billing settings.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setBilling({
      ...billing,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="space-y-8">

  {/* Header */}

  <div className="flex items-center justify-between">

    <div>

      <h1 className="text-3xl font-bold">
        Billing & Plan
      </h1>

      <p className="mt-2 text-gray-500">
        Manage your billing & plan preferences
      </p>

    </div>

    <button
      onClick={handleSave}
      disabled={loading}
      className="rounded-xl bg-[#D4AF37] px-6 py-3 font-semibold disabled:opacity-50"
    >
      {loading ? "Saving..." : "Save Changes"}
    </button>

  </div>

  {/* Current Plan */}

  <div className="rounded-2xl border bg-white shadow">

    <div className="flex items-center justify-between border-b p-8">

      <div>

        <h2 className="text-2xl font-semibold">
          Current Plan
        </h2>

        <h3 className="mt-5 text-3xl font-bold">
          Enterprise Plan
        </h3>

        <p className="mt-2 text-gray-500">
          Unlimited contracts · 50 users · All features · SLA guaranteed
        </p>

      </div>

      <div className="text-right">

        <h2 className="text-4xl font-bold">
          $2,499
        </h2>

        <p className="text-gray-500">
          / month
        </p>

      </div>

    </div>

    <div className="grid grid-cols-3 gap-6 p-8">

      {/* Contracts */}

      <div className="rounded-xl border border-gray-200 p-6">

        <p className="text-gray-500">
          Contracts
        </p>

        <h3 className="mt-3 text-3xl font-bold text-[#1F2937]">
          214
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          / Unlimited
        </p>

      </div>

      {/* Users */}

      <div className="rounded-xl border border-gray-200 p-6">

        <p className="text-gray-500">
          Users
        </p>

        <h3 className="mt-3 text-3xl font-bold text-[#1F2937]">
          15
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          / 50
        </p>

      </div>

      {/* Storage */}

      <div className="rounded-xl border border-gray-200 p-6">

        <p className="text-gray-500">
          Storage
        </p>

        <h3 className="mt-3 text-3xl font-bold text-[#1F2937]">
          12.4 GB
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          / 100 GB
        </p>

      </div>

    </div>

  </div>
  {/* Billing Details */}

<div className="rounded-2xl border bg-white shadow">

  <div className="border-b p-6">

    <h2 className="text-2xl font-semibold">
      Billing Details
    </h2>

    <p className="mt-1 text-gray-500">
      Your invoice address and payment method.
    </p>

  </div>

  <div className="grid grid-cols-2 gap-6 p-6">

    {/* Billing Name */}

    <div>

      <label className="mb-2 block font-medium">
        Billing Name
      </label>

      <input
        type="text"
        name="billingName"
        value={billing.billingName}
        onChange={handleChange}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#D4AF37]"
      />

    </div>

    {/* Billing Email */}

    <div>

      <label className="mb-2 block font-medium">
        Billing Email
      </label>

      <input
        type="email"
        name="billingEmail"
        value={billing.billingEmail}
        onChange={handleChange}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#D4AF37]"
      />

    </div>

    {/* VAT / Tax ID */}

    <div>

      <label className="mb-2 block font-medium">
        VAT/Tax ID
      </label>

      <input
        type="text"
        name="taxId"
        value={billing.taxId}
        onChange={handleChange}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#D4AF37]"
      />

    </div>

    {/* Billing Address */}

    <div>

      <label className="mb-2 block font-medium">
        Billing Address
      </label>

      <textarea
        rows={3}
        name="address"
        value={billing.address}
        onChange={handleChange}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#D4AF37]"
      />

    </div>

  </div>

</div>
{/* Payment Method */}

<div className="rounded-2xl border bg-white shadow">

  <div className="border-b p-6">

    <h2 className="text-2xl font-semibold">
      Payment Method
    </h2>

    <p className="mt-1 text-gray-500">
      Current card on file for subscription billing.
    </p>

  </div>

  <div className="flex items-center justify-between p-6">

    <div className="flex items-center gap-5">

      {/* VISA Icon */}

      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
        VISA
      </div>

      <div>

        <h3 className="font-semibold text-[#1F2937]">
          Visa ending in 4242
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Expires 08/2026 · Added Jan 2023
        </p>

      </div>

    </div>

    <button
      type="button"
      className="rounded-xl border border-[#D4AF37] px-6 py-3 font-semibold text-[#D4AF37] transition hover:bg-[#FFF8E1]"
    >
      Update Card
    </button>

  </div>

</div>

</div>
  );
};

export default BillingSection;
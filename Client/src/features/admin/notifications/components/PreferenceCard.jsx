import { useState } from "react";

function PreferenceCard({
  title,
  subtitle,
  icon: Icon,
  enabled,
}) {
  const [isEnabled, setIsEnabled] = useState(enabled);

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm border-0 rounded-4">
        <div className="card-body text-center">

          <div
            className="mx-auto mb-3 d-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-4"
            style={{
              width: "60px",
              height: "60px",
            }}
          >
            <Icon className="text-primary" size={26} />
          </div>

          <h5 className="fw-bold">
            {title}
          </h5>

          <p className="text-secondary">
            {subtitle}
          </p>

          <div className="form-check form-switch d-flex justify-content-center">
            <input
              className="form-check-input"
              type="checkbox"
              checked={isEnabled}
              onChange={() => setIsEnabled(!isEnabled)}
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default PreferenceCard;
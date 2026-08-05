import {
  Sparklines,
  SparklinesLine,
} from "react-sparklines";

function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
}) {
  const bg = {
    primary: "#DBEAFE",
    warning: "#FEF3C7",
    success: "#DCFCE7",
    info: "#CFFAFE",
  };

  const icon = {
    primary: "#2563EB",
    warning: "#F59E0B",
    success: "#16A34A",
    info: "#0891B2",
  };

  return (
    <div className="col-xl-3 col-md-6">

      <div className="premium-card">

        <div className="d-flex justify-content-between">

          <div>

            <p className="premium-title">
              {title}
            </p>

            <h2 className="premium-value">
              {value}
            </h2>

            <p className="premium-growth">
              ↗ +12.5%
              <span>{subtitle}</span>
            </p>

          </div>

          <div
            className="premium-icon"
            style={{
              background:bg[color],
              color:icon[color]
            }}
          >
            <Icon size={28}/>
          </div>

        </div>

        <div className="mt-3">

          <Sparklines
            data={[5,8,7,9,11,10,13]}
          >

            <SparklinesLine
              color={icon[color]}
            />

          </Sparklines>

        </div>

      </div>

    </div>
  );
}

export default StatsCard;
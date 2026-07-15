function ComplianceLevels() {
  return (
    <div className="compliance-card">
      <h2>Compliance Levels</h2>

      <div className="level">
        <div className="level-text">
          <span>Excellent</span>
          <span>91%</span>
        </div>
        <div className="progress">
          <div className="excellent"></div>
        </div>
      </div>

      <div className="level">
        <div className="level-text">
          <span>Good</span>
          <span>74%</span>
        </div>
        <div className="progress">
          <div className="good"></div>
        </div>
      </div>

      <div className="level">
        <div className="level-text">
          <span>Needs Attention</span>
          <span>38%</span>
        </div>
        <div className="progress">
          <div className="warning"></div>
        </div>
      </div>
    </div>
  );
}

export default ComplianceLevels;
const RevenueChart = () => {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>Revenue</h3>
        <div className="chart-legend">
          <div className="legend-item">
            <span className="legend-dot blue"></span>
            <span>$75,000 (80%)</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot green"></span>
            <span>$10,000 (20%)</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot orange"></span>
            <span>Online Store</span>
          </div>
        </div>
      </div>
      
      <div className="chart-placeholder">
        <div className="chart-bars">
          {[40, 60, 35, 80, 45, 70, 55, 65, 50, 75, 60, 85].map((height, index) => (
            <div 
              key={index} 
              className="chart-bar" 
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
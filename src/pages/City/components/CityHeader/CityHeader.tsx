import "./CityHeader.styles.scss";

interface ICityHeaderH {
  icon: string;
  temp_c: number;
  temp_f: number;
  localTime: string;
  lastUpdated: string;
}

const CityHeader = ({
  icon,
  temp_c,
  temp_f,
  localTime,
  lastUpdated,
}: ICityHeaderH) => {
  return (
    <div className="header">
      <div className="temp">
        <h3>Temperature</h3>
        <div className="temp-content">
          <img src={icon} alt="weather-icon" />
          <div className="temp-info">
            <p>{temp_c}°C</p>
            <div className="line" />
            <span>{temp_f}°F</span>
          </div>
        </div>
      </div>
      <div className="date-info">
        <h4>Local Time</h4>
        <p>{localTime}</p>
        <h4>Last Updated</h4>
        <p>{lastUpdated}</p>
      </div>
    </div>
  );
};

export default CityHeader;

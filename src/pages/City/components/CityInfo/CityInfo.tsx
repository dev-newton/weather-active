import "./CityInfo.styles.scss";

interface ICityInfo {
  name: string;
  value: number;
  unit?: string;
}

const CityInfo = ({ name, value, unit }: ICityInfo) => {
  return (
    <div className="city-info">
      <div className="city-info--row">
        <h4>{name}</h4>
        <span>
          {value}
          {unit}
        </span>
      </div>
      <hr className="city-info--line" />
    </div>
  );
};

export default CityInfo;

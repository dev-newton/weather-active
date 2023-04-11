import { useGetWeatherInfoQuery } from "services/weather.service";

interface ICity {
  name: string;
}

const City = ({ name }: ICity) => {
  const { data, error, isLoading } = useGetWeatherInfoQuery(name);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>An Error Occured!</h1>;
  }

  return (
    <div>
      <div className="card">
        <hr />
        <div className="card card-info">
          City: {name}
          <br />
          Current Temperature: {data.current?.temp_c}°C
        </div>
      </div>
    </div>
  );
};

export default City;

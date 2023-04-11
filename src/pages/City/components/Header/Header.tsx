import "./Header.styles.scss";

interface IHeader {
  title: string | null;
}

const Header = ({ title }: IHeader) => {
  return (
    <div className="city-header">
      <h1>{title}</h1>
    </div>
  );
};

export default Header;

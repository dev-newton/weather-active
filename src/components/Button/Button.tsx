import "./Button.styles.scss";

interface IButton {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button = ({ label, onClick, disabled }: IButton) => {
  return (
    <button
      className={`${disabled ? "disabled" : ""}`}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;

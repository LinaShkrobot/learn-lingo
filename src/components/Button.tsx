import "./Button.css";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit";
  fullWidth?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function Button({
  children,
  type = "button",
  fullWidth = false,
  onClick,
  className = "",
}: ButtonProps) {
  return (
    <button
      className={`btn ${fullWidth ? "btn-full" : ""} ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

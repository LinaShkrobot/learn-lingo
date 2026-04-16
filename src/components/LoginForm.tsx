import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../context/AuthContext";
import "./AuthForm.css";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Min 6 characters")
    .required("Password is required"),
});

interface LoginFormProps {
  onClose: () => void;
}

export default function LoginForm({ onClose }: LoginFormProps) {
  const { loginUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      await loginUser(data.email, data.password);
      onClose();
    } catch (error) {
      alert("Login failed. Check your email and password.");
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Log In</h2>
      <p>
        Welcome back! Please enter your credentials to access your account and
        continue your search for a teacher.
      </p>
      <div className="form-fields">
        <input {...register("email")} placeholder="Email" />
        {errors.email && <span className="error">{errors.email.message}</span>}
        <div className="password-field">
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
          />
          <button type="button" className="eye-btn">
            <svg width="20" height="20">
              <use href="/sprite.svg#icon-eye-off" />
            </svg>
          </button>
        </div>
        {errors.password && (
          <span className="error">{errors.password.message}</span>
        )}
      </div>
      <button type="submit">Log In</button>
    </form>
  );
}

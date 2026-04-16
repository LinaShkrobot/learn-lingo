import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../context/AuthContext";
import "./AuthForm.css";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Min 6 characters")
    .required("Password is required"),
});

interface RegisterFormProps {
  onClose: () => void;
}

export default function RegisterForm({ onClose }: RegisterFormProps) {
  const { registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      await registerUser(data.email, data.password);
      onClose();
    } catch (error) {
      // alert("Registration failed. Try again.");
      alert((error as any).message);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Registration</h2>
      <p>
        Thank you for your interest in our platform! In order to register, we
        need a few details. Please provide us with the information below.
      </p>
      <div className="form-fields">
        <input {...register("name")} placeholder="Name" />
        {errors.name && <span className="error">{errors.name.message}</span>}
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
      <button type="submit">Sign Up</button>
    </form>
  );
}

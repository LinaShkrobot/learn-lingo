import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import Button from "./Button";
import "./BookingForm.css";

interface BookingFormProps {
  teacherName: string;
  teacherAvatar: string;
  onClose: () => void;
}

const schema = yup.object({
  reason: yup.string().required("Please select a reason"),
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
});

const reasons = [
  "Career and business",
  "Lesson for kids",
  "Living abroad",
  "Exams and coursework",
  "Culture, travel or hobby",
];

export default function BookingForm({
  teacherName,
  teacherAvatar,
  onClose,
}: BookingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    toast.success("Lesson booked successfully!");
    onClose();
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Book trial lesson</h2>
      <p className="booking-desc">
        Our experienced tutor will assess your current language level, discuss
        your learning goals, and tailor the lesson to your specific needs.
      </p>

      <div className="booking-teacher">
        <img src={teacherAvatar} alt={teacherName} className="booking-avatar" />
        <div>
          <span className="booking-label">Your teacher</span>
          <span className="booking-name">{teacherName}</span>
        </div>
      </div>

      <p className="booking-question">
        What is your main reason for learning English?
      </p>

      <div className="booking-reasons">
        {reasons.map((reason) => (
          <label key={reason} className="reason-label">
            <input type="radio" value={reason} {...register("reason")} />
            {reason}
          </label>
        ))}
        {errors.reason && (
          <span className="error">{errors.reason.message}</span>
        )}
      </div>

      <input
        {...register("fullName")}
        placeholder="Full Name"
        className="booking-input"
      />
      {errors.fullName && (
        <span className="error">{errors.fullName.message}</span>
      )}

      <input
        {...register("email")}
        placeholder="Email"
        className="booking-input"
      />
      {errors.email && <span className="error">{errors.email.message}</span>}

      <input
        {...register("phone")}
        placeholder="Phone number"
        className="booking-input"
      />
      {errors.phone && <span className="error">{errors.phone.message}</span>}
      <Button type="submit" fullWidth>
        Book
      </Button>
    </form>
  );
}

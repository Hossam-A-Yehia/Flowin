import * as Yup from "yup";
import { RegisterFormData } from "@/types/auth";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

export const registerValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please provide a valid email address")
    .required("Email is required")
    .max(255, "Email cannot be longer than 255 characters"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      passwordRegex,
      "Password must contain uppercase, lowercase, number and special character"
    ),

  name: Yup.string()
    .optional()
    .max(100, "Name cannot be longer than 100 characters")
    .nullable(),
});

export const registerInitialValues: RegisterFormData = {
  email: "",
  password: "",
  name: "",
};

export const getPasswordStrength = (
  password: string
): {
  score: number;
  label: string;
  color: string;
} => {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[@$!%*?&]/.test(password)) score++;

  const strengthMap = {
    0: { label: "Very Weak", color: "bg-red-500" },
    1: { label: "Weak", color: "bg-red-400" },
    2: { label: "Fair", color: "bg-yellow-500" },
    3: { label: "Good", color: "bg-yellow-400" },
    4: { label: "Strong", color: "bg-green-500" },
    5: { label: "Very Strong", color: "bg-green-600" },
  };

  return {
    score,
    label: strengthMap[score as keyof typeof strengthMap].label,
    color: strengthMap[score as keyof typeof strengthMap].color,
  };
};

export const formatValidationError = (error: string): string => {
  return error.charAt(0).toUpperCase() + error.slice(1);
};

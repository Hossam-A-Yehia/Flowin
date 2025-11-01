import * as Yup from "yup";
import { RegisterFormData } from "@/types/auth";
import i18n from "@/il8n";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

export const getRegisterValidationSchema = () => {
  return Yup.object().shape({
    email: Yup.string()
      .email(i18n.t('auth.validation.emailInvalid'))
      .required(i18n.t('auth.validation.emailRequired'))
      .max(255, i18n.t('auth.validation.emailMaxLength')),

    password: Yup.string()
      .required(i18n.t('auth.validation.passwordRequired'))
      .min(8, i18n.t('auth.validation.passwordMinLength'))
      .matches(
        passwordRegex,
        i18n.t('auth.validation.passwordPattern')
      ),

    name: Yup.string()
      .optional()
      .max(100, i18n.t('auth.validation.nameMaxLength'))
      .nullable(),
  });
};

export const registerValidationSchema = getRegisterValidationSchema();

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
    0: { label: i18n.t('auth.validation.passwordStrengthVeryWeak'), color: "bg-red-500" },
    1: { label: i18n.t('auth.validation.passwordStrengthWeak'), color: "bg-red-400" },
    2: { label: i18n.t('auth.validation.passwordStrengthFair'), color: "bg-yellow-500" },
    3: { label: i18n.t('auth.validation.passwordStrengthGood'), color: "bg-yellow-400" },
    4: { label: i18n.t('auth.validation.passwordStrengthStrong'), color: "bg-green-500" },
    5: { label: i18n.t('auth.validation.passwordStrengthVeryStrong'), color: "bg-green-600" },
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

import * as Yup from 'yup';
import i18n from '@/il8n';
import { ResetPasswordFormData } from '@/types/auth';

export const getResetPasswordValidationSchema = () => {
  return Yup.object().shape({
    token: Yup.string().required(),
    newPassword: Yup.string()
      .required(i18n.t('auth.validation.passwordRequired'))
      .min(8, i18n.t('auth.validation.passwordMinLength'))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        i18n.t('auth.validation.passwordPattern')
      ),
    confirmPassword: Yup.string()
      .required(i18n.t('auth.validation.confirmPasswordRequired'))
      .oneOf([Yup.ref('newPassword')], i18n.t('auth.validation.passwordsMustMatch')),
  });
};

export const getResetPasswordInitialValues = (token: string): ResetPasswordFormData => ({
  token,
  newPassword: '',
  confirmPassword: '',
});

// Password strength calculator
export const calculatePasswordStrength = (password: string): number => {
  let strength = 0;
  
  if (password.length >= 8) strength += 1;
  if (password.length >= 12) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/\d/.test(password)) strength += 1;
  if (/[@$!%*?&]/.test(password)) strength += 1;
  
  return strength;
};

export const getPasswordStrengthLabel = (strength: number): string => {
  if (strength <= 1) return i18n.t('auth.validation.passwordStrengthVeryWeak');
  if (strength === 2) return i18n.t('auth.validation.passwordStrengthWeak');
  if (strength === 3) return i18n.t('auth.validation.passwordStrengthFair');
  if (strength === 4) return i18n.t('auth.validation.passwordStrengthGood');
  if (strength === 5) return i18n.t('auth.validation.passwordStrengthStrong');
  return i18n.t('auth.validation.passwordStrengthVeryStrong');
};

export const getPasswordStrengthColor = (strength: number): string => {
  if (strength <= 1) return 'bg-red-500';
  if (strength === 2) return 'bg-orange-500';
  if (strength === 3) return 'bg-yellow-500';
  if (strength === 4) return 'bg-blue-500';
  if (strength === 5) return 'bg-green-500';
  return 'bg-green-600';
};

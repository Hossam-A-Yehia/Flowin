import * as Yup from 'yup';
import { LoginFormData } from '@/types/auth';
import i18n from '@/il8n';

export const getLoginValidationSchema = () => {
  return Yup.object().shape({
    email: Yup.string()
      .email(i18n.t('auth.validation.emailInvalid'))
      .required(i18n.t('auth.validation.emailRequired'))
      .max(255, i18n.t('auth.validation.emailMaxLength')),
    
    password: Yup.string()
      .required(i18n.t('auth.validation.passwordRequired'))
      .min(1, i18n.t('auth.validation.passwordRequired')),
  });
};

export const loginValidationSchema = getLoginValidationSchema();

export const loginInitialValues: LoginFormData = {
  email: '',
  password: '',
};

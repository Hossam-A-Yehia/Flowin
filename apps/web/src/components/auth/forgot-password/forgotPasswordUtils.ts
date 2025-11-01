import * as Yup from 'yup';
import i18n from '@/il8n';
import { ForgotPasswordFormData } from '@/types/auth';

export const getForgotPasswordValidationSchema = () => {
  return Yup.object().shape({
    email: Yup.string()
      .email(i18n.t('auth.validation.emailInvalid'))
      .required(i18n.t('auth.validation.emailRequired'))
      .max(255, i18n.t('auth.validation.emailMaxLength')),
  });
};

export const forgotPasswordInitialValues: ForgotPasswordFormData = {
  email: '',
};

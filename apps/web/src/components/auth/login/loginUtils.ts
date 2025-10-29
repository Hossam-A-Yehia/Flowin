import * as Yup from 'yup';
import { LoginFormData } from '@/types/auth';

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please provide a valid email address')
    .required('Email is required')
    .max(255, 'Email cannot be longer than 255 characters'),
  
  password: Yup.string()
    .required('Password is required')
    .min(1, 'Password is required'),
});

export const loginInitialValues: LoginFormData = {
  email: '',
  password: '',
};

"use client";

import { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { Eye, EyeOff, Lock, AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { getPasswordStrength } from "@/components/auth/register/registerUtils";

interface PasswordFieldProps {
  value: string;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
  focusedField: string | null;
  onFocus: (field: string) => void;
  onBlur: () => void;
}

export function PasswordField({
  value,
  error,
  touched,
  disabled,
  focusedField,
  onFocus,
  onBlur,
}: PasswordFieldProps) {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-1">
      <Label htmlFor="password" className="text-sm font-medium text-gray-700">
        {t('auth.register.passwordLabel')}
      </Label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Field
          as={Input}
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder={t('auth.register.passwordPlaceholder')}
          disabled={disabled}
          onFocus={() => onFocus("password")}
          onBlur={onBlur}
          className={`pl-10 pr-12 h-11 transition-all duration-200 ${
            focusedField === "password"
              ? "ring-2 ring-blue-500 border-blue-500"
              : ""
          } ${error && touched ? "border-red-500 ring-red-500" : ""}`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          disabled={disabled}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
      <ErrorMessage name="password">
        {(msg) => (
          <div className="text-sm text-red-600 flex items-center">
            <AlertCircle className="w-3 h-3 mr-1" />
            {msg}
          </div>
        )}
      </ErrorMessage>

      {value && (
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">{t('auth.register.passwordStrength')}</span>
            <Badge
              variant={
                getPasswordStrength(value).score >= 4
                  ? "default"
                  : getPasswordStrength(value).score >= 2
                    ? "secondary"
                    : "destructive"
              }
              className="text-xs"
            >
              {getPasswordStrength(value).label}
            </Badge>
          </div>
          <Progress
            value={(getPasswordStrength(value).score / 5) * 100}
            className="h-1.5"
          />
        </div>
      )}
    </div>
  );
}

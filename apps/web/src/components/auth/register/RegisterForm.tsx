"use client";

import { useState, useCallback } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Loader2, AlertCircle, User, Mail, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRegister } from "@/hooks/useAuth";
import { RegisterFormData } from "@/types/auth";
import {
  registerValidationSchema,
  registerInitialValues,
} from "@/components/auth/register/registerUtils";
import { PasswordField } from "./PasswordField";

export function RegisterForm() {
  const { t } = useTranslation();
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const registerMutation = useRegister();

  const handleSubmit = useCallback(
    async (values: RegisterFormData) => {
      const submitData = {
        ...values,
        name: values.name?.trim() || undefined,
      };
      registerMutation.mutate(submitData);
    },
    [registerMutation]
  );

  return (
    <>
      {registerMutation.error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700">
            {registerMutation.error.message}
          </AlertDescription>
        </Alert>
      )}

      <Formik
        initialValues={registerInitialValues}
        validationSchema={registerValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, isValid }) => (
          <Form className="space-y-3">
            <div className="space-y-1">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                {t('auth.register.nameLabel')}
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Field
                  as={Input}
                  id="name"
                  name="name"
                  type="text"
                  placeholder={t('auth.register.namePlaceholder')}
                  disabled={registerMutation.isPending}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  className={`pl-10 h-11 transition-all duration-200 ${
                    focusedField === "name"
                      ? "ring-2 ring-blue-500 border-blue-500"
                      : ""
                  } ${errors.name && touched.name ? "border-red-500 ring-red-500" : ""}`}
                />
              </div>
              <ErrorMessage name="name">
                {(msg) => (
                  <div className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {msg}
                  </div>
                )}
              </ErrorMessage>
            </div>

            <div className="space-y-1">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                {t('auth.register.emailLabel')}
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t('auth.register.emailPlaceholder')}
                  disabled={registerMutation.isPending}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className={`pl-10 h-11 transition-all duration-200 ${
                    focusedField === "email"
                      ? "ring-2 ring-blue-500 border-blue-500"
                      : ""
                  } ${errors.email && touched.email ? "border-red-500 ring-red-500" : ""}`}
                />
              </div>
              <ErrorMessage name="email">
                {(msg) => (
                  <div className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {msg}
                  </div>
                )}
              </ErrorMessage>
            </div>

            <PasswordField
              value={values.password}
              error={errors.password}
              touched={touched.password}
              disabled={registerMutation.isPending}
              focusedField={focusedField}
              onFocus={setFocusedField}
              onBlur={() => setFocusedField(null)}
            />

            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none"
              disabled={registerMutation.isPending || !isValid}
            >
              {registerMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('auth.register.creating')}
                </>
              ) : (
                <>
                  {t('auth.register.createButton')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}

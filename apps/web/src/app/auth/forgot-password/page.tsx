import { Metadata } from "next";
import { forgotPasswordMetadata } from "@/metadata";
import { ForgotPassword } from "@/components/auth/forgot-password/ForgotPassword";
import { DynamicMetadata } from "@/components/DynamicMetadata";

export const metadata: Metadata = forgotPasswordMetadata.en;

export default function ForgotPasswordPage() {
  return (
    <>
      <DynamicMetadata page="forgot-password" /> <ForgotPassword />
    </>
  );
}

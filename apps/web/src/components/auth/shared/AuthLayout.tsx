import { ReactNode } from "react";

interface AuthLayoutProps {
  hero: ReactNode;
  form: ReactNode;
}

export function AuthLayout({ hero, form }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {hero}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-lg">{form}</div>
      </div>
    </div>
  );
}

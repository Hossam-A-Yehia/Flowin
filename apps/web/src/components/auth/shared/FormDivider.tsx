interface FormDividerProps {
  text: string;
}

export function FormDivider({ text }: FormDividerProps) {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-gray-200" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-white px-4 text-gray-500 font-medium">{text}</span>
      </div>
    </div>
  );
}

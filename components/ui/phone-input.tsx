"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Input } from "./input";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function PhoneInput({ value = "", onChange, error }: PhoneInputProps) {
  const formatPhoneNumber = (input: string) => {
    if (!input) return "";
    const digits = input.replace(/\D/g, "");
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(
      6,
      10
    )}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    onChange(formatted);
  };

  return (
    <div className="grid grid-cols-5 gap-2">
      <div className="flex justify-between items-center rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
        <Image
          src={`https://flagcdn.com/w20/us.png`}
          alt={"US"}
          width={24}
          height={16}
          className="object-contain"
        />
        <span>+1</span>
      </div>
      <div className="col-span-4">
        <Input
          type="tel"
          value={value}
          onChange={handleChange}
          className={cn(error && "border-red-500")}
          placeholder="(555) 555-5555"
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
}
